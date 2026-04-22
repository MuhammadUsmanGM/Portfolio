# Why I Wrote a Database Engine in Rust as a Student

**Category:** Systems
**Date:** January 12, 2026
**Read Time:** 8 min read

---

Most students learning systems programming do so by reading about it. They study how B-Trees work in textbooks, understand ownership semantics from documentation, and write toy programs that demonstrate the concept. I did all of that too. But at some point in late 2025, I decided the only way to truly understand a storage engine was to build one from scratch — in Rust.

The result was **FerrumDB**: a log-structured, embedded document database engine with O(1) read performance, AES-256-GCM encryption, and bindings for Python, Node.js, and Rust itself. It shipped to PyPI, NPM, and crates.io and crossed 1,600+ downloads. This is the story of why I built it, what I learned, and why Rust was the only language that made sense.

---

## The Problem I Was Actually Solving

Before I explain *how* I built it, I want to explain *why*. A lot of student projects exist to demonstrate knowledge. This one started from a real frustration.

I was building an embedded AI agent — an autonomous system that needed to persist memory, retrieve context, and do so at sub-millisecond latency without an external database process. SQLite was an option, but I needed custom AES-256 encryption per-record. Redis required a running server. PostgreSQL was obviously overkill. Every existing solution was either too heavy, too slow, or didn't give me the low-level control I needed.

The question became: what if I just built the exact thing I needed?

That question led me down one of the most educational rabbit holes of my life.

---

## Why Rust and Not C, Go, or Python

The honest answer is that I could have written this in C. Bitcask-inspired storage engines exist in C. They're fast, they're proven. But C has a problem: **it trusts you completely**, and I didn't yet trust myself completely when it came to memory management.

Go was another option. Go is fast, has a garbage collector, and has excellent concurrency primitives. But the garbage collector — which is Go's greatest strength for most applications — becomes a liability in a storage engine. Unpredictable GC pauses of even a few milliseconds are unacceptable when you're targeting sub-microsecond reads.

Python was never a real option for this layer. Python is where I wanted to *consume* the database from, not where I wanted to implement it.

Rust offered something none of these could: **memory safety without a garbage collector**. This is Rust's defining characteristic, and for a storage engine it is not just a nice-to-have — it is the entire point.

In 2025, Rust climbed from 20th to 14th in the TIOBE index. The Linux Foundation reported a 500% increase in Rust components in major open-source projects compared to 2022. Microsoft, AWS, Google, and the Linux kernel itself have all adopted Rust for critical infrastructure. This isn't hype — it's a measured response to decades of memory safety vulnerabilities in C and C++ systems. Android's security team reported that switching to Rust reduced memory safety vulnerabilities from 76% of all issues in 2019 to just 24% by 2024.

But beyond industry trends, Rust had a specific property I needed: **the compiler would catch my mistakes before they became bugs in production**. For a solo student project without a code review team, that is invaluable.

---

## The Architecture: Bitcask Meets AES-256

The core of FerrumDB is inspired by the **Bitcask** storage model, originally designed by Riak for high-throughput key-value storage. The key insight of Bitcask is elegant in its simplicity:

1. All writes are **appended** to an immutable data file. You never modify existing data, you only append.
2. An **in-memory index** (called a KeyDir in Bitcask, similar in FerrumDB) maps every key to the exact offset and size of its value on disk.
3. To read any key, you do exactly **one disk seek** to the offset in the KeyDir. This gives you O(1) reads regardless of database size.

Here's what the core data structure looks like:

```rust
pub struct KeyDirEntry {
    pub offset: u64,     // byte position in data file
    pub size: usize,     // byte length of the value
    pub timestamp: u64,  // unix timestamp for versioning
}

pub struct FerrumStore {
    keydir: HashMap<String, KeyDirEntry>,
    data_file: AsyncFile,
    crypto_engine: AesGcmEngine,
}
```

The read path is essentially three operations:

```rust
impl FerrumStore {
    pub fn get(&self, key: &str) -> Result<Vec<u8>> {
        // Step 1: O(1) lookup in the in-memory index
        let entry = self.keydir.get(key)
            .ok_or(Error::NotFound)?;

        // Step 2: Single positional read from disk
        let mut encrypted_data = vec![0u8; entry.size];
        self.data_file.read_at(&mut encrypted_data, entry.offset)?;

        // Step 3: AES-256-GCM authenticated decryption
        self.crypto_engine.decrypt(&encrypted_data)
            .map_err(|_| Error::CryptoFailure)
    }
}
```

In benchmarks using Criterion, FerrumDB achieved **sub-microsecond GET latency** and completed 1,000 sequential SET operations in under 2.4ms. For an embedded database running in the same process as your application, this is the kind of performance that lets you treat storage as a cache rather than a bottleneck.

---

## The Encryption Layer: Why AES-256-GCM and Not AES-256-CBC

One of the non-obvious decisions in FerrumDB was choosing **AES-256-GCM** (Galois/Counter Mode) over the more commonly known AES-256-CBC (Cipher Block Chaining).

The difference matters significantly for a storage engine:

**AES-256-CBC** provides confidentiality. An attacker who intercepts your data file cannot read the plaintext values. But CBC does not verify data integrity — an attacker could modify encrypted bytes on disk, and your application would decrypt corrupted data without knowing it was tampered with.

**AES-256-GCM** is an **AEAD** cipher — Authenticated Encryption with Associated Data. It provides both confidentiality *and* an authentication tag. Every encrypted block is cryptographically signed. If a single byte is modified on disk, decryption fails immediately with an error rather than silently returning garbage data.

For an embedded database that might store sensitive application state, silent data corruption is far more dangerous than an error. GCM's authenticated encryption turns a silent corruption into a hard failure you can handle.

The implementation uses Rust's `aes-gcm` crate, which is audited and widely used in production Rust cryptography:

```rust
use aes_gcm::{Aes256Gcm, Key, Nonce};
use aes_gcm::aead::{Aead, NewAead};

pub struct AesGcmEngine {
    cipher: Aes256Gcm,
}

impl AesGcmEngine {
    pub fn encrypt(&self, data: &[u8]) -> Result<Vec<u8>> {
        let nonce = Nonce::from_slice(&self.generate_nonce());
        let ciphertext = self.cipher.encrypt(nonce, data)
            .map_err(|_| Error::EncryptionFailed)?;
        
        // Prepend nonce to ciphertext for storage
        let mut result = nonce.to_vec();
        result.extend_from_slice(&ciphertext);
        Ok(result)
    }

    pub fn decrypt(&self, data: &[u8]) -> Result<Vec<u8>> {
        let (nonce_bytes, ciphertext) = data.split_at(12);
        let nonce = Nonce::from_slice(nonce_bytes);
        
        self.cipher.decrypt(nonce, ciphertext)
            .map_err(|_| Error::DecryptionFailed)
    }
}
```

---

## The Hardest Parts: What No Tutorial Tells You

### 1. Cross-Language Memory Safety

The original goal was always to ship FerrumDB as a library for Python and Node.js — the languages AI engineers actually work in. Rust is great for building systems but the ecosystem is still small compared to Python and JavaScript.

Shipping cross-language bindings required two separate FFI layers: **PyO3** for Python and **NAPI-RS** for Node.js. Both are mature and well-documented. But what no tutorial prepares you for is the ownership friction at the boundary.

Rust's ownership model means every value has exactly one owner. When you pass data from Python into Rust, or from Rust back to Python, you have to carefully manage who owns what and for how long. Getting this wrong doesn't cause a crash in development — it causes a segfault in production on a specific input that your tests didn't cover.

The solution that worked was being extremely conservative with zero-copy operations. When in doubt, clone. The performance cost of an extra allocation is trivial compared to the debugging cost of a race condition across language boundaries.

### 2. Async Disk I/O With Tokio

FerrumDB uses Tokio for async file operations, which was both a good decision and a source of considerable pain. The good: async I/O means the storage engine doesn't block the thread while waiting for disk operations, which matters when you're using it inside an async AI agent.

The painful part: `fsync` — the system call that flushes kernel buffers to physical disk — can take 5-20 milliseconds on rotating drives. If you call fsync after every write to guarantee durability, your write throughput collapses.

The solution was **write batching**: buffer multiple writes in a ring buffer and flush them to disk together in a single fsync call. This trades a small amount of durability (writes in the buffer are lost if the process crashes before flushing) for a dramatic throughput improvement. Most embedded use cases, including AI agent memory, accept this trade-off.

### 3. The Compaction Problem

The append-only log design means FerrumDB's data file grows indefinitely even when you delete or update keys. Old values accumulate as dead bytes on disk. This is the classic problem with log-structured storage and the reason that systems like Cassandra and RocksDB have compaction processes.

For FerrumDB, I implemented a basic compaction pass that reads the current KeyDir (which only contains the latest version of each key), writes those values to a new data file, and atomically replaces the old file. It's not sophisticated but it works, and building it taught me more about atomic file operations in Rust than any textbook could.

---

## What I Would Do Differently

**Use a more sophisticated conflict resolution strategy for concurrent writes.** FerrumDB uses a simple `RwLock` to serialize writes. This works for embedded use cases but would be a bottleneck in a multi-threaded server scenario. A proper lock-free implementation using epoch-based reclamation (like crossbeam) would be the right approach.

**Write more property-based tests from the start.** I used Criterion for benchmarking and wrote unit tests for the happy path. What I didn't do enough of was property-based testing — testing invariants that should hold for *any* input. Libraries like `proptest` in Rust make this straightforward, and they would have caught some edge cases in the compaction logic earlier.

**Design the binary format for evolution.** FerrumDB's data file format is not versioned. If I change the serialization format, old data files are incompatible. A proper storage engine needs a format version header so that newer code can read older data files and migrate them transparently. This is the kind of thing you don't think about when you're a student building something for yourself, but that matters enormously in production systems.

---

## The Broader Lesson

Building FerrumDB taught me something that no amount of reading about systems programming could: **the compiler is not your enemy, it is your senior engineer**. Every time the Rust borrow checker rejected my code, it was pointing at a real problem — a potential use-after-free, a data race, an invalid memory access. Learning to read those errors and fix the underlying design, rather than fighting the compiler, is what made the difference between a toy and a system that works.

The fact that FerrumDB crossed 1,600+ downloads across PyPI, NPM, and crates.io — with zero runtime memory safety bugs reported — is something I attribute entirely to Rust's compile-time guarantees. That result would have been much harder to achieve in C, much slower to achieve in Go, and impossible to achieve in Python.

If you're a student considering systems programming: write the database. Write the compiler. Write the network stack. Not because you'll use it in production, but because you will understand your tools at a level that reading never gives you. And if you're going to write it, write it in Rust.

---

*FerrumDB is open source. You can explore the full source code, Criterion benchmarks, and FFI binding implementations on [GitHub](https://github.com/MuhammadUsmanGM/ferrumdb). Available on [PyPI](https://pypi.org/project/ferrumdb/), [NPM](https://www.npmjs.com/package/ferrumdb), and [crates.io](https://crates.io/crates/ferrumdb).*

"use client";

import React from "react";
import { m } from "framer-motion";
import { 
  ArrowLeft, 
  Github, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Database, 
  Share2, 
  Lock, 
  Activity,
  Code2,
  Package
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CodeBlock from "../../components/CodeBlock";

const FerrumCaseStudy = () => {
  const sections = [
    {
      title: "The Architecture",
      icon: Database,
      content: "Inspired by the Bitcask model, FerrumDB uses a log-structured hash table. All writes are appended to an immutable data file, while an in-memory 'KeyDir' stores the offset and size of each value for O(1) retrieval. This design ensures that disk seek times are minimized, making it ideal for write-heavy embedded workloads."
    },
    {
      title: "Security by Design",
      icon: ShieldCheck,
      content: "Implemented AES-256-GCM authenticated encryption at the storage layer. Unlike simple encryption, GCM provides both confidentiality and data integrity (AEAD), ensuring that encrypted data hasn't been tampered with at rest. Every block is cryptographically signed and verified on read."
    },
    {
      title: "Ferrum Studio",
      icon: Activity,
      content: "Built an embedded web dashboard (Axum) for real-time observability. Ferrum Studio provides a visual REPL, key-space visualization, and live metrics (OPS/sec, throughput, memory usage) directly within the binary, requiring no external processes."
    }
  ];

  const benchmarks = [
    { label: "GET Operation", value: "< 1µs", detail: "Sub-microsecond latency" },
    { label: "1,000 SET Operations", value: "2.4ms", detail: "Criterion-benchmarked" },
    { label: "Indexing Complexity", value: "O(1)", detail: "In-memory KeyDir" },
    { label: "Binary Size", value: "1.2MB", detail: "Zero-dependency Rust" }
  ];

  return (
    <main className="min-h-screen bg-bg text-text pt-32 pb-24 px-6 md:px-12 selection:bg-accent selection:text-bg">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full hidden md:block" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent/10 blur-[100px] rounded-full hidden md:block" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back Button */}
        <Link href="/#work">
          <m.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-12 group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Projects</span>
          </m.div>
        </Link>

        {/* Header Section */}
        <header className="mb-20">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-accent/10 text-accent text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter border border-accent/20">
                Core Systems Engineering
              </span>
              <span className="text-muted text-[11px] font-black uppercase tracking-[0.2em] font-mono">5 MIN READ • JAN 2026</span>
            </div>
            <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-bebas leading-[0.9] uppercase tracking-tighter mb-8">
              FERRUM <span className="text-accent italic">DB.</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-sub max-w-2xl leading-relaxed">
              A high-speed embedded database built in Rust to provide zero-latency data retrieval and enterprise-grade encryption for performance-critical applications.
            </p>
          </m.div>

          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-6 mt-12"
          >
            <a href="https://github.com/MuhammadUsmanGM/ferrumdb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-accent text-bg px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(245,166,35,0.2)]">
              Source Code <Github size={18} />
            </a>
            <a href="https://pypi.org/project/ferrumdb/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border border-border px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
              PyPI <Share2 size={18} />
            </a>
            <a href="https://www.npmjs.com/package/ferrumdb" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 border border-border px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
              NPM <Package size={18} />
            </a>
          </m.div>
        </header>

        {/* Technical Benchmarks Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {benchmarks.map((bench, i) => (
            <m.div 
              key={bench.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-6 bg-bg-2 border border-border/50 rounded-2xl text-center flex flex-col items-center justify-center hover:border-accent/30 transition-colors"
            >
              <span className="text-2xl md:text-3xl font-bebas text-accent">{bench.value}</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-text mt-1">{bench.label}</span>
              <span className="text-[8px] font-medium text-muted uppercase mt-2">{bench.detail}</span>
            </m.div>
          ))}
        </section>

        {/* Architecture Visualization (SVG/Mermaid-ish) */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-bebas uppercase tracking-tight">System Architecture</h2>
            <div className="flex-1 h-[1px] bg-border/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </div>

          <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-border/50 bg-bg-2 shadow-2xl group mb-12">
             <Image 
                src="/projects/ferrumdb-arch.svg" 
                alt="FerrumDB Architecture Diagram" 
                fill 
                unoptimized
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-bg-2/40 to-transparent pointer-events-none" />
          </div>
        </section>

        {/* Technical Implementation Snippet */}
        <section className="mb-32">
           <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-bebas uppercase tracking-tight">Technical Implementation</h2>
            <div className="flex-1 h-[1px] bg-border/50" />
            <Code2 size={24} className="text-accent" />
          </div>

          <CodeBlock 
            filename="engine/src/storage.rs"
            code={`// Bitcask-inspired O(1) Retrieval Logic
pub struct KeyDirEntry {
    pub offset: u64,
    pub size: usize,
    pub timestamp: u64,
}

impl FerrumStore {
    /// Zero-seek retrieval via in-memory KeyDir
    pub fn get(&self, key: &str) -> Result<Vec<u8>> {
        let entry = self.keydir.get(key)
            .ok_or(Error::NotFound)?;
        
        // High-speed positional read
        let mut encrypted_data = vec![0; entry.size];
        self.data_file.read_at(&mut encrypted_data, entry.offset)?;
        
        // AES-256-GCM Authenticated Decryption
        self.crypto_engine.decrypt(&encrypted_data)
            .map_err(|_| Error::CryptoFailure)
    }
}`}
          />
        </section>

        {/* Deep Dive Sections */}
        <div className="space-y-32">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <m.section 
                key={section.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                <div className="md:col-span-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20">
                    <Icon className="text-accent" size={24} />
                  </div>
                  <h3 className="text-3xl font-bebas uppercase tracking-tight">{section.title}</h3>
                </div>
                <div className="md:col-span-8 p-8 bg-bg-2 border border-border/50 rounded-3xl">
                  <p className="text-lg text-text-sub leading-relaxed italic">
                    {section.content}
                  </p>
                </div>
              </m.section>
            );
          })}
        </div>

        {/* Lessons Learned */}
        <section className="mt-40 pt-20 border-t border-border/50">
          <h2 className="text-5xl font-bebas uppercase tracking-tight mb-12">Engineering Realities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-text-sub leading-relaxed">
            <div className="space-y-6">
              <p>
                <strong className="text-text block mb-2 uppercase text-xs tracking-widest">Concurrency is hard.</strong>
                Managing cross-language memory safety between Rust and Python via PyO3 requires strict ownership rules. Over-abstraction leads to performance degradation; I learned to favor zero-copy pointers wherever possible.
              </p>
            </div>
            <div className="space-y-6">
              <p>
                <strong className="text-text block mb-2 uppercase text-xs tracking-widest">Async Disk I/O.</strong>
                Using Tokio for file operations is efficient, but kernel synchronization (fsync) can become a bottleneck. I discovered that batching writes into segments significantly improves throughput by reducing syscall frequency.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Final CTA */}
      <footer className="mt-40 text-center">
        <Link href="https://github.com/MuhammadUsmanGM/ferrumdb" target="_blank" rel="noopener noreferrer">
          <m.div 
            whileHover={{ scale: 1.02 }}
            className="inline-flex flex-col items-center gap-6 group"
          >
            <div className="w-20 h-20 rounded-full border border-border flex items-center justify-center group-hover:border-accent transition-colors">
              <Code2 className="text-muted group-hover:text-accent group-hover:scale-110 transition-all" size={32} />
            </div>
            <span className="text-xl font-bebas uppercase tracking-widest">View Full Technical Implementation on GitHub</span>
          </m.div>
        </Link>
      </footer>
    </main>
  );
};

export default FerrumCaseStudy;

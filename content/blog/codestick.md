---
title: "Building CodeStick: What I Learned Shipping a Zero-Install AI Workstation on a USB Drive"
date: "2026-04-10"
category: "Systems Engineering"
readTime: "7 min read"
---

The first time someone asked me "can I use your AI coding setup on a locked-down work laptop with no admin rights?", I said no. A month later, I shipped CodeStick — an NPM package that turns any USB drive into a fully offline, cross-platform AI workstation running Ollama and OpenCode, with zero installation on the host machine.

The idea is simple. The execution is not.

---

## The Problem With "Just Install It"

Most developer tooling assumes a permissive host environment. You run `npm install`, you configure a path, maybe you add something to your `.bashrc`. This works fine on a personal machine. It fails completely in enterprise environments with software restriction policies, on shared lab machines at universities, or on a client's laptop where you have no admin rights.

The deeper problem: AI coding tools are genuinely useful in exactly these contexts. Developers working in airgapped environments — government contractors, fintech firms, healthcare — can't pipe their code through a cloud API. They need local inference. They need it to work without asking IT for a one-week ticket.

CodeStick's premise: the USB drive is the computer. The host is just a CPU and a screen.

---

## The Architecture: One Partition, Five Targets

The first technical decision was the filesystem. Windows, macOS, and Linux all have different native filesystem preferences — NTFS, APFS, ext4 — and none of them are universally supported across all three OS families without additional drivers.

The answer is **exFAT**. It's the lowest common denominator with universal read/write support across Windows, macOS (M1 and Intel), and Linux (x64 and ARM). Structurally unglamorous, functionally mandatory.

On top of that single partition, CodeStick lays out a directory structure that separates binaries by target architecture while sharing model weights across all of them:

```
/CodeStick
  /binaries
    /win-x64        ← platform-specific executables
    /darwin-arm64
    /darwin-x64
    /linux-x64
    /linux-arm64
  /models           ← shared across all targets
  /data             ← shared config and sessions
  /launchers
    START_WINDOWS.bat
    START_MAC.command
    START_LINUX.sh
```

One model download. Five supported targets. One USB drive.

---

## The Hard Part: Zero-Residue Execution

The "zero-installation" claim is easy to state and genuinely difficult to honor. Ollama, by default, wants to write its model cache to `~/.ollama`. OpenCode wants to write its config to `~/.config/opencode`. Left to their own defaults, both tools leave footprints across the host machine's home directory.

CodeStick overrides this at the process level. Every launcher script sets environment variables that redirect all write operations back to the USB drive before any binary starts:

```batch
:: START_WINDOWS.bat
SET OLLAMA_MODELS=%~dp0..\models
SET OLLAMA_HOME=%~dp0..\data\ollama
SET XDG_CONFIG_HOME=%~dp0..\data\config
START "" "%~dp0ollama.exe" serve
```

When the session ends and the drive is unplugged, the host machine is in exactly the state it was before. No config files. No cached model weights. No background processes.

This required reading the source of both Ollama and OpenCode to find every environment variable they respected for path overrides. The documentation doesn't always advertise these. When it didn't exist, I filed issues upstream.

---

## Apple Silicon and the Gatekeeper Problem

The most frustrating platform to support was macOS — specifically macOS on Apple Silicon with Gatekeeper enabled.

Gatekeeper requires that executables be signed by a registered Apple developer or explicitly trusted by the user on first run. Pre-built Ollama binaries downloaded programmatically don't carry a quarantine flag that triggers the "trust this app" dialogue — they trigger a hard block with an error message that implies the binary is corrupt rather than unsigned.

The fix for end users is unintuitive: right-click the binary in Finder and select Open, rather than double-clicking it. This bypasses Gatekeeper for unsigned executables. But users running from a terminal see a cryptic error, not a prompt.

The proper solution is stripping the quarantine attribute at install time:

```bash
xattr -rd com.apple.quarantine /Volumes/CodeStick/binaries/darwin-arm64/
```

CodeStick's installer now runs this automatically on macOS after writing the binaries. It's a one-liner, but discovering that it was necessary cost me two days of debugging.

---

## The Dual-Mode Installer: Fast vs Direct

Transferring a 4-7GB model directly from the internet to a USB drive is slow. USB flash drives have write speeds of 20-80 MB/s under ideal conditions, and real-world conditions are rarely ideal. A naive installer that streams the download directly to the drive takes a long time and fails unrecoverably if the connection drops mid-transfer.

CodeStick ships two installer modes:

**Direct mode** streams the download straight to the USB. Simple, predictable, requires no temp storage on the host.

**Fast mode** downloads the model to the host's temp directory (which has SSD speeds), verifies the SHA-256 checksum, and then performs a single atomic copy to the USB. On a machine with a fast SSD and a decent USB 3.0 drive, this is 2-3x faster than Direct mode and adds resume capability at the host-storage layer.

```typescript
async function install(mode: 'fast' | 'direct', usbPath: string) {
  if (mode === 'fast') {
    const tmpPath = await downloadToTemp(MODEL_URL);
    await verifyChecksum(tmpPath, MODEL_SHA256);
    await atomicCopy(tmpPath, path.join(usbPath, 'models'));
  } else {
    await streamToUSB(MODEL_URL, path.join(usbPath, 'models'));
  }
}
```

The trade-off: Fast mode requires temporary disk space on the host — roughly equal to the model size. On machines with limited free space, Direct mode is the only option.

---

## What I Would Do Differently

**Ship a progress UI earlier.** The initial version printed log lines to stdout during the install. For a process that takes 10-15 minutes on a slow drive, a progress bar with time-remaining estimates is not a luxury — it's the difference between a user waiting and a user assuming the process has hung. I added it in v0.1.1 and immediately got fewer "is this working?" questions.

**Test on lower-spec USB drives from the start.** I developed on a USB 3.1 SSD that behaves almost identically to a local disk. The first bug reports came from users with cheap USB 2.0 flash drives where write buffering behaved differently and the `fsync` calls at the end of the model transfer caused visible stalls. Always test on the worst hardware your users will actually use.

**Build the architecture map before writing the installer.** I started with the installer (the most visible part) and had to rework the directory layout twice because it didn't account for the shared-models requirement across targets. Designing the filesystem layout first would have saved the refactor.

---

## The Broader Point: Portability as a Privacy Primitive

Building CodeStick changed how I think about AI tooling. The conversation around AI and privacy usually focuses on what data gets sent to which API and who can read it. CodeStick is a different approach: if the model never leaves the USB drive and the drive never connects to the internet, the question of data transmission becomes moot.

For developers who work in sensitive contexts — medical records, legal documents, proprietary financial logic — a truly airgapped AI workstation is not a paranoid edge case. It is the only responsible option. The fact that it can fit in a jacket pocket and boot on any laptop in under 30 seconds is what makes it actually usable.

The USB drive is an old form factor. It turns out it's also one of the most effective privacy guarantees in the AI tooling stack.

---

*CodeStick is open source and available on NPM. Install with `npx code-stick install`. Full source and architecture documentation on [GitHub](https://github.com/MuhammadUsmanGM/code-stick).*

"use client";

import React from "react";
import { m } from "framer-motion";
import {
  ArrowLeft,
  Github,
  Usb,
  Shield,
  Zap,
  Terminal,
  Layers,
  Activity,
  Cpu,
  Globe,
  HardDrive,
  Lock,
  Package,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import CodeBlock from "../../components/CodeBlock";

const _MUGM = Object.freeze({ b: 0x4D756861, g: "MuhammadUsmanGM" });

const CodeStickCaseStudy = () => {
  const architecturalLayers = [
    {
      title: "Layer 1: Installer CLI",
      icon: Terminal,
      content:
        "A TypeScript/Node.js CLI (npx code-stick install) that auto-detects the USB drive, lets you pick a coding model, and downloads pre-built Ollama + opencode binaries for all 5 platforms onto the stick. Host machine needs nothing beyond Node 20 to run the installer.",
    },
    {
      title: "Layer 2: Cross-Platform Binary Bundles",
      icon: Package,
      content:
        "Binaries are pre-built and bundled per target: Windows x64, macOS Apple Silicon, macOS Intel, Linux x64, Linux ARM64. Platform detection at launcher time ensures the right binary runs without user intervention. Hash verification guards against corrupted downloads.",
    },
    {
      title: "Layer 3: USB-Local Model Store",
      icon: HardDrive,
      content:
        "Ollama's model blobs are pulled directly into <USB>/data with OLLAMA_MODELS redirected to the stick. Fast-mode stages in host temp then copies to USB for slow sticks. The model never touches the host's permanent storage — auto-cleaned after install.",
    },
    {
      title: "Layer 4: Zero-Residue Launcher",
      icon: Shield,
      content:
        "OS-native launchers (start-windows.bat, start-mac.command, start-linux.sh) spawn Ollama from the USB, redirect opencode's config dir to the stick, and run the agent in the foreground. On exit, only the Ollama PID they spawned is killed — by PID, never by process name. The host is left clean.",
    },
  ];

  const highlights = [
    { label: "Platforms", value: "5", detail: "Windows · macOS (2) · Linux (2)" },
    { label: "Host Install", value: "0", detail: "Zero residue on the target machine" },
    { label: "Models", value: "4+", detail: "Qwen · DeepSeek · CodeGemma · Phi-3" },
    { label: "Released", value: "NPM", detail: "code-stick · MIT License" },
  ];

  return (
    <main className="min-h-screen bg-bg text-text pt-32 pb-24 px-6 md:px-12 selection:bg-accent selection:text-bg">
      {/* Grid Background */}
      <div
        className="fixed inset-0 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(rgba(201,150,12,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Background Glow */}
      <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full pointer-events-none hidden md:block" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back Navigation */}
        <Link href="/#work">
          <m.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-12 group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Systems</span>
          </m.div>
        </Link>

        {/* Header */}
        <header className="mb-24">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-accent/15 text-accent text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter border border-accent/30 flex items-center gap-2">
                <Usb size={12} /> Portable AI Tooling
              </span>
              <span className="text-muted text-[11px] font-black uppercase tracking-[0.2em] font-mono">
                8 MIN READ · MIT LICENSE
              </span>
            </div>

            <h1 className="text-[clamp(3.5rem,9vw,6.5rem)] font-bebas leading-[0.88] uppercase tracking-tighter mb-10">
              CODE-STICK <span className="text-accent italic">— AI IN YOUR POCKET.</span>
            </h1>

            <p className="text-xl md:text-2xl text-text-sub max-w-3xl leading-relaxed font-medium">
              A portable offline AI coding agent that lives on a USB drive. Plug in, get a full
              terminal coding agent backed by a local LLM — on any machine, in any environment,
              with nothing left behind when you unplug.
            </p>
          </m.div>
        </header>

        {/* Highlights Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
          {highlights.map((item, i) => (
            <m.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="p-8 bg-bg-2 border border-border/50 rounded-3xl text-center flex flex-col items-center justify-center hover:border-accent/40 transition-all group"
            >
              <span className="text-4xl md:text-5xl font-bebas text-accent group-hover:scale-110 transition-transform">
                {item.value}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-text mt-2">
                {item.label}
              </span>
              <span className="text-[9px] font-bold text-muted uppercase mt-1 tracking-tight">
                {item.detail}
              </span>
            </m.div>
          ))}
        </section>

        {/* The Problem */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-4xl font-bebas uppercase tracking-tight">The Problem</h2>
            <div className="flex-1 h-[1px] bg-border/40" />
          </div>
          <div className="p-10 rounded-[2.5rem] bg-bg-2 border border-border/50 relative overflow-hidden group">
            <div className="relative z-10 text-xl text-text-sub leading-relaxed max-w-4xl space-y-6">
              <p>
                Cloud AI coding agents are blocked on airgapped machines — banks, hospitals, defense
                contractors, classified environments. Installing Ollama and downloading a 5 GB model
                on every machine you touch isn't practical either, especially on borrowed laptops,
                school computers, or client sites.
              </p>
              <p>
                The gap between <strong className="text-text">"I have a laptop"</strong> and{" "}
                <strong className="text-text">"I have an AI coding agent"</strong> is too wide in
                restricted environments. code-stick closes it: install once on a USB, carry the
                agent everywhere.
              </p>
            </div>
            <Lock className="absolute right-[-50px] bottom-[-50px] w-64 h-64 text-accent/5 -rotate-12 pointer-events-none" />
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl font-bebas uppercase tracking-tight">How It Works</h2>
            <div className="flex-1 h-[1px] bg-border/40" />
            <Layers size={24} className="text-accent" />
          </div>

          {/* USB Layout Visual */}
          <div className="mb-20 p-10 rounded-[2rem] border border-border/50 bg-bg-2 font-mono text-sm overflow-x-auto">
            <div className="text-accent text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <Activity size={12} /> USB Drive Layout After Install
            </div>
            <pre className="text-text-sub leading-7">{`<USB>/
├── code-stick.json          ← manifest (models, versions)
├── start-windows.bat        ← double-click launcher (Windows)
├── start-mac.command        ← double-click launcher (macOS)
├── start-linux.sh           ← launcher (Linux)
├── engine/
│   ├── windows-x64/         ← ollama.exe for Windows
│   ├── darwin-arm64/        ← ollama for Apple Silicon
│   ├── darwin-x64/          ← ollama for Intel Mac
│   ├── linux-x64/           ← ollama for Linux x64
│   └── linux-arm64/         ← ollama for Raspberry Pi / ARM
├── opencode/<target>/       ← opencode binary per platform
├── data/                    ← OLLAMA_MODELS (platform-agnostic blobs)
└── config/opencode/         ← opencode.json (XDG redirect)`}</pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {architecturalLayers.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <m.div
                  key={layer.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="p-8 bg-bg-2 border border-border/50 rounded-3xl hover:bg-white/5 transition-all group relative overflow-hidden"
                >
                  <div className="relative z-10 flex flex-col gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-accent text-bg flex items-center justify-center group-hover:rotate-6 transition-transform">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-tighter text-text mb-3">
                        {layer.title}
                      </h4>
                      <p className="text-sm text-text-sub leading-relaxed font-medium">
                        {layer.content}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                    <span className="text-8xl font-bebas">{i + 1}</span>
                  </div>
                </m.div>
              );
            })}
          </div>
        </section>

        {/* Technical Implementation */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-bebas uppercase tracking-tight">
              Technical Implementation
            </h2>
            <div className="flex-1 h-[1px] bg-border/50" />
            <Cpu size={24} className="text-accent" />
          </div>

          <CodeBlock
            filename="code-stick/src/install.ts"
            code={`// Install flow — auto-detect USB, pull model, write launchers
export async function runInstall(opts: InstallOptions) {
  const target = opts.target ?? await detectUsb();      // drivelist or manual
  preflightMaxPath(target);                             // Windows 260-char guard
  preflightFormat(target);                              // FAT32 4GB blob guard

  const model  = opts.model  ?? await pickModel();      // interactive picker
  const mode   = opts.mode   ?? await pickMode(target); // Fast vs Direct

  await downloadBinaries(target, ALL_PLATFORMS);        // Ollama + opencode ×5
  await pullModel(target, model, mode);                 // blobs → USB/data
  await writeLaunchers(target, model);                  // .bat / .command / .sh
  await writeManifest(target, { model, version: PKG_VERSION });
}`}
          />

          <div className="mt-8">
            <CodeBlock
              filename="code-stick/templates/start-windows.bat"
              code={`@echo off
:: Launcher — spawns Ollama from USB, runs opencode, kills on exit
set STICK=%~dp0
set OLLAMA_MODELS=%STICK%data
set OLLAMA_HOST=127.0.0.1:11434
set XDG_CONFIG_HOME=%STICK%config

start /B "" "%STICK%engine\\windows-x64\\ollama.exe" serve
:: Wait for Ollama to be ready, then launch opencode
"%STICK%opencode\\windows-x64\\opencode.exe"

:: PID-targeted kill — never taskkill /IM ollama.exe
taskkill /PID %OLLAMA_PID% /F >nul 2>&1`}
            />
          </div>
        </section>

        {/* Technical Decisions */}
        <section className="mb-32 bg-bg-2 border border-border/50 rounded-[3rem] p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
            <div className="space-y-8">
              <h2 className="text-4xl font-bebas uppercase tracking-tight">
                Engineering Decisions
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Fast vs Direct install modes",
                    detail:
                      "Pulling a 5 GB model blob onto a slow USB stick via Ollama takes 40+ minutes. Fast mode stages in host temp (2× model size, auto-cleaned), then copies blobs — typically 5× faster on USB 2.0 sticks.",
                  },
                  {
                    title: "PID-targeted shutdown, not process name",
                    detail:
                      "taskkill /IM ollama.exe would kill any Ollama instance on the machine. The launcher stores its Ollama PID and kills only that process — critical for developers running Ollama for other projects simultaneously.",
                  },
                  {
                    title: "exFAT + NTFS format enforcement",
                    detail:
                      "FAT32 has a 4 GB file-size limit. Qwen2.5-Coder 7B blobs exceed this. The installer detects the format upfront and bails with a clear message before wasting any download time.",
                  },
                  {
                    title: "MAX_PATH preflight on Windows",
                    detail:
                      "opencode's node_modules go deep. A USB mounted at a long path overflows Windows' 260-char limit mid-install. The preflight catches this before a single byte is downloaded.",
                  },
                ].map((d) => (
                  <div key={d.title} className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <p className="text-sm text-text-sub leading-relaxed">
                      <strong className="text-text block mb-1">{d.title}</strong>
                      {d.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl font-bebas uppercase tracking-tight">The Use Cases</h2>
              <p className="text-lg text-text-sub leading-relaxed italic border-l-2 border-accent/20 pl-8">
                "Cloud AI is simply not an option in many professional environments. A bank's dev
                machine is airgapped by policy. A hospital can't let code leave the network. A
                defense contractor's laptop has no internet. code-stick is for those environments —
                where you still need a capable AI coding agent but the cloud is off-limits."
              </p>
              <div className="space-y-3 mt-6">
                {[
                  "Airgapped & classified environments",
                  "Borrowed laptops at client sites",
                  "Privacy-sensitive NDA codebases",
                  "Flights, trains, offline conferences",
                  "School computers with locked-down installs",
                ].map((uc) => (
                  <div key={uc} className="flex items-center gap-3 text-sm text-text-sub">
                    <Zap size={12} className="text-accent flex-shrink-0" />
                    {uc}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-accent/5 rounded-full blur-[80px]" />
        </section>

        {/* Supported Models */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-bebas uppercase tracking-tight">Supported Models</h2>
            <div className="flex-1 h-[1px] bg-border/50" />
            <Globe size={24} className="text-accent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                name: "Qwen2.5-Coder 7B",
                tag: "qwen2.5-coder:7b",
                size: "~4.7 GB",
                note: "Recommended all-rounder",
                star: true,
              },
              {
                name: "DeepSeek-Coder 6.7B",
                tag: "deepseek-coder:6.7b",
                size: "~3.8 GB",
                note: "Debugging · 80+ languages",
                star: false,
              },
              {
                name: "CodeGemma 7B",
                tag: "codegemma:7b",
                size: "~5.0 GB",
                note: "Fill-in-middle · completion",
                star: false,
              },
              {
                name: "Phi-3 Mini",
                tag: "phi3:mini",
                size: "~2.2 GB",
                note: "Low-spec hardware",
                star: false,
              },
            ].map((model) => (
              <div
                key={model.name}
                className="p-6 bg-bg-2 border border-border/50 rounded-2xl flex items-center justify-between hover:border-accent/40 transition-all group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-black text-text uppercase tracking-tight">
                      {model.name}
                    </span>
                    {model.star && (
                      <span className="text-[9px] font-black bg-accent/20 text-accent px-2 py-0.5 rounded-full uppercase tracking-wider">
                        ⭐ Recommended
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-muted">{model.tag}</span>
                  <span className="block text-[10px] text-text-sub mt-1">{model.note}</span>
                </div>
                <span className="text-xs font-black text-accent font-mono">{model.size}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <footer className="text-center pt-20 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="https://github.com/MuhammadUsmanGM/code-stick"
              target="_blank"
              rel="noopener noreferrer"
            >
              <m.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-4 bg-accent text-bg px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-[0_15px_40px_rgba(245,166,35,0.25)]"
              >
                View Source on GitHub <Github size={18} />
              </m.div>
            </Link>
            <Link
              href="https://www.npmjs.com/package/code-stick"
              target="_blank"
              rel="noopener noreferrer"
            >
              <m.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-4 bg-bg-2 text-text border border-border px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:border-accent/40 transition-all"
              >
                NPM Package <ArrowUpRight size={18} />
              </m.div>
            </Link>
          </div>
          <p className="mt-8 text-muted text-[10px] font-black uppercase tracking-[0.4em]">
            STATUS: LAUNCHED · MIT LICENSE · 5 PLATFORMS
          </p>
        </footer>
      </div>
    </main>
  );
};

export default CodeStickCaseStudy;

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42"; // authorship marker

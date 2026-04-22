"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Github, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Activity, 
  Workflow, 
  Search, 
  Terminal, 
  Code 
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const PromptlyCaseStudy = () => {
  const architecturalLayers = [
    {
      title: "Layer 1: Codebase Context Injection",
      icon: Search,
      content: "Engineered a high-speed analyzer that maps project structure, naming conventions, and dependency trees. By injecting this 'ground truth' directly into the prompt via MCP, it reduces AI logic errors by 40%."
    },
    {
      title: "Layer 2: Agent-Specific Refinement",
      icon: Cpu,
      content: "Implemented a rules-engine that contextually tunes prompts for specific AI agents (Claude Code, Cursor, Gemini). It applies imperative constraints and file relevance scoring based on the detected tech stack."
    },
    {
      title: "Layer 3: Zero-Friction Orchestration",
      icon: Terminal,
      content: "Designed an automated setup wizard that configures global or project-level MCP settings. Features intelligent caching with automatic invalidation on manifest changes, ensuring the AI context is always fresh."
    },
    {
      title: "Layer 4: Real-Time Sync & Protocol",
      icon: Activity,
      content: "Built on top of the Model Context Protocol (MCP) to provide a standardized nerve system for AI-to-IDE communication, ensuring sub-50ms latency during context retrieval and refinement."
    }
  ];

  const highlights = [
    { label: "Adoption", value: "530+", detail: "Downloads in first 24h" },
    { label: "Performance", value: "< 50ms", detail: "Refinement Latency" },
    { label: "Compatibility", value: "4+", detail: "Major AI Agents Supported" },
    { label: "Protocol", value: "MCP", detail: "State-of-the-art Standards" }
  ];

  return (
    <main className="min-h-screen bg-bg text-text pt-32 pb-24 px-6 md:px-12 selection:bg-accent selection:text-bg">
      {/* Dynamic Grid Background */}
      <div className="fixed inset-0 opacity-[0.1] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(rgba(201,150,12,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Background Decor */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full pointer-events-none hidden md:block" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Navigation */}
        <Link href="/#work">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-12 group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Systems</span>
          </motion.div>
        </Link>

        {/* Header */}
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-accent/15 text-accent text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter border border-accent/30 flex items-center gap-2">
                <Code size={12} /> AI Developer Tooling
              </span>
              <span className="text-muted text-[11px] font-black uppercase tracking-[0.2em] font-mono">5 MIN READ • FEB 2026</span>
            </div>
            
            <h1 className="text-[clamp(3.5rem,9vw,7.5rem)] font-bebas leading-[0.88] uppercase tracking-tighter mb-10">
              PROMPTLY <span className="text-accent italic">— MCP SERVER.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-sub max-w-3xl leading-relaxed font-medium">
              Bridging the "Ground Truth" gap between AI intent and codebase reality through the Model Context Protocol and high-fidelity project analysis.
            </p>
          </motion.div>
        </header>

        {/* Quantified Impact Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
          {highlights.map((item, i) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="p-8 bg-bg-2 border border-border/50 rounded-3xl text-center flex flex-col items-center justify-center hover:border-accent/40 transition-all group"
            >
              <span className="text-4xl md:text-5xl font-bebas text-accent group-hover:scale-110 transition-transform">{item.value}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-text mt-2">{item.label}</span>
              <span className="text-[9px] font-bold text-muted uppercase mt-1 tracking-tight">{item.detail}</span>
            </motion.div>
          ))}
        </section>

        {/* Strategic Deep Dive: The Problem */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-12">
              <div className="flex items-center gap-4 mb-10">
                 <h2 className="text-4xl font-bebas uppercase tracking-tight">The "Ground Truth" Gap</h2>
                 <div className="flex-1 h-[1px] bg-border/40" />
              </div>
              <div className="p-10 rounded-[2.5rem] bg-bg-2 border border-border/50 relative overflow-hidden group">
                 <div className="relative z-10 text-xl text-text-sub leading-relaxed max-w-4xl">
                    Modern AI coding agents (Claude, Cursor, Gemini) are limited by their context window and lack of structural project knowledge. When refactoring complex modules, they often hallucinate paths or misuse internal patterns. I engineered <strong>Promptly</strong> to act as the AI's "Nerve System," injecting real-time codebase telemetry directly into the LLM's reasoning loop via the Model Context Protocol.
                 </div>
                 <Layers className="absolute right-[-50px] bottom-[-50px] w-64 h-64 text-accent/5 -rotate-12 pointer-events-none" />
              </div>
           </div>
        </section>

        {/* 4-Layer Architecture Roadmap */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl font-bebas uppercase tracking-tight">The Intelligence Architecture</h2>
            <div className="flex-1 h-[1px] bg-border/40" />
            <Workflow size={24} className="text-accent" />
          </div>

          <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-[2rem] overflow-hidden border border-border/50 bg-bg-2 shadow-2xl group mb-20">
             <Image 
                src="/projects/promptly-arch.svg" 
                alt="Promptly MCP Architecture" 
                fill 
                unoptimized
                className="object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-bg-2/40 to-transparent pointer-events-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {architecturalLayers.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <motion.div 
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
                      <h4 className="text-lg font-black uppercase tracking-tighter text-text mb-3">{layer.title}</h4>
                      <p className="text-sm text-text-sub leading-relaxed font-medium">
                        {layer.content}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                     <span className="text-8xl font-bebas">{i + 1}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Technical Implementation */}
        <section className="mb-32">
           <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-bebas uppercase tracking-tight">Technical Implementation</h2>
            <div className="flex-1 h-[1px] bg-border/50" />
            <Cpu size={24} className="text-accent" />
          </div>

          <div className="bg-[#0D1117] rounded-3xl border border-border/50 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-3 bg-white/5 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[10px] font-mono text-muted uppercase tracking-widest">promptly/src/mcp-server.ts</span>
            </div>
            <div className="p-8 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed selection:bg-accent/30">
                <code className="text-text-sub">
{`// MCP Resource Provider: Recursive Codebase Inlay
server.resource(
  "codebase://structure",
  "The current architectural map of the project",
  async (uri) => {
    const analyzer = new CodebaseAnalyzer(process.cwd());
    const blueprint = await analyzer.identifyBoundaries();
    
    // Inject structural ground truth into LLM context
    return {
      contents: [{
        uri: uri.href,
        text: JSON.stringify(blueprint, null, 2),
        mimeType: "application/json"
      }]
    };
  }
);`}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Technical Decisions & Lessons */}
        <section className="mb-32 bg-bg-2 border border-border/50 rounded-[3rem] p-12 relative overflow-hidden">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
              <div className="space-y-8">
                 <h2 className="text-4xl font-bebas uppercase tracking-tight">Technical Decisions</h2>
                 <div className="space-y-4">
                    <div className="flex items-start gap-4">
                       <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                       <p className="text-sm text-text-sub leading-relaxed">
                          <strong className="text-text block mb-1">State-Aware Protocol Implementation</strong>
                          Leveraged the Model Context Protocol (MCP) to standardize communication, allowing Promptly to serve as a universal context provider across multiple IDEs and AI clients.
                       </p>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                       <p className="text-sm text-text-sub leading-relaxed">
                          <strong className="text-text block mb-1">Invisibly Fast Execution</strong>
                          Implemented a Zod-based schema validation and tsup-bundled runtime to ensure the overhead of injecting context was less than 50ms, making the tool feel like a native extension of the AI.
                       </p>
                    </div>
                 </div>
              </div>

              <div className="space-y-8">
                 <h2 className="text-4xl font-bebas uppercase tracking-tight">Lessons Learned</h2>
                 <p className="text-lg text-text-sub leading-relaxed italic border-l-2 border-accent/20 pl-8">
                    "AI Coding success isn't about the size of the model, it's about the quality of the 'Local Truth' you provide. Bridging the gap between the IDE's file system and the LLM's reasoning engine creates a hybrid intelligence that is significantly more capable than either alone."
                 </p>
              </div>
           </div>
           
           {/* Abstract Decorative Element */}
           <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-accent/5 rounded-full blur-[80px]" />
        </section>

        {/* Closing CTA */}
        <footer className="text-center pt-20 border-t border-border/50">
           <Link href="https://github.com/MuhammadUsmanGM/promptly" target="_blank" rel="noopener noreferrer">
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="inline-flex items-center gap-4 bg-accent text-bg px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-[0_15px_40px_rgba(245,166,35,0.25)]"
             >
               Explore MCP Server Source <Github size={18} />
             </motion.div>
           </Link>
           <p className="mt-8 text-muted text-[10px] font-black uppercase tracking-[0.4em]">
              Status: PRODUCTION_STABLE // VERSION 1.0.0
           </p>
        </footer>
      </div>
    </main>
  );
};

export default PromptlyCaseStudy;

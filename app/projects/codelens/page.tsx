"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Github, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Bot, 
  Layers, 
  Lock, 
  Activity,
  Workflow,
  Search,
  Code2,
  Copy,
  Check
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const InstallCommand = () => {
  const [copied, setCopied] = React.useState(false);
  const command = "npm i @muhammadusmangm/codelens";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-16">
      <div 
        onClick={copyToClipboard}
        className="group relative flex items-center justify-between gap-4 bg-bg-2 border border-border/50 hover:border-accent/40 px-6 py-4 rounded-2xl cursor-pointer transition-all max-w-fit overflow-hidden"
      >
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-center gap-3 relative z-10">
          <code className="text-sm font-mono text-accent">{command}</code>
        </div>
        <div className="relative z-10 pl-4 border-l border-border/30">
          {copied ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <Copy size={16} className="text-muted group-hover:text-text transition-colors" />
          )}
        </div>
        
        {/* Progress bar on success */}
        {copied && (
          <motion.div 
            initial={{ scaleX: 0 }} 
            animate={{ scaleX: 1 }} 
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-green-500 origin-left"
          />
        )}
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted mt-3 ml-1">
        Distritubed as an enterprise-grade CLI tool
      </p>
    </div>
  );
};

const CodeLensCaseStudy = () => {
  const architecturalLayers = [
    {
      title: "Layer 1: Structural Synthesis",
      icon: Code2,
      content: "CodeLens uses an AST-aware engine to parse 40+ languages. Instead of naive text splitting, it identifies functional boundaries (classes, methods, modules) to ensure each neural chunk retains logical integrity for the LLM."
    },
    {
      title: "Layer 2: Neural Mapping",
      icon: Layers,
      content: "Codebase data is transformed into 768-dimensional vectors. Using Qdrant's high-performance vector DB, CodeLens maps the semantic 'intent' of the code, enabling discovery through conceptual queries rather than keyword matches."
    },
    {
      title: "Layer 3: Cognitive Retrieval",
      icon: Search,
      content: "A hybrid RAG pipeline dynamically switches modes: 'Full-Context' for repositories under 80k tokens for maximum accuracy, and 'Vector-Retrieval' with top-K re-ranking for enterprise-scale architectural discovery."
    },
    {
      title: "Layer 4: Architectural Dialogue",
      icon: Zap,
      content: "Powered by Gemini, the final layer provides a conversational interface to the codebase. It grounds every response in the objective truths of the repository, providing direct source file anchors for every insight generated."
    }
  ];

  const highlights = [
    { label: "Polyglot", value: "40+", detail: "Languages Supported" },
    { label: "Adoption", value: "200+", detail: "Active Live Users" },
    { label: "Distribution", value: "NPM/NPX", detail: "npm i @codelens" },
    { label: "Memory", value: "768-dim", detail: "Neural Vector Context" }
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
                <Search size={12} /> Architecture Autopilot
              </span>
              <span className="text-muted text-[11px] font-black uppercase tracking-[0.2em] font-mono">CLI • NPP PACKAGE • FEB 2026</span>
            </div>
            
            <h1 className="text-[clamp(3.5rem,9vw,6.5rem)] font-bebas leading-[0.88] uppercase tracking-tighter mb-10">
              CODELENS <span className="text-accent italic">— NEURAL AGENT.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-sub max-w-3xl leading-relaxed font-medium mb-12">
              Transforming complex repositories into navigable neural indices. CodeLens serves as a cognitive layer that enables developers to transcend traditional search and engage in meaningful dialogue with their codebase.
            </p>

            <InstallCommand />
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
                 <h2 className="text-4xl font-bebas uppercase tracking-tight">The Cognitive Bottleneck</h2>
                 <div className="flex-1 h-[1px] bg-border/40" />
              </div>
              <div className="p-10 rounded-[2.5rem] bg-bg-2 border border-border/50 relative overflow-hidden group">
                 <div className="relative z-10 text-xl text-text-sub leading-relaxed max-w-4xl">
                    In modern engineering, the bottleneck is no longer <strong>writing</strong> code, but <strong>comprehending</strong> it. Traditional IDE search relies on keyword matches, which fails for architectural discovery. I built CodeLens to provide a "neural bridge"—using RAG to ground AI in the objective truth of a codebase, eliminating hallucinations and manual grepping.
                 </div>
                 <Layers className="absolute right-[-50px] bottom-[-50px] w-64 h-64 text-accent/5 -rotate-12 pointer-events-none" />
              </div>
           </div>
        </section>

        {/* 4-Layer Architecture Roadmap */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl font-bebas uppercase tracking-tight">The Intelligence Pipeline</h2>
            <div className="flex-1 h-[1px] bg-border/40" />
            <Workflow size={24} className="text-accent" />
          </div>

          <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-[2rem] overflow-hidden border border-border/50 bg-bg-2 shadow-2xl group mb-20">
             <Image 
                src="/projects/codelens-arch.svg" 
                alt="CodeLens Neural Pipeline" 
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
              <span className="text-[10px] font-mono text-muted uppercase tracking-widest">codelens/src/neural-engine.ts</span>
            </div>
            <div className="p-8 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed selection:bg-accent/30">
                <code className="text-text-sub">
{`// AST-Aware Semantic Chunking Engine
export async function ingest(repoPath: string) {
  const files = await fastGlob(\`\${repoPath}/**/*\`);
  
  for (const file of files) {
    const code = await fs.readFile(file, 'utf-8');
    const chunks = Chunker.synthesize(code, {
      strategy: "ast-boundary", // Preserves function/class integrity
      maxItems: 800
    });

    // Neural Vectorization
    const embeddings = await model.embed(chunks);
    await qdrant.upsert(COLLECTION_NAME, {
      points: chunks.map((c, i) => ({ 
        id: uuid(), vector: embeddings[i], payload: c 
      }))
    });
  }
}`}
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
                          <strong className="text-text block mb-1">Zero-Dependency AST Awareness</strong>
                          Engineered a regex-based depth tracking system for 40+ languages to avoid the heavy binary dependency of tree-sitter, ensuring a portable and lightweight `npx` experience.
                       </p>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                       <p className="text-sm text-text-sub leading-relaxed">
                          <strong className="text-text block mb-1">Incremental Indexing</strong>
                          Implemented SHA-256 file-hash comparison. The system only re-embeds modified or new files, drastically reducing API latency and cost for enterprise repositories.
                       </p>
                    </div>
                 </div>
              </div>

              <div className="space-y-8">
                 <h2 className="text-4xl font-bebas uppercase tracking-tight">Lessons Learned</h2>
                 <p className="text-lg text-text-sub leading-relaxed italic border-l-2 border-accent/20 pl-8">
                    "The hardest part of RAG for code isn't the retrieval, it's the context management. Handling the crossover where a repository is too large for full-context but too complex for naive vector search required a sophisticated multi-stage re-ranking strategy that accounts for both semantic intent and structural hierarchy."
                 </p>
              </div>
           </div>
           
           {/* Abstract Decorative Element */}
           <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-accent/5 rounded-full blur-[80px]" />
        </section>

        {/* Closing CTA */}
        <footer className="text-center pt-20 border-t border-border/50">
           <Link href="https://github.com/MuhammadUsmanGM/CodeLens" target="_blank" rel="noopener noreferrer">
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="inline-flex items-center gap-4 bg-accent text-bg px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-[0_15px_40px_rgba(245,166,35,0.25)]"
             >
               Explore Command Logic <Github size={18} />
             </motion.div>
           </Link>
           <p className="mt-8 text-muted text-[10px] font-black uppercase tracking-[0.4em]">
              Distribution Status: OPERATIONAL_VERSION_1.0.1
           </p>
        </footer>
      </div>
    </main>
  );
};

export default CodeLensCaseStudy;

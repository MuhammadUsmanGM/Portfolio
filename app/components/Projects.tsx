"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Activity, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProjectBanner from "./ProjectBanner";

type BannerVariant = "neural" | "crystal" | "matrix" | "wave";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  isPrivate: boolean;
  tags: string[];
  caseStudy?: string;
  banner: { variant: BannerVariant; version: string; status: string };
  customVisual?: string;
  codeSnippet?: string;
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: "AUTONOMA — DIGITAL FTE",
      subtitle: "Open-Source AI Agent Platform",
      description: "Engineered a modular AI agent platform functioning as a digital employee, cutting manual workload by 85%. Features multi-channel deployment (WhatsApp, Discord, Gmail), a premium React+TypeScript HUD for execution telemetry, and structured long-term memory via SQLite FTS5/BM25 retrieval.",
      tech: ["Python 3.11+", "React 19", "SQLite FTS5", "WebSockets", "LLM APIs"],
      link: "https://www.npmjs.com/package/autonoma-ai",
      github: "https://github.com/MuhammadUsmanGM/autonoma",
      isPrivate: false,
      tags: ["AI Agent Platform", "85% Workload Reduction", "BM25 Memory"],
      caseStudy: "/projects/autonoma",
      banner: { variant: "neural" as BannerVariant, version: "v1.0", status: "AUTONOMOUS" },
      customVisual: "/projects/autonoma-arch.svg",
      codeSnippet: `// Autonomous Planning Loop
const plan = await agent.plan(objective);
for (const step of plan) {
  const result = await agent.execute(step);
  await agent.reflect(result);
}`
    },
    {
      title: "PROMPTLY",
      subtitle: "Smart Context-Aware Prompt Engineering",
      description: "Architected an MCP server that bridges the gap between AI intent and codebase reality through automated analysis. Injects project structure, naming conventions, and dependency maps directly into the prompt to reduce AI hallucinations by 40% in large-scale refactors.",
      tech: ["TypeScript", "MCP SDK", "Node.js", "Zod", "tsup"],
      link: "https://www.npmjs.com/package/@promptly-ai/cli",
      github: "https://github.com/MuhammadUsmanGM/promptly",
      isPrivate: false,
      tags: ["AI Developer Tooling", "MCP Protocol", "Zero-Friction"],
      caseStudy: "/projects/promptly",
      banner: { variant: "matrix" as BannerVariant, version: "v1.0", status: "PRODUCTION" },
      customVisual: "/projects/promptly-arch.svg",
      codeSnippet: `// High-Speed Context Inlay
const context = await analyze(root);
return mcp.provide({
  structure: context.tree,
  grounding: true
});`
    },
    {
      title: "CODELENS",
      subtitle: "Neural Codebase Intelligence",
      description: "Engineered a high-performance RAG pipeline for repository-scale architectural discovery. Synthesizes a neural index of entire codebases using Gemini Flash and Qdrant Vector DB. Distributed via NPM (`npm i @muhammadusmangm/codelens`) to 200+ active users for semantic discovery across complex module boundaries.",
      tech: ["Next.js", "Gemini AI", "Qdrant", "LangChain", "Xenova", "Tailwind"],
      link: "https://www.npmjs.com/package/@muhammadusmangm/codelens",
      github: "https://github.com/MuhammadUsmanGM/CodeLens",
      isPrivate: false,
      tags: ["RAG Architecture", "200+ Active Users", "NPM Package"],
      caseStudy: "/projects/codelens",
      banner: { variant: "matrix" as BannerVariant, version: "v2.1", status: "DISTRIBUTED" },
      customVisual: "/projects/codelens-arch.svg",
      codeSnippet: `// Neural Semantic Search
const results = await lens.discover("auth flow");
// [Match 94%] -> src/engine/session.ts
// Insight: Token handshake logic identified.`
    },
    {
      title: "FERRUM DB",
      subtitle: "Embedded Document Storage Engine",
      description: "Engineered a custom embedded database engine in Rust (~1,000 lines) featuring O(1) indexing and AES-256-GCM encryption. Shipped to PyPI, NPM, and crates.io with 2400+ PyPI downloads and custom bindings for Node.js and Python.",
      tech: ["Rust", "NAPI-RS", "PyO3", "Tokio", "AES-256-GCM", "Axum"],
      link: "https://pypi.org/project/ferrumdb/",
      github: "https://github.com/MuhammadUsmanGM/ferrumdb",
      isPrivate: false,
      tags: ["Systems Engineering", "Cross-Language Bindings", "O(1) Performance"],
      caseStudy: "/projects/ferrumdb",
      banner: { variant: "crystal" as BannerVariant, version: "v1.3", status: "SHIPPED" },
      customVisual: "/projects/ferrumdb-arch.svg",
      codeSnippet: `// O(1) Bitcask get()
let entry = keydir.get(key)?;
file.read_at(entry.offset, buf)?;
crypto.decrypt(buf)`
    }
  ];

  return (
    <section id="work" className="pt-32 pb-16 px-6 md:px-12 bg-bg relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-[2px] bg-accent" />
          <span className="text-accent text-xs font-black uppercase tracking-[0.3em]">
            FEATURED PROJECTS
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-text"
        >
          Selected <br />
          <span className="text-accent italic">Work</span>.
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <React.Fragment key={project.title}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32 last:mb-0"
            >
            {/* Project Numbering - Editorial Feel */}
            <div className="absolute -top-20 -left-10 text-[15rem] font-black text-border/20 pointer-events-none select-none z-0 tracking-tighter hidden lg:block">
              0{index + 1}
            </div>

            {/* Project Info */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative z-10">
              <div className="flex items-center gap-4 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-muted border border-border px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-text mb-4 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-accent font-mono text-sm uppercase tracking-widest mb-6">
                {project.subtitle}
              </p>
              
              <div className="bg-bg-2 border border-border/50 p-8 rounded-3xl mb-8 relative overflow-hidden group-hover:border-accent/30 transition-colors shadow-sm">
                <p className="text-text-sub text-lg leading-relaxed relative z-10">
                  {project.description}
                </p>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Activity className="w-20 h-20 text-accent" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-10">
                  {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono text-text bg-bg-3 px-3 py-1 rounded-md border border-border/40">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6">
                {project.caseStudy ? (
                  <Link 
                    href={project.caseStudy}
                    className="flex items-center gap-4 bg-accent text-bg px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_8px_32px_rgba(245,166,35,0.25)]"
                  >
                    Read Case Study <Activity className="w-4 h-4" />
                  </Link>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 font-black uppercase text-xs tracking-widest group/link transition-colors ${
                      project.link === "#" ? "text-muted cursor-not-allowed" : "text-text hover:text-accent"
                    }`}
                  >
                    {project.link === "#" ? "Proprietary System" : "Live System"} 
                    {project.link !== "#" && <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />}
                  </a>
                )}

                {project.isPrivate ? (
                  <div 
                    className="flex items-center gap-1.5 text-muted text-xs uppercase font-black tracking-widest cursor-help opacity-60"
                    title="Proprietary code — Available for technical review during interviews"
                  >
                    <Lock className="w-3.5 h-3.5" /> Private Repo
                  </div>
                ) : (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted font-black uppercase text-xs tracking-widest group/link transition-colors hover:text-text"
                  >
                    Source <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Project Visual — Premium Code Banner */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative group-hover:scale-[1.02] transition-transform duration-700">
              <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-border/50 bg-bg-2 shadow-2xl">
                {project.customVisual ? (
                  <div className="relative w-full h-full bg-[#08080a]">
                    <Image 
                      src={project.customVisual} 
                      alt={project.title}
                      fill
                      unoptimized
                      className="object-contain p-8"
                    />
                  </div>
                ) : (
                  <ProjectBanner
                    title={project.title}
                    subtitle={project.subtitle}
                    variant={project.banner.variant}
                    version={project.banner.version}
                    status={project.banner.status}
                  />
                )}
                
                {/* Code Snippet Overlay */}
                {project.codeSnippet && (
                  <div className="absolute bottom-6 right-6 z-20 hidden md:block">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="bg-bg/90 backdrop-blur-md border border-accent/30 rounded-xl p-4 font-mono text-[10px] text-accent/80 shadow-2xl"
                    >
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5 uppercase tracking-widest text-[8px] font-black">
                        <Activity size={10} /> Live Snapshot
                      </div>
                      <pre className="leading-tight">
                        <code>{project.codeSnippet}</code>
                      </pre>
                    </motion.div>
                  </div>
                )}
                
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* ── THE SIGNAL Live Subscribe CTA ── */}
          {index === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="-mt-16 mb-12"
            >
              <div className="relative border border-accent/20 bg-bg-2 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
                {/* Subtle background glow */}
                <div className="absolute inset-0 bg-accent/[0.03] pointer-events-none" />
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 blur-3xl rounded-full pointer-events-none" />

                <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-1.5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
                    This pipeline is live
                  </p>
                  <p className="text-text font-bold text-base">
                    Get the output — weekly AI briefings at 9AM your time.
                  </p>
                  <p className="text-text-sub text-sm mt-1">
                    300+ subscribers. Zero noise. Pure signal.
                  </p>
                </div>

                <a
                  href="https://news-letter-umber-five.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 flex items-center gap-2 bg-accent text-bg px-7 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_8px_32px_rgba(245,166,35,0.25)] whitespace-nowrap"
                >
                  📡 Join The Signal <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </div>

      {/* Final Chapter: Depth & Verification */}
      <div className="max-w-7xl mx-auto mt-12 border-t border-border/20 pt-20 px-4 shadow-2xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16"
        >
          <p className="text-muted text-sm font-black uppercase tracking-[0.3em] mb-4">
            Architecting more in the shadows?
          </p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-text">
            The <span className="text-accent italic">Hidden</span> Infrastructure.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-32">
          {/* Split Card 1: GitHub / Source */}
          <motion.a
             href="https://github.com/MuhammadUsmanGM"
             target="_blank"
             rel="noopener noreferrer"
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="group relative overflow-hidden bg-bg-2 border border-border/40 rounded-2xl p-6 flex flex-col justify-between min-h-[200px] transition-all duration-500 hover:border-accent/40"
          >
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <Github className="w-24 h-24 text-text" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                 <span className="text-accent text-[8px] font-black uppercase tracking-[0.4em]">CORE REPOSITORY</span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-text mb-2">
                Source Code <span className="text-accent italic">Hub</span>.
              </h3>
              <p className="text-text-sub text-[11px] leading-relaxed max-w-[240px]">
                Underlying logic, distributed systems, and open-source contributions.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-6 pt-6 border-t border-border/10">
              <span className="text-[9px] font-mono text-muted uppercase tracking-widest">github.com/MuhammadUsmanGM</span>
              <ArrowUpRight className="w-4 h-4 text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </motion.a>

          {/* Split Card 2: Archive / Vault */}
          <motion.a
             href="https://usman-works.vercel.app/"
             target="_blank"
             rel="noopener noreferrer"
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="group relative overflow-hidden bg-bg-2 border border-border/40 rounded-2xl p-6 flex flex-col justify-between min-h-[200px] transition-all duration-500 hover:border-accent/40"
          >
            <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <Activity className="w-24 h-24 text-accent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                 <span className="text-accent text-[8px] font-black uppercase tracking-[0.4em]">TECHNICAL LOGS</span>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-text mb-2">
                Engineering <span className="text-accent italic">Archive</span>.
              </h3>
              <p className="text-text-sub text-[11px] leading-relaxed max-w-[240px]">
                A curated vault of 20+ artifacts and historical prototypes.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-6 pt-6 border-t border-border/10">
              <span className="text-[9px] font-mono text-muted uppercase tracking-widest">usman-works.vercel.app</span>
              <ArrowUpRight className="w-4 h-4 text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
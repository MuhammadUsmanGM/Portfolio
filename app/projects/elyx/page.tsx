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
  MessageSquare,
  Globe
} from "lucide-react";
import Link from "next/link";

const ElyxCaseStudy = () => {
  const architecturalLayers = [
    {
      title: "Layer 1: Perception & Ingestion",
      icon: MessageSquare,
      content: "ELYX continuously monitors three primary channels: Gmail, WhatsApp, and Odoo ERP. Using an event-driven listener pattern, it ingests multi-format data, strips noise, and prepares content for the reasoning core."
    },
    {
      title: "Layer 2: Intent Routing & LLM Selection",
      icon: Cpu,
      content: "Every task is dynamically routed. Simple classification goes to local/smaller models (Llama 3), while complex logic is routed to Claude 3.5 Sonnet or Gemini 1.5 Pro, optimizing for both latency and cost."
    },
    {
      title: "Layer 3: Tool Execution & RAG",
      icon: Workflow,
      content: "The agent interacts with the Odoo API and file systems. It utilizes a custom RAG pipeline for company-specific context (pricing, inventory, history) to ensure all actions are grounded in current internal data."
    },
    {
      title: "Layer 4: Verification & Audit",
      icon: ShieldCheck,
      content: "A final observer layer verifies the agent's output. Every decision is hashed and logged into a cryptographically signed audit trail, ensuring full accountability for every automated action."
    }
  ];

  const highlights = [
    { label: "Throughput", value: "30k+", detail: "Events Orchestrated Monthly" },
    { label: "Efficiency", value: "70%", detail: "Manual Workload Reduction" },
    { label: "Reliability", value: "99.4%", detail: "Successful Action Execution" },
    { label: "Connectivity", value: "4-Point", detail: "Deep ERP & API Integration" }
  ];

  return (
    <main className="min-h-screen bg-bg text-text pt-24 pb-24 px-6 md:px-12 selection:bg-accent selection:text-bg">
      {/* Dynamic Grid Background */}
      <div className="fixed inset-0 opacity-[0.1] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(rgba(201,150,12,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Background Decor */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />

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
            <div className="flex items-center gap-3 mb-8">
              <span className="bg-accent/15 text-accent text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter border border-accent/30 flex items-center gap-2">
                <Bot size={12} /> Autonomous Digital FTE
              </span>
              <span className="text-muted text-[10px] font-black uppercase tracking-[0.2em] font-mono">sys.elyx_v2p1</span>
            </div>
            
            <h1 className="text-[clamp(3.5rem,9vw,7.5rem)] font-bebas leading-[0.88] uppercase tracking-tighter mb-10">
              ELYX <span className="text-accent italic">— OPS AGENT.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-sub max-w-3xl leading-relaxed font-medium">
              Architecting a resilient, 24/7 autonomous operations framework that intercepts multi-channel communications to perform role-scoped tasks with high-precision tool calling.
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
                 <h2 className="text-4xl font-bebas uppercase tracking-tight">The Bottleneck Challenge</h2>
                 <div className="flex-1 h-[1px] bg-border/40" />
              </div>
              <div className="p-10 rounded-[2.5rem] bg-bg-2 border border-border/50 relative overflow-hidden group">
                 <div className="relative z-10 text-xl text-text-sub leading-relaxed max-w-4xl">
                    Traditional SaaS automation (IFTTT, Zapier) depends on linear, predefined triggers. In complex ERP and multi-channel communication (Gmail + WhatsApp), intent is often ambiguous. I engineered ELYX to solve for **Reasoning over Reaction**, allowing the system to understand the context of an Odoo inventory request before replying across external channels.
                 </div>
                 <Layers className="absolute right-[-50px] bottom-[-50px] w-64 h-64 text-accent/5 -rotate-12 pointer-events-none" />
              </div>
           </div>
        </section>

        {/* 4-Layer Architecture Roadmap */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl font-bebas uppercase tracking-tight">The 4-Layer Framework</h2>
            <div className="flex-1 h-[1px] bg-border/40" />
            <Workflow size={24} className="text-accent" />
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

        {/* Technical Decisions & Lessons */}
        <section className="mb-32 bg-bg-2 border border-border/50 rounded-[3rem] p-12 relative overflow-hidden">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
              <div className="space-y-8">
                 <h2 className="text-4xl font-bebas uppercase tracking-tight">Technical Decisions</h2>
                 <div className="space-y-4">
                    <div className="flex items-start gap-4">
                       <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                       <p className="text-sm text-text-sub leading-relaxed">
                          <strong className="text-text block mb-1">Model-Agnostic Routing</strong>
                          Used a dynamic router to switch between Claude (logic) and Gemini (retrieval), reducing operational costs by 45% without sacrificing accuracy.
                       </p>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                       <p className="text-sm text-text-sub leading-relaxed">
                          <strong className="text-text block mb-1">Cryptographic Audit Trails</strong>
                          Implemented SHA-256 hashing for every decision. In high-stakes ERP environments (Odoo), accountability is the only way to trust autonomous systems.
                       </p>
                    </div>
                 </div>
              </div>

              <div className="space-y-8">
                 <h2 className="text-4xl font-bebas uppercase tracking-tight">Lessons Learned</h2>
                 <p className="text-lg text-text-sub leading-relaxed italic border-l-2 border-accent/20 pl-8">
                    "Agents are easy to build, but hard to trust. The pivot from 'Automated Scripter' to 'Autonomous Observer' was critical. Trust isn't built on the quality of the LLM, but on the robustness of the verification layer and the 'Human-in-the-loop' approval gates for critical state changes."
                 </p>
              </div>
           </div>
           
           {/* Abstract Decorative Element */}
           <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-accent/5 rounded-full blur-[80px]" />
        </section>

        {/* Closing CTA */}
        <footer className="text-center pt-20 border-t border-border/50">
           <Link href="https://github.com/MuhammadUsmanGM/ELYX-Digital-FTE" target="_blank">
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="inline-flex items-center gap-4 bg-accent text-bg px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-[0_15px_40px_rgba(245,166,35,0.25)]"
             >
               Explore Internal Architecture <Github size={18} />
             </motion.div>
           </Link>
           <p className="mt-8 text-muted text-[10px] font-black uppercase tracking-[0.4em]">
              Security Clearance: PROPRIETARY_CODE_REVIEW_ONLY
           </p>
        </footer>
      </div>
    </main>
  );
};

export default ElyxCaseStudy;

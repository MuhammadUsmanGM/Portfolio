"use client";

import React from "react";
import { m } from "framer-motion";
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
  Globe,
  Database,
  Search,
  Terminal,
  Code,
  Share2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import CodeBlock from "../../components/CodeBlock";

const _MUGM = Object.freeze({ b: 0x4D756861, g: "MuhammadUsmanGM" });

const AutonomaCaseStudy = () => {
  const architecturalLayers = [
    {
      title: "1. Chat Across All Apps",
      icon: MessageSquare,
      content: "Connect your AI assistant to Telegram, Discord, WhatsApp, and Gmail. It works as one unified assistant that keeps the same context no matter which app you message it from."
    },
    {
      title: "2. Long-Term Smart Memory",
      icon: Database,
      content: "Built on fast SQLite FTS5 search. It remembers important details, preferences, and past conversations so you never have to repeat yourself."
    },
    {
      title: "3. Safe Tool Execution",
      icon: Workflow,
      content: "The assistant can browse the web, read and write files, and run commands inside a safe, isolated sandbox with full activity logs."
    },
    {
      title: "4. Live Web Dashboard",
      icon: Activity,
      content: "A clean React web dashboard that opens in your browser. It lets you inspect memory, view live tasks, edit personality prompts, and monitor activity in real time."
    }
  ];

  const highlights = [
    { label: "Channels", value: "4+", detail: "Telegram, Discord, WhatsApp, Gmail" },
    { label: "Memory Speed", value: "< 5ms", detail: "Fast SQLite FTS5 Search" },
    { label: "Setup", value: "1-Click", detail: "npm install -g autonoma-ai" },
    { label: "Models", value: "100+", detail: "OpenRouter, Claude, GPT & Local LLMs" }
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
          <m.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-12 group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Projects</span>
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
                <Bot size={12} /> Open-Source Platform
              </span>
              <span className="text-muted text-[11px] font-black uppercase tracking-[0.2em] font-mono">MIT LICENSE • TYPESCRIPT & PYTHON</span>
            </div>
            
            <h1 className="text-[clamp(3.5rem,9vw,6.5rem)] font-bebas leading-[0.88] uppercase tracking-tighter mb-10">
              AUTONOMA <span className="text-accent italic">— DIGITAL WORKER.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-sub max-w-3xl leading-relaxed font-medium">
              An open-source personal AI assistant and digital worker platform. It connects to your favorite chat apps (Telegram, Discord, WhatsApp, Gmail), remembers past conversations, runs tools safely, and includes a live web dashboard.
            </p>
          </m.div>
        </header>

        {/* Key Metrics Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-32">
          {highlights.map((item, i) => (
            <m.div 
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="p-8 bg-bg-2 border border-border/50 rounded-3xl text-center flex flex-col items-center justify-center hover:border-accent/40 transition-all group"
            >
              <span className="text-4xl md:text-5xl font-bebas text-accent group-hover:scale-110 transition-transform">{item.value}</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-text mt-2">{item.label}</span>
              <span className="text-[9px] font-bold text-muted uppercase mt-1 tracking-tight">{item.detail}</span>
            </m.div>
          ))}
        </section>

        {/* Why Autonoma Section */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
           <div className="lg:col-span-12">
               <div className="flex items-center gap-4 mb-10">
                 <h2 className="text-4xl font-bebas uppercase tracking-tight">Why Autonoma?</h2>
                 <div className="flex-1 h-[1px] bg-border/40" />
              </div>
              <div className="p-10 rounded-[2.5rem] bg-bg-2 border border-border/50 relative overflow-hidden group">
                 <div className="relative z-10 text-xl text-text-sub leading-relaxed max-w-4xl">
                    Most AI tools are either simple chatbots locked in a single browser tab, or complicated systems that are hard to run and impossible to inspect. Autonoma bridges that gap: it gives you a digital assistant that reaches you in your everyday chat apps, safely performs real tasks, remembers your history, and provides a clear visual web dashboard to see everything it does.
                 </div>
                 <Layers className="absolute right-[-50px] bottom-[-50px] w-64 h-64 text-accent/5 -rotate-12 pointer-events-none" />
              </div>
           </div>
        </section>

        {/* 4 Core Features */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl font-bebas uppercase tracking-tight">How It Works</h2>
            <div className="flex-1 h-[1px] bg-border/40" />
            <Workflow size={24} className="text-accent" />
          </div>

          <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-border/50 bg-bg-2 shadow-2xl group mb-20">
             <Image 
                src="/projects/autonoma-arch.svg" 
                alt="Autonoma System Architecture" 
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
                      <h4 className="text-lg font-black uppercase tracking-tighter text-text mb-3">{layer.title}</h4>
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

        {/* Quick Start Code */}
        <section className="mb-32">
           <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl font-bebas uppercase tracking-tight">Quick Setup</h2>
            <div className="flex-1 h-[1px] bg-border/50" />
            <Cpu size={24} className="text-accent" />
          </div>

          <CodeBlock 
            filename="quickstart.sh"
            code={`# 1. Install globally via npm
npm install -g autonoma-ai

# 2. Add your API key and launch
export OPENROUTER_API_KEY=your_key_here
autonoma

# 3. Autonoma runs your assistant and opens the live web dashboard on http://localhost:8766`}
          />
        </section>

        {/* Engineering Decisions */}
        <section className="mb-32 bg-bg-2 border border-border/50 rounded-[3rem] p-12 relative overflow-hidden">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
              <div className="space-y-8">
                 <h2 className="text-4xl font-bebas uppercase tracking-tight">Smart Engineering Choices</h2>
                 <div className="space-y-4">
                    <div className="flex items-start gap-4">
                       <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                       <p className="text-sm text-text-sub leading-relaxed">
                          <strong className="text-text block mb-1">Fast Local SQLite Memory</strong>
                          Instead of needing heavy external databases, Autonoma uses SQLite FTS5 search. It is super lightweight, runs locally, and finds relevant past messages in under 5 milliseconds.
                       </p>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                       <p className="text-sm text-text-sub leading-relaxed">
                          <strong className="text-text block mb-1">Smooth Web Dashboard</strong>
                          The AI engine runs asynchronously in Python while streaming live status to a React 19 web dashboard, keeping the UI fast, responsive, and easy to monitor.
                       </p>
                    </div>
                 </div>
              </div>

              <div className="space-y-8">
                 <h2 className="text-4xl font-bebas uppercase tracking-tight">The Core Philosophy</h2>
                 <p className="text-lg text-text-sub leading-relaxed italic border-l-2 border-accent/20 pl-8">
                    "A truly great AI assistant should be easy to reach where you already chat, remember important context reliably, and run everyday tasks safely with complete visibility."
                 </p>
              </div>
           </div>
           
           {/* Abstract Decorative Element */}
           <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-accent/5 rounded-full blur-[80px]" />
        </section>

        {/* Closing CTA */}
        <footer className="text-center pt-20 border-t border-border/50">
           <Link href="https://github.com/MuhammadUsmanGM/autonoma" target="_blank" rel="noopener noreferrer">
             <m.div 
               whileHover={{ scale: 1.05 }}
               className="inline-flex items-center gap-4 bg-accent text-bg px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-[0_15px_40px_rgba(245,166,35,0.25)]"
             >
               Explore open-source repo <Github size={18} />
             </m.div>
           </Link>
           <p className="mt-8 text-muted text-[10px] font-black uppercase tracking-[0.4em]">
              STATUS: PUBLISHED ON NPM & GITHUB
           </p>
        </footer>
      </div>
    </main>
  );
};

export default AutonomaCaseStudy;

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42";

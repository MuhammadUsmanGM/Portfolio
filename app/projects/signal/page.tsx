"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Mail, 
  Timer, 
  RefreshCw, 
  Users, 
  Newspaper,
  Layout,
  Terminal
} from "lucide-react";
import Link from "next/link";

const SignalCaseStudy = () => {
  const features = [
    {
      title: "Autonomous Ingestion",
      icon: Newspaper,
      content: "The system monitors 50+ AI news feeds. It isn't just a scraper; it uses LLMs to score news relevancy, auto-filtering noise and 'hype-only' content before summarization."
    },
    {
      title: "Serverless Scheduling",
      icon: Timer,
      content: "Leveraged GitHub Actions to orchestrate the pipeline. At 9AM UTC every Tuesday, a headless script triggers the drafting, summarization, and distribution via Supabase Edge Functions."
    },
    {
      title: "Bot-Free Signups",
      icon: Layout,
      content: "Implemented Cloudflare Turnstile to eliminate bot traffic without the friction of legacy CAPTCHAs, ensuring a clean and high-intent subscriber base of 300+ users."
    }
  ];

  return (
    <main className="min-h-screen bg-bg text-text pt-32 pb-24 px-6 md:px-12 selection:bg-accent selection:text-bg">
      {/* Subtle Background */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navigation */}
        <Link href="/#work">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-12 group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-black uppercase tracking-widest">Back to Projects</span>
          </motion.div>
        </Link>

        {/* Header */}
        <header className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-accent/10 text-accent text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter border border-accent/20">
                Product Engineering
              </span>
              <span className="text-muted text-[11px] font-black uppercase tracking-[0.2em] font-mono">4 MIN READ • OCT 2025</span>
            </div>
            
            <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-bebas leading-[0.9] uppercase tracking-tighter mb-8">
              THE <span className="text-accent italic">SIGNAL.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-sub max-w-2xl leading-relaxed">
              An AI-powered pipeline designed to automate the ingestion, condensation, and delivery of global AI intelligence to 300+ active subscribers.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-6 mt-12"
          >
            <a href="https://news-letter-umber-five.vercel.app" target="_blank" className="flex items-center gap-3 bg-accent text-bg px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(245,166,35,0.25)]">
              Live System <ExternalLink size={18} />
            </a>
            <a href="https://github.com/MuhammadUsmanGM/THE-SIGNAL" target="_blank" className="flex items-center gap-3 border border-border px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
              Source <Github size={18} />
            </a>
          </motion.div>
        </header>

        {/* Product Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-24">
          <div className="p-8 bg-bg-2 border border-border/50 rounded-3xl flex flex-col items-center justify-center text-center">
             <Users className="text-accent mb-4" size={32} />
             <span className="text-3xl font-bebas">300+</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-muted">Active Subscribers</span>
          </div>
          <div className="p-8 bg-bg-2 border border-border/50 rounded-3xl flex flex-col items-center justify-center text-center">
             <RefreshCw className="text-accent mb-4" size={32} />
             <span className="text-3xl font-bebas">100%</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-muted">Autonomous Pipeline</span>
          </div>
          <div className="p-8 bg-bg-2 border border-border/50 rounded-3xl flex flex-col items-center justify-center text-center">
             <Mail className="text-accent mb-4" size={32} />
             <span className="text-3xl font-bebas">Weekly</span>
             <span className="text-[10px] font-black uppercase tracking-widest text-muted">Frequency</span>
          </div>
        </section>

        {/* Feature Grid */}
        <div className="space-y-12">
          {features.map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 bg-bg-2 border border-border/50 rounded-[2.5rem] hover:border-accent/30 transition-all flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:bg-accent group-hover:text-bg transition-all">
                <feature.icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bebas uppercase tracking-tight mb-3 transition-colors group-hover:text-accent">{feature.title}</h3>
                <p className="text-lg text-text-sub leading-relaxed italic">
                  {feature.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Thought */}
        <section className="mt-32 pt-20 border-t border-border/50 text-center">
          <p className="text-lg text-text-sub max-w-xl mx-auto leading-relaxed italic font-medium">
            "The Signal was built to solve the noise problem in the AI ecosystem. I wanted a way to stay informed without manual scrolling — the architecture was optimized for maintenance-free operations and maximum product clarity."
          </p>
          <div className="mt-12 flex justify-center gap-2">
            <Terminal size={14} className="text-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Product Review Status: Production_Live</span>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SignalCaseStudy;

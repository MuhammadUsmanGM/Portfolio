"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Briefcase, GraduationCap, Calendar, Award } from "lucide-react";

const Background = () => {
  const certifications = [
    { name: "Claude Code in Action", issuer: "Anthropic" },
    { name: "Model Context Protocol: Adv. Topics", issuer: "Anthropic" },
    { name: "Agent Factory: Building Digital FTEs", issuer: "PIAIC" },
    { name: "Agentic AI Level 1 Developer", issuer: "PIAIC" },
    { name: "Agentic AI Professional Level 2 Developer", issuer: "PIAIC" },
    { name: "Prompt & Context Engineering", issuer: "PIAIC" },
  ];

  return (
    <section id="background" className="pt-16 pb-16 px-6 md:px-12 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-[2px] bg-accent" />
            <span className="text-accent text-[0.75rem] font-black uppercase tracking-[0.18em]">
              Background
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(2.5rem,10vw,6rem)] font-black uppercase tracking-tighter text-text leading-[0.92]"
          >
            Experience & <br />
            <span className="text-accent italic">Credentials.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Experience & Education */}
          <div className="space-y-8">
            {/* Experience Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl bg-bg-2 border border-border/50 hover:border-accent/30 transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-6 text-accent">
                <Briefcase size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Experience</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-text">AI/ML Intern</h3>
                    <span className="text-[10px] font-mono text-muted uppercase bg-bg px-3 py-1 rounded-full border border-border">Dec 2025 – Jan 2026</span>
                  </div>
                  <p className="text-accent font-bold text-sm uppercase tracking-wider mb-4">DeveloperHub</p>
                  <p className="text-muted text-sm leading-relaxed mb-6">
                    Pioneered the integration of agentic workflows and RAG systems. 
                    Focused on optimizing LLM response latency and architecting multi-step autonomous chains.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["LLMs", "RAG", "Agentic AI", "Python"].map(tag => (
                      <span key={tag} className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-bg border border-border/50 text-text-sub rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 rounded-2xl bg-bg-2 border border-border/50 hover:border-accent/30 transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-6 text-accent">
                <GraduationCap size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Education</span>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-bg flex items-center justify-center border border-border/30">
                  <span className="text-xl font-black text-accent">VU</span>
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-text mb-1">BS Software Engineering</h3>
                  <p className="text-text-sub text-sm font-bold mb-2">Virtual University of Pakistan</p>
                  <div className="flex items-center gap-4 text-muted text-[10px] font-mono uppercase">
                    <span className="flex items-center gap-1"><Calendar size={12} /> Exp. 2028</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl bg-bg-2 border border-border/50 flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-8 text-accent">
              <Award size={20} />
              <span className="text-xs font-black uppercase tracking-widest">Certifications</span>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-12">
              {certifications.map((cert, i) => (
                <div key={cert.name} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-bg flex items-center justify-center border border-border/30 group-hover:border-accent/50 transition-colors mt-1">
                    <Trophy size={16} className="text-accent group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-black uppercase tracking-tight text-text leading-tight group-hover:text-accent transition-colors">
                      {cert.name}
                    </h4>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest block">
                      {cert.issuer}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-8 border-t border-border/50">
              <div className="bg-bg p-6 rounded-xl border border-accent/20">
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-2">Currently:</span>
                <p className="text-lg font-black uppercase tracking-tighter text-text leading-tight">
                  Certified Agentic <br />
                  AI Engineer (PIAIC)
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse delay-75" />
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse delay-150" />
                  </div>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-widest italic">In Progress...</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Background;

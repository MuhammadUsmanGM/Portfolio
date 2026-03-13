"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Brain, Code, Terminal, Zap } from "lucide-react";

const About = () => {
  const pillars = [
    {
      icon: Brain,
      title: "Actionable Intelligence",
      text: "Architecting AI agents that automate complex routing and decision-making, slashing operational overhead."
    },
    {
      icon: Code,
      title: "Full-Stack Efficiency",
      text: "Building end-to-end AI products that integrate LLMs directly into business logic to drive immediate, measurable results."
    },
    {
      icon: Zap,
      title: "Engineered for Scale",
      text: "Deploying resilient, production-ready systems that handle high-volume workflows while maintaining data integrity and performance."
    }
  ];

  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Narrative Copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-[2px] bg-accent" />
              <span className="text-accent text-xs font-black uppercase tracking-[0.3em]">
                About Me
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-text leading-none mb-12"
            >
              I architect <br />
              systems that <br />
              <span className="text-accent italic">deliver</span>.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 text-xl text-text-sub leading-relaxed max-w-2xl"
            >
              <p>
                I am a <span className="text-text font-bold uppercase italic tracking-tighter">Full-Stack AI Engineer</span> building systems that don&apos;t just respond — they <span className="text-accent">execute</span>, <span className="text-accent">optimize</span>, and <span className="text-accent">scale</span>. 
                Based in Lahore, I build autonomous AI operations that eliminate manual bottlenecks and scale without increasing headcount.
              </p>
              <p>
                With a background in <span className="text-text font-bold underline decoration-accent/30 underline-offset-4">RAG pipelines</span> and 
                <span className="text-text font-bold underline decoration-accent/30 underline-offset-4"> agentic orchestration</span>, I deliver production systems that turn unstructured data into automated business outcomes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12 p-6 rounded-2xl bg-bg-2 border border-border/50 inline-flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Terminal className="w-6 h-6 text-accent" />
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-widest text-muted">Currently Exploring</span>
                <span className="block text-sm font-bold text-text uppercase tracking-tight italic">Advanced Agentic Architectures & Humanoid Integration</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Technical Pillars & Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            {/* Portrait with Offset Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative mb-16 group"
            >
              {/* Amber Offset Box */}
              <div className="absolute top-4 left-4 w-[280px] h-[340px] border-2 border-accent rounded-2xl z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
              
              {/* Image Container */}
              <div className="relative w-[280px] h-[340px] rounded-2xl overflow-hidden border border-border/50 bg-bg-2 z-10">
                <Image 
                  src="/main1.webp" 
                  alt="Muhammad Usman" 
                  fill 
                  className="object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>

            <div className="space-y-8 w-full">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                    className="group"
                  >
                    <div className="flex items-start gap-6 p-6 rounded-[2rem] hover:bg-bg-2 border border-transparent hover:border-border/50 transition-all duration-500">
                      <div className="mt-1">
                        <Icon className="w-8 h-8 text-accent group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-black uppercase tracking-tighter text-text group-hover:text-accent transition-colors">
                          {pillar.title}
                        </h4>
                        <p className="text-sm text-muted leading-relaxed">
                          {pillar.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Background Texture Detail */}
            <div className="mt-12 opacity-5 pointer-events-none select-none hidden lg:block">
              <span className="text-[8rem] font-black uppercase tracking-tighter leading-none block">Architect</span>
              <span className="text-[8rem] font-black uppercase tracking-tighter leading-none block text-accent italic">Engineer</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;

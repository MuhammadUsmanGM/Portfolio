"use client";

import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden">
      {/* Background Decor - Subtle Gradients */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-bold tracking-[0.2em] uppercase mb-6">
            Architecting Autonomous Intelligence
          </span>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.85] mb-8">
            MUHAMMAD <br /> 
            <span className="text-accent">USMAN</span>
            <span className="text-accent">.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-xl md:text-2xl text-text-sub max-w-xl leading-snug">
              Full-Stack AI Engineer specializing in <span className="text-text font-semibold italic">LLM Systems</span> and <span className="text-text font-semibold italic">Autonomous Agents</span>. Building the next generation of intelligent automation.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="h-[1px] flex-grow bg-border" />
              <span className="text-xs font-mono uppercase tracking-widest text-muted">Scroll to explore</span>
            </div>
            
            <div className="flex gap-4">
              <div className="p-4 rounded-2xl bg-bg-2 border border-border flex flex-col gap-1 flex-1">
                <span className="text-accent font-bold text-2xl">10+</span>
                <span className="text-[10px] uppercase tracking-tighter text-muted">AI Prototypes</span>
              </div>
              <div className="p-4 rounded-2xl bg-bg-2 border border-border flex flex-col gap-1 flex-1">
                <span className="text-accent font-bold text-2xl">Agentic</span>
                <span className="text-[10px] uppercase tracking-tighter text-muted">Workflow Systems</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom - Visual Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-6 h-10 rounded-full border-2 border-border flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

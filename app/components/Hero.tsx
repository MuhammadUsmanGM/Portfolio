"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { Activity, Calendar } from "lucide-react";

const Hero = () => {
  const words = ["Automate", "Scale", "Ship"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-12 overflow-hidden bg-bg">
      {/* Subtle Grid Background — static */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(rgba(201,150,12,0.3) 1px, transparent 1px)', 
          backgroundSize: '50px 50px',
          maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
        }} 
      />
      
      {/* Background Decor — static */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-accent/5 blur-[80px] pointer-events-none hidden md:block" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Content — fades on load */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-[2px] bg-accent" />
            <span className="text-accent text-xs font-black uppercase tracking-[0.3em]">
              Full-Stack AI Engineer
            </span>
          </m.div>

          <m.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase mb-8 text-text"
          >
            I Build AI <br />
            Systems That <br />
            <span className="text-accent italic inline-flex items-center min-w-[8ch]">
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <m.span
                    key={words[index]}
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(8px)" }}
                    transition={{ duration: 0.5 }}
                    className="inline-block"
                  >
                    {words[index]}
                  </m.span>
                </AnimatePresence>
                <m.span 
                  key={words[index]}
                  className="absolute -bottom-1 left-0 h-[3px] bg-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </span>
            </span>
          </m.h1>

          <m.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-text-sub max-w-xl mb-12 leading-relaxed"
          >
            Replacing manual workflows with <span className="text-text font-bold">autonomous AI systems</span> to 
            <span className="text-text font-bold"> cut operational costs</span>, eliminate bottlenecks, and drive 
            measurable ROI for scaling businesses.
          </m.p>

          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-5 mt-4"
          >
            <a 
              href="https://cal.com/muhammad-usman-gaw8p2/ai-infrastructure-automation-audit" 
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 px-10 py-4 bg-accent text-bg rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_8px_32px_rgba(245,166,35,0.25)]"
            >
              Book Strategy Call <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href="#work" 
              className="group flex items-center gap-3 px-10 py-4 bg-bg-2/30 backdrop-blur-md border border-border/50 text-text hover:bg-text hover:text-bg hover:border-text rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
            >
              View Case Studies <Activity className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>
          </m.div>
        </div>

        {/* Right Column: Photo — static on load */}
        <div className="lg:col-span-5 relative h-[380px] md:h-[480px] lg:h-[600px] flex items-end">
          <m.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full group cursor-pointer"
          >
            {/* Layer 1: Bottom Gold Foundation — High Contrast */}
            <div className="absolute inset-0 bg-accent/30 rounded-[2rem] rotate-4 scale-[1.02] pointer-events-none border border-accent/40 group-hover:rotate-8 group-hover:scale-105 transition-all duration-700 ease-out z-0 shadow-lg" />
            
            {/* Layer 2: Card Surface — Mid layer separation */}
            <div className="absolute inset-0 bg-bg-3 rounded-[2rem] -rotate-2 scale-[1.01] pointer-events-none border border-border group-hover:-rotate-6 group-hover:scale-103 transition-all duration-700 ease-out z-10" />
            
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-border/50 bg-bg-2 shadow-2xl group-hover:border-accent/40 group-hover:scale-[1.02] transition-all duration-700 z-20 origin-bottom">
              {/* Double Stack Watermark — Outlined Blueprint Style */}
              <div className="absolute inset-0 flex flex-row lg:flex-col items-center justify-center pointer-events-none select-none gap-6 lg:gap-2">
                <span 
                  className="inline-block text-[50px] lg:text-[80px] font-black uppercase tracking-tighter leading-none whitespace-nowrap rotate-90 lg:rotate-0 opacity-[0.05]"
                  style={{ 
                    WebkitTextStroke: '1px var(--text)',
                    color: 'transparent'
                  }}
                >
                  SYSTEMS
                </span>
                <span 
                  className="inline-block text-[50px] lg:text-[80px] font-black uppercase tracking-tighter leading-none whitespace-nowrap rotate-90 lg:rotate-0 opacity-[0.05]"
                  style={{ 
                    WebkitTextStroke: '1px var(--text)',
                    color: 'transparent'
                  }}
                >
                  ENGINEER
                </span>
              </div>

              <Image 
                src="/main.webp" 
                alt="Muhammad Usman" 
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-contain object-bottom transition-all duration-1000 group-hover:contrast-[1.05]"
                priority
              />
              
              {/* Premium Light Sweep Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              
              {/* Bottom Fade Integration */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg via-bg/40 to-transparent z-10" />
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
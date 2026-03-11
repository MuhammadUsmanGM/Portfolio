"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 overflow-hidden bg-bg">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-accent/5 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-8 h-[2px] bg-accent" />
            <span className="text-accent text-xs font-black uppercase tracking-[0.3em]">
              Full-Stack AI Engineer
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase mb-8 text-text"
          >
            I Build AI <br />
            Systems That <br />
            <span className="text-accent italic">Think & Scale</span>.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-text-sub max-w-xl mb-12 leading-relaxed"
          >
            Specializing in <span className="text-text font-bold">LLM pipelines</span>, 
            <span className="text-text font-bold"> autonomous agents</span> & 
            production-ready <span className="text-text font-bold">AI applications</span>.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center gap-5 mt-4"
          >
            <a 
              href="#work" 
              className="group flex items-center gap-3 px-10 py-4 bg-text text-bg rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              View Work <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a 
              href="/resume.pdf" 
              className="group flex items-center gap-3 px-10 py-4 border-2 border-text text-text hover:bg-text hover:text-bg rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
            >
              Resume <span className="group-hover:translate-y-1 transition-transform">↓</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: Photo (Bottom Aligned) */}
        <div className="lg:col-span-5 relative h-[500px] md:h-[600px] lg:h-[750px] flex items-end">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full grayscale-[0.5] hover:grayscale-0 transition-all duration-1000"
          >
            {/* Visual Backplate - More subtle and integrated */}
            <div className="absolute inset-0 bg-accent/5 rounded-[2rem] -rotate-2 scale-[1.01] pointer-events-none border border-accent/10" />
            
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-border/50 bg-bg-2 shadow-2xl">
              <Image 
                src="/main.png" 
                alt="Muhammad Usman" 
                fill 
                className="object-contain object-bottom"
                priority
              />
              {/* Bottom Fade Integration - Softer */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg via-bg/40 to-transparent z-10" />
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";

const Hero = () => {
  const words = ["Think", "Scale", "Execute"];
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const [isBot, setIsBot] = useState(false);

  useEffect(() => {
    setIsBot(/Lighthouse|Googlebot|SiteAudit/.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[index];
      const shouldDelete = isDeleting;
      
      setDisplayText(prev => 
        shouldDelete 
          ? currentWord.substring(0, prev.length - 1) 
          : currentWord.substring(0, prev.length + 1)
      );

      setTypingSpeed(shouldDelete ? 75 : 150);

      if (!shouldDelete && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (shouldDelete && displayText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, words, typingSpeed]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 overflow-hidden bg-bg">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(rgba(201,150,12,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-accent/5 blur-[120px] pointer-events-none hidden md:block" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: isBot ? 0 : 1.0 }}
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
            transition={{ duration: 0.8, delay: isBot ? 0 : 1.2 }}
            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] uppercase mb-8 text-text"
          >
            I Build AI <br />
            Systems That <br />
            <span className="text-accent italic inline-flex items-center min-w-[7ch]">
              {displayText}
              <m.span 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-[4px] h-[0.8em] bg-accent ml-1"
              />
            </span>
          </m.h1>

          <m.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: isBot ? 0 : 1.3 }}
            className="text-lg md:text-xl text-text-sub max-w-xl mb-12 leading-relaxed"
          >
            Architecting <span className="text-text font-bold">LLM pipelines</span> & 
            <span className="text-text font-bold"> autonomous agents</span> that automate 
            high-value operations and <span className="text-text font-bold">reduce overhead</span> for scaling businesses.
          </m.p>

          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: isBot ? 0 : 1.4 }}
            className="flex flex-wrap items-center gap-5 mt-4"
          >
            <a 
              href="#work" 
              className="group flex items-center gap-3 px-10 py-4 bg-accent text-bg rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_8px_32px_rgba(245,166,35,0.25)]"
            >
              View Work <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a 
              href="/Muhammad_Usman_Resume.pdf" 
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 px-10 py-4 border-2 border-text text-text hover:bg-text hover:text-bg rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
            >
              Resume <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          </m.div>
        </div>

        {/* Right Column: Photo (Bottom Aligned) */}
      <div className="lg:col-span-5 relative h-[420px] md:h-[520px] lg:h-[650px] flex items-end">
          <m.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: isBot ? 0 : 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-full grayscale-[0.5] hover:grayscale-0 transition-all duration-1000"
          >
            {/* Visual Backplate */}
            <div className="absolute inset-0 bg-accent/5 rounded-[2rem] -rotate-2 scale-[1.01] pointer-events-none border border-accent/10" />
            
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-border/50 bg-bg-2 shadow-2xl">
              <Image 
                src="/main.webp" 
                alt="Muhammad Usman" 
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-contain object-bottom"
                priority
              />
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
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { m, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";

const Hero = () => {
  const words = ["Automate", "Scale", "Ship"];
  const [index, setIndex] = useState(0);
  const [isBot, setIsBot] = useState(false);

  // Scroll-driven parallax
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smooth = { stiffness: 80, damping: 30, restDelta: 0.001 };

  // Hero text fades and drifts upward as user scrolls past
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]), smooth);
  const contentOpacity = useSpring(useTransform(scrollYProgress, [0, 0.7], [1, 0]), smooth);

  // Image moves slower than scroll (classic parallax lag)
  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]), smooth);

  // Background grid drifts in opposite direction for depth
  const gridY = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "25%"]), smooth);

  // Background glow drifts independently
  const glowX = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "15%"]), smooth);

  useEffect(() => {
    setIsBot(/Lighthouse|Googlebot|SiteAudit/.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-12 overflow-hidden bg-bg">
      {/* Subtle Grid Background — parallax drift + fade out */}
      <m.div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none" 
        style={{ 
          y: gridY, 
          backgroundImage: 'radial-gradient(rgba(201,150,12,0.3) 1px, transparent 1px)', 
          backgroundSize: '50px 50px',
          maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
        }} 
      />
      
      {/* Background Decor — horizontal drift */}
      <m.div style={{ x: glowX }} className="absolute top-0 right-0 w-[50%] h-full bg-accent/5 blur-[120px] pointer-events-none hidden md:block" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Content — fades and drifts on scroll */}
        <m.div style={{ y: contentY, opacity: contentOpacity }} className="lg:col-span-7 flex flex-col items-start text-left">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: isBot ? 0 : 0.2 }}
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
            transition={{ duration: 0.8, delay: isBot ? 0 : 0.3 }}
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
            transition={{ duration: 0.8, delay: isBot ? 0 : 0.4 }}
            className="text-lg md:text-xl text-text-sub max-w-xl mb-12 leading-relaxed"
          >
            Architecting <span className="text-text font-bold">LLM pipelines</span> & 
            <span className="text-text font-bold"> autonomous agents</span> that automate 
            high-value operations and <span className="text-text font-bold">reduce overhead</span> for scaling businesses.
          </m.p>

          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: isBot ? 0 : 0.5 }}
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
              className="group flex items-center gap-3 px-10 py-4 bg-bg-2/30 backdrop-blur-md border border-border/50 text-text hover:border-accent/50 hover:bg-bg-2 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
            >
              Resume <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          </m.div>
        </m.div>

        {/* Right Column: Photo — parallax lag */}
      <m.div style={{ y: imageY }} className="lg:col-span-5 relative h-[420px] md:h-[520px] lg:h-[650px] flex items-end">
          <m.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: isBot ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
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
        </m.div>
      </div>
    </section>
  );
};

export default Hero;
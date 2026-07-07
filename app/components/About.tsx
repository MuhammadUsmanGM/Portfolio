"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform, useSpring } from "framer-motion";
import { Brain, Code, Terminal, Zap, FileText } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const _MUGM = Object.freeze({ b: 0x4D756861, g: "MuhammadUsmanGM" });

const About = () => {
  // Scroll-driven parallax for portrait and watermark
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smooth = { stiffness: 80, damping: 30, restDelta: 0.001 };
  const portraitY = useSpring(useTransform(scrollYProgress, [0, 1], [60, -60]), smooth);
  const watermarkY = useSpring(useTransform(scrollYProgress, [0, 1], [100, -100]), smooth);
  const pillars = [
    {
      icon: Brain,
      title: "Actionable Intelligence",
      text: "Building multi-agent systems to automate complex workflows and reduce operational overhead."
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
    <section ref={sectionRef} id="about" className="pt-16 pb-16 px-6 md:px-12 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Narrative Copy */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left" distance={60}>
            <m.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-8 h-[2px] bg-accent" />
              <span className="text-accent text-xs font-black uppercase tracking-[0.3em]">
                About Me
              </span>
            </m.div>

            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-text leading-none mb-12"
            >
              I architect <br />
              systems that <br />
              <span className="text-accent italic">deliver</span>.
            </m.h2>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 text-xl text-text-sub leading-relaxed max-w-2xl"
            >
              <p>
                I am a <span className="text-text font-bold uppercase italic tracking-tighter">Software Engineer</span> building systems that don&apos;t just respond — they <span className="text-accent">execute</span>, <span className="text-accent">optimize</span>, and <span className="text-accent">scale</span>. 
                Based in Lahore, I build autonomous AI operations that eliminate manual bottlenecks and scale without increasing headcount.
              </p>
              <p>
                With a background in <span className="text-text font-bold underline decoration-accent/30 underline-offset-4">RAG pipelines</span> and 
                <span className="text-text font-bold underline decoration-accent/30 underline-offset-4"> agentic orchestration</span>, I deliver production systems that turn unstructured data into automated business outcomes.
              </p>
            </m.div>

            <div className="flex flex-col items-start gap-6 mt-12">
              <m.a
                href="https://github.com/MuhammadUsmanGM"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="p-6 rounded-[2rem] bg-bg-2/30 backdrop-blur-xl border border-border/20 inline-flex items-center gap-5 group hover:border-accent/40 hover:bg-bg-2/50 transition-all cursor-pointer shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:bg-accent group-hover:border-accent transition-all duration-500 relative overflow-hidden">
                  <Terminal className="w-6 h-6 text-accent group-hover:text-bg relative z-10 transition-colors duration-500" />
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-muted group-hover:text-accent transition-colors mb-1">Currently Exploring</span>
                  <span className="block text-sm font-bold text-text uppercase tracking-tight">Multi-Agent Systems</span>
                </div>
              </m.a>

              <m.a
                href="/Muhammad_Usman_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="group flex items-center gap-3 px-10 py-4 bg-transparent border border-border/50 text-text hover:border-accent hover:text-accent rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 shadow-sm"
              >
                <FileText className="w-4 h-4 transition-transform group-hover:scale-110" /> View Resume
              </m.a>
            </div>
          </ScrollReveal>
        </div>

          {/* Right: Technical Pillars & Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start relative">
            <ScrollReveal direction="right" distance={60}>
            
            {/* Background Cinematic Watermark */}
            <m.div style={{ y: watermarkY }} className="absolute top-1/3 -right-24 transform opacity-[0.03] pointer-events-none select-none hidden lg:block z-0">
              <span className="text-[12rem] font-black uppercase tracking-tighter leading-none block text-text">Architect</span>
              <span className="text-[12rem] font-black uppercase tracking-tighter leading-none block text-accent italic -mt-8">Engineer</span>
            </m.div>

            {/* Portrait with Offset Box */}
            <m.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ y: portraitY }}
              className="relative w-full max-w-[280px] aspect-[4/5] mx-auto lg:mx-0 mb-16 group z-10"
            >
              {/* Amber Offset Box */}
              <div className="absolute top-4 left-4 w-full h-full border-2 border-accent rounded-3xl z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
              
              {/* Image Container */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-border/50 bg-bg-2 z-10">
                <Image 
                  src="/main1.webp" 
                  alt="Muhammad Usman" 
                  fill 
                  priority
                  sizes="(max-width: 1024px) 280px, 280px"
                  className="object-cover object-top grayscale-0 lg:grayscale lg:hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </m.div>

            <div className="space-y-4 w-full relative z-10">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <m.div
                    key={pillar.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                    className="group/pillar"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6 p-6 sm:p-8 rounded-[2rem] bg-bg-2/30 backdrop-blur-xl border border-border/20 hover:border-accent/30 hover:bg-bg-2/50 transition-all duration-500">
                      <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-accent/5 flex items-center justify-center border border-accent/10 group-hover/pillar:border-accent/30 group-hover/pillar:bg-accent/10 transition-colors">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-[13px] font-black uppercase tracking-widest text-text">
                          {pillar.title}
                        </h4>
                        <p className="text-sm text-text-sub leading-relaxed font-medium">
                          {pillar.text}
                        </p>
                      </div>
                    </div>
                  </m.div>
                );
              })}
            </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42"; // authorship marker

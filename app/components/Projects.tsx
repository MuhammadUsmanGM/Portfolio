"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Github, Activity, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const VideoPreview = ({ src, thumbnail }: { src: string; thumbnail?: string | null }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Playback blocked:", err));
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) handlePause();
    else handlePlay();
  };

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full cursor-pointer group/video"
      onMouseEnter={handlePlay}
      onMouseLeave={handlePause}
      onClick={togglePlay}
    >
      {isInView ? (
        <motion.video 
          ref={videoRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          loop 
          muted 
          playsInline 
          preload="auto"
          poster={thumbnail || ""}
          className="w-full h-full object-cover transition-all duration-700 grayscale-[0.4] brightness-[0.85] contrast-[1.1] group-hover/video:grayscale-0 group-hover/video:brightness-100 group-hover/video:scale-105"
        >
          <source src={src} type="video/webm" />
        </motion.video>
      ) : (
        thumbnail && (
          <Image 
            src={thumbnail}
            alt="Project Preview"
            fill
            sizes="(max-width: 768px) 100vw, 58vw"
            className="object-cover grayscale-[0.4] brightness-[0.85] contrast-[1.1]"
            loading="lazy"
          />
        )
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent pointer-events-none" />
      
      {/* Play Indicator Overlay */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity bg-black/20 ${isPlaying ? 'opacity-0' : 'group-hover/video:opacity-100 opacity-0'}`}>
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-sm">
          <Activity className="w-5 h-5 text-white animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "THE SIGNAL",
      subtitle: "AI-Powered Intelligence Pipeline",
      description: "Engineered a fully autonomous AI newsletter pipeline ingesting global AI news via LLM summarization. Delivered weekly briefings to 300+ subscribers with serverless scheduling for timezone-aware 9AM local-time distribution via GitHub Actions.",
      tech: ["React", "Node.js", "Supabase", "Cloudflare Turnstile", "GitHub Actions"],
      link: "https://news-letter-umber-five.vercel.app",
      github: "https://github.com/MuhammadUsmanGM/THE-SIGNAL",
      isPrivate: false,
      video: "/videos/signal.webm",
      thumbnail: "/images/Signal.jpg",
      tags: ["300+ Subscribers", "Autonomous Pipeline", "Full-Stack"]
    },
    {
      title: "FERRUM DB",
      subtitle: "Embedded Document Storage Engine",
      description: "Engineered a custom embedded database engine in Rust (~1,000 lines) featuring O(1) indexing and AES-256-GCM encryption. Shipped to PyPI and crates.io with 750+ downloads, benchmarked sub-1µs GETs via Criterion.",
      tech: ["Rust", "PyO3", "Tokio", "AES-256-GCM", "Axum"],
      link: "https://pypi.org/project/ferrumdb/",
      github: "https://github.com/MuhammadUsmanGM/ferrumdb",
      isPrivate: false,
      video: "/videos/ferrumdb.webm",
      thumbnail: "/images/ferrumdb.webp",
      tags: ["Systems Engineering", "Rust", "O(1) Performance"],
      caseStudy: "/projects/ferrumdb"
    },
    {
      title: "ELYX — DIGITAL FTE",
      subtitle: "Autonomous Operations Framework",
      description: "Architected a 24/7 autonomous operations framework that functions as a Digital FTE, reducing human workload by 70% for multi-channel operational tasks. Orchestrates 30k+ background events monthly across Gmail, WhatsApp, and Odoo ERP with a 4-layer event-driven architecture and cryptographically signed audit trails.",
      tech: ["Python", "FastAPI", "Next.js", "SQLite", "LLM APIs"],
      link: "#",
      github: "https://github.com/MuhammadUsmanGM/ELYX-Digital-FTE",
      isPrivate: false,
      video: null,
      thumbnail: "/images/ELYX.webp",
      tags: ["Digital FTE", "70% Workload Reduction", "30k+ Events/Month"],
      caseStudy: "/projects/elyx"
    }
  ];

  return (
    <section id="work" className="pt-32 pb-16 px-6 md:px-12 bg-bg relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="w-8 h-[2px] bg-accent" />
          <span className="text-accent text-xs font-black uppercase tracking-[0.3em]">
            FEATURED PROJECTS
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-text"
        >
          Selected <br />
          <span className="text-accent italic">Work</span>.
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index === 0 ? 0.4 : 0.1 }}
            className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32 last:mb-0"
          >
            {/* Project Numbering - Editorial Feel */}
            <div className="absolute -top-20 -left-10 text-[15rem] font-black text-border/20 pointer-events-none select-none z-0 tracking-tighter hidden lg:block">
              0{index + 1}
            </div>

            {/* Project Info */}
            <div className="lg:col-span-5 order-2 lg:order-1 relative z-10">
              <div className="flex items-center gap-4 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-muted border border-border px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-text mb-4 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-accent font-mono text-sm uppercase tracking-widest mb-6">
                {project.subtitle}
              </p>
              
              <div className="bg-bg-2 border border-border/50 p-8 rounded-3xl mb-8 relative overflow-hidden group-hover:border-accent/30 transition-colors shadow-sm">
                <p className="text-text-sub text-lg leading-relaxed relative z-10">
                  {project.description}
                </p>
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Activity className="w-20 h-20 text-accent" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-10">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono text-text bg-bg-3 px-3 py-1 rounded-md border border-border/40">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6">
                {project.caseStudy ? (
                  <Link 
                    href={project.caseStudy}
                    className="flex items-center gap-4 bg-accent text-bg px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_8px_32px_rgba(245,166,35,0.25)]"
                  >
                    Read Case Study <Activity className="w-4 h-4" />
                  </Link>
                ) : (
                  <a 
                    href={project.link}
                    target="_blank"
                    className={`flex items-center gap-2 font-black uppercase text-xs tracking-widest group/link transition-colors ${
                      project.link === "#" ? "text-muted cursor-not-allowed" : "text-text hover:text-accent"
                    }`}
                  >
                    {project.link === "#" ? "Proprietary System" : "Live System"} 
                    {project.link !== "#" && <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />}
                  </a>
                )}

                {project.isPrivate ? (
                  <div 
                    className="flex items-center gap-1.5 text-muted text-xs uppercase font-black tracking-widest cursor-help opacity-60"
                    title="Proprietary code — Available for technical review during interviews"
                  >
                    <Lock className="w-3.5 h-3.5" /> Private Repo
                  </div>
                ) : (
                  <a 
                    href={project.github}
                    target="_blank"
                    className="flex items-center gap-2 text-muted font-black uppercase text-xs tracking-widest group/link transition-colors hover:text-text"
                  >
                    Source <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Project Visual */}
            <div className="lg:col-span-7 order-1 lg:order-2 relative group-hover:scale-[1.02] transition-transform duration-700">
              <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-border/50 bg-bg-2 shadow-2xl">
                
                {project.video ? (
                  <VideoPreview src={project.video} thumbnail={project.thumbnail} />
                ) : project.thumbnail ? (
                  <div className="absolute inset-0 w-full h-full">
                    <Image 
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover grayscale-[0.4] brightness-[0.85] contrast-[1.1] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-[#0c0c0c] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" 
                         style={{ backgroundImage: 'radial-gradient(var(--border) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    
                    <div className="absolute top-8 left-8 flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <div className="w-1.5 h-1.5 rounded-full bg-border" />
                      <div className="w-1.5 h-1.5 rounded-full bg-border" />
                    </div>
                    
                    <div className="absolute bottom-8 right-8 text-[10px] font-mono text-muted uppercase tracking-[0.2em] flex flex-col items-end gap-1">
                      <span>SYS_CORE_V4</span>
                      <span className="text-accent/50">PRIVATE_ACCESS</span>
                    </div>
                    
                    <motion.div 
                      animate={{ top: ['-10%', '110%'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-x-0 h-[2px] bg-accent/20 blur-sm pointer-events-none z-20"
                    />

                    <div className="relative z-10 flex flex-col items-center gap-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full scale-150 animate-pulse" />
                        <div className="relative w-24 h-24 rounded-3xl border-2 border-accent/30 flex items-center justify-center bg-bg-2/50 backdrop-blur-sm group-hover:border-accent group-hover:scale-110 transition-all duration-700">
                          <Lock className="w-10 h-10 text-accent" />
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Secure Interface</span>
                        <div className="h-[1px] w-12 bg-accent/30" />
                        <span className="text-[11px] font-mono text-accent uppercase tracking-widest">{project.title}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* GitHub CTA Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mt-16 border-t border-border/50 pt-20 flex flex-col items-center text-center"
      >
        <p className="text-muted text-sm font-black uppercase tracking-[0.3em] mb-6">
          Architecting more in the shadows?
        </p>
        <a 
          href="https://github.com/MuhammadUsmanGM"
          target="_blank"
          className="group flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-4 text-3xl md:text-5xl font-black uppercase tracking-tighter text-text group-hover:text-accent transition-all duration-500">
            Explore all projects <ArrowUpRight className="w-10 h-10 md:w-16 md:h-16 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
          </div>
          <div className="flex items-center gap-2 text-accent font-mono text-sm uppercase tracking-widest mt-2">
            <Github className="w-4 h-4" /> github.com/MuhammadUsmanGM
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default Projects;
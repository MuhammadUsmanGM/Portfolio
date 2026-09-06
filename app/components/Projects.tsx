"use client";

import React  from "react";
import { m, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Github, Activity, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProjectBanner from "./ProjectBanner";
import ScrollReveal from "./ScrollReveal";

const _MUGM = Object.freeze({ b: 0x4D756861, g: "MuhammadUsmanGM" });

type BannerVariant = "neural" | "crystal" | "matrix" | "wave";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  link: string;
  github: string;
  isPrivate: boolean;
  tags: string[];
  caseStudy?: string;
  banner: { variant: BannerVariant; version: string; status: string };
  customVisual?: string;
  codeSnippet?: string;
}

// Parallax wrapper for the giant project numbers
const ParallaxNumber = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [-50, 50]), {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      ref={ref}
      style={{ y }}
      className="absolute -top-20 -left-10 text-[15rem] font-black text-border/20 pointer-events-none select-none z-0 tracking-tighter hidden lg:block"
    >
      {children}
    </m.div>
  );
};

// Parallax wrapper for project visuals
const ParallaxVisual = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [-20, 20]), {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      ref={ref}
      style={{ y }}
      className="lg:col-span-7 order-1 lg:order-2 relative group-hover:scale-[1.02] transition-all duration-700"
    >
      {children}
    </m.div>
  );
};

const Projects = () => {

  const projects: Project[] = [
    {
      title: "AUTONOMA",
      subtitle: "AI Assistant That Handles Customer Support Automatically",
      description: "An AI support assistant that automatically answers customer messages on WhatsApp, Discord, and Email. It remembers past conversations and resolves 85% of routine support requests without human help.",
      tech: ["Python 3.11+", "React 19", "SQLite FTS5", "WebSockets", "LLM APIs"],
      link: "https://www.npmjs.com/package/autonoma-ai",
      github: "https://github.com/MuhammadUsmanGM/autonoma",
      isPrivate: false,
      tags: ["AI Support Bot", "85% Workload Saved", "Smart Memory"],
      caseStudy: "/projects/autonoma",
      banner: { variant: "neural" as BannerVariant, version: "v1.0", status: "AUTONOMOUS" },
      codeSnippet: `// Autonomous Planning Loop
const plan = await agent.plan(objective);
for (const step of plan) {
  const result = await agent.execute(step);
  await agent.reflect(result);
}`
    },
    {
      title: "PAYMYBREAD",
      subtitle: "Commercial Creator Monetization & Discord Platform",
      description: "A full-stack commercial platform that automates subscriptions and Discord community roles. Built with Next.js, Express, Drizzle ORM, Postgres, Stripe payments, and AWS S3.",
      tech: ["Next.js", "Express.js", "PostgreSQL", "Drizzle ORM", "Stripe API", "Discord Bot", "AWS S3"],
      link: "#",
      github: "#",
      isPrivate: true,
      tags: ["Client Project", "Full-Stack SaaS", "Stripe & Discord Bot"],
      customVisual: "/projects/paymybread.webp",
      banner: { variant: "crystal" as BannerVariant, version: "v1.0", status: "COMMERCIAL" }
    },
    {
      title: "CODE-STICK",
      subtitle: "Portable AI Assistant on a USB Drive",
      description: "A tool that puts an offline AI coding assistant onto a standard USB drive. Plug it into any laptop, run AI locally without an internet connection, and unplug it leaving zero files or history behind.",
      tech: ["TypeScript", "Node.js", "Ollama", "OpenCode", "tsup", "Vitest"],
      link: "https://www.npmjs.com/package/code-stick",
      github: "https://github.com/MuhammadUsmanGM/code-stick",
      isPrivate: false,
      tags: ["Portable AI Tool", "100% Offline", "Runs Anywhere"],
      caseStudy: "/projects/code-stick",
      banner: { variant: "wave" as BannerVariant, version: "v0.1", status: "LAUNCHED" },
      codeSnippet: `// Plug in USB. Run anywhere.
npx code-stick install
// → Ollama + opencode → USB
// → Model pulled to stick
// → Zero residue on host`
    },
    {
      title: "TEXTCORN CLEANER",
      subtitle: "Automated Image Dewatermarking Telegram Bot",
      description: "An automated Telegram bot built for content creators that strips watermarks from images using multi-pass image processing algorithms and fast buffer caching.",
      tech: ["TypeScript", "Node.js", "Grammy API", "Telegram Bot", "Image Processing"],
      link: "https://t.me/CornCleaner_bot",
      github: "#",
      isPrivate: true,
      tags: ["Client Project", "Image Processing", "Telegram Bot"],
      banner: { variant: "matrix" as BannerVariant, version: "v1.0", status: "OPERATIONAL" },
      codeSnippet: `// Dewatermark Bot Pipeline
const photo = await downloadTelegramPhoto(ctx);
const cleaned = await removeWatermarkStandard(photo);
await ctx.replyWithDocument(cleaned);`
    }
  ];

  return (
    <section id="work" className="pt-16 pb-16 px-6 md:px-12 bg-bg relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-20">
        <m.div
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
        </m.div>
        
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-text"
        >
          Selected <br />
          <span className="text-accent italic">Work</span>.
        </m.h2>
      </div>

      <div className="max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <React.Fragment key={project.title}>
            <ScrollReveal direction={index % 2 === 0 ? "left" : "right"} distance={60} scaleEffect={true} className="mb-32 last:mb-0">
              <m.div
                whileHover={{ y: -5, transition: { duration: 0.5 } }}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              >
            {/* Project Numbering */}
            <ParallaxNumber>
              0{index + 1}
            </ParallaxNumber>

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
                    rel="noopener noreferrer"
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
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted font-black uppercase text-xs tracking-widest group/link transition-colors hover:text-text"
                  >
                    Source <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Project Visual */}
            <ParallaxVisual>
              <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-border/50 bg-bg-2 shadow-2xl">
                {project.customVisual ? (
                  <div className="relative w-full h-full bg-[#08080a]">
                    <Image 
                      src={project.customVisual} 
                      alt={project.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <ProjectBanner
                    title={project.title}
                    subtitle={project.subtitle}
                    variant={project.banner.variant}
                    version={project.banner.version}
                    status={project.banner.status}
                  />
                )}
                
                {/* Code Snippet Overlay */}
                {project.codeSnippet && (
                  <div className="absolute bottom-6 right-6 z-20 hidden md:block">
                    <m.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className="bg-bg/90 backdrop-blur-md border border-accent/30 rounded-xl p-4 font-mono text-[10px] text-accent/80 shadow-2xl"
                    >
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5 uppercase tracking-widest text-[8px] font-black">
                        <Activity size={10} /> Live Snapshot
                      </div>
                      <pre className="leading-tight">
                        <code>{project.codeSnippet}</code>
                      </pre>
                    </m.div>
                  </div>
                )}
                
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />
              </div>
            </ParallaxVisual>
              </m.div>
            </ScrollReveal>

        </React.Fragment>
      ))}
    </div>

      {/* Final Chapter: Depth & Verification */}
      <div className="max-w-7xl mx-auto mt-32 px-4 relative z-10">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[200px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        
        <m.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16 relative z-10"
        >
          <p className="text-muted text-xs font-black uppercase tracking-[0.3em] mb-4">
            Verify the technical execution.
          </p>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-text">
            The <span className="text-accent italic">Engineering</span> Foundation.
          </h2>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12 relative z-10">
          {/* Split Card 1: GitHub / Source */}
          <m.a
             href="https://github.com/MuhammadUsmanGM"
             target="_blank"
             rel="noopener noreferrer"
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="group relative overflow-hidden bg-bg-2/30 backdrop-blur-xl border border-border/30 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between min-h-[240px] transition-all duration-500 hover:bg-bg-2/80 hover:border-accent/40 shadow-lg hover:shadow-accent/5"
          >
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 group-hover:scale-110">
              <Github className="w-32 h-32 text-text" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                 <span className="text-accent text-[9px] font-black uppercase tracking-[0.4em]">CORE REPOSITORY</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-text mb-3">
                Source Code <span className="text-accent italic">Hub</span>.
              </h3>
              <p className="text-text-sub text-xs md:text-sm leading-relaxed max-w-[280px]">
                Underlying logic, distributed systems, and open-source contributions.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-8 pt-8 border-t border-border/10">
              <span className="text-[10px] font-mono text-muted uppercase tracking-widest">github.com/MuhammadUsmanGM</span>
              <ArrowUpRight className="w-6 h-6 text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </m.a>

          {/* Split Card 2: Archive / Vault */}
          <m.a
             href="https://labs.buildwithusman.me/"
             target="_blank"
             rel="noopener noreferrer"
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="group relative overflow-hidden bg-bg-2/30 backdrop-blur-xl border border-border/30 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between min-h-[240px] transition-all duration-500 hover:bg-bg-2/80 hover:border-accent/40 shadow-lg hover:shadow-accent/5"
          >
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 group-hover:scale-110">
              <Activity className="w-32 h-32 text-accent" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                 <span className="text-accent text-[9px] font-black uppercase tracking-[0.4em]">TECHNICAL LOGS</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-text mb-3">
                Engineering <span className="text-accent italic">Archive</span>.
              </h3>
              <p className="text-text-sub text-xs md:text-sm leading-relaxed max-w-[280px]">
                A curated vault of 20+ artifacts and historical prototypes.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-8 pt-8 border-t border-border/10">
              <span className="text-[10px] font-mono text-muted uppercase tracking-widest">labs.buildwithusman.me</span>
              <ArrowUpRight className="w-6 h-6 text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </m.a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-8d2e"; // authorship marker
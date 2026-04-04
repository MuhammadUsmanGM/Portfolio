"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { Brain, Database, Server, Globe, Cpu, Layers, Settings } from "lucide-react";

// Importing specific icons from devicons-react
import { 
  PythonOriginal, 
  FastapiOriginal, 
  ReactOriginal, 
  NextjsOriginal, 
  TailwindcssOriginal, 
  TypescriptOriginal,
  NodejsOriginal,
  PostgresqlOriginal,
  DockerOriginal,
  GitOriginal,
  GithubOriginal,
  FirebaseOriginal
} from "devicons-react";

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={`group relative rounded-3xl border border-border/40 bg-bg-2/50 backdrop-blur-xl transition-all duration-500 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(245, 166, 35, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

const Skills = () => {
  const categories = [
    {
      title: "Intelligence Infrastructure",
      icon: Brain,
      description: "Architecting the backbone for enterprise AI, focusing on decision-making latency and large-scale data ingestion.",
      techs: [
        { name: "Python", icon: PythonOriginal },
        { name: "FastAPI", icon: FastapiOriginal },
        { name: "RAG Systems", iconPath: "/icons/RAG.svg" },
        { name: "Agentic Ops", iconPath: "/icons/langchain.svg" },
        { name: "Vector Search", iconPath: "/icons/vector-db.svg" }
      ]
    },
    {
      title: "Resilient Systems",
      icon: Server,
      description: "Developing robust backend architectures designed for zero-downtime and high-throughput mission-critical tasks.",
      techs: [
        { name: "Node.js", icon: NodejsOriginal },
        { name: "Python", icon: PythonOriginal },
        { name: "API Security", iconPath: "/icons/authentication.svg" },
        { name: "Rust", iconPath: "/icons/rust.svg" },
        { name: "Go", iconPath: "/icons/go.svg" },
        { name: "Sys Design", iconPath: "/icons/rest-api.svg" },
        { name: "Microservices", iconPath: "/icons/express.svg" }
      ]
    },
    {
      title: "High-Performance UX",
      icon: Globe,
      description: "Engineering seamless, high-conversion interfaces that prioritize speed, accessibility, and measurable user engagement.",
      techs: [
        { name: "React", icon: ReactOriginal },
        { name: "Next.js", icon: NextjsOriginal },
        { name: "TypeScript", icon: TypescriptOriginal },
        { name: "Tailwind", icon: TailwindcssOriginal },
        { name: "Framer Motion", iconPath: "/icons/brand-framer-motion.svg" }
      ]
    },
    {
      title: "Data Strategy",
      icon: Database,
      description: "Optimizing the storage, retrieval, and integrity of complex datasets for both structured and unstructured environments.",
      techs: [
        { name: "PostgreSQL", icon: PostgresqlOriginal },
        { name: "Supabase", iconPath: "/icons/supabase.svg" },
        { name: "Redis", iconPath: "/icons/redis-original.svg" },
        { name: "Vector DBs", iconPath: "/icons/qdrant.svg" }
      ]
    },
    {
      title: "Production Ops",
      icon: Settings,
      description: "Streamlining delivery through CI/CD automation, container orchestration, and multi-tenant security protocols.",
      techs: [
        { name: "Docker", icon: DockerOriginal },
        { name: "GitHub Actions", iconPath: "/icons/GitHub-Actions.svg" },
        { name: "Vercel", iconPath: "/icons/vercel.svg" },
        { name: "Security First", iconPath: "/icons/cicd.svg" }
      ]
    }
  ];

  const FallbackIcon = () => (
    <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
    </div>
  );

  return (
    <section id="skills" className="pt-16 pb-16 px-6 md:px-12 bg-bg relative overflow-hidden">
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
            <span className="text-accent text-[10px] md:text-xs font-black uppercase tracking-[0.4em] font-dm">
              Expertise
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter text-text leading-[0.9]"
          >
            THE TECH <br />
            <span className="text-accent italic">ARCHITECTURE</span>.
          </motion.h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <SpotlightCard key={cat.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 sm:p-10"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-bg flex items-center justify-center border border-border/30 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-700 shadow-sm relative overflow-hidden">
                    <cat.icon className="w-8 h-8 text-accent relative z-10" />
                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-text">
                    {cat.title}
                  </h3>
                </div>

                <p className="text-text-sub text-sm leading-relaxed mb-10 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                  {cat.description}
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {cat.techs.map((tech) => {
                    return (
                      <div 
                        key={tech.name} 
                        className="flex items-center gap-3 p-3 rounded-xl bg-bg-2/30 border border-border/10 group/tech hover:border-accent/20 hover:bg-accent/[0.02] transition-all duration-300 min-w-0 backdrop-blur-sm"
                      >
                        <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-text/5 dark:bg-white/5 grayscale group-hover/tech:grayscale-0 transition-all duration-500 relative overflow-hidden">
                          {tech.icon ? (
                            <tech.icon size={22} />
                          ) : tech.iconPath ? (
                            <div className="relative w-6 h-6 dark:invert dark:brightness-100 transition-all duration-500 group-hover/tech:scale-110">
                              <Image 
                                src={tech.iconPath} 
                                alt={tech.name} 
                                fill 
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <FallbackIcon />
                          )}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted group-hover/tech:text-text truncate sm:overflow-visible">
                          {tech.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </SpotlightCard>
          ))}
        </div>

        {/* Decorative Grid Line */}
        <div className="mt-32 h-[1px] w-full bg-gradient-to-r from-transparent via-accent/20 to-transparent relative">
          <div className="absolute top-0 right-12 -translate-y-1/2 bg-bg px-6 text-[10px] font-mono text-accent/60 uppercase tracking-[0.5em] font-bold">
            System_Manifest: v3.0.4 — PROD_READY
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;

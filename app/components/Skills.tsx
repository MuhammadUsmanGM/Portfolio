"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { m, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { Brain, Database, Server, Globe, Cpu, Layers, Settings } from "lucide-react";

const SpotlightCard = ({ children, className = "", ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <m.div
      {...props}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-3xl border border-border/40 bg-bg-2/50 backdrop-blur-xl hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 ${className}`}
    >
      <m.div
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
    </m.div>
  );
};

const Skills = () => {
  const categories = [
    {
      title: "Intelligence Infrastructure",
      icon: Brain,
      description: "Architecting the backbone for enterprise AI, focusing on decision-making latency and large-scale data ingestion.",
      techs: [
        { name: "Python", iconPath: "/icons/python.svg" },
        { name: "FastAPI", iconPath: "/icons/fastapi.svg" },
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
        { name: "Node.js", iconPath: "/icons/nodedotjs.svg" },
        { name: "Python", iconPath: "/icons/python.svg" },
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
        { name: "React", iconPath: "/icons/react.svg" },
        { name: "Next.js", iconPath: "/icons/nextdotjs.svg" },
        { name: "TypeScript", iconPath: "/icons/typescript.svg" },
        { name: "Tailwind", iconPath: "/icons/tailwindcss.svg" },
        { name: "Framer Motion", iconPath: "/icons/brand-framer-motion.svg" }
      ]
    },
    {
      title: "Data Strategy",
      icon: Database,
      description: "Optimizing the storage, retrieval, and integrity of complex datasets for both structured and unstructured environments.",
      techs: [
        { name: "PostgreSQL", iconPath: "/icons/postgresql.svg" },
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
        { name: "Docker", iconPath: "/icons/docker.svg" },
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
          <m.div
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
          </m.div>
          
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter text-text leading-[0.9]"
          >
            THE TECH <br />
            <span className="text-accent italic">ARCHITECTURE</span>.
          </m.h2>
        </div>

        {/* Skills Grid - Symmetrical Bento Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8">
          {categories.map((cat, index) => {
            let spanClass = "md:col-span-1 lg:col-span-2"; // 0, 1, 2
            if (index === 3) spanClass = "md:col-span-1 lg:col-span-3";
            if (index === 4) spanClass = "md:col-span-2 lg:col-span-3";

            return (
            <SpotlightCard 
              key={cat.title} 
              className={`${spanClass} cursor-default`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.4 } }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
            >
              <div className="p-6 sm:p-10 h-full flex flex-col">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-bg flex items-center justify-center border border-border/30 group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-700 shadow-sm relative overflow-hidden">
                    <cat.icon className="w-8 h-8 text-accent relative z-10" />
                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-text">
                    {cat.title}
                  </h3>
                </div>

                <p className="text-text-sub text-sm leading-relaxed mb-10 font-medium opacity-80 group-hover:opacity-100 transition-opacity flex-grow">
                  {cat.description}
                </p>

                <div className="flex flex-wrap gap-2 sm:gap-3 mt-auto">
                  {cat.techs.map((tech) => {
                    return (
                      <div 
                        key={tech.name} 
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 pr-4 sm:pr-5 rounded-xl bg-bg-2/30 border border-border/10 group/tech hover:border-accent/20 hover:bg-accent/[0.02] transition-all duration-300 min-w-0 backdrop-blur-sm"
                      >
                        <div className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-text/5 dark:bg-white/5 grayscale group-hover/tech:grayscale-0 transition-all duration-500 relative overflow-hidden">
                          {tech.iconPath ? (
                            <div className="relative w-6 h-6 dark:invert dark:brightness-100 transition-all duration-500 group-hover/tech:scale-110">
                              <Image 
                                src={tech.iconPath} 
                                alt={tech.name} 
                                fill
                                priority
                                unoptimized
                                className="object-contain"
                              />
                            </div>
                          ) : (
                            <FallbackIcon />
                          )}
                        </div>
                        <span
                          title={tech.name}
                          className="text-[10px] font-black uppercase tracking-widest text-muted group-hover/tech:text-text truncate"
                        >
                          {tech.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </SpotlightCard>
            );
          })}
        </div>


      </div>
    </section>
  );
};

export default Skills;
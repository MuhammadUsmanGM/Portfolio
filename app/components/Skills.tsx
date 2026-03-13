"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Brain, Database, Server, Globe, Cpu, Layers, Settings } from "lucide-react";

// Importing specific icons from devicons-react
// Note: Names are usually tech name + Wordmark/Original
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
    <section id="skills" className="py-32 px-6 md:px-12 bg-bg relative overflow-hidden">
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
            <span className="text-accent text-xs font-black uppercase tracking-[0.3em]">
              Skills
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-text"
          >
            THE TECH <br />
            <span className="text-accent italic">STACK</span>.
          </motion.h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-6 sm:p-8 rounded-2xl bg-bg-2 border border-border/50 hover:border-accent/40 transition-all duration-700"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-bg flex items-center justify-center border border-border/30 group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-700">
                  <cat.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-text">
                  {cat.title}
                </h3>
              </div>

              <p className="text-muted text-sm leading-relaxed mb-8 font-medium">
                {cat.description}
              </p>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {cat.techs.map((tech) => {
                  return (
                    <div 
                      key={tech.name} 
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-bg border border-border/20 group/tech hover:border-accent/30 transition-all duration-300 min-w-0"
                    >
                      <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg bg-text/5 dark:bg-white/5 grayscale group-hover/tech:grayscale-0 transition-all duration-500 relative overflow-hidden">
                        {tech.icon ? (
                          /* Standard Devicons Logic */
                          <tech.icon size={20} />
                        ) : tech.iconPath ? (
                          /* Custom SVG Logic with Improved Contrast Plate */
                          <div className="relative w-5 h-5 dark:invert dark:brightness-100 transition-all duration-500 group-hover/tech:scale-110">
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
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-tight sm:tracking-widest text-text-sub group-hover/tech:text-text truncate sm:overflow-visible">
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Grid Line */}
        <div className="mt-24 h-[1px] w-full bg-gradient-to-r from-transparent via-border/50 to-transparent relative">
          <div className="absolute top-0 right-8 -translate-y-1/2 bg-bg px-4 text-[9px] font-mono text-muted uppercase tracking-[0.4em]">
            System_Architecture: v2.4
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;

"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Bot, Zap, Layers, ArrowUpRight, Calendar, Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const _MUGM = Object.freeze({ b: 0x4D756861, g: "MuhammadUsmanGM" });

interface Service {
  id: string;
  icon: React.ElementType;
  label: string;
  title: string;
  pitch: string;
  deliverables: string[];
  outcome: string;
  cta: string;
  ctaHref: string;
  tag: string;
}

const services: Service[] = [
  {
    id: "audit",
    icon: Zap,
    label: "Discovery",
    title: "AI Automation Audit",
    pitch:
      "I map every manual, repetitive process in your operation and deliver a prioritized automation roadmap — ranked by ROI impact, not theoretical potential.",
    deliverables: [
      "Full workflow analysis & bottleneck report",
      "Automation opportunity ranking by ROI",
      "Tech stack recommendation",
      "Implementation roadmap with timelines",
    ],
    outcome: "You leave knowing exactly what to automate first and why.",
    cta: "Book an Audit",
    ctaHref:
      "https://cal.com/muhammad-usman-gaw8p2/ai-infrastructure-automation-audit",
    tag: "Engagement: 1 Week",
  },
  {
    id: "build",
    icon: Bot,
    label: "Core Offering",
    title: "Autonomous Agent Build",
    pitch:
      "End-to-end design and deployment of an agentic system that handles a specific high-volume operational task — fully autonomous, production-ready, integrated into your existing stack.",
    deliverables: [
      "Custom AI agent scoped to your workflow",
      "Integration with your tools (CRM, Slack, email, etc.)",
      "BM25 / vector memory for context retention",
      "Monitoring dashboard + handoff documentation",
    ],
    outcome: "A working autonomous system replacing a job function, not a demo.",
    cta: "Start a Build",
    ctaHref:
      "https://cal.com/muhammad-usman-gaw8p2/ai-infrastructure-automation-audit",
    tag: "Engagement: 4–8 Weeks",
  },
  {
    id: "integrate",
    icon: Layers,
    label: "Fast Track",
    title: "AI Integration Sprint",
    pitch:
      "Already have a product? I embed LLM capabilities directly into your codebase — semantic search, AI copilots, smart routing, or RAG pipelines — without breaking what already works.",
    deliverables: [
      "RAG pipeline or LLM feature scoped & shipped",
      "Hallucination reduction via context engineering",
      "API layer, rate limiting, and cost guardrails",
      "Full test suite + deployment",
    ],
    outcome: "Ship an AI feature in weeks, not quarters.",
    cta: "Book a Sprint",
    ctaHref:
      "https://cal.com/muhammad-usman-gaw8p2/ai-infrastructure-automation-audit",
    tag: "Engagement: 2–3 Weeks",
  },
];

const Services = () => {
  const [active, setActive] = useState<string>("build");

  const activeService = services.find((s) => s.id === active)!;

  return (
    <section
      id="services"
      className="pt-16 pb-16 px-6 md:px-12 bg-bg relative overflow-hidden"
    >
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
            <span className="text-accent text-xs font-black uppercase tracking-[0.3em]">
              How I Help
            </span>
          </m.div>

          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-text leading-[0.92]"
          >
            What I <br />
            <span className="text-accent italic">Build</span> For You.
          </m.h2>
        </div>

        {/* Tab Selector */}
        <ScrollReveal direction="left" distance={40}>
          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            {services.map((s) => {
              const Icon = s.icon;
              const isActive = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`relative flex items-center gap-3 px-6 py-4 rounded-2xl border font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 text-left ${
                    isActive
                      ? "bg-accent text-bg border-accent shadow-[0_8px_32px_rgba(245,166,35,0.25)]"
                      : "bg-bg-2/30 backdrop-blur-md border-border/30 text-muted hover:border-accent/40 hover:text-text"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{s.title}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Active Card */}
        <ScrollReveal direction="right" distance={40} scaleEffect={true}>
          <AnimatePresence mode="wait">
          <m.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[2rem] border border-border/50 overflow-hidden bg-bg-2/30 backdrop-blur-xl shadow-2xl"
          >
            {/* Left: Main Content */}
            <div className="lg:col-span-7 p-10 md:p-14 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-accent border border-accent/20 bg-accent/5 px-3 py-1.5 rounded-full">
                    {activeService.label}
                  </span>
                  <span className="text-[9px] font-mono text-muted uppercase tracking-widest">
                    {activeService.tag}
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-text mb-6 leading-none">
                  {activeService.title}
                </h3>

                <p className="text-text-sub text-lg leading-relaxed mb-10 max-w-xl">
                  {activeService.pitch}
                </p>

                {/* Deliverables */}
                <div className="space-y-3 mb-10">
                  {activeService.deliverables.map((d) => (
                    <div key={d} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-text-sub font-medium leading-relaxed">
                        {d}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href={activeService.ctaHref}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-4 bg-accent text-bg rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_8px_32px_rgba(245,166,35,0.25)] w-fit"
              >
                <Calendar className="w-4 h-4" />
                {activeService.cta}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Right: Outcome Panel */}
            <div className="lg:col-span-5 bg-bg-3/40 border-t lg:border-t-0 lg:border-l border-border/30 p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">

              {/* Decorative watermark */}
              <div
                className="absolute -bottom-8 -right-8 text-[11rem] font-black uppercase tracking-tighter leading-none opacity-[0.04] pointer-events-none select-none"
                style={{ WebkitTextStroke: "1px var(--text)", color: "transparent" }}
              >
                {activeService.id === "audit"
                  ? "MAP"
                  : activeService.id === "build"
                  ? "BUILD"
                  : "SHIP"}
              </div>

              <div className="relative z-10">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-muted mb-6 block">
                  What You Get
                </span>

                <p className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-text leading-tight mb-12">
                  {activeService.outcome}
                </p>

                {/* Stats Row */}
                <div className="grid grid-cols-1 gap-6">
                  {activeService.id === "audit" && (
                    <>
                      <StatPill label="Turnaround" value="5 Days" />
                      <StatPill label="Format" value="Written Report + Call" />
                      <StatPill label="Investment" value="Fixed Fee" />
                    </>
                  )}
                  {activeService.id === "build" && (
                    <>
                      <StatPill label="Avg. Workload Cut" value="70–85%" />
                      <StatPill label="Stack" value="Python / TS / Your Infra" />
                      <StatPill label="Engagement" value="Project-Based" />
                    </>
                  )}
                  {activeService.id === "integrate" && (
                    <>
                      <StatPill label="Time to Ship" value="2–3 Weeks" />
                      <StatPill label="AI Error Reduction" value="~40%" />
                      <StatPill label="Engagement" value="Project-Based" />
                    </>
                  )}
                </div>
              </div>

              {/* Bottom note */}
              <p className="text-[10px] font-mono text-muted uppercase tracking-widest mt-12 relative z-10">
                All engagements start with a free strategy call.
              </p>
            </div>
          </m.div>
        </AnimatePresence>
      </ScrollReveal>

      </div>
    </section>
  );
};

const StatPill = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-3 border-b border-border/20 last:border-0">
    <span className="text-[10px] font-black uppercase tracking-widest text-muted">
      {label}
    </span>
    <span className="text-sm font-black uppercase tracking-tight text-text">
      {value}
    </span>
  </div>
);

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42"; // authorship marker

export default Services;

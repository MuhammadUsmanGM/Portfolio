"use client";

import React from "react";
import { m } from "framer-motion";

// ─── Visual DNA per project ───────────────────────────────────────────
// Each project gets a unique geometric identity layer

type BannerVariant = "neural" | "crystal" | "matrix" | "wave";

interface ProjectBannerProps {
  title: string;
  subtitle: string;
  variant: BannerVariant;
  version?: string;
  status?: string;
}

// ─── Geometric Pattern: Neural Network (ELYX) ────────────────────────
const NeuralPattern = () => {
  const nodes = [
    { x: 15, y: 20, delay: 0 },
    { x: 35, y: 65, delay: 0.3 },
    { x: 55, y: 30, delay: 0.6 },
    { x: 75, y: 70, delay: 0.9 },
    { x: 85, y: 25, delay: 1.2 },
    { x: 25, y: 80, delay: 0.4 },
    { x: 65, y: 50, delay: 0.7 },
    { x: 45, y: 85, delay: 1.0 },
  ];

  const connections = [
    [0, 2], [0, 1], [1, 3], [2, 4], [2, 6],
    [1, 5], [3, 6], [5, 7], [6, 7], [3, 4],
  ];

  return (
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      {/* Connection lines */}
      {connections.map(([from, to], i) => (
        <m.line
          key={`line-${i}`}
          x1={`${nodes[from].x}%`}
          y1={`${nodes[from].y}%`}
          x2={`${nodes[to].x}%`}
          y2={`${nodes[to].y}%`}
          stroke="var(--accent)"
          strokeWidth="0.5"
          strokeOpacity="0.15"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 * i, ease: "easeOut" }}
        />
      ))}
      {/* Pulse traveling along connections */}
      {connections.slice(0, 4).map(([from, to], i) => (
        <m.circle
          key={`pulse-${i}`}
          r="2"
          fill="var(--accent)"
          opacity="0.4"
          initial={{ cx: `${nodes[from].x}%`, cy: `${nodes[from].y}%` }}
          animate={{
            cx: [`${nodes[from].x}%`, `${nodes[to].x}%`],
            cy: [`${nodes[from].y}%`, `${nodes[to].y}%`],
          }}
          transition={{
            duration: 3,
            delay: i * 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Nodes */}
      {nodes.map((node, i) => (
        <React.Fragment key={`node-${i}`}>
          <m.circle
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="12"
            fill="var(--accent)"
            opacity="0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.06, 0] }}
            transition={{ duration: 3, delay: node.delay, repeat: Infinity }}
          />
          <m.circle
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="2.5"
            fill="var(--accent)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 0.6, delay: node.delay }}
          />
          <circle
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r="1"
            fill="var(--accent)"
            opacity="0.9"
          />
        </React.Fragment>
      ))}
    </svg>
  );
};

// ─── Geometric Pattern: Crystal Lattice (FerrumDB) ───────────────────
const CrystalPattern = () => {
  const hexPoints = (cx: number, cy: number, r: number) => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    }).join(" ");
  };

  const hexagons = [
    { cx: 20, cy: 30, r: 18, delay: 0 },
    { cx: 50, cy: 20, r: 22, delay: 0.2 },
    { cx: 80, cy: 40, r: 16, delay: 0.4 },
    { cx: 35, cy: 70, r: 20, delay: 0.6 },
    { cx: 70, cy: 75, r: 14, delay: 0.8 },
    { cx: 15, cy: 60, r: 12, delay: 0.3 },
    { cx: 60, cy: 50, r: 25, delay: 0.5 },
    { cx: 88, cy: 15, r: 10, delay: 0.7 },
  ];

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {hexagons.map((hex, i) => (
        <React.Fragment key={`hex-${i}`}>
          <m.polygon
            points={hexPoints(hex.cx, hex.cy, hex.r)}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.3"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 1, delay: hex.delay, ease: "easeOut" }}
            style={{ transformOrigin: `${hex.cx}% ${hex.cy}%` }}
          />
          <m.polygon
            points={hexPoints(hex.cx, hex.cy, hex.r * 0.6)}
            fill="var(--accent)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.04, 0] }}
            transition={{ duration: 4, delay: hex.delay + 1, repeat: Infinity }}
          />
        </React.Fragment>
      ))}
      {/* Connecting lines between hex centers */}
      {[[0, 1], [1, 6], [6, 4], [0, 5], [5, 3], [2, 6], [1, 7]].map(([a, b], i) => (
        <m.line
          key={`hline-${i}`}
          x1={hexagons[a].cx}
          y1={hexagons[a].cy}
          x2={hexagons[b].cx}
          y2={hexagons[b].cy}
          stroke="var(--accent)"
          strokeWidth="0.2"
          strokeDasharray="2 3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1, delay: 0.8 + i * 0.15 }}
        />
      ))}
    </svg>
  );
};

// ─── Deterministic Seeded PRNG (avoids hydration mismatch) ───────────
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ─── Geometric Pattern: Code Matrix (CodeLens) ───────────────────────
const MatrixPattern = () => {
  const columns = 12;
  const rows = 20;
  const chars = "{}[]()<>|/\\=+-*&^%$#@!?;:.,~`01";
  const rng = seededRandom(42);

  // Pre-compute the entire grid deterministically
  const grid = Array.from({ length: columns }, (_, col) =>
    Array.from({ length: rows }, (_, row) => {
      const charIndex = Math.floor(rng() * chars.length);
      const accentRoll = rng();
      const opacityRoll = rng();
      const durationRoll = rng();
      return {
        char: chars[charIndex],
        isAccent: accentRoll > 0.85,
        opacity: 0.12 + opacityRoll * 0.08,
        duration: 2 + durationRoll * 2,
        key: `${col}-${row}`,
      };
    })
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {grid.map((column, col) => (
        <m.div
          key={`col-${col}`}
          className="absolute top-0 flex flex-col gap-[3px]"
          style={{
            left: `${(col / columns) * 100}%`,
            width: `${100 / columns}%`,
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: col * 0.08 }}
        >
          {column.map((cell) => (
            <m.span
              key={cell.key}
              className="font-mono text-center leading-none select-none"
              style={{
                fontSize: "0.55rem",
                color: cell.isAccent ? "var(--accent)" : "var(--muted)",
                opacity: cell.isAccent ? 0.6 : cell.opacity,
              }}
              animate={
                cell.isAccent
                  ? { opacity: [0.3, 0.8, 0.3] }
                  : undefined
              }
              transition={
                cell.isAccent
                  ? { duration: cell.duration, repeat: Infinity }
                  : undefined
              }
            >
              {cell.char}
            </m.span>
          ))}
        </m.div>
      ))}
      {/* Floating highlight blocks */}
      {[
        { top: "15%", left: "10%", w: "30%", delay: 0.5 },
        { top: "40%", left: "55%", w: "35%", delay: 1.2 },
        { top: "70%", left: "20%", w: "25%", delay: 1.8 },
      ].map((block, i) => (
        <m.div
          key={`block-${i}`}
          className="absolute h-[2px] rounded-full"
          style={{
            top: block.top,
            left: block.left,
            width: block.w,
            background: `linear-gradient(90deg, transparent, var(--accent), transparent)`,
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: [0, 0.25, 0], scaleX: [0, 1, 0] }}
          transition={{
            duration: 3,
            delay: block.delay,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      ))}
    </div>
  );
};

// ─── Geometric Pattern: Signal Wave (THE SIGNAL) ─────────────────────
const WavePattern = () => {
  const waveCount = 5;

  return (
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
      {Array.from({ length: waveCount }, (_, i) => {
        const yBase = 40 + i * 30;
        const amplitude = 15 - i * 2;
        const path = `M 0 ${yBase} ` +
          Array.from({ length: 20 }, (_, j) => {
            const x = (j / 19) * 400;
            const y = yBase + Math.sin((j / 19) * Math.PI * 4 + i * 0.8) * amplitude;
            return `L ${x} ${y}`;
          }).join(" ");

        return (
          <React.Fragment key={`wave-${i}`}>
            <m.path
              d={path}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="0.6"
              strokeOpacity={0.08 + i * 0.04}
              initial={{ pathLength: 0. }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.3, ease: "easeOut" }}
            />
            {/* Traveling dot */}
            <m.circle
              r="2.5"
              fill="var(--accent)"
              opacity={0.5 - i * 0.08}
            >
              <animateMotion
                dur={`${4 + i}s`}
                repeatCount="indefinite"
                path={path}
              />
            </m.circle>
          </React.Fragment>
        );
      })}
      {/* Vertical scan pulses */}
      {[80, 200, 310].map((x, i) => (
        <m.line
          key={`vscan-${i}`}
          x1={x} y1="0" x2={x} y2="200"
          stroke="var(--accent)"
          strokeWidth="0.5"
          strokeDasharray="3 6"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.15, 0] }}
          transition={{ duration: 3, delay: i * 1.2, repeat: Infinity }}
        />
      ))}
    </svg>
  );
};

// ─── Pattern Map ──────────────────────────────────────────────────────
const PatternComponents: Record<BannerVariant, React.FC> = {
  neural: NeuralPattern,
  crystal: CrystalPattern,
  matrix: MatrixPattern,
  wave: WavePattern,
};

// ─── Corner Brackets (Shared Decorator) ──────────────────────────────
const CornerBrackets = () => (
  <>
    {/* Top-left */}
    <div className="absolute top-5 left-5 w-5 h-5 border-l border-t border-accent/20 pointer-events-none" />
    {/* Top-right */}
    <div className="absolute top-5 right-5 w-5 h-5 border-r border-t border-accent/20 pointer-events-none" />
    {/* Bottom-left */}
    <div className="absolute bottom-5 left-5 w-5 h-5 border-l border-b border-accent/20 pointer-events-none" />
    {/* Bottom-right */}
    <div className="absolute bottom-5 right-5 w-5 h-5 border-r border-b border-accent/20 pointer-events-none" />
  </>
);

// ═══════════════════════════════════════════════════════════════════════
// MAIN BANNER COMPONENT
// ═══════════════════════════════════════════════════════════════════════

const ProjectBanner: React.FC<ProjectBannerProps> = ({
  title,
  subtitle,
  variant,
  version = "v4.0",
  status = "OPERATIONAL",
}) => {
  const Pattern = PatternComponents[variant];

  return (
    <div className="absolute inset-0 w-full h-full bg-[#08080a] flex items-center justify-center overflow-hidden select-none">
      {/* ── Base Grid Layer ── */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none transition-all duration-700 group-hover:opacity-50 group-hover:scale-[1.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Vignette ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 30%, rgba(8,8,10,0.8) 100%)",
      }} />

      {/* ── Geometric Identity Layer ── */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-700 group-hover:scale-[1.03]">
        <Pattern />
      </div>

      {/* ── Horizontal Scan Line ── */}
      <m.div
        animate={{ top: ["-5%", "110%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[1px] pointer-events-none z-10"
        style={{
          background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
          opacity: 0.12,
        }}
      />

      {/* ── Corner Brackets ── */}
      <CornerBrackets />

      {/* ── Top-Left System Label ── */}
      <div className="absolute top-6 left-8 flex items-center gap-3 z-10">
        <m.div
          className="w-1.5 h-1.5 rounded-full bg-accent"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="font-mono text-[9px] text-accent/60 uppercase tracking-[0.3em]">
          {status}
        </span>
      </div>

      {/* ── Top-Right Version Label ── */}
      <div className="absolute top-6 right-8 z-10">
        <span className="font-mono text-[9px] text-muted/40 uppercase tracking-[0.2em]">
          SYS.{version}
        </span>
      </div>

      {/* ── Central Typography Block ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-8 transition-transform duration-700 group-hover:scale-[1.04]">
        {/* Accent line above */}
        <m.div
          className="w-8 h-[1px] bg-accent/40 mb-5"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Project Title */}
        <h3
          className="text-[clamp(1.5rem,4vw,2.8rem)] font-black tracking-[-0.05em] uppercase leading-[1] mb-3"
          style={{
            background: "linear-gradient(160deg, #ffffff 0%, #888888 50%, #ffffff 100%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {title}
        </h3>

        {/* Subtitle */}
        <span className="font-mono text-[0.65rem] font-bold text-accent uppercase tracking-[0.35em] block">
          {subtitle}
        </span>

        {/* Accent line below */}
        <m.div
          className="w-8 h-[1px] bg-accent/40 mt-5"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
      </div>

      {/* ── Bottom-Left Metadata ── */}
      <div className="absolute bottom-6 left-8 z-10">
        <div className="flex items-center gap-2">
          <div className="w-3 h-[1px] bg-accent/30" />
          <span className="font-mono text-[8px] text-muted/30 uppercase tracking-[0.25em]">
            ARCH.CORE
          </span>
        </div>
      </div>

      {/* ── Bottom-Right Data Point ── */}
      <div className="absolute bottom-6 right-8 z-10 flex items-center gap-3">
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <m.div
              key={i}
              className="w-[3px] rounded-full bg-accent/30"
              animate={{ height: ["4px", "12px", "4px"] }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </div>
        <span className="font-mono text-[8px] text-muted/30 uppercase tracking-[0.2em]">
          SIGNAL.ACTIVE
        </span>
      </div>

      {/* ── Hover Glow (Center) ── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(245,166,35,0.04) 0%, transparent 60%)",
        }}
      />
    </div>
  );
};

export default ProjectBanner;

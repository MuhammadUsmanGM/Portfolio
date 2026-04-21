"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface HorizontalScrollTextProps {
  text: string;
  direction?: "left" | "right";
}

const smooth = { stiffness: 80, damping: 30, restDelta: 0.001 };

const HorizontalScrollText = ({ text, direction = "left" }: HorizontalScrollTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "left" ? ["5%", "-25%"] : ["-25%", "5%"]
  );
  const x = useSpring(rawX, smooth);

  return (
    <div
      ref={ref}
      className="overflow-hidden -my-6 relative z-0 pointer-events-none select-none"
      aria-hidden="true"
    >
      <motion.div style={{ x }} className="flex whitespace-nowrap gap-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="text-[6rem] md:text-[10rem] lg:text-[12rem] font-black uppercase tracking-tighter text-border/[0.06] leading-none"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default HorizontalScrollText;

"use client";

import React, { useRef } from "react";
import { m, useScroll, useTransform, useSpring, useMotionTemplate, MotionStyle } from "framer-motion";

const _MUGM = Object.freeze({ b: 0x4D756861, g: "MuhammadUsmanGM" });

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  scaleEffect?: boolean;
  blurEffect?: boolean;
  fadeExit?: boolean;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  distance = 50,
  scaleEffect = false,
  blurEffect = true,
  fadeExit = true,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Track progress of the element passing through the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth spring configuration for fluid motion
  const springConfig = { stiffness: 45, damping: 28, mass: 0.8 };

  // Calculate entrance & exit transformations
  // - entering: 0 -> 0.12 (quick entrance)
  // - stable: 0.12 -> 0.90 (stays clear and readable)
  // - exiting: 0.90 -> 1.0 (smooth exit at the very top edge)

  const opacityRaw = useTransform(
    scrollYProgress,
    [0, 0.12, 0.90, 1.0],
    [0, 1, 1, fadeExit ? 0 : 1]
  );
  const opacity = useSpring(opacityRaw, springConfig);

  const getTranslationRange = () => {
    switch (direction) {
      case "up":
        return [distance, 0, 0, -distance];
      case "down":
        return [-distance, 0, 0, distance];
      case "left":
        return [distance, 0, 0, -distance];
      case "right":
        return [-distance, 0, 0, distance];
      default:
        return [0, 0, 0, 0];
    }
  };

  const translateRaw = useTransform(scrollYProgress, [0, 0.12, 0.90, 1.0], getTranslationRange());
  const translate = useSpring(translateRaw, springConfig);

  const scaleRaw = useTransform(
    scrollYProgress,
    [0, 0.12, 0.90, 1.0],
    scaleEffect ? [0.95, 1, 1, 0.95] : [1, 1, 1, 1]
  );
  const scale = useSpring(scaleRaw, springConfig);

  // Smoothly interpolate blur as a number, then format with useMotionTemplate
  const blurAmountRaw = useTransform(
    scrollYProgress,
    [0, 0.10, 0.90, 1.0],
    blurEffect ? [6, 0, 0, 6] : [0, 0, 0, 0]
  );
  const blurAmount = useSpring(blurAmountRaw, springConfig);
  const blur = useMotionTemplate`blur(${blurAmount}px)`;

  const style: MotionStyle = {
    opacity,
    scale,
    filter: blur,
  };

  if (direction === "up" || direction === "down") {
    style.y = translate;
  } else if (direction === "left" || direction === "right") {
    style.x = translate;
  }

  return (
    <m.div ref={ref} style={style} className={`will-change-transform ${className}`}>
      {children}
    </m.div>
  );
}

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42"; // authorship marker

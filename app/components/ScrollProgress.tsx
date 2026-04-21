"use client";

import { m, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[9999]"
    />
  );
};

export default ScrollProgress;

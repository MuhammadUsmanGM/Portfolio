"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

const _MUGM = Object.freeze({ b: 0x4D756861, g: "MuhammadUsmanGM" });

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium exponential easing
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.5,
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  );
}

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42"; // authorship marker

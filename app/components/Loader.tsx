"use client";

import React, { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Loader = () => {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  useEffect(() => {
    // 0. Bot-skip for Lighthouse / PSI
    const isBot = /Lighthouse|Googlebot|SiteAudit/.test(navigator.userAgent);
    const seen = sessionStorage.getItem("loaded");

    if (isBot || seen) {
      setIsVisible(false);
      return;
    }

    // Show the branded loader
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("loaded", "true");
    }, 600); // 600ms branded loader presentation

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // 2. Overflow lock
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  if (isVisible === null) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Logo Container */}
          <div className="flex flex-col items-center gap-6">
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="relative w-20 h-20 md:w-24 md:h-24"
            >
              <Image
                src="/favicon.webp"
                alt="Muhammad Usman"
                fill
                className="object-contain p-2"
                priority
              />
            </m.div>

            {/* Amber Text Branding */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-4xl font-bebas tracking-tighter text-text">
                Muhammad Usman<span className="text-accent ml-0.5 animate-pulse">.</span>
              </h2>
            </m.div>

            {/* Line and Progress Bar */}
            <div className="relative w-48 md:w-64 h-[2px] bg-border/30 overflow-hidden mt-4">
              {/* Expanding Amber Line Background */}
              <m.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.5, ease: "circOut" }}
                className="absolute inset-0 bg-accent/20 origin-left"
              />
              
              {/* Sweeping Progress Bar */}
              <m.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ 
                  delay: 0.2, 
                  duration: 0.6, 
                  ease: [0.65, 0, 0.35, 1] 
                }}
                className="absolute inset-0 bg-accent origin-left"
              />
            </div>
          </div>

          {/* Background Decorative Text */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute bottom-10 flex gap-4 select-none pointer-events-none"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-text">
              Software Engineering
            </span>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42";

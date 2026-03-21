"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Work", href: "/#work" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 left-0 right-0 z-50 mx-auto max-w-[95%] md:max-w-[1200px]"
    >
      <div 
        className={`flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-500 ${
          isScrolled 
            ? "backdrop-blur-2xl bg-bg/90 border-border shadow-[0_8px_32px_rgba(0,0,0,0.12)] py-2" 
            : "backdrop-blur-md bg-bg/40 border-border/30 shadow-none"
        }`}
      >
        
        {/* Left: Branding */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="relative w-12 h-12 overflow-hidden rounded-lg border border-border/50 bg-white/5 group-hover:border-accent transition-all duration-500">
            <Image 
              src="/favicon.webp" 
              alt="Muhammad Usman" 
              fill 
              className="object-contain p-1.5 transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="hidden md:block text-[14px] font-black uppercase tracking-[0.1em] text-text leading-none transition-colors group-hover:text-accent">
              Muhammad Usman<span className="text-accent ml-0.5 inline-block animate-pulse">.</span>
            </span>
            {/* Mobile Branding: Stacked */}
            <div className="md:hidden flex flex-col -space-y-0.5">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-text leading-none">
                Muhammad
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-accent leading-none">
                Usman<span className="text-text ml-0.5 inline-block animate-pulse">.</span>
              </span>
            </div>
          </div>
        </div>

        {/* Middle: Navigation - Hidden on mobile, controlled by MobileNav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[13px] font-bold uppercase tracking-widest text-text-sub hover:text-accent transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right: CTA */}
        <div>
          <Link 
            href="/#contact" 
            className="group relative inline-flex items-center gap-2 bg-accent hover:bg-accent-glow text-bg px-7 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all duration-300 overflow-hidden shadow-[0_4px_20px_rgba(245,166,35,0.25)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Hire Me 
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-[#000] opacity-0 group-hover:opacity-10 transition-opacity" />
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;

"use client";

import React, { useRef } from "react";
import { m, useScroll, useTransform, useSpring } from "framer-motion";
import { Github, Linkedin, ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Scroll-driven parallax for decorative text
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });
  const decorY = useSpring(useTransform(scrollYProgress, [0, 1], ["40%", "0%"]), { stiffness: 80, damping: 30, restDelta: 0.001 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Projects", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Background", href: "#background" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/MuhammadUsmanGM", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/muhammadusmangm", label: "LinkedIn" },
  ];

  return (
    <footer ref={footerRef} className="bg-bg relative border-t border-border/50 pt-24 pb-12 px-6 md:px-12 overflow-hidden">
      {/* Decorative Background Text */}
      <m.div style={{ y: decorY }} className="absolute bottom-0 right-0 translate-y-1/3 translate-x-1/4 select-none pointer-events-none opacity-[0.02] dark:opacity-[0.05] whitespace-nowrap">
        <span className="text-[20rem] font-bebas leading-none uppercase">USMAN</span>
      </m.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-6xl font-bebas tracking-tighter text-text leading-none">
                MUHAMMAD <br /> <span className="text-accent italic">USMAN.</span>
              </h2>
              <p className="text-muted text-sm font-medium leading-relaxed max-w-sm">
                Building modern, scalable software and intelligent interfaces. 
                Focusing on the intersection of user experience and system reliability.
              </p>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Navigation</h4>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold text-text-sub hover:text-accent transition-colors w-fit group flex items-center gap-2"
                >
                  <span className="w-0 group-hover:w-4 h-[1px] bg-accent transition-all duration-300" />
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Socials & Availability */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Socials</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 rounded-xl bg-bg-2 border border-border/50 flex items-center justify-center hover:border-accent hover:text-accent transition-all group"
                      aria-label={social.label}
                    >
                      <social.icon size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-bg-2 border border-border/50 space-y-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-muted block italic">Current Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-text uppercase tracking-tight">Open for collaboration</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest">
              © {currentYear} MUHAMMAD USMAN. ALL RIGHTS RESERVED.
            </p>
            <div className="hidden md:block h-4 w-[1px] bg-border/50" />
            <div className="flex items-center gap-2 text-[10px] font-mono text-muted uppercase tracking-widest">
              <span>Lahore, PK</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>31.55 N | 74.35 E</span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 px-6 py-3 bg-bg-2 border border-border hover:border-accent rounded-full transition-all"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-text italic">Back to Top</span>
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-bg group-hover:-translate-y-1 transition-transform">
              <ArrowUp size={16} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

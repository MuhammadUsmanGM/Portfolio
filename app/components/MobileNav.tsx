"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, User, Cpu, Mail } from "lucide-react";

const MobileNav = () => {
  const navLinks = [
    { name: "Work", href: "#work", icon: Briefcase },
    { name: "About", href: "#about", icon: User },
    { name: "Skills", href: "#skills", icon: Cpu },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[360px] md:hidden"
    >
      <div className="flex items-center justify-around px-2 py-2 rounded-full backdrop-blur-2xl bg-bg/85 border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className="flex flex-col items-center gap-0.5 group flex-1"
            >
              <div className="p-1.5 rounded-full group-active:bg-accent/10 transition-colors">
                <Icon className="w-[18px] h-[18px] text-text-sub group-hover:text-accent transition-colors" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-tighter text-muted group-hover:text-accent transition-colors">
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};

export default MobileNav;

"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-[99999] bg-bg flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Background Amber Radial Glow */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full bg-accent/15 blur-[160px] pointer-events-none" 
      />

      <m.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center max-w-xl w-full"
      >
        {/* Huge Glassy Amber 404 Text */}
        <h1 className="text-[130px] sm:text-[180px] md:text-[230px] font-bebas text-accent leading-none tracking-tighter drop-shadow-[0_0_40px_rgba(245,166,35,0.4)] select-none">
          404
        </h1>

        {/* NOT FOUND Header Text */}
        <h2 className="text-xl md:text-2xl font-black text-text uppercase tracking-[0.4em] -mt-4 md:-mt-8 mb-8">
          NOT FOUND
        </h2>

        {/* Single Back to Home Action Button */}
        <Link
          href="/"
          className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-accent text-bg font-black text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_32px_rgba(245,166,35,0.3)]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </m.div>
    </div>
  );
}

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42";

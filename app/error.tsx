"use client";

import { useEffect } from "react";
import Link from "next/link";
import { m } from "framer-motion";
import { RotateCcw, ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="fixed inset-0 z-[99999] bg-bg flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* Background Amber Radial Glow */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full bg-accent/10 blur-[140px] pointer-events-none" 
      />

      <m.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center max-w-md w-full"
      >
        {/* Top Label */}
        <span className="text-accent text-xs font-black uppercase tracking-[0.4em] mb-4">
          SOMETHING WENT WRONG
        </span>

        {/* Big Glassy Amber ERROR Container */}
        <div className="relative w-full py-8 md:py-12 px-8 rounded-3xl bg-bg-2/40 border border-accent/20 backdrop-blur-xl shadow-[0_0_60px_rgba(245,166,35,0.12)] flex items-center justify-center my-4 group">
          <span className="text-7xl md:text-9xl font-bebas text-accent tracking-tighter drop-shadow-[0_0_25px_rgba(245,166,35,0.4)] select-none">
            ERROR
          </span>
          <div className="absolute inset-0 rounded-3xl bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 w-full justify-center">
          <button
            onClick={() => reset()}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-accent text-bg font-black text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_8px_32px_rgba(245,166,35,0.25)] w-full sm:w-auto"
          >
            <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>

          <Link
            href="/"
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-bg-2/50 border border-border/50 text-text hover:border-accent/40 font-black text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </m.div>
    </div>
  );
}

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42";

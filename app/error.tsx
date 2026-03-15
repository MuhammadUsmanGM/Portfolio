"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { RefreshCcw, Home, AlertTriangle } from "lucide-react";

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
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-bg p-4 text-center transition-colors duration-300 relative overflow-hidden">
      {/* 
        CRITICAL FAILURE WATERMARK 
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0.03, 0.08, 0.03], x: [-2, 2, -2] }}
          transition={{ 
            opacity: { duration: 3, repeat: Infinity },
            x: { duration: 0.1, repeat: Infinity, repeatType: "mirror" }
          }}
          className="text-[25vw] md:text-[30vw] font-bebas text-red-600 leading-none tracking-tighter filter blur-[5px] md:blur-[8px]"
        >
          FAILED
        </motion.h1>
        
        {/* Overlay to dim background */}
        <div className="absolute inset-0 bg-bg/40 backdrop-blur-[1px]" />
        
        {/* Warning Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-red-600/10 rounded-full blur-[150px] animate-pulse" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center max-w-2xl px-6"
      >
        <div className="relative group mb-8">
          {/* Main Icon Wrapper with Glitchy Border */}
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
              filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-[2.5rem] bg-red-950/10 border border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)] flex items-center justify-center p-7 backdrop-blur-xl overflow-hidden mx-auto group-hover:border-red-500/60 transition-colors duration-500">
              <Image
                src="/favicon.webp"
                alt="Logo"
                width={140}
                height={140}
                className="w-full h-full object-contain grayscale opacity-40 brightness-75 invert dark:invert-0 group-hover:opacity-60 transition-opacity"
              />
              
              {/* Emergency Flare effect */}
              <div className="absolute inset-0 bg-red-500/5 mix-blend-color-dodge animate-flare pointer-events-none" />
            </div>
            
            {/* Critical Status Light */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_20px_#dc2626]">
              <AlertTriangle className="w-3 h-3 text-white" />
            </div>
          </motion.div>
        </div>
        
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-5xl md:text-7xl font-bebas text-text tracking-tight uppercase leading-none">
              Neural <span className="text-red-600 italic">Interruption</span>
            </h2>
            <div className="h-1 w-24 bg-red-600 mx-auto mt-4 rounded-full opacity-60" />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-text-sub font-dm leading-relaxed text-lg md:text-xl max-w-lg mx-auto"
          >
            The autonomous logic layer encountered a critical exception. 
            A system-wide reset is required to restore sector stability.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="pt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => reset()}
              className="group relative flex items-center justify-center gap-3 px-10 py-4 bg-red-600 text-white font-bebas text-xl uppercase tracking-[0.15em] rounded-xl hover:bg-red-700 transition-all duration-300 shadow-lg shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              Reset System
              
              {/* Button Glow */}
              <div className="absolute inset-0 rounded-xl bg-red-500 blur-xl opacity-0 hover:opacity-20 transition-opacity pointer-events-none" />
            </button>
            
            <Link
              href="/"
              className="group flex items-center justify-center gap-3 px-10 py-4 bg-bg-2 border border-border text-text-sub font-bebas text-xl uppercase tracking-[0.15em] rounded-xl hover:border-red-500/40 hover:text-text transition-all duration-300"
            >
              <Home className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              Base Map
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer Meta Data */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-muted font-mono text-[10px] uppercase tracking-[0.4em]"
      >
        <div className="flex items-center gap-2 text-red-500">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
          EXCEPTION_HEX: {error.digest || "0xNULL_PTR"}
        </div>
        <div>EMERGENCY_RECOVERY_MODE</div>
        <div>UPLINK_STATUS: INTERRUPTED</div>
      </motion.div>

      <style jsx global>{`
        @keyframes flare {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.2; }
        }
        .animate-flare {
          animation: flare 0.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}


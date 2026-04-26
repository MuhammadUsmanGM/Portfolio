"use client";

import Link from "next/link";
import Image from "next/image";
import { m } from "framer-motion";
import { ArrowLeft, WifiOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-bg p-4 text-center transition-colors duration-300 relative overflow-hidden">
      {/* 
        PREMIUM WATERMARK 404 
        Positioned behind everything, glassy and glowing.
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <m.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.05, 0.1, 0.05], scale: [1, 1.05, 1] }}
          transition={{ 
            opacity: { duration: 2 },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="text-[35vw] md:text-[40vw] font-bebas text-accent leading-none tracking-tighter filter blur-[2px] md:blur-[4px]"
        >
          404
        </m.h1>
        
        {/* Glassmorphic overlay for the 404 */}
        <div className="absolute inset-0 bg-bg/20 backdrop-blur-[2px]" />
        
        {/* Glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-[120px] animate-pulse hidden md:block" />
        <div className="absolute bottom-1/4 right-1/4 w-[25rem] h-[25rem] bg-accent-glow/10 rounded-full blur-[100px] animate-pulse hidden md:block" style={{ animationDelay: '2s' }} />
      </div>

      <m.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center max-w-2xl px-6"
      >
        <div className="relative group mb-8">
          {/* Main Icon Wrapper with Glassmorphism */}
          <m.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-[2.5rem] bg-bg-2/40 border border-border/50 shadow-2xl flex items-center justify-center p-7 backdrop-blur-xl overflow-hidden mx-auto group-hover:border-accent/40 transition-colors duration-500">
              <Image
                src="/favicon.webp"
                alt="Logo"
                width={140}
                height={140}
                className="w-full h-full object-contain brightness-110 drop-shadow-[0_0_20px_rgba(var(--accent),0.4)] opacity-90 group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent w-full h-[20%] animate-scan pointer-events-none" />
            </div>
            
            {/* Pulsing Status Light */}
            <div className="absolute top-2 right-2 flex gap-1 items-center">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_12px_#ef4444]"></span>
              <span className="text-[10px] font-mono text-red-500/80 uppercase tracking-tighter">Connection Lost</span>
            </div>
          </m.div>
        </div>
        
        <div className="space-y-4">
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-5xl md:text-7xl font-bebas text-text tracking-tight uppercase leading-none">
              Lost in <span className="text-accent italic">Cyberspace</span>
            </h2>
            <div className="h-1 w-24 bg-accent mx-auto mt-4 rounded-full opacity-60" />
          </m.div>

          <m.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-text-sub font-dm leading-relaxed text-lg md:text-xl max-w-lg mx-auto"
          >
            The coordinates you provided lead to a digital void. 
            This sector has either been decommissioned or remains classified.
          </m.p>
          
          <m.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="pt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/"
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-accent text-bg font-bebas text-xl uppercase tracking-[0.15em] rounded-xl hover:bg-accent-glow transition-all duration-300 shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Return To Base
              
              {/* Button Glow Effect */}
              <div className="absolute inset-0 rounded-xl bg-accent-glow blur-xl opacity-0 hover:opacity-20 transition-opacity pointer-events-none" />
            </Link>
            
            <button
              onClick={() => window.location.reload()}
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-bg-2 border border-border text-text-sub font-bebas text-xl uppercase tracking-[0.15em] rounded-xl hover:border-accent/40 hover:text-text transition-all duration-300"
            >
              <WifiOff className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Recalibrate
            </button>
          </m.div>
        </div>
      </m.div>

      {/* Footer Meta Data */}
      <m.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-muted font-mono text-[10px] uppercase tracking-[0.4em]"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping"></span>
          ERROR_CODE: 404_NOT_FOUND
        </div>
        <div>SCANNING FOR HOST... TIMEOUT</div>
        <div>SEC_PROTOCOL_V1.4</div>
      </m.div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: -20%; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
}


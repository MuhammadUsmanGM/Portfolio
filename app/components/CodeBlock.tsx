"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function CodeBlock({ code, filename }: { code: string; filename: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#08080a] rounded-3xl border border-border/50 overflow-hidden shadow-2xl border-l-4 border-l-accent">
      <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-mono text-muted uppercase tracking-[0.2em]">{filename}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-muted hover:text-text hover:bg-white/5 px-3 py-1.5 rounded-lg transition-all"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          {copied ? <span className="text-green-500">COPIED</span> : "COPY"}
        </button>
      </div>
      <div className="p-8 overflow-x-auto bg-[#050505]">
        <pre className="text-sm font-mono leading-relaxed selection:bg-accent/30">
          <code className="text-text-sub">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}

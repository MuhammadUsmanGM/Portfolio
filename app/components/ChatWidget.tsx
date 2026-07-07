"use client";

import React, { useState, useRef, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquare } from "lucide-react";
import Image from "next/image";

const _MUGM = Object.freeze({ b: 0x4D756861, g: "MuhammadUsmanGM" });

interface Message {
  role: "user" | "bot";
  content: string;
}

const ChatWidget = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: "bot",
        content: "Hello! I am NOVA, Usman's AI assistant. I have direct access to his codebase, project history, and availability. How can I help you?",
      }]);
    }
  }, [isOpen, messages.length]);


  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Consolodated scroll logic — handles message updates and opening transitions
  useEffect(() => {
    if (isOpen) {
      // Use a small timeout to ensure the DOM has rendered after the animation
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }
  }, [messages, isTyping, isOpen, statusMessage]);

  const FALLBACK_MESSAGES = [
    "Connecting to backup server...",
    "Network busy. Retrying...",
    "Switching processing nodes...",
    "Waiting for response...",
    "Trying alternative route...",
    "System busy. Rerouting...",
    "Connecting to backup service...",
    "Network busy. Switching models...",
    "Rebalancing load...",
    "Retrying with secondary system..."
  ];

  const SECONDARY_FALLBACK = [
    "Secondary node busy. Rerouting...",
    "Connection delayed. Trying tertiary server...",
    "Network failover engaged...",
    "Transitioning to tertiary server...",
    "Bridging to backup cluster..."
  ];

  const submitMessage = async (text: string, provider: "gemini" | "groq" | "openrouter" = "gemini") => {
    if (!text.trim() || (isTyping && provider === "gemini")) return;

    if (provider === "gemini") {
      const userMessage: Message = { role: "user", content: text };
      setMessages((prev) => [...prev, userMessage].slice(-20));
      setInput("");
      setStatusMessage(null);
    }
    
    setIsTyping(true);

    try {
      const response = await fetch("/api/nova", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          messages: [...messages.slice(-19), { role: "user", content: text }],
          provider: provider 
        }),
      });

      const data = await response.json();
      
      if (data.content) {
        setMessages((prev) => [...prev, { role: "bot" as const, content: data.content }].slice(-20));
        setStatusMessage(null);
        setIsTyping(false); // End typing on success
      } else {
        throw new Error("Trigger Failover");
      }
    } catch (err) {
      if (provider === "gemini") {
        const randomMsg = FALLBACK_MESSAGES[Math.floor(Math.random() * FALLBACK_MESSAGES.length)];
        setStatusMessage(randomMsg);
        await new Promise(resolve => setTimeout(resolve, 1500));
        return submitMessage(text, "groq"); // Recursion handles isTyping
      } else if (provider === "groq") {
        const randomMsg = SECONDARY_FALLBACK[Math.floor(Math.random() * SECONDARY_FALLBACK.length)];
        setStatusMessage(randomMsg);
        await new Promise(resolve => setTimeout(resolve, 1500));
        return submitMessage(text, "openrouter");
      }

      setMessages((prev) => [
        ...prev,
        { role: "bot" as const, content: "All systems are currently undergoing maintenance. Please try again or contact Usman directly!" },
      ].slice(-20));
      setStatusMessage(null);
      setIsTyping(false); // End typing on total failure
    }
  };

  const handleSend = () => submitMessage(input);

  const quickPrompts = [
    "What is Usman's core tech stack?",
    "Tell me about his AI agent projects.",
    "Is he available for freelance work?"
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Trigger Button & Thought Label */}
      <div className="fixed z-50 bottom-24 right-4 md:bottom-8 md:right-8 flex flex-col items-end gap-3 pointer-events-none">
        <AnimatePresence>
          {!isOpen && (
            <m.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="px-5 py-2.5 rounded-2xl bg-bg/90 backdrop-blur-md border-2 border-accent/30 shadow-[0_10px_30px_rgba(201,150,12,0.15)] relative"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent leading-none mb-1">
                  Hi! I&apos;m NOVA
                </span>
                <span className="text-[8px] font-bold uppercase tracking-widest text-text/60 leading-none">
                  Usman&apos;s AI Assistant
                </span>
              </div>
              {/* Tooltip Arrow */}
              <div className="absolute bottom-[-7px] right-7 w-3.5 h-3.5 bg-bg/90 border-r-2 border-b-2 border-accent/30 rotate-45" />
            </m.div>
          )}
        </AnimatePresence>

        <m.button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Chat" : "Open Chat"}
          className={`pointer-events-auto w-16 h-16 rounded-full bg-accent/10 backdrop-blur-xl border-2 ${
            isOpen ? "border-accent/60" : "border-accent/30"
          } text-accent shadow-[0_15px_50px_rgba(201,150,12,0.25)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all relative group overflow-hidden`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Internal Glow Effect */}
          <div className={`absolute inset-0 bg-accent/20 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
          
          <Image 
            src="/bot.webp" 
            alt="NOVA" 
            width={36} 
            height={36}
            priority 
            className={`object-contain drop-shadow-[0_0_10px_rgba(201,150,12,0.5)] transition-all duration-500 ${
              isOpen ? "scale-110 grayscale-0" : "group-hover:scale-110"
            }`} 
          />
        </m.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            role="dialog"
            aria-label="NOVA AI Assistant"
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed z-50 bottom-24 left-4 right-4 md:left-auto md:bottom-28 md:right-8 md:w-[350px] h-[480px] bg-bg/95 backdrop-blur-2xl border border-accent/30 rounded-[2rem] shadow-[0_40px_120px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-accent/10 bg-accent/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/30 overflow-hidden">
                  <Image src="/bot.webp" alt="NOVA" fill sizes="36px" priority className="object-contain p-1.5" />
                </div>
                <div>
                  <h3 className="text-lg font-bebas tracking-[0.2em] text-accent leading-none">NOVA</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(201,150,12,0.8)]" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-accent/70">System Active</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close Chat"
                className="text-accent/60 hover:text-accent transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth custom-scrollbar"
            >
              {messages.map((msg, idx) => (
                <m.div
                  initial={{ opacity: 0, y: 10, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-[1.2rem] text-xs font-medium leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-bg rounded-tr-none shadow-lg shadow-accent/10 border border-white/5"
                        : "bg-white/5 backdrop-blur-md border border-accent/20 text-text rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </m.div>
              ))}
              
              {isTyping && (
                <div className="flex flex-col gap-2">
                  <div className="flex justify-start">
                    <div className="bg-bg border border-border/30 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center shadow-sm">
                      <span className="w-1 h-1 rounded-full bg-accent animate-bounce" />
                      <span className="w-1 h-1 rounded-full bg-accent animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1 h-1 rounded-full bg-accent animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                  {statusMessage && (
                    <m.div 
                      initial={{ opacity: 0, scale: 0.95, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="mt-1 ml-2 flex items-center gap-2.5 px-3 py-1.5 bg-accent/5 backdrop-blur-md border border-accent/20 rounded-full w-fit shadow-[0_0_20px_rgba(201,150,12,0.05)]"
                    >
                      <div className="relative flex items-center justify-center w-2 h-2">
                        <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-40" />
                        <div className="relative w-1.5 h-1.5 bg-accent rounded-full shadow-[0_0_8px_rgba(201,150,12,0.8)]" />
                      </div>
                      <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-accent/90 font-bold">
                        {statusMessage}
                      </span>
                    </m.div>
                  )}
                </div>
              )}

              {messages.length === 1 && !isTyping && (
                <m.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-2 mt-4 ml-1"
                >
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted mb-1 pl-1">Suggested Prompts</span>
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => submitMessage(prompt)}
                      className="text-left text-[11px] font-bold bg-bg border border-border/50 hover:bg-accent/5 hover:border-accent/40 text-text-sub hover:text-accent rounded-xl px-4 py-2.5 transition-all w-fit shadow-sm"
                    >
                      {prompt}
                    </button>
                  ))}
                </m.div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-bg border-t border-border/30">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask NOVA anything..."
                  aria-label="Ask NOVA"
                  className="flex-1 bg-bg-2 border border-border/50 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  disabled={!input.trim() || isTyping}
                  aria-label="Send Message"
                  className="w-10 h-10 rounded-xl bg-accent text-bg flex items-center justify-center shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all font-black"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42"; // authorship marker

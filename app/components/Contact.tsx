"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { sendEmail } from "@/app/actions/contact";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const formData = new FormData(event.currentTarget);
    
    try {
      const result = await sendEmail(formData);
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to send message.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="pt-16 pb-32 px-6 md:px-12 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-8 h-[2px] bg-accent" />
            <span className="text-accent text-[0.75rem] font-black uppercase tracking-[0.18em] font-dm">
              Contact
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(3.5rem,7vw,6rem)] font-bebas uppercase tracking-tighter leading-[0.92] text-text"
          >
            SCALE YOUR <br />
            <span className="text-accent">OPERATIONS.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Name</label>
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className="w-full bg-bg-2 border-b-2 border-border focus:border-accent outline-none py-4 px-1 text-text font-bold transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Email</label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full bg-bg-2 border-b-2 border-border focus:border-accent outline-none py-4 px-1 text-text font-bold transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Message</label>
                <textarea
                  required
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="What are we building together?"
                  className="w-full bg-bg-2 border-b-2 border-border focus:border-accent outline-none py-4 px-1 text-text font-bold transition-all resize-none"
                />
              </div>

              <div className="flex items-center gap-6">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="group flex items-center gap-3 px-10 py-4 bg-accent text-bg rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitting ? "Sending..." : "Let's Talk"}
                  <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                {status === "success" && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-xs">
                    <CheckCircle2 size={16} /> Sent successfully!
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs">
                    <AlertCircle size={16} /> {errorMessage}
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 space-y-10 lg:pl-12 border-t lg:border-t-0 lg:border-l border-border/50 pt-16 lg:pt-0"
          >
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-text">Available for opportunities</span>
              </div>
              
              <div className="space-y-4">
                <a 
                  href="mailto:mu.ai.dev@gmail.com" 
                  className="block text-[clamp(1.5rem,6vw,2.5rem)] font-bebas tracking-tighter text-text hover:text-accent transition-colors break-all leading-none"
                >
                  mu.ai.dev@gmail.com
                </a>
                <div className="flex items-center gap-2 text-muted text-lg sm:text-xl font-bebas tracking-tight">
                  <MapPin size={20} className="sm:w-6 sm:h-6" />
                  <span>Lahore, Pakistan</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="https://github.com/MuhammadUsmanGM" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-bg-2 border border-border rounded-xl font-bold uppercase tracking-widest text-[10px] hover:border-accent transition-all group">
                <Github size={16} className="group-hover:text-accent" />
                GitHub
              </a>
              <a href="https://linkedin.com/in/muhammad-usman-ai-dev" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-bg-2 border border-border rounded-xl font-bold uppercase tracking-widest text-[10px] hover:border-accent transition-all group">
                <Linkedin size={16} className="group-hover:text-accent" />
                LinkedIn
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

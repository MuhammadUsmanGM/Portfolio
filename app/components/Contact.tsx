"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { sendEmail } from "@/app/actions/contact";
import { toast } from "sonner";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [msgLen, setMsgLen] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => {
        if (status === "success") setStatus("idle");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const formData = new FormData(event.currentTarget);
    const honeypot = formData.get("website") as string;
    
    // Bot check
    if (honeypot) {
      setIsSubmitting(false);
      setStatus("success"); // Fake success for bots
      return;
    }

    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const message = (formData.get("message") as string).trim();

    if (!name || !email || !message) {
      setStatus("error");
      const err = "Please fill in all fields.";
      setErrorMessage(err);
      toast.error(err);
      setIsSubmitting(false);
      return;
    }

    if (message.length < 10) {
      setStatus("error");
      const err = "Message must be at least 10 characters.";
      setErrorMessage(err);
      toast.error(err);
      setIsSubmitting(false);
      return;
    }

    // Re-create entry with trimmed values for the action
    const trimmedData = new FormData();
    trimmedData.append("name", name);
    trimmedData.append("email", email);
    trimmedData.append("message", message);
    
    try {
      const result = await sendEmail(trimmedData);
      if (result.success) {
        setStatus("success");
        toast.success("Message Sent Successfully!", {
          description: "Thank you! I will get back to you soon.",
          duration: 5000,
        });
        formRef.current?.reset();
        setMsgLen(0);
      } else {
        setStatus("error");
        const err = result.error || "Failed to send message.";
        setErrorMessage(err);
        toast.error(err);
      }
    } catch (err) {
      setStatus("error");
      const errorMsg = "Something went wrong. Please try again.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
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
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              {/* Honeypot Field */}
              <div className="hidden">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-muted ml-1">Name</label>
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    maxLength={100}
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
                    autoComplete="email"
                    maxLength={254}
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
                  minLength={10}
                  maxLength={3000}
                  onChange={(e) => setMsgLen(e.target.value.length)}
                  placeholder="What are we building together?"
                  className="w-full bg-bg-2 border-b-2 border-border focus:border-accent outline-none py-4 px-1 text-text font-bold transition-all resize-none"
                />
                <p className="text-[10px] text-muted text-right mt-1 font-mono">{msgLen} / 3000</p>
              </div>

              <div className="flex items-center gap-6">
                <button
                  disabled={isSubmitting || status === "success"}
                  type="submit"
                  className={`group relative flex items-center gap-3 px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 disabled:hover:scale-100 ${
                    status === "success" 
                      ? "bg-green-500 text-white" 
                      : "bg-accent text-bg hover:scale-105 active:scale-95 shadow-[0_8px_32px_rgba(245,166,35,0.25)]"
                  } ${isSubmitting ? "opacity-70 cursor-wait" : ""}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      Sending <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>...</motion.span>
                    </span>
                  ) : status === "success" ? (
                    <motion.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2">
                      Message Sent <CheckCircle2 size={14} className="animate-in zoom-in duration-300" />
                    </motion.span>
                  ) : (
                    <>
                      Let's Talk 
                      <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                {status === "error" && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs font-dm">
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
                  className="block text-[clamp(1.5rem,6vw,2.5rem)] font-mono tracking-tight text-text hover:text-accent transition-colors break-all leading-none lowercase"
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
              <a href="https://www.linkedin.com/in/muhammad-usman-ai-dev" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-bg-2 border border-border rounded-xl font-bold uppercase tracking-widest text-[10px] hover:border-accent transition-all group">
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

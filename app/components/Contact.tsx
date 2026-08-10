"use client";

import React, { useState, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  MessageSquare
} from "lucide-react";
import { sendEmail } from "@/app/actions/contact";
import { toast } from "sonner";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const FloatingInput = ({ 
  label, 
  id, 
  name, 
  type = "text", 
  icon: Icon, 
  error, 
  ...props 
}: { 
  label: string; 
  id: string; 
  name: string; 
  type?: string; 
  icon: any; 
  error?: string;
  [key: string]: any;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="group relative space-y-2">
      <div className={`relative flex items-center transition-all duration-500 rounded-2xl overflow-hidden border backdrop-blur-xl ${
        isFocused 
          ? "bg-accent/5 border-accent/30 shadow-[0_0_20px_rgba(245,166,35,0.1)]" 
          : error
            ? "bg-red-500/5 border-red-500/30"
            : "bg-bg-2/30 border-border/20 hover:border-border/40 hover:bg-bg-2/50"
      }`}>
        <div className={`pl-5 transition-colors duration-300 ${
          isFocused ? "text-accent" : error ? "text-red-500" : "text-muted"
        }`}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
        
        <div className="relative flex-1">
          <input
            {...props}
            id={id}
            name={name}
            type={type}
            onFocus={() => setIsFocused(true)}
            onBlur={(e) => {
              setIsFocused(false);
              setValue(e.target.value);
            }}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-transparent border-none outline-none pt-8 pb-4 px-4 text-text font-bold text-[15px] placeholder-transparent peer transition-all"
            placeholder={label}
          />
          <label
            htmlFor={id}
            className={`absolute left-4 transition-all duration-300 pointer-events-none font-black uppercase tracking-widest text-[10px] ${
              isFocused || value 
                ? "top-3 text-accent" 
                : "top-1/2 -translate-y-1/2 text-muted/60"
            }`}
          >
            {label}
          </label>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <m.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-4"
          >
            {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [msgLen, setMsgLen] = useState(0);
  const [msgFocused, setMsgFocused] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => {
        if (status === "success") setStatus("idle");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setStatus("idle");

    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const message = (formData.get("message") as string).trim();
    const honeypot = formData.get("website") as string;
    
    // Bot check
    if (honeypot) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStatus("success");
        formRef.current?.reset();
      }, 1000);
      return;
    }

    const newErrors: FormErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!message) {
      newErrors.message = "Message is required";
    } else if (message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsSubmitting(true);

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
          <m.div
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
          </m.div>
          
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[clamp(3.5rem,7vw,6rem)] font-bebas uppercase tracking-tighter leading-[0.92] text-text"
          >
            SCALE YOUR <br />
            <span className="text-accent">OPERATIONS.</span>
          </m.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Contact Form */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-10">
              {/* Honeypot Field */}
              <div className="hidden">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FloatingInput
                  id="name"
                  name="name"
                  label="Full Name"
                  icon={User}
                  error={errors.name}
                  autoComplete="name"
                />
                <FloatingInput
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address"
                  icon={Mail}
                  error={errors.email}
                  autoComplete="email"
                />
              </div>
              
              <div className="group relative space-y-2">
                <div className={`relative flex transition-all duration-500 rounded-2xl overflow-hidden border backdrop-blur-xl ${
                  msgFocused
                    ? "bg-accent/5 border-accent/30 shadow-[0_0_20px_rgba(245,166,35,0.1)]" 
                    : errors.message 
                      ? "bg-red-500/5 border-red-500/30"
                      : "bg-bg-2/30 border-border/20 hover:border-border/40 hover:bg-bg-2/50"
                }`}>
                  <div className={`pl-5 pt-8 transition-colors duration-300 ${
                    msgFocused ? "text-accent" : errors.message ? "text-red-500" : "text-muted"
                  }`}>
                    <MessageSquare size={20} strokeWidth={2.5} />
                  </div>
                  
                  <div className="relative flex-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      maxLength={3000}
                      onFocus={() => setMsgFocused(true)}
                      onBlur={() => setMsgFocused(false)}
                      onChange={(e) => {
                        setMsgLen(e.target.value.length);
                        if (errors.message) setErrors(prev => ({ ...prev, message: undefined }));
                      }}
                      placeholder="What we are building"
                      className="w-full bg-transparent border-none outline-none pt-8 pb-6 px-4 text-text font-bold text-[15px] placeholder-transparent peer transition-all resize-none"
                    />
                    <label
                      htmlFor="message"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none font-black uppercase tracking-widest text-[10px] ${
                        msgFocused || msgLen > 0 
                          ? "top-3 text-accent" 
                          : "top-8 text-muted/60"
                      }`}
                    >
                      What we are building
                    </label>
                  </div>

                  {/* Circular Character Count */}
                  <div className="absolute right-4 bottom-4 flex items-center justify-center">
                    <div className="relative w-8 h-8">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="transparent"
                          className="text-border/20"
                        />
                        <m.circle
                          cx="16"
                          cy="16"
                          r="14"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="transparent"
                          strokeDasharray={88}
                          initial={{ strokeDashoffset: 88 }}
                          animate={{ strokeDashoffset: 88 - (88 * Math.min(msgLen, 3000)) / 3000 }}
                          className="text-accent"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-muted">
                        {Math.round((msgLen / 3000) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {errors.message && (
                    <m.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-4"
                    >
                      {errors.message}
                    </m.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <button
                  disabled={isSubmitting || status === "success"}
                  type="submit"
                  className={`group relative flex items-center gap-3 px-12 py-5 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 disabled:hover:scale-100 ${
                    status === "success" 
                      ? "bg-green-500 text-white shadow-[0_8px_32px_rgba(34,197,94,0.25)]" 
                      : "bg-accent text-bg hover:scale-105 active:scale-95 shadow-[0_8px_32px_rgba(245,166,35,0.35)]"
                  } ${isSubmitting ? "opacity-70 cursor-wait" : ""}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      Sending <m.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>...</m.span>
                    </span>
                  ) : status === "success" ? (
                    <m.span initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2">
                      Message Sent <CheckCircle2 size={14} className="animate-in zoom-in duration-300" />
                    </m.span>
                  ) : (
                    <>
                      Send Message
                      <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>

                {status === "error" && (
                  <m.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-xs font-dm">
                    <AlertCircle size={16} /> {errorMessage}
                  </m.div>
                )}
              </div>
            </form>
          </m.div>

          {/* Right: Info */}
          <m.div
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
              <a href="https://www.linkedin.com/in/muhammadusmangm" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-bg-2 border border-border rounded-xl font-bold uppercase tracking-widest text-[10px] hover:border-accent transition-all group">
                <Linkedin size={16} className="group-hover:text-accent" />
                LinkedIn
              </a>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

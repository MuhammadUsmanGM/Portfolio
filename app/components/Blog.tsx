"use client";

import React from "react";
import { m } from "framer-motion";
import { ArrowRight, Calendar, Clock, ArrowUpRight, Terminal } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tag: string;
  excerpt: string;
}

const Blog = ({ posts }: { posts: BlogPost[] }) => {
  // Only show the first 3 posts on the landing page
  const displayPosts = posts.slice(0, 3);

  return (
    <section id="blog" className="pt-24 pb-32 px-6 md:px-12 bg-bg relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <m.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-[2px] bg-accent shadow-[0_0_10px_var(--accent)]" />
              <span className="text-accent text-[0.75rem] font-black uppercase tracking-[0.3em] font-dm">
                Technical Archive
              </span>
            </m.div>
            
            <m.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-[clamp(2.5rem,8vw,5.5rem)] font-black uppercase tracking-tighter text-text leading-[0.85]"
            >
              Technical <br />
              <span className="text-accent italic">Logs & Deep Dives.</span>
            </m.h2>
          </div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link 
              href="/blog"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-bg-2 border border-border/50 rounded-full font-black text-[11px] uppercase tracking-[0.25em] transition-all hover:border-accent/50 hover:bg-bg-2 shadow-xl hover:shadow-accent/5 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                Access Full Archive <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </m.div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post, index) => (
            <m.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
            >
              <Link 
                href={`/blog/${post.slug}`}
                className="group relative flex flex-col h-full bg-bg-2/40 backdrop-blur-2xl border border-border/40 rounded-[2.5rem] overflow-hidden hover:border-accent/40 hover:bg-bg-2/60 transition-all duration-700 cursor-pointer block"
              >
                {/* Card Header Visual */}
                <div className="h-2 w-full bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="p-8 flex flex-col h-full relative">
                  {/* Numbering Indicator */}
                  <div className="absolute top-8 right-10 text-accent/10 font-bebas text-6xl group-hover:text-accent/20 transition-colors pointer-events-none">
                    0{index + 1}
                  </div>

                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center border border-border/40 text-accent group-hover:scale-110 group-hover:border-accent/30 transition-all duration-500">
                      <Terminal size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black uppercase tracking-widest text-accent mb-0.5">
                        {post.tag}
                      </span>
                      <div className="flex items-center gap-3 text-muted text-[9px] font-mono uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                          <Calendar size={11} className="text-accent/50" /> {post.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="group/title inline-block">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-text mb-5 leading-[1.1] group-hover:text-accent transition-colors duration-300">
                      {post.title}
                    </h3>
                  </div>

                  <p className="text-text-sub text-sm leading-relaxed mb-12 font-medium opacity-70 group-hover:opacity-100 transition-all duration-500 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-8 border-t border-border/20">
                    <div className="flex items-center gap-2.5 text-muted text-[9px] font-mono uppercase tracking-[0.1em]">
                      <Clock size={12} className="text-accent/40" />
                      <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                        {post.readTime}
                      </span>
                    </div>
                    <div 
                      className="relative w-14 h-14 flex items-center justify-center text-muted group-hover:text-accent transition-all duration-500"
                    >
                      <ArrowUpRight size={28} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                      {/* Hover Glow Ring */}
                      <div className="absolute inset-0 rounded-full border border-accent/0 group-hover:border-accent/20 group-hover:bg-accent/5 transition-all duration-500 scale-75 group-hover:scale-100" />
                    </div>
                  </div>
                </div>

                {/* Internal Glow Effect */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/5 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </Link>
            </m.article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Blog;

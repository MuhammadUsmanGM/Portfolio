import React from "react";
import { Calendar, Clock, ArrowUpRight, ArrowLeft, Terminal } from "lucide-react";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-bg pt-32 pb-32 px-6 md:px-12 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Navigation */}
        <div className="mb-16">
          <Link 
            href="/"
            className="group inline-flex items-center gap-2 text-muted hover:text-accent transition-colors text-[11px] font-black uppercase tracking-widest"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-24 max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-[2px] bg-accent shadow-[0_0_10px_var(--accent)]" />
            <span className="text-accent text-[0.75rem] font-black uppercase tracking-[0.3em] font-dm">
              The Archive
            </span>
          </div>
          
          <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-black tracking-tighter leading-[0.85] uppercase text-text">
            Technical <br />
            <span className="text-accent italic">Logs.</span>
          </h1>
          
          <p className="text-[clamp(1rem,3vw,1.25rem)] text-text-sub max-w-2xl mt-10 leading-relaxed font-medium opacity-90">
            A permanent record of my research into autonomous agents, systems engineering, and the future of LLM orchestration.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <article
              key={post.slug}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group relative flex flex-col h-full bg-bg-2/40 backdrop-blur-2xl border border-border/40 rounded-[2.5rem] overflow-hidden hover:border-accent/40 hover:bg-bg-2/60 transition-all duration-700 cursor-pointer block"
              >
                {/* Card Header Visual */}
                <div className="h-2 w-full bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="p-10 flex flex-col h-full relative">
                  {/* Numbering Indicator */}
                  <div className="absolute top-8 right-10 text-accent/10 font-bebas text-6xl group-hover:text-accent/20 transition-colors pointer-events-none">
                    {(index + 1).toString().padStart(2, '0')}
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
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

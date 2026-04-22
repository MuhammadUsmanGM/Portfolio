import React from "react";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import BlogContent from "./BlogContent";

// Next.js Server Component
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg pt-32 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Navigation */}
        <div className="mb-12">
          <Link 
            href="/blog"
            className="group inline-flex items-center gap-2 text-muted hover:text-accent transition-colors text-[11px] font-black uppercase tracking-widest"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Archive
          </Link>
        </div>

        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[9px] font-black uppercase tracking-widest">
              {post.tag}
            </span>
            <div className="flex items-center gap-4 text-muted text-[10px] font-mono uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Calendar size={12} className="text-accent/50" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={12} className="text-accent/50" /> {post.readTime}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight uppercase text-text mb-8">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-8 border-y border-border/20">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 overflow-hidden relative">
                <span className="absolute inset-0 flex items-center justify-center font-black text-accent text-xs">MU</span>
              </div>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-widest text-muted">Author</span>
                <span className="block text-sm font-bold text-text uppercase tracking-tight">Muhammad Usman</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content (Client Component for Markdown Rendering) */}
        <BlogContent content={post.content} />

      </div>
    </main>
  );
}

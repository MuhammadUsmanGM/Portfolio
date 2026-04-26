"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/app/components/CodeBlock";
import { m } from "framer-motion";

interface BlogContentProps {
  content: string;
}

const BlogContent = ({ content }: BlogContentProps) => {
  return (
    <m.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="prose prose-invert prose-accent max-w-none"
    >
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            
            // Extract filename from code comment if present, e.g. // filename.ts
            const content = String(children).replace(/\n$/, "");
            const lines = content.split("\n");
            let filename = "terminal";
            
            if (lines[0].startsWith("// ") || lines[0].startsWith("# ")) {
              filename = lines[0].replace("// ", "").replace("# ", "").trim();
            }

            return !inline ? (
              <div className="my-8">
                <CodeBlock 
                  code={content} 
                  filename={filename || language || "source"} 
                />
              </div>
            ) : (
              <code className={`${className} bg-bg-2 px-1.5 py-0.5 rounded text-accent font-mono text-xs`} {...props}>
                {children}
              </code>
            );
          },
          // Customize other markdown elements to match the premium theme
          h2: ({ children }) => (
            <h2 className="text-3xl font-black uppercase tracking-tight text-text mt-16 mb-8 border-l-4 border-accent pl-6">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-black uppercase tracking-tight text-text mt-12 mb-6">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <div className="text-text-sub leading-relaxed text-lg mb-8 opacity-90">
              {children}
            </div>
          ),
          ul: ({ children }) => (
            <ul className="space-y-4 mb-8 list-none pl-0">
              {children}
            </ul>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-3 text-text-sub text-lg">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span>{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-accent bg-bg-2/50 p-8 rounded-2xl italic text-xl text-text-sub my-12">
              {children}
            </blockquote>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </m.div>
  );
};

export default BlogContent;

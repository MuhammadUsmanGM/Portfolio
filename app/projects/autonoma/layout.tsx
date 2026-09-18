import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autonoma — Open-Source Autonomous AI Agent Platform & Digital Employee | Muhammad Usman",
  description: "Explore Autonoma: an open-source AI assistant that connects across Telegram, Discord, WhatsApp, and Gmail with smart memory, safe tools, and a live web dashboard.",
  alternates: {
    canonical: "https://buildwithusman.me/projects/autonoma",
  },
  openGraph: {
    title: "Autonoma — Open-Source Autonomous AI Agent Platform & Digital Employee",
    description: "An open-source AI agent that works like a digital assistant across your favorite chat apps with persistent memory and a live web dashboard.",
    url: "https://buildwithusman.me/projects/autonoma",
    siteName: "Muhammad Usman Portfolio",
    type: "article",
    images: [
      {
        url: "/og_img.webp",
        width: 1200,
        height: 630,
        alt: "Autonoma Project Overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autonoma — Open-Source Autonomous AI Agent Platform",
    description: "An open-source AI agent that works like a digital assistant across Telegram, Discord, WhatsApp, and Gmail.",
    images: ["/og_img.webp"],
  },
};

export default function AutonomaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42";

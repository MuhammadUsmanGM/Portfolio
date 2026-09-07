import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autonoma — Multi-Channel AI Support Agent & Autonomous Workflows | Muhammad Usman",
  description: "Deep dive into Autonoma: an enterprise-grade multi-channel AI support agent with autonomous ticket resolution, RAG knowledge retrieval, and human-in-the-loop escalation.",
  alternates: {
    canonical: "https://buildwithusman.me/projects/autonoma",
  },
  openGraph: {
    title: "Autonoma — Multi-Channel AI Support Agent & Autonomous Workflows",
    description: "Enterprise-grade multi-channel AI support agent with autonomous ticket resolution and human-in-the-loop escalation.",
    url: "https://buildwithusman.me/projects/autonoma",
    siteName: "Muhammad Usman Portfolio",
    type: "article",
    images: [
      {
        url: "/og_img.webp",
        width: 1200,
        height: 630,
        alt: "Autonoma Case Study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autonoma — Multi-Channel AI Support Agent",
    description: "Enterprise-grade multi-channel AI support agent with autonomous ticket resolution.",
    images: ["/og_img.webp"],
  },
};

export default function AutonomaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42";

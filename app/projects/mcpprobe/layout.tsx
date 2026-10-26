import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCPProbe — Model Context Protocol Diagnostic Scanner | Muhammad Usman",
  description: "Explore MCPProbe: an open-source diagnostic scanner for the Anthropic Model Context Protocol ecosystem. Validates server health, tool schemas, and client compatibility across Cursor, Claude, and VS Code.",
  alternates: {
    canonical: "https://buildwithusman.me/projects/mcpprobe",
  },
  openGraph: {
    title: "MCPProbe — Model Context Protocol Diagnostic Scanner",
    description: "Diagnostic scanner and health-check engine for Model Context Protocol servers.",
    url: "https://buildwithusman.me/projects/mcpprobe",
    siteName: "Muhammad Usman Portfolio",
    type: "article",
    images: [
      {
        url: "/og_img.webp",
        width: 1200,
        height: 630,
        alt: "MCPProbe Case Study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MCPProbe — Model Context Protocol Diagnostic Scanner",
    description: "Diagnostic scanner and health-check engine for Model Context Protocol servers.",
    images: ["/og_img.webp"],
  },
};

export default function MCPProbeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodeStick — Portable Offline LLM Environment on a USB Stick | Muhammad Usman",
  description: "Explore CodeStick: a zero-install, zero-residue local AI coding assistant pre-packaged on a USB flash drive for completely offline development environments.",
  alternates: {
    canonical: "https://buildwithusman.me/projects/code-stick",
  },
  openGraph: {
    title: "CodeStick — Portable Offline LLM Environment on a USB Stick",
    description: "Zero-install, zero-residue local AI coding assistant pre-packaged on a USB flash drive for offline dev environments.",
    url: "https://buildwithusman.me/projects/code-stick",
    siteName: "Muhammad Usman Portfolio",
    type: "article",
    images: [
      {
        url: "/og_img.webp",
        width: 1200,
        height: 630,
        alt: "CodeStick Case Study",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeStick — Portable Offline LLM Environment",
    description: "Zero-install local AI coding assistant pre-packaged on a USB flash drive.",
    images: ["/og_img.webp"],
  },
};

export default function CodeStickLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42";

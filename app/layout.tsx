import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import ChatWidget from "./components/ChatWidget";
import Loader from "./components/Loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Usman - Full-Stack AI Engineer | Systems That Think & Scale",
  description: "Full-Stack AI Engineer architecting systems that automate high-value operations and reduce overhead for scaling businesses. Based in Lahore, Pakistan.",
  keywords: [
    "AI Engineer",
    "Automation Specialist",
    "LLM Systems",
    "Autonomous Agents",
    "RAG Pipelines",
    "Business Process Automation",
    "AI Architecture",
    "Lahore Pakistan"
  ],
  authors: [{ name: "Muhammad Usman" }],
  creator: "Muhammad Usman",
  icons: {
    icon: "/favicon.webp",
    apple: "/favicon.webp",
  },
  openGraph: {
    type: "website",
    url: "https://buildwithusman.me",
    title: "Muhammad Usman — Full-Stack AI Engineer | Systems That Think & Scale",
    description: "Architecting autonomous AI operations that automate high-value workflows and reduce business overhead.",
    siteName: "Muhammad Usman Portfolio",
    images: [{
      url: "/og_img.jpg",
      width: 1200,
      height: 630,
      alt: "Muhammad Usman — Full-Stack AI Engineer"
    }]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${dmSans.variable} antialiased`}
      >
        <Loader />
        <Navbar />
        {children}
        <MobileNav />
        <ChatWidget />
      </body>
    </html>
  );
}

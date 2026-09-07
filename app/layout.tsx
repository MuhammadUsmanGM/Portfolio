import type { Metadata } from "next"; 
import { Geist, Geist_Mono, Bebas_Neue, DM_Sans } from "next/font/google";	
// @ts-ignore: allow global CSS import in layout file
import "./globals.css"; 
import Navbar from "./components/Navbar"; 
import MobileNav from "./components/MobileNav";	
import Loader from "./components/Loader";	
import ChatWidget from "./components/ChatWidget"; 
import { LazyMotion, domAnimation } from "framer-motion";	
import { SpeedInsights } from "@vercel/speed-insights/next"; 
import { Analytics } from "@vercel/analytics/next";	
import SmoothScroll from "./components/SmoothScroll";
 
const _MUGM = Object.freeze({ b: 0x4D756861, g: "MuhammadUsmanGM" }); 
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
  metadataBase: new URL('https://buildwithusman.me'),
  title: "Muhammad Usman - Full-Stack AI Engineer | Systems That Think & Scale",
  description: "Full-Stack AI Engineer architecting autonomous AI operations, RAG pipelines, and LLM systems that automate high-value operations for scaling businesses. Based in Lahore, Pakistan.",
  keywords: [
    "Muhammad Usman",
    "Full-Stack AI Engineer",
    "Agentic AI Engineer",
    "Autonomous AI Agents",
    "LLM Systems Engineer",
    "RAG Pipelines Specialist",
    "Business Process Automation",
    "LangChain Developer",
    "AI Architecture Lahore",
    "Python TypeScript AI Specialist",
    "Custom AI Workflows"
  ],
  authors: [{ name: "Muhammad Usman", url: "https://buildwithusman.me" }],
  creator: "Muhammad Usman",
  publisher: "Muhammad Usman",
  icons: {
    icon: "/favicon.webp",
    apple: "/favicon.webp",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "profile",
    url: "https://buildwithusman.me",
    title: "Muhammad Usman — Full-Stack AI Engineer | Systems That Think & Scale",
    description: "Architecting autonomous AI operations and agentic workflows that automate high-value operations and eliminate overhead.",
    siteName: "Muhammad Usman Portfolio",
    locale: "en_US",
    images: [{
      url: "/og_img.webp",
      width: 1200,
      height: 630,
      alt: "Muhammad Usman — Full-Stack AI Engineer"
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Usman — Full-Stack AI Engineer',
    description: 'Architecting autonomous AI operations and agentic workflows that automate high-value operations.',
    images: ['/og_img.webp'],
    creator: '@MuhammadUsmanGM',
  },
};

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="author" content="Muhammad Usman" data-gh="MuhammadUsmanGM" data-sig="MUGM-7e42-d9b1" />
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="application-name" content="Muhammad Usman Portfolio" />
        <meta name="apple-mobile-web-app-title" content="Usman Portfolio" />
        <link rel="preload" href="/favicon.webp" as="image" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${dmSans.variable} antialiased`}
      >
        <SmoothScroll>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Person",
                    "@id": "https://buildwithusman.me/#person",
                    "name": "Muhammad Usman",
                    "url": "https://buildwithusman.me",
                    "image": "https://buildwithusman.me/main.webp",
                    "jobTitle": "Full-Stack AI Engineer",
                    "description": "Full-Stack AI Engineer architecting systems that automate high-value operations and reduce overhead for scaling businesses.",
                    "address": {
                      "@type": "PostalAddress",
                      "addressLocality": "Lahore",
                      "addressCountry": "Pakistan"
                    },
                    "email": "mu.ai.dev@gmail.com",
                    "knowsAbout": [
                      "AI Engineering",
                      "Autonomous AI Agents",
                      "LLM Systems",
                      "RAG Pipelines",
                      "Process Automation",
                      "Full-Stack Development",
                      "Python",
                      "TypeScript"
                    ],
                    "sameAs": [
                      "https://github.com/MuhammadUsmanGM",
                      "https://www.linkedin.com/in/muhammadusmangm"
                    ]
                  },
                  {
                    "@type": "ProfilePage",
                    "@id": "https://buildwithusman.me/#profilepage",
                    "url": "https://buildwithusman.me",
                    "name": "Muhammad Usman — Full-Stack AI Engineer Portfolio",
                    "mainEntity": {
                      "@id": "https://buildwithusman.me/#person"
                    }
                  },
                  {
                    "@type": "WebSite",
                    "@id": "https://buildwithusman.me/#website",
                    "url": "https://buildwithusman.me",
                    "name": "Muhammad Usman Portfolio",
                    "publisher": {
                      "@id": "https://buildwithusman.me/#person"
                    }
                  }
                ]
              })
            }}
          />
          <Toaster 
            position="top-right" 
            richColors 
            theme="system" 
            toastOptions={{
              style: { 
                background: 'var(--bg-2)', 
                color: 'var(--text)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              },
            }}
          />
          <LazyMotion features={domAnimation}>
            <Loader />
            <Navbar />
            {children}
            <MobileNav />
            <ChatWidget />
          </LazyMotion>
          <SpeedInsights />
          <Analytics />
        </SmoothScroll>
        {/* MuhammadUsmanGM &#x200B;&#x200C;&#x200B; MUGM-7e42 */}
      </body>
    </html>
  );
}

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42"; // authorship marker

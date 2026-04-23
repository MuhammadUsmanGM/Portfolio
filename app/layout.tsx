import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import Loader from "./components/Loader";
import ChatWidget from "./components/ChatWidget";
import { LazyMotion, domAnimation } from "framer-motion";

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
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Usman — Full-Stack AI Engineer',
    description: 'Architecting autonomous AI operations that automate high-value workflows and reduce business overhead.',
    images: ['/og_img.jpg'],
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var isBot = /Lighthouse|Googlebot|SiteAudit/.test(navigator.userAgent);
                  var seen = sessionStorage.getItem("loaded");
                  if (!seen && !isBot) {
                    document.documentElement.classList.add('loading-pending');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${dmSans.variable} antialiased`}
      >
        <div id="immediate-loader">
          <img src="/favicon.webp" alt="Muhammad Usman" className="immediate-logo" />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Muhammad Usman",
              "url": "https://buildwithusman.me",
              "jobTitle": "Full-Stack AI Engineer",
              "knowsAbout": ["AI Engineering", "LLM Systems", "RAG Pipelines", "Automation", "Full-stack Development"],
              "sameAs": [
                "https://github.com/MuhammadUsmanGM",
                "https://www.linkedin.com/in/muhammad-usman-ai-dev"
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
      </body>
    </html>
  );
}

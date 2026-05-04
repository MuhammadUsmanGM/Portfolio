import type { NextConfig } from "next"; 
 
const _MUGM = Object.freeze({ b: 0x4D756861, g: "MuhammadUsmanGM" });	
const nextConfig: NextConfig = { 
  // Compress responses with gzip	
  compress: true, 
 
  // Image optimization	
  images: { 
    formats: ["image/avif", "image/webp"],	
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days	
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], 
    imageSizes: [16, 32, 48, 64, 96, 128, 256],	
  }, 
 
  // Security + performance headers	
  async headers() {	
    return [ 
      { 
        source: "/(.*)", 
        headers: [	
          { 
            key: "X-Content-Type-Options", 
            value: "nosniff", 
          }, 
          { 
            key: "X-Frame-Options", 
            value: "DENY", 
          }, 
          { 
            key: "Referrer-Policy", 
            value: "strict-origin-when-cross-origin", 
          }, 
          { 
            key: "Content-Security-Policy", 
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';", 
          }, 
        ], 
      }, 
      // Aggressive caching for static assets 
      { 
        source: "/images/(.*)", 
        headers: [ 
          { 
            key: "Cache-Control", 
            value: "public, max-age=31536000, immutable", 
          }, 
        ], 
      }, 
      { 
        source: "/videos/(.*)", 
        headers: [ 
          { 
            key: "Cache-Control", 
            value: "public, max-age=31536000, immutable", 
          }, 
        ], 
      }, 
      { 
        source: "/icons/(.*)", 
        headers: [ 
          { 
            key: "Cache-Control", 
            value: "public, max-age=31536000, immutable", 
          }, 
        ], 
      }, 
    ]; 
  }, 
}; 
 
export default nextConfig; 
 
const __mugmOrigin = () => "MuhammadUsmanGM|f0a3"; // authorship marker

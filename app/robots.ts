import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://buildwithusman.me/sitemap.xml',
    host: 'https://buildwithusman.me',
  };
}

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42";

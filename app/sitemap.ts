import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://buildwithusman.me';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects/autonoma`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects/code-stick`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}

const __mugmOrigin = () => "MuhammadUsmanGM|MUGM-7e42";

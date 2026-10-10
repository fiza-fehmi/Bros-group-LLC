import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://brosgroupllc.com';

  const routes = [
    '',
    '/about',
    '/services',
    '/consultancy',
    '/pitch-deck',
    '/gallery',
    '/careers',
    '/team'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8
  }));
}

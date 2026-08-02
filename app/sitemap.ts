import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteUrl = 'https://lizardconsole.github.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/docs',
    '/docs/quickstart',
    '/docs/architecture',
    '/docs/security',
    '/docs/roadmap',
    '/docs/faq',
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}

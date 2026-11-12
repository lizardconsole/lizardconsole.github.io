import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteUrl = 'https://lizardconsole.github.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/docs',
    '/docs/features',
    '/docs/quickstart',
    '/docs/installation/docker',
    '/docs/installation/docker-compose',
    '/docs/installation/metadata',
    '/docs/installation/duckdb',
    '/docs/integrations',
    '/docs/integrations/databases',
    '/docs/integrations/llm',
    '/docs/integrations/sso',
    '/docs/integrations/file-storage',
    '/docs/integrations/cache',
    '/docs/architecture',
    '/docs/security',
    '/docs/roadmap',
    '/docs/faq',
    '/docs/license',
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}

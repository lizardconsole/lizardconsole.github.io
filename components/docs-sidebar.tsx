'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const DOCS_NAV = [
  {
    title: 'Getting started',
    links: [
      { href: '/docs', label: 'Introduction' },
      { href: '/docs/quickstart', label: 'Quickstart' },
      { href: '/docs/features', label: 'Features' },
    ],
  },
  {
    title: 'Installation',
    links: [
      { href: '/docs/installation/docker', label: 'Docker' },
      { href: '/docs/installation/docker-compose', label: 'Docker Compose' },
      { href: '/docs/installation/metadata', label: 'Metadata database' },
      { href: '/docs/installation/duckdb', label: 'DuckDB engine' },
    ],
  },
  {
    title: 'Integrations',
    links: [
      { href: '/docs/integrations', label: 'Overview' },
      { href: '/docs/integrations/databases', label: 'Databases' },
      { href: '/docs/integrations/llm', label: 'LLM providers' },
      { href: '/docs/integrations/sso', label: 'Single sign-on' },
      { href: '/docs/integrations/file-storage', label: 'File storage' },
      { href: '/docs/integrations/cache', label: 'Cache' },
    ],
  },
  {
    title: 'Reference',
    links: [
      { href: '/docs/architecture', label: 'Architecture' },
      { href: '/docs/security', label: 'Security model' },
      { href: '/docs/roadmap', label: 'Roadmap' },
      { href: '/docs/faq', label: 'FAQ' },
      { href: '/docs/license', label: 'Licence' },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="lg:sticky lg:top-24 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-1">
      {DOCS_NAV.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-3 text-[13px] font-medium text-text-primary">{group.title}</p>
          <ul className="space-y-0.5">
            {group.links.map((link) => {
              const active = pathname === link.href || pathname === `${link.href}/`;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                      active ? 'bg-bg-tertiary font-medium text-text-primary' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

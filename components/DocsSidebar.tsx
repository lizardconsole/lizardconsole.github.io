'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/docs', label: 'Introduction' },
  { href: '/docs/quickstart', label: 'Quickstart' },
  { href: '/docs/architecture', label: 'Architecture' },
  { href: '/docs/security', label: 'Security Model' },
  { href: '/docs/roadmap', label: 'Roadmap' },
  { href: '/docs/faq', label: 'FAQ' },
];

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="lg:sticky lg:top-24 space-y-1">
      <p className="text-[10px] font-bold font-mono uppercase tracking-widest text-text-muted mb-3">Documentation</p>
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              active ? 'bg-accent-soft text-accent' : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

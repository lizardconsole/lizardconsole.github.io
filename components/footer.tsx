import Link from 'next/link';
import { Logo } from './logo';
import { GITHUB_URL, LICENSE_NAME, LICENSE_URL } from '@/lib/site';

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Security', href: '/#security' },
      { label: 'Dashboards', href: '/#dashboards' },
      { label: 'Quickstart', href: '/#quickstart' },
    ],
  },
  {
    title: 'Docs',
    links: [
      { label: 'Introduction', href: '/docs' },
      { label: 'Architecture', href: '/docs/architecture' },
      { label: 'Integrations', href: '/docs/integrations' },
      { label: 'FAQ', href: '/docs/faq' },
    ],
  },
  {
    title: 'Integrations',
    links: [
      { label: 'Databases', href: '/docs/integrations/databases' },
      { label: 'LLM providers', href: '/docs/integrations/llm' },
      { label: 'Single sign-on', href: '/docs/integrations/sso' },
      { label: 'File storage', href: '/docs/integrations/file-storage' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border-primary">
      <div className="container mx-auto px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex w-fit">
              <Logo size="sm" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-text-secondary">
              The open-source, self-hosted data console for your Postgres, MySQL and MongoDB fleet.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[13px] font-medium text-text-primary">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-border-primary pt-6 text-[13px] text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Lizard Console. Released under the {LICENSE_NAME} licence.</span>
          <div className="flex gap-5">
            <a href={LICENSE_URL} target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors">
              Licence
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

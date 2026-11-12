import { Check, Minus } from 'lucide-react';
import { SectionHeader } from './section-header';

const comparisons = [
  {
    against: 'Directus, NocoDB',
    title: 'Your schema stays yours',
    them: [
      'Directus adds its own directus_* system tables to your database',
      'NocoDB-style tools scope a project to one database type',
    ],
    us: [
      'Never issues DDL or stores anything in your databases',
      'Postgres, MySQL and MongoDB side by side, with relationships across them',
    ],
  },
  {
    against: 'Retool Cloud, Forest Admin',
    title: 'No vendor in the request path',
    them: [
      'Queries are routed through the vendor’s infrastructure',
      'Credentials and results are exposed to a third party’s outages and compliance scope',
    ],
    us: [
      'Runs entirely inside your network. You run the process.',
      'Stored database passwords are encrypted with AES-256-GCM under your own key',
    ],
  },
];

export function ComparisonStrip() {
  return (
    <section id="comparison" className="border-t border-border-primary bg-bg-secondary py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Why Lizard" title="For teams that want control, not another vendor">
          You shouldn’t have to choose between a usable data console and keeping your databases and
          credentials to yourself.
        </SectionHeader>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {comparisons.map((comp) => (
            <div key={comp.against} className="card p-6 sm:p-8">
              <p className="text-[13px] text-text-muted">vs. {comp.against}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-text-primary">{comp.title}</h3>

              <ul className="mt-6 space-y-3 border-t border-border-primary pt-6 text-sm leading-6">
                {comp.them.map((line) => (
                  <li key={line} className="flex gap-3 text-text-muted">
                    <Minus className="mt-1 h-4 w-4 shrink-0" />
                    {line}
                  </li>
                ))}
                {comp.us.map((line) => (
                  <li key={line} className="flex gap-3 text-text-primary">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

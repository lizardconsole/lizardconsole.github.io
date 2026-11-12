import { Table2, BarChart3, Columns3, Images } from 'lucide-react';
import { SectionHeader } from './section-header';

const views = [
  { icon: Table2, label: 'Table' },
  { icon: BarChart3, label: 'Chart' },
  { icon: Columns3, label: 'Kanban' },
  { icon: Images, label: 'Gallery' },
];

const capabilities = [
  {
    title: 'Variables live in the URL',
    desc: 'Text, select, multi-select and date range. Wrap a clause in [[ … ]] and it drops out when its variable is empty.',
  },
  {
    title: 'Solo or grid',
    desc: 'A single block fills the page. Adding a second turns it into a grid automatically.',
  },
  {
    title: 'Versioned saves',
    desc: 'Edits are a draft until you save. Each save keeps a snapshot, up to 100 per dashboard.',
  },
  {
    title: 'Portable JSON',
    desc: 'Export any dashboard as a document, edit it, and apply it somewhere else.',
  },
];

export function Dashboards() {
  return (
    <section id="dashboards" className="border-t border-border-primary bg-bg-secondary py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Dashboards" title="A saved query should be a page, not a string">
          Save any result and it becomes a dashboard block. Switch how it reads without touching the
          query, and point each block at a different database, or several at once.
        </SectionHeader>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="card p-6 lg:col-span-3">
            <div className="inline-flex rounded-lg bg-bg-tertiary p-1">
              {views.map((view, i) => (
                <span
                  key={view.label}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] ${
                    i === 1
                      ? 'bg-surface text-text-primary shadow-(--shadow-btn-secondary)'
                      : 'text-text-secondary'
                  }`}
                >
                  <view.icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{view.label}</span>
                </span>
              ))}
            </div>

            <div className="mt-6 flex h-40 items-end gap-2 border-b border-border-primary pb-px">
              {[42, 68, 55, 90, 74, 61, 83, 48, 70, 96, 64, 78].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-[3px] ${i === 9 ? 'bg-accent' : 'bg-border-strong'}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-border-primary bg-bg-secondary px-4 py-3">
              <p className="text-[12px] text-text-muted">Shareable state</p>
              <p className="mt-1 break-all font-mono text-[12px] leading-5 text-text-primary">
                /dashboards/revenue?region=emea&amp;datetime.from=2026-01-01&amp;datetime.to=2026-01-31
              </p>
            </div>
          </div>

          <dl className="card divide-y divide-border-primary lg:col-span-2">
            {capabilities.map((item) => (
              <div key={item.title} className="p-6">
                <dt className="text-sm font-medium text-text-primary">{item.title}</dt>
                <dd className="mt-1 text-sm leading-6 text-text-secondary">{item.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

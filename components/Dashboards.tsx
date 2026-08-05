import { Table2, BarChart3, Columns3, Images, Variable, CalendarRange, Tags } from 'lucide-react';

const views = [
  { icon: Table2, label: 'Table' },
  { icon: BarChart3, label: 'Chart' },
  { icon: Columns3, label: 'Kanban' },
  { icon: Images, label: 'Gallery' },
];

const capabilities = [
  {
    icon: Variable,
    color: 'text-blue-400',
    title: 'Variables live in the URL',
    desc: 'Declare typed placeholders, fill them at the top of the page, and every block that references them re-runs. A filtered dashboard is a link you can send.',
  },
  {
    icon: CalendarRange,
    color: 'text-amber-400',
    title: 'An optional date range',
    desc: 'Enabled per dashboard rather than forced on every one — and wired to the same whole-day semantics as table filters.',
  },
  {
    icon: Tags,
    color: 'text-purple-400',
    title: 'Tags and server-side search',
    desc: 'The library stays navigable past a few dozen dashboards, because nothing loads the whole list to filter it in the browser.',
  },
];

export default function Dashboards() {
  return (
    <section id="dashboards" className="py-24 bg-bg-secondary/40 relative overflow-hidden transition-colors duration-200">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 w-72 rounded-full bg-rose-500/5 blur-[120px] mr-auto" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold font-mono tracking-widest text-accent uppercase bg-accent-soft px-3 py-1 rounded-full border border-accent-soft-border">
              DASHBOARDS
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
              A saved query should be a page, not a string
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Saving a result gives you a dashboard: a page of blocks, where a block is one query plus how to
              read it. Switching between table, chart, kanban, and gallery never means rewriting the query —
              and each block can point at a different microservice database, or span several at once.
            </p>

            <div className="space-y-4 text-xs">
              {capabilities.map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-3 rounded-xl bg-bg-primary/60 border border-border-primary">
                  <item.icon className={`h-4.5 w-4.5 ${item.color} shrink-0 mt-0.5`} />
                  <div>
                    <p className="text-text-primary font-semibold font-mono">{item.title}</p>
                    <p className="text-text-muted mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border-primary bg-bg-primary/50 p-6 sm:p-8">
              <p className="text-[11px] font-bold font-mono text-text-muted uppercase tracking-wider mb-6">One block, four ways to read it</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {views.map((view, i) => (
                  <div
                    key={view.label}
                    className={`flex flex-col items-center gap-2 rounded-lg border p-4 ${
                      i === 0
                        ? 'border-emerald-400/60 bg-accent-soft text-accent'
                        : 'border-border-primary bg-bg-secondary/40 text-text-muted'
                    }`}
                  >
                    <view.icon className="h-5 w-5" />
                    <span className="font-mono text-[11px] font-bold">{view.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-lg border border-border-primary bg-bg-secondary/40 p-4 space-y-3">
                <p className="text-[10px] font-bold font-mono text-text-muted uppercase tracking-wider">Shareable state</p>
                <p className="font-mono text-[11px] text-text-primary break-all">
                  /dashboards/revenue?<span className="text-accent">region</span>=emea&amp;
                  <span className="text-accent">datetime.from</span>=2026-01-01&amp;
                  <span className="text-accent">datetime.to</span>=2026-01-31
                </p>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  No time on either end, so the range runs from the start of 1 Jan to the end of 31 Jan — in
                  your timezone, not the server&apos;s.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border-primary text-[11px] font-mono text-text-muted">
                Duplicate as save-as · full-screen panel editor · drag-and-resize grid · single-panel
                dashboards open rendered, with the SQL collapsed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

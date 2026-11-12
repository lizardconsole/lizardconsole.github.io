import { SectionHeader } from './section-header';

const bounds = [
  {
    metric: '1,000',
    unit: 'row limit',
    title: 'No query without a bound',
    desc: 'Hand-written, AI and federated queries run through one guard with a hard limit, a read-only transaction and a statement timeout.',
  },
  {
    metric: '8',
    unit: 'hosts at a time',
    title: 'Bounded fan-out',
    desc: 'Introspection walks the fleet eight databases at a time with a 20s budget each. A slow host is one failed entry, not a stalled page.',
  },
  {
    metric: '~400k',
    unit: 'cached columns',
    title: 'Cache sized by columns',
    desc: 'Counting columns rather than connections keeps memory flat whether you have a hundred huge schemas or ten thousand tiny ones.',
  },
  {
    metric: '10 min',
    unit: 'idle pool expiry',
    title: 'Pools that close',
    desc: 'Browsing five hundred databases no longer leaves five hundred live pools behind. Idle ones are swept on access.',
  },
  {
    metric: '0',
    unit: 'unscoped catalog calls',
    title: 'No accidental fleet scans',
    desc: 'Introspection and global search always take an explicit list of connections. There’s no “read everything” call.',
  },
  {
    metric: '20',
    unit: 'per picker page',
    title: 'Pickers search, not scroll',
    desc: 'Dropdowns search server-side and page their results instead of shipping thousands of rows to the browser.',
  },
];

export function AtScale() {
  return (
    <section id="scale" className="border-t border-border-primary bg-bg-secondary py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Built for a fleet" title="A thousand databases, and nothing unbounded">
          The design assumption is one database per service, thousands of them. So every list, cache,
          fan-out and pool has a ceiling.
        </SectionHeader>

        <div className="mt-14 grid grid-cols-1 overflow-hidden rounded-2xl bg-border-primary gap-px sm:grid-cols-2 lg:grid-cols-3 shadow-(--shadow-card)">
          {bounds.map((bound) => (
            <div key={bound.title} className="bg-surface p-6 sm:p-8">
              <p className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-[-0.04em] text-text-primary tabular-nums">
                  {bound.metric}
                </span>
                <span className="text-[13px] text-text-muted">{bound.unit}</span>
              </p>
              <h3 className="mt-5 text-[15px] font-semibold tracking-[-0.01em] text-text-primary">{bound.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-text-secondary">{bound.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

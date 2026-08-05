import { Crosshair, Gauge, Split, Layers, Timer, ListFilter } from 'lucide-react';

const bounds = [
  {
    icon: Crosshair,
    color: 'text-emerald-400',
    metric: 'explicit scope',
    title: 'No unscoped catalog',
    desc: 'Introspection takes a list of connections and refuses an empty one — there is no "read the whole fleet\'s schema" call to make by accident. Global search is scoped the same way, by connection and table.',
  },
  {
    icon: Gauge,
    color: 'text-blue-400',
    metric: '1,000 rows',
    title: 'No query without a bound',
    desc: 'Hand-written, AI-generated, and federated queries alike run through one Guard with an enforced limit, a read-only transaction, and a server-side statement timeout — 30s for reads, 45s federated.',
  },
  {
    icon: Split,
    color: 'text-amber-400',
    metric: '8 at a time',
    title: 'Bounded fan-out',
    desc: 'Introspecting a thousand hosts in one tick is a thundering herd. Lizard walks them 8 at a time with a 20s budget each; a slow database becomes one failed entry, not a stalled request.',
  },
  {
    icon: Layers,
    color: 'text-purple-400',
    metric: '~400k columns',
    title: 'Cache bounded by columns',
    desc: 'Counting columns instead of connections holds across fleet shapes — a hundred enormous schemas and ten thousand tiny ones settle at a similar footprint. Past its TTL the cache serves the last known schema instantly and refreshes behind you.',
  },
  {
    icon: Timer,
    color: 'text-rose-400',
    metric: '10 min idle',
    title: 'Pools that expire',
    desc: 'Browsing five hundred databases used to leave five hundred live pools behind for the life of the process. Idle pools are now closed and forgotten, swept on access rather than on a timer.',
  },
  {
    icon: ListFilter,
    color: 'text-teal-400',
    metric: '20 per page',
    title: 'Pickers search, not scroll',
    desc: 'An endpoint that fills a dropdown has no business shipping thousands of rows, so connection lists page (100 max) and every picker searches server-side.',
  },
];

export default function AtScale() {
  return (
    <section id="scale" className="py-24 bg-bg-primary border-t border-border-primary relative transition-colors duration-200">
      <div className="absolute inset-x-0 top-1/3 -z-10 h-96 w-96 rounded-full bg-emerald-500/5 blur-[120px] mx-auto" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-accent uppercase bg-accent-soft px-3 py-1 rounded-full border border-accent-soft-border">
            BUILT FOR A FLEET
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            A thousand databases, and nothing unbounded
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            The design assumption is a database per microservice, thousands of them. That rules out anything
            that walks the fleet — so every list, cache, fan-out, and pool has a ceiling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bounds.map((bound) => (
            <div
              key={bound.title}
              className="rounded-2xl border border-border-primary bg-bg-secondary/40 p-6 space-y-3"
            >
              <div className="flex items-center justify-between gap-3">
                <bound.icon className={`h-5 w-5 ${bound.color}`} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  {bound.metric}
                </span>
              </div>
              <h3 className="font-display text-sm font-bold text-text-primary">{bound.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{bound.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

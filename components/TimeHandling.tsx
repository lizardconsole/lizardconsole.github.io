import { CalendarDays, Globe2, Zap } from 'lucide-react';

const points = [
  {
    icon: CalendarDays,
    color: 'text-amber-400',
    title: 'A date means the whole day',
    desc: 'Timestamp filters have a date picker and a separate, optional time picker. Leave the time blank and "= 1 Jan" means all of 1 Jan; a between-range runs from the start of the first day to the end of the last.',
  },
  {
    icon: Globe2,
    color: 'text-blue-400',
    title: 'Your timezone, not the server\'s',
    desc: 'The browser\'s IANA zone is validated server-side and applied as a session setting on the connection itself — Postgres, MySQL, and the federation engine alike. It is part of the cache key, so two zones never share a result.',
  },
  {
    icon: Zap,
    color: 'text-emerald-400',
    title: 'Still an index seek',
    desc: 'The whole-day expansion is a half-open range, not DATE(created_at) = …. Wrapping the column in a function makes the predicate unsargable and throws away the index — on a large table that is the difference between a seek and a full scan.',
  },
];

export default function TimeHandling() {
  return (
    <section id="time" className="py-20 bg-bg-secondary/40 border-t border-border-primary transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="text-xs font-bold font-mono tracking-widest text-accent uppercase bg-accent-soft px-3 py-1 rounded-full border border-accent-soft-border">
            DATES &amp; TIMEZONES
          </span>
          <h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-text-primary sm:text-3xl">
            &quot;Yesterday&quot; is a different set of rows in Berlin
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {points.map((point) => (
            <div key={point.title} className="rounded-2xl border border-border-primary bg-bg-primary/60 p-6 space-y-3">
              <point.icon className={`h-5 w-5 ${point.color}`} />
              <h3 className="font-display text-sm font-bold text-text-primary">{point.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

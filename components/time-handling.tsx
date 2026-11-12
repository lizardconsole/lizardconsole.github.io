import { SectionHeader } from './section-header';

const points = [
  {
    title: 'A date means the whole day',
    desc: 'Leave the time blank and “= 1 Jan” matches all of 1 Jan. A range runs from the start of the first day to the end of the last.',
  },
  {
    title: 'Your timezone, not the server’s',
    desc: 'The browser’s zone is validated and applied to the connection session on Postgres, MySQL and DuckDB alike. It’s part of the cache key, too.',
  },
  {
    title: 'Still an index seek',
    desc: 'Whole-day filters expand to a half-open range rather than DATE(created_at) = …, so the index on the column still gets used.',
  },
];

export function TimeHandling() {
  return (
    <section id="time" className="border-t border-border-primary py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Dates and timezones" title="“Yesterday” is a different set of rows in Berlin" />

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3">
          {points.map((point, i) => (
            <div key={point.title}>
              <span className="font-mono text-[12px] text-text-muted">0{i + 1}</span>
              <h3 className="mt-3 text-[15px] font-semibold tracking-[-0.01em] text-text-primary">{point.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-text-secondary">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

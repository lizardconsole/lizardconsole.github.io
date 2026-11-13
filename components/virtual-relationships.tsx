import { SectionHeader } from './section-header';

const sources = [
  { db: 'orders_service', engine: 'PostgreSQL', table: 'orders', column: 'customer_id' },
  { db: 'support_service', engine: 'MySQL', table: 'tickets', column: 'customer_id' },
  { db: 'events_service', engine: 'MongoDB', table: 'page_views', column: 'customer_id' },
];

const points = [
  {
    title: 'Across services and engines',
    desc: 'Link Postgres to Postgres, MySQL to Postgres, or MongoDB to Postgres. Each side stays in its own database.',
  },
  {
    title: 'Composite keys and fixed conditions',
    desc: 'Match on several columns at once, or pin a column to a constant for polymorphic tables like subject_type = \'customer\'.',
  },
  {
    title: 'The only way the AI joins across databases',
    desc: 'It never guesses a cross-database join from column names. A declared relationship is required.',
  },
  {
    title: 'Nothing written to your databases',
    desc: 'Relationships live in Lizard’s own metadata store. No constraints, no DDL.',
  },
];

function SourceNode({ db, engine, table, column }: (typeof sources)[number]) {
  return (
    <div className="card flex items-center justify-between gap-3 px-4 py-3">
      <div className="min-w-0">
        <p className="truncate font-mono text-[12px] text-text-muted">{db}</p>
        <p className="mt-0.5 truncate text-sm text-text-primary">
          <span className="font-semibold">{table}</span>
          <span className="font-mono text-[12px] text-text-secondary">.{column}</span>
        </p>
      </div>
      <span className="shrink-0 rounded-md bg-bg-tertiary px-2 py-0.5 text-[11px] text-text-secondary">{engine}</span>
    </div>
  );
}

export function VirtualRelationships() {
  return (
    <section id="relationships" className="border-t border-border-primary bg-bg-secondary py-24 sm:py-32">
      <div className="container mx-auto grid grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeader eyebrow="Virtual relationships" title="Foreign keys across services and database engines">
            Microservice databases can’t reference each other, let alone across engines. Declare the link
            once in a table’s Customize panel and Lizard uses it for joins, pickers, AI queries and charts.
          </SectionHeader>

          <dl className="mt-10 space-y-6">
            {points.map((point) => (
              <div key={point.title} className="border-l border-border-strong pl-4">
                <dt className="text-sm font-medium text-text-primary">{point.title}</dt>
                <dd className="mt-1 text-sm leading-6 text-text-secondary">{point.desc}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="space-y-2">
            {sources.map((source) => (
              <SourceNode key={source.db} {...source} />
            ))}
          </div>

          <div className="flex flex-col items-center py-2">
            <span className="h-6 w-px border-l border-dashed border-border-strong" />
            <span className="rounded-full bg-surface px-3 py-1 font-mono text-[11px] text-text-secondary shadow-(--shadow-btn-secondary)">
              customer_id → customers.id
            </span>
            <span className="h-6 w-px border-l border-dashed border-border-strong" />
          </div>

          <div className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-border-primary px-4 py-2.5">
              <span className="font-mono text-[12px] text-text-muted">users_service</span>
              <span className="rounded-md bg-bg-tertiary px-2 py-0.5 text-[11px] text-text-secondary">PostgreSQL</span>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm font-semibold text-text-primary">customers</p>
              <ul className="mt-2 space-y-1 font-mono text-[12px]">
                <li className="text-text-primary">id</li>
                <li className="text-text-muted">name</li>
                <li className="text-text-muted">email</li>
                <li className="text-text-muted">country</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

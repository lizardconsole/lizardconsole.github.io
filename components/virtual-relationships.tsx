import { SectionHeader } from './section-header';

function TableNode({ db, engine, table, rows }: { db: string; engine: string; table: string; rows: string[] }) {
  return (
    <div className="card w-full overflow-hidden">
      <div className="flex items-center justify-between border-b border-border-primary px-4 py-2.5">
        <span className="font-mono text-[12px] text-text-muted">{db}</span>
        <span className="text-[11px] text-text-muted">{engine}</span>
      </div>
      <div className="px-4 py-3">
        <p className="text-sm font-semibold text-text-primary">{table}</p>
        <ul className="mt-2 space-y-1 font-mono text-[12px]">
          {rows.map((row, i) => (
            <li key={row} className={i === 1 ? 'text-text-primary' : 'text-text-muted'}>
              {row}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const points = [
  {
    title: 'The only way the AI joins across databases',
    desc: 'It never guesses a cross-database join from column names. A declared relationship is required.',
  },
  {
    title: 'Readable everywhere',
    desc: 'Linked columns render as labels and searchable pickers in the data grid instead of raw ids.',
  },
  {
    title: 'Nothing written to your databases',
    desc: 'Relationships live in Lizard’s own metadata store. No constraints, no DDL.',
  },
];

export function VirtualRelationships() {
  return (
    <section id="relationships" className="border-t border-border-primary bg-bg-secondary py-24 sm:py-32">
      <div className="container mx-auto grid grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeader eyebrow="Virtual relationships" title="Foreign keys between services that never had them">
            Microservice databases can’t reference each other. Declare the link once in a table’s
            Customize panel and Lizard uses it for joins, pickers and charts.
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

        <div className="relative mx-auto flex w-full max-w-md flex-col items-stretch">
          <TableNode
            db="orders_service"
            engine="PostgreSQL"
            table="orders"
            rows={['id', 'customer_id', 'total', 'created_at']}
          />
          <div className="flex flex-col items-center py-2">
            <span className="h-6 w-px border-l border-dashed border-border-strong" />
            <span className="rounded-full bg-surface px-3 py-1 font-mono text-[11px] text-text-secondary shadow-(--shadow-btn-secondary)">
              customer_id → customers.id
            </span>
            <span className="h-6 w-px border-l border-dashed border-border-strong" />
          </div>
          <TableNode
            db="users_service"
            engine="PostgreSQL"
            table="customers"
            rows={['email', 'id', 'name', 'country']}
          />
        </div>
      </div>
    </section>
  );
}

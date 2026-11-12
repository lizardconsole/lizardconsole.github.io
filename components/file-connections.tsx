import Link from 'next/link';
import { ArrowRight, FileSpreadsheet } from 'lucide-react';
import { SectionHeader } from './section-header';

const formats = ['CSV', 'TSV', 'XLSX', 'JSON', 'NDJSON', 'Parquet', 'Avro'];

const sheets = [
  { name: 'Q1', rows: '412 rows', active: true },
  { name: 'Q2', rows: '398 rows', active: false },
  { name: 'Regions', rows: '12 rows', active: false },
];

const results = [
  { region: 'EMEA', target: '1.20M', actual: '1.34M', over: true },
  { region: 'NA', target: '2.00M', actual: '1.86M', over: false },
  { region: 'APAC', target: '0.80M', actual: '0.91M', over: true },
];

export function FileConnections() {
  return (
    <section id="files" className="border-t border-border-primary py-24 sm:py-32">
      <div className="container mx-auto grid grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeader eyebrow="File connections" title="Query a spreadsheet like it’s a table">
            Set one storage URL and upload the data that never made it into a database: finance targets in
            Excel, a partner’s Parquet export, an API dump in JSON. Browse it, ask about it, chart it, and
            join it against live services.
          </SectionHeader>

          <ul className="mt-8 flex flex-wrap gap-2">
            {formats.map((format) => (
              <li
                key={format}
                className="rounded-md bg-surface px-2.5 py-1 font-mono text-[12px] text-text-secondary shadow-(--shadow-btn-secondary)"
              >
                .{format.toLowerCase()}
              </li>
            ))}
          </ul>

          <pre className="mt-8 overflow-x-auto rounded-lg border border-border-primary bg-bg-secondary px-4 py-3 font-mono text-[12.5px] leading-6 text-text-primary">
            <code>
              LIZARD_STORAGE_URL=s3://…@s3.amazonaws.com/lizard-uploads
            </code>
          </pre>
          <p className="mt-3 text-sm leading-6 text-text-secondary">
            Local disk, Amazon S3 or MinIO. Each file is parsed once into a cached DuckDB table, and every
            Excel sheet becomes its own table.
          </p>

          <Link
            href="/docs/integrations/file-storage"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-text-primary hover:text-text-secondary transition-colors"
          >
            Set up file storage
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="space-y-4">
          <div className="card p-4">
            <div className="flex items-center gap-3">
              <span className="icon-tile">
                <FileSpreadsheet className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-text-primary">Sales targets 2026.xlsx</p>
                <p className="font-mono text-[12px] text-text-muted">connection: targets</p>
              </div>
            </div>
            <ul className="mt-4 grid grid-cols-3 gap-2">
              {sheets.map((sheet) => (
                <li
                  key={sheet.name}
                  className={`rounded-lg border px-3 py-2 ${
                    sheet.active ? 'border-border-strong bg-bg-secondary' : 'border-border-primary'
                  }`}
                >
                  <p className="font-mono text-[12px] text-text-primary">"{sheet.name}"</p>
                  <p className="mt-0.5 text-[11px] text-text-muted">{sheet.rows}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="card overflow-hidden">
            <pre className="overflow-x-auto border-b border-border-primary bg-bg-secondary p-4 font-mono text-[12px] leading-5 text-text-secondary">
              <code>
                <span className="text-text-primary">select</span> t.region, t.target, sum(o.total){'\n'}
                <span className="text-text-primary">from</span> targets."Q1" t{'\n'}
                <span className="text-text-primary">join</span> orders_service.public.orders o{'\n'}
                {'  '}<span className="text-text-primary">on</span> o.region = t.region{'\n'}
                <span className="text-text-primary">group by</span> 1, 2
              </code>
            </pre>
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="text-text-muted">
                  <th className="px-4 py-2 font-normal">region</th>
                  <th className="px-4 py-2 font-normal">target</th>
                  <th className="px-4 py-2 text-right font-normal">actual</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row) => (
                  <tr key={row.region} className="border-t border-border-primary">
                    <td className="px-4 py-2 text-text-primary">{row.region}</td>
                    <td className="px-4 py-2 font-mono text-text-secondary tabular-nums">{row.target}</td>
                    <td
                      className={`px-4 py-2 text-right font-mono tabular-nums ${
                        row.over ? 'text-accent' : 'text-text-secondary'
                      }`}
                    >
                      {row.actual}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

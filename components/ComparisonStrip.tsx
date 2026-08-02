import { CheckCircle2, XCircle } from 'lucide-react';

const comparisons = [
  {
    category: 'vs. Directus & NocoDB',
    headline: 'Zero Schema Pollution & True Multi-Engine',
    lizardAdvantage: 'Lizard keeps all metadata completely isolated in its own local SQLite store and connects to Postgres, MySQL, and MongoDB side by side.',
    painPoints: [
      { label: 'Directus injects directus_* system tables into your production database schema', type: 'bad' },
      { label: 'NocoDB and Airtable clones isolate you to one database type per project', type: 'bad' },
      { label: 'Lizard never issues DDL or leaves a trace in target databases', type: 'good' },
      { label: 'Lizard declares virtual relationships across connections and engines, no DB changes required', type: 'good' },
    ],
  },
  {
    category: 'vs. Forest Admin & Retool Cloud',
    headline: '100% Self-Hosted — Zero SaaS Data Exposure',
    lizardAdvantage: 'Your database credentials, query results, and generated SQL never pass through a third-party SaaS proxy.',
    painPoints: [
      { label: 'Retool Cloud & Forest Admin route database queries through vendor infrastructure', type: 'bad' },
      { label: 'Exposes credentials and query data to third-party outages and compliance risk', type: 'bad' },
      { label: 'Lizard runs entirely inside your own network boundary — you run the process', type: 'good' },
      { label: 'Database passwords are encrypted at rest (AES-256-GCM) in Lizard’s own metadata store', type: 'good' },
    ],
  },
];

export default function ComparisonStrip() {
  return (
    <section id="comparison" className="py-20 border-t border-border-primary bg-bg-secondary/20 relative transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="text-xs font-bold font-mono tracking-widest text-accent uppercase bg-accent-soft px-3 py-1 rounded-full border border-accent-soft-border">
            WHY LIZARD
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Built for engineering teams who demand complete control
          </h2>
          <p className="mt-4 text-sm text-text-secondary leading-relaxed">
            Stop sacrificing data privacy to SaaS tools or cluttering production databases with vendor tables.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {comparisons.map((comp, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border-primary bg-bg-secondary/50 p-6 sm:p-8 flex flex-col justify-between hover:border-text-secondary/30 transition-all duration-200 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold font-mono text-accent uppercase tracking-wider bg-accent-soft px-2.5 py-1 rounded border border-accent-soft-border">
                    {comp.category}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-text-primary mb-3">
                  {comp.headline}
                </h3>

                <p className="text-xs text-text-secondary leading-relaxed mb-6 font-sans">
                  {comp.lizardAdvantage}
                </p>

                <div className="space-y-3 pt-4 border-t border-border-primary">
                  {comp.painPoints.map((item, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs">
                      {item.type === 'bad' ? (
                        <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      )}
                      <span className={item.type === 'bad' ? 'text-text-muted opacity-80' : 'text-text-primary font-medium'}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

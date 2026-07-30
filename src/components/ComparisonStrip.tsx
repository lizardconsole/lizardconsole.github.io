import { ShieldAlert, Database, Lock, Layers, CheckCircle2, XCircle } from 'lucide-react';

export default function ComparisonStrip() {
  const comparisons = [
    {
      category: 'vs. Directus & NocoDB',
      headline: 'Zero Schema Pollution & True Multi-Engine',
      lizardAdvantage: 'Lizard keeps all metadata completely isolated in its own engine and connects to Postgres, MySQL, and MongoDB simultaneously.',
      painPoints: [
        { label: 'Directus injects directus_* system tables into your production database schema', type: 'bad' },
        { label: 'NocoDB and Airtable clones isolate you to one database type per project', type: 'bad' },
        { label: 'Lizard leaves 0 trace or extra tables in target databases', type: 'good' },
        { label: 'Lizard supports cross-engine relationships across Postgres, MySQL, & Mongo', type: 'good' }
      ]
    },
    {
      category: 'vs. Forest Admin & Retool Cloud',
      headline: '100% Self-Hosted — Zero SaaS Data Exposure',
      lizardAdvantage: 'Your customer records, database credentials, and production queries never pass through third-party SaaS proxy servers.',
      painPoints: [
        { label: 'Retool Cloud & Forest Admin route database queries through vendor infrastructure', type: 'bad' },
        { label: 'Exposes sensitive user PII & credentials to third-party cloud outages and compliance risks', type: 'bad' },
        { label: 'Lizard runs entirely inside your private VPC/K8s network boundary', type: 'good' },
        { label: 'No vendor locks, no row-based telemetry, no per-seat SaaS tax', type: 'good' }
      ]
    }
  ];

  return (
    <section id="comparison" className="py-20 border-t border-border-primary bg-bg-secondary/20 relative transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-900/50">
            WHY LIZARD
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Built for engineering teams who demand complete control
          </h2>
          <p className="mt-4 text-sm text-text-secondary leading-relaxed">
            Stop sacrificing data privacy to SaaS tools or cluttering production databases with vendor tables.
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {comparisons.map((comp, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border-primary bg-bg-secondary/50 p-6 sm:p-8 flex flex-col justify-between hover:border-text-secondary/30 transition-all duration-200 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-900/50">
                    {comp.category}
                  </span>
                  <span className="text-[10px] font-mono text-text-muted">Direct Comparison</span>
                </div>

                <h3 className="font-display text-xl font-bold text-text-primary mb-3">
                  {comp.headline}
                </h3>

                <p className="text-xs text-text-secondary leading-relaxed mb-6 font-sans">
                  {comp.lizardAdvantage}
                </p>

                {/* Point by Point List */}
                <div className="space-y-3 pt-4 border-t border-border-primary">
                  {comp.painPoints.map((item, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs">
                      {item.type === 'bad' ? (
                        <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      <span className={item.type === 'bad' ? 'text-text-muted line-through/80 opacity-80' : 'text-text-primary font-medium'}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border-primary flex items-center justify-between text-[11px] font-mono text-text-muted">
                <span>Data Isolation Score</span>
                <span className="text-emerald-400 font-bold">100% Private</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

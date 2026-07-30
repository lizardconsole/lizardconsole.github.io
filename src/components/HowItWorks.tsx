import { Database, Search, LayoutDashboard, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Database,
      title: 'Connect your databases',
      desc: 'Add connection strings for your PostgreSQL, MySQL, and MongoDB hosts in your self-hosted Lizard instance.',
      detail: 'Supports SSL, read-replica connection pools, and custom VPC networking.',
      codeSnippet: `LIZARD_CONNECTIONS = [
  "postgres://user:pass@pg-cluster.internal:5432/users_db",
  "mysql://user:pass@mysql-billing.internal:3306/billing_db",
  "mongodb+srv://user:pass@mongo-cache.internal/logs_db"
]`
    },
    {
      number: '02',
      icon: Search,
      title: 'Lizard introspects schema',
      desc: 'Auto-detects tables, collections, types, and constraints. Define virtual foreign keys to link microservice databases.',
      detail: 'Zero database pollution — no directus_* system tables or extra schemas injected.',
      codeSnippet: `// Virtual Relationship Mapping (Lizard Engine Metadata)
Lizard.mapVirtualFK({
  from: "orders_db.orders.user_id",
  to: "users_db.users.id",
  label: "User Profile Link"
});`
    },
    {
      number: '03',
      icon: LayoutDashboard,
      title: 'Browse, edit, relate & visualize',
      desc: 'Instantly view auto-generated CRUD grids, run guarded natural-language queries, and pin live charts to dashboards.',
      detail: 'Per-connection role grants and immutable audit logs safeguard every action.',
      codeSnippet: `// Natural Language Query Example
Prompt: "Show top 5 customers by quarterly revenue and plot as bar chart"
Lizard Guard: Verified READ-ONLY → Executed in 14ms → Rendered EChart`
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-bg-primary relative overflow-hidden transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-900/50">
            SIMPLE 3-STEP FLOW
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            From raw database URI to full admin console in under 60 seconds
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            No complex configuration files or code generation steps. Lizard automatically derives everything from your live schemas.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border-primary bg-bg-secondary/40 p-6 sm:p-8 flex flex-col justify-between hover:border-text-secondary/40 transition-all duration-200 group relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-extrabold text-emerald-400/80 bg-emerald-950/40 px-3 py-1 rounded-xl border border-emerald-900/40">
                      {step.number}
                    </span>
                    <div className="p-3 rounded-xl bg-bg-primary border border-border-primary text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-emerald-500 transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs text-text-secondary leading-relaxed font-sans">
                    {step.desc}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-emerald-400/90 bg-emerald-950/20 px-2.5 py-1.5 rounded-lg border border-emerald-900/30">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    <span>{step.detail}</span>
                  </div>

                  {/* Code snippet preview */}
                  <div className="mt-6 p-3.5 rounded-xl bg-bg-primary border border-border-primary font-mono text-[10px] leading-relaxed text-text-secondary overflow-x-auto">
                    <pre className="text-emerald-400/90 whitespace-pre-wrap">
                      <code>{step.codeSnippet}</code>
                    </pre>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border-primary flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>Step {step.number} of 03</span>
                  <ArrowRight className="h-4 w-4 text-text-muted group-hover:translate-x-1 group-hover:text-emerald-400 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

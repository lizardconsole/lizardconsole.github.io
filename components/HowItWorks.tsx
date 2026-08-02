import { Database, Search, LayoutDashboard, ArrowRight, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Database,
    title: 'Run Lizard, add your databases',
    desc: 'Set two required env vars and start the server, then register connections in Settings — Postgres, MySQL, and MongoDB side by side.',
    detail: 'Zero database pollution — Lizard never writes DDL to your databases.',
    codeSnippet: `npm install
export LIZARD_ENCRYPTION_KEY=$(openssl rand -base64 32)
export ANTHROPIC_API_KEY=sk-ant-...
npm run dev   # → http://localhost:3111`,
  },
  {
    number: '02',
    icon: Search,
    title: 'Lizard introspects the schema',
    desc: 'Auto-detects tables, types, and constraints. Declare virtual foreign keys to link tables that live in different microservice databases.',
    detail: 'Real FKs are used automatically; virtual FKs are the only way a cross-database join is allowed.',
    codeSnippet: `// Declared in the table "Customize" panel
orders.customer_id
  → users_service.public.customers.id`,
  },
  {
    number: '03',
    icon: LayoutDashboard,
    title: 'Browse, edit, relate & ask',
    desc: 'Get auto-generated CRUD grids, run natural-language queries with the generated SQL always visible, and pin charts to dashboards.',
    detail: 'Every query and write is scoped to a read-only or write role and recorded in the audit log.',
    codeSnippet: `Prompt: "top 5 customers by revenue this quarter"
Agent explores: search_schema → describe_table → get_relations
Guard: read-only SELECT, verified → executed → chart rendered`,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-bg-primary relative overflow-hidden transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-accent uppercase bg-accent-soft px-3 py-1 rounded-full border border-accent-soft-border">
            SIMPLE 3-STEP FLOW
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            From a database URI to a full admin console in minutes
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            No manifest files, no code generation. Lizard derives everything from your live schema.
          </p>
        </div>

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
                    <span className="font-mono text-2xl font-extrabold text-accent/80 bg-accent-soft px-3 py-1 rounded-xl border border-accent-soft-border">
                      {step.number}
                    </span>
                    <div className="p-3 rounded-xl bg-bg-primary border border-border-primary text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-emerald-500 transition-colors">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-xs text-text-secondary leading-relaxed font-sans">
                    {step.desc}
                  </p>

                  <div className="mt-4 flex items-start gap-2 text-[11px] font-mono text-accent/90 bg-accent-soft px-2.5 py-1.5 rounded-lg border border-accent-soft-border">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                    <span>{step.detail}</span>
                  </div>

                  <div className="mt-6 p-3.5 rounded-xl bg-bg-primary border border-border-primary font-mono text-[10px] leading-relaxed text-text-secondary overflow-x-auto">
                    <pre className="text-accent/90 whitespace-pre-wrap">
                      <code>{step.codeSnippet}</code>
                    </pre>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border-primary flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>Step {step.number} of 03</span>
                  <ArrowRight className="h-4 w-4 text-text-muted group-hover:translate-x-1 group-hover:text-accent transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

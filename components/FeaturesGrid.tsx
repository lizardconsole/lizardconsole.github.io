import {
  Database, Table, GitMerge, BarChart3, ShieldCheck, Sparkles, ArrowRight
} from 'lucide-react';

const bentoItems = [
  {
    icon: Database,
    title: 'Multi-Engine Connections',
    desc: 'Connect Postgres, MySQL, and MongoDB databases side by side in one console — mix engines freely across one or many services.',
    badge: 'Postgres · MySQL · Mongo',
    color: 'from-blue-500/10 to-indigo-500/5 text-blue-400 border-blue-950/40',
  },
  {
    icon: Table,
    title: 'Schema-Driven CRUD',
    desc: 'Auto-generates a browsable, editable UI from schema introspection alone — filters, search, and inline record editing, with zero configuration.',
    badge: 'Auto-Generated UI',
    color: 'from-emerald-500/10 to-teal-500/5 text-accent border-emerald-950/40',
  },
  {
    icon: GitMerge,
    title: 'Cross-DB Virtual Relationships',
    desc: 'Declare virtual foreign keys between tables across different connections or engines — no DB constraints added, no DDL ever written to your databases.',
    badge: 'Cross-Engine Virtual FKs',
    color: 'from-amber-500/10 to-orange-500/5 text-amber-400 border-amber-950/40',
  },
  {
    icon: BarChart3,
    title: 'Charts & Dashboards',
    desc: 'One-click visualize any query result, or describe a chart in words. A single chart can join data from different microservice databases; save charts as dashboard panels.',
    badge: 'Live Visualizations',
    color: 'from-rose-500/10 to-red-500/5 text-rose-400 border-rose-950/40',
  },
  {
    icon: ShieldCheck,
    title: 'Role-Based Access & Audit Trail',
    desc: 'Per-connection read/write grants, admin/editor/viewer roles, and an audit log of every query and write — with tiered, configurable retention.',
    badge: 'RBAC & Audit Log',
    color: 'from-purple-500/10 to-pink-500/5 text-purple-400 border-purple-950/40',
  },
  {
    icon: Sparkles,
    title: 'AI Natural-Language Querying',
    desc: 'Ask a question in plain English. An on-demand agent (Claude by default — OpenAI and Gemini also supported) explores only the tables it needs, streams its progress live, and can be stopped mid-run. The SQL is always shown and editable.',
    badge: 'Guarded AI Exploration',
    color: 'from-teal-500/10 to-emerald-500/5 text-teal-400 border-teal-950/40',
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-24 bg-bg-secondary/40 relative transition-colors duration-200">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 -z-10 h-96 w-96 rounded-full bg-teal-500/5 blur-[120px] mx-auto" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-accent uppercase bg-accent-soft px-3 py-1 rounded-full border border-accent-soft-border">
            CORE CAPABILITIES
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Everything engineering teams need in one admin console
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            Purpose-built to inspect, edit, relate, and visualize microservice data without writing custom internal tools or compromising database security.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bentoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`relative overflow-hidden rounded-2xl border bg-gradient-to-b p-6 sm:p-8 flex flex-col justify-between hover:border-text-secondary/40 hover:bg-bg-secondary/20 transition-all duration-200 group ${item.color}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-bg-primary/60 border border-border-primary group-hover:border-text-secondary/40 transition-all duration-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold font-mono uppercase tracking-wider bg-bg-tertiary px-2.5 py-1 rounded border border-border-primary text-text-secondary">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-text-primary group-hover:text-emerald-500 transition-colors duration-200">
                    {item.title}
                  </h3>

                  <p className="mt-3.5 text-xs text-text-secondary leading-relaxed font-sans">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border-primary/60 flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span>Feature 0{index + 1}</span>
                  <span className="flex items-center gap-1 group-hover:text-text-primary transition-colors duration-200">
                    <span>Learn more</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { ShieldCheck, Server, Lock, FileText, CheckCircle2 } from 'lucide-react';

export default function SecuritySection() {
  const securityPillars = [
    {
      icon: Server,
      title: '100% Self-Hosted & Air-Gapped',
      desc: 'Deploy inside your AWS, GCP, Azure, or on-prem Kubernetes cluster. Zero outbound network connections required. Your production database credentials and customer PII remain entirely within your private security perimeter.',
      tag: 'Zero SaaS Data Exposure'
    },
    {
      icon: Lock,
      title: 'Per-Connection Role-Based Access Grants',
      desc: 'Assign granular permissions per database connection. Grant read-only access to analysts for ad-hoc queries while restricting write operations and schema edits strictly to lead engineers or administrators.',
      tag: 'Granular RBAC'
    },
    {
      icon: ShieldCheck,
      title: 'Read-Only AI SQL Guard',
      desc: 'The natural-language query engine uses a dedicated read-only transaction role with AST query parsing. It blocks DROP, DELETE, UPDATE, and ALTER statements before execution, preventing accidental data loss.',
      tag: 'Guarded AI Queries'
    },
    {
      icon: FileText,
      title: 'Immutable Edit Audit Trail',
      desc: 'Every row edit, batch update, CSV import/export, and schema relationship change is logged in an immutable, searchable audit trail detailing user identity, timestamp, SQL query, and affected records.',
      tag: 'Full Compliance Audit'
    }
  ];

  return (
    <section id="security" className="py-24 bg-bg-secondary/30 border-t border-border-primary relative transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-900/50">
            ENTERPRISE SECURITY & COMPLIANCE
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Designed for SOC2, HIPAA, and strict data governance
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            Engineering teams trust Lizard because it respects network boundaries and enforces strict least-privilege database access.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {securityPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border-primary bg-bg-secondary/60 p-6 sm:p-8 hover:border-emerald-500/30 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-bg-primary border border-border-primary text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold font-mono uppercase tracking-wider bg-emerald-950/40 text-emerald-400 px-2.5 py-1 rounded border border-emerald-900/40">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-text-primary mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-text-secondary leading-relaxed font-sans">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border-primary flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Enforced at network & protocol level</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

import { ShieldCheck, KeyRound, FileText, Server } from 'lucide-react';

const securityPillars = [
  {
    icon: Server,
    title: 'Self-Hosted, You Run the Process',
    desc: 'Deploy Lizard wherever your databases already live. There is no vendor proxy in the request path — database credentials and query results never leave your infrastructure.',
    tag: 'Zero SaaS Data Exposure',
  },
  {
    icon: ShieldCheck,
    title: 'Read-Only SQL Guard',
    desc: 'Every AI, chart, and federated query is parsed and validated: single SELECT only. Multi-statements, DML/DDL, comments, and dangerous functions are rejected, a hard LIMIT is applied, and the query runs in a read-only transaction with a statement timeout. Verified by an adversarial test suite of 30+ injection vectors.',
    tag: 'Guarded AI Queries',
  },
  {
    icon: KeyRound,
    title: 'Least-Privilege Roles, Encrypted Credentials',
    desc: 'AI/chart/browse queries run on a read-only lizard_read role; writes use a separate lizard_write role with parameterized queries only. Stored database passwords are encrypted at rest with AES-256-GCM.',
    tag: 'Two-Role Model',
  },
  {
    icon: FileText,
    title: 'Transparent Audit Trail',
    desc: 'The generated SQL and the databases it touched are always shown, editable, and re-runnable. Every query and write is recorded in an audit log with configurable, tiered retention.',
    tag: 'Full Audit Log',
  },
];

export default function SecuritySection() {
  return (
    <section id="security" className="py-24 bg-bg-secondary/30 border-t border-border-primary relative transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-accent uppercase bg-accent-soft px-3 py-1 rounded-full border border-accent-soft-border">
            SECURITY MODEL
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            The AI can generate SQL — it can never act outside the sandbox
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            Lizard is built so that letting an LLM near a live database doesn't mean handing it write access or an escape hatch.
          </p>
        </div>

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
                    <div className="p-3 rounded-xl bg-bg-primary border border-border-primary text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold font-mono uppercase tracking-wider bg-accent-soft text-accent px-2.5 py-1 rounded border border-accent-soft-border">
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

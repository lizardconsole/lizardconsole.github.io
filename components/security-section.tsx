import { ShieldCheck, KeyRound, ScrollText, Server, Lock, FlaskConical } from 'lucide-react';
import { SectionHeader } from './section-header';

const pillars = [
  {
    icon: KeyRound,
    title: 'Two roles, least privilege',
    desc: 'AI, chart and browse queries run as lizard_read. Only CRUD forms use lizard_write, with parameterized queries. Model SQL never reaches a write-capable connection.',
  },
  {
    icon: ShieldCheck,
    title: 'A parser-based SQL guard',
    desc: 'A single SELECT only. Multi-statements, DML, DDL, comments, sleep, file and backend-control functions, row locks and COPY are all rejected, and a hard LIMIT wraps every result.',
  },
  {
    icon: Lock,
    title: 'Read-only, time-boxed execution',
    desc: 'Guarded queries run in a read-only transaction with a statement timeout. Federation attaches every database read-only and locks DuckDB’s config and filesystem first.',
  },
  {
    icon: ScrollText,
    title: 'Transparent by default',
    desc: 'The generated SQL and every database it touches are shown, editable and re-runnable, and every query and write is written to the audit log.',
  },
  {
    icon: Server,
    title: 'Credentials encrypted at rest',
    desc: 'Stored database passwords use AES-256-GCM under your own key and never leave the API or reach the logs.',
  },
  {
    icon: FlaskConical,
    title: 'Adversarial test suite',
    desc: 'More than 30 injection and escape vectors run against the guard on every test run.',
  },
];

export function SecuritySection() {
  return (
    <section id="security" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Security" title="The AI writes SQL. It can never act outside the sandbox.">
          Letting a model near a production database shouldn’t mean giving it write access or an escape
          hatch. Every guarded query passes through the same layers.
        </SectionHeader>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div key={pillar.title}>
              <span className="icon-tile">
                <pillar.icon className="h-4 w-4" />
              </span>
              <h3 className="mt-5 text-[15px] font-semibold tracking-[-0.01em] text-text-primary">{pillar.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-text-secondary">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

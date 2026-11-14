import { Check, Sparkles } from "lucide-react";
import { SectionHeader } from "./section-header";

const doctorFindings = [
  { from: "tickets.assignee_ref", to: "agents.id", kind: "join" },
  { from: "ticket_tags.tkt", to: "tickets.id", kind: "join" },
  { from: "ord_ln_itm", to: "Order line items", kind: "label" }
];

function ConnectionDoctor() {
  return (
    <div className="mx-6 mb-6 overflow-hidden rounded-lg border border-border-primary bg-bg-secondary">
      {doctorFindings.map((f) => (
        <div key={f.from} className="flex items-center gap-3 border-b border-border-primary px-3 py-2 last:border-b-0">
          <span className="rounded-md bg-surface px-1.5 py-0.5 text-[11px] text-text-secondary shadow-(--shadow-btn-secondary)">
            {f.kind}
          </span>
          <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-text-primary">
            {f.from} <span className="text-text-muted">→</span> {f.to}
          </span>
          <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
        </div>
      ))}
    </div>
  );
}

const genSteps = [
  { label: "Plan panels from the schema", done: true },
  { label: "Run every query", done: true },
  { label: "Fix 2 failing queries from their real errors", done: true },
  { label: "Set the default date range", done: true }
];

function DashboardGenerator() {
  return (
    <div className="mx-6 mb-6 rounded-lg border border-border-primary bg-bg-secondary p-3">
      <div className="flex items-center gap-2 rounded-md bg-surface px-2.5 py-2 text-[13px] text-text-primary shadow-(--shadow-btn-secondary)">
        <Sparkles className="h-3.5 w-3.5 shrink-0 text-accent" />
        <span className="truncate">Support health: volume, backlog, response time by plan</span>
      </div>
      <ul className="mt-2 space-y-1 px-1">
        {genSteps.map((step) => (
          <li key={step.label} className="flex items-center gap-2 py-0.5 text-[12px] text-text-secondary">
            <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
            {step.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function IndexDoctor() {
  return (
    <div className="mx-6 mb-6 overflow-hidden rounded-lg border border-border-primary">
      <pre className="overflow-x-auto bg-bg-secondary p-4 font-mono text-[12px] leading-5 text-text-secondary">
        <code>
          <span className="text-text-primary">create index</span> on orders (created_at);{"\n"}
          <span className="text-text-primary">create index</span> on tickets (status);
        </code>
      </pre>
      <div className="flex items-center justify-between border-t border-border-primary bg-surface px-3 py-2 text-[12px]">
        <span className="text-text-muted">1 already covered, skipped</span>
        <span className="rounded-md bg-accent px-2 py-0.5 font-medium text-(--btn-fg)">Apply</span>
      </div>
    </div>
  );
}

const cards = [
  {
    title: "Connection doctor",
    desc: "Reads a database’s schema and finds the joins it implies but never declared, plus readable names for cryptic tables. Review, then apply them as virtual relationships and labels.",
    visual: ConnectionDoctor
  },
  {
    title: "Generate a dashboard",
    desc: "Describe what you want to watch. The AI plans the panels, runs every query, and repairs any that fail using the real error before you see them.",
    visual: DashboardGenerator
  },
  {
    title: "Index doctor",
    desc: "Suggests indexes that would speed up a dashboard’s panels, checked against the indexes you already have. Copy the SQL, or apply it if you have write access.",
    visual: IndexDoctor
  }
];

export function AiAssist() {
  return (
    <section id="ai" className="border-t border-border-primary bg-bg-secondary py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="AI that does the setup" title="Let the model do the tedious parts, then review its work">
          Beyond answering questions, Lizard’s AI prepares the console for you. Every suggestion is shown before it changes anything, and
          checked against the real schema rather than trusted blindly.
        </SectionHeader>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {cards.map((card) => (
            <div key={card.title} className="card flex flex-col overflow-hidden">
              <div className="p-6 pb-0">
                <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-text-primary">{card.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-text-secondary">{card.desc}</p>
              </div>
              <div className="mt-6 flex flex-1 flex-col justify-end">
                <card.visual />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

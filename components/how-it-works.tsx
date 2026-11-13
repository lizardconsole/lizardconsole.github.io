import { SectionHeader } from './section-header';

const steps = [
  {
    title: 'Start Lizard',
    desc: 'Generate an encryption key once and save it in .env, with an LLM URL if you want AI querying. Then start Lizard from that file.',
    code: `openssl rand -base64 32

LIZARD_ENCRYPTION_KEY=<that key>
LIZARD_LLM_URL=https://:sk-…@…?model=…

docker run --env-file .env …`,
  },
  {
    title: 'Add your connections',
    desc: 'Register each database in Settings. The connection name becomes its alias in cross-database SQL.',
    code: `users_service    postgres   read + write
orders_service   postgres   read + write
support_service  mysql      read only
events_service   mongodb    read only`,
  },
  {
    title: 'Browse, ask, chart',
    desc: 'Every table gets a UI immediately. Link tables across services with a virtual relationship when you need to join them.',
    code: `orders.customer_id
  → users_service.public.customers.id`,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border-primary bg-bg-secondary py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="How it works" title="From connection string to console in a few minutes">
          No manifests and no code generation. Lizard derives everything from the live schema, and
          picks up changes as they happen.
        </SectionHeader>

        <ol className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="card flex flex-col p-6">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-tertiary font-mono text-[12px] font-medium text-text-primary">
                {i + 1}
              </span>
              <h3 className="mt-5 text-[15px] font-semibold tracking-[-0.01em] text-text-primary">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-text-secondary">{step.desc}</p>
              <pre className="mt-6 flex-1 overflow-x-auto rounded-lg border border-border-primary bg-bg-secondary p-4 font-mono text-[12px] leading-5 text-text-primary">
                <code>{step.code}</code>
              </pre>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

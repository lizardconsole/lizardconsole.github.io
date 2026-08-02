import { GitBranch, LayoutGrid, Link2 } from 'lucide-react';

export default function VirtualRelationships() {
  return (
    <section id="relationships" className="py-24 bg-bg-primary relative overflow-hidden transition-colors duration-200">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-72 w-72 rounded-full bg-indigo-500/5 blur-[120px] ml-auto" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold font-mono tracking-widest text-accent uppercase bg-accent-soft px-3 py-1 rounded-full border border-accent-soft-border">
              VIRTUAL RELATIONSHIPS
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
              Stitch microservice boundaries seamlessly
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Microservice databases have no real foreign keys between them. Lizard lets you declare those
              relationships virtually, in a per-table &quot;Customize&quot; panel — nothing is ever written to your
              production databases.
            </p>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-bg-secondary/40 border border-border-primary">
                <GitBranch className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-text-primary font-semibold">The only path to a cross-DB AI join</p>
                  <p className="text-text-muted mt-1">The AI never guesses a join across connections — a declared virtual relationship is required.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-bg-secondary/40 border border-border-primary">
                <LayoutGrid className="h-4.5 w-4.5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-text-primary font-semibold">Powers cross-DB reference pickers</p>
                  <p className="text-text-muted mt-1">Linked columns render as searchable pickers and readable labels in the CRUD UI, not raw ids.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border-primary bg-bg-secondary/30 p-6 sm:p-8">
              <p className="text-[11px] font-bold font-mono text-text-muted uppercase tracking-wider mb-6">Example virtual relationship</p>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-5 p-4 rounded-lg border border-border-primary bg-bg-primary space-y-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="font-mono text-[10px] text-text-muted">orders_service (Postgres)</span>
                  </div>
                  <p className="font-mono text-xs text-text-primary font-bold">orders.customer_id</p>
                </div>

                <div className="sm:col-span-2 flex justify-center">
                  <div className="h-9 w-9 rounded-full flex items-center justify-center border border-emerald-400 bg-emerald-500 text-gray-950">
                    <Link2 className="h-4.5 w-4.5" />
                  </div>
                </div>

                <div className="sm:col-span-5 p-4 rounded-lg border border-border-primary bg-bg-primary space-y-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    <span className="font-mono text-[10px] text-text-muted">users_service (Postgres)</span>
                  </div>
                  <p className="font-mono text-xs text-text-primary font-bold">public.customers.id</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border-primary text-[11px] font-mono text-text-muted">
                Declared once in the &quot;Customize&quot; panel — then used everywhere: CRUD pickers, natural-language
                joins, and cross-database charts.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

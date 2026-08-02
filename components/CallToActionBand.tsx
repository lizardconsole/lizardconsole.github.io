import { Terminal, Github, ArrowRight, ShieldCheck, Database } from 'lucide-react';
import { GITHUB_URL } from '@/lib/site';

export default function CallToActionBand() {
  return (
    <section className="py-20 border-t border-border-primary bg-bg-primary relative overflow-hidden transition-colors duration-200">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.06),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-bg-secondary/80 to-bg-primary p-8 sm:p-12 lg:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="mx-auto max-w-3xl">
            <span className="text-xs font-bold font-mono tracking-widest text-accent uppercase bg-accent-soft px-3.5 py-1.5 rounded-full border border-accent-soft-border inline-flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5" />
              OPEN SOURCE
            </span>

            <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
              Give your team instant data visibility without SaaS data risk
            </h2>

            <p className="mt-6 text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
              Self-host Lizard and inspect, edit, relate, and query your Postgres, MySQL, and MongoDB databases —
              on your own infrastructure.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/docs/quickstart"
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-3.5 text-sm font-bold text-gray-950 hover:opacity-95 shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Terminal className="h-4 w-4" />
                <span>Get Started Now</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-border-primary bg-bg-primary px-6 py-3.5 text-sm font-bold text-text-primary hover:bg-bg-tertiary transition-all cursor-pointer"
              >
                <Github className="h-4.5 w-4.5" />
                <span>View on GitHub</span>
              </a>
            </div>

            <div className="mt-10 pt-8 border-t border-border-primary/60 flex flex-wrap justify-center items-center gap-6 text-xs font-mono text-text-muted">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-accent" /> 100% Self-Hosted
              </span>
              <span className="flex items-center gap-1.5">
                <Terminal className="h-4 w-4 text-teal-400" /> Open Source
              </span>
              <span className="flex items-center gap-1.5">
                <Database className="h-4 w-4 text-blue-400" /> Zero DB Schema Pollution
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

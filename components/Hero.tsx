import { CheckCircle2, Github, ArrowRight, Terminal } from 'lucide-react';
import { GITHUB_URL } from '@/lib/site';
import ScreenshotPlaceholder from './ScreenshotPlaceholder';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 glow-mesh transition-colors duration-200">
      <div className="absolute top-1/4 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute top-1/3 left-1/4 -z-10 h-80 w-80 -translate-x-1/4 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-soft-border bg-accent-soft px-3.5 py-1 text-xs text-accent mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider">Open Source · Self-Hosted</span>
          </div>

          <h1 className="font-display text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
            AI-native, zero-config data console{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500 bg-clip-text text-transparent block mt-2">
              for your Postgres, MySQL &amp; MongoDB fleet.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto font-sans">
            Point Lizard at one or many databases — mix engines freely — and get an{' '}
            <strong className="text-text-primary font-semibold">auto-generated CRUD UI</strong>, natural-language
            querying, and prompt-driven charts across the fleet. <strong className="text-accent font-semibold">100% self-hosted</strong>,
            zero schema pollution.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/docs/quickstart"
              className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-3.5 text-sm font-bold text-gray-950 hover:opacity-95 shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Terminal className="h-4 w-4" />
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-border-primary bg-bg-secondary/80 px-6 py-3.5 text-sm font-bold text-text-primary hover:bg-bg-tertiary transition-all cursor-pointer"
            >
              <Github className="h-4.5 w-4.5" />
              <span>View on GitHub</span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-xs font-mono text-text-muted">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-accent" /> No SaaS Data Exposure</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Zero Schema Pollution</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-accent" /> Cross-DB Virtual Relationships</span>
          </div>
        </div>

        <div className="mt-14 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border-primary bg-bg-secondary/60 backdrop-blur-xl shadow-2xl overflow-hidden relative">
            <div className="bg-bg-primary px-4 py-3 border-b border-border-primary flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-xs text-text-secondary font-semibold border-l border-border-primary pl-3">
                localhost:3111
              </span>
            </div>
            <ScreenshotPlaceholder label="Product screenshot coming soon" className="h-[360px] sm:h-[440px] rounded-none border-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

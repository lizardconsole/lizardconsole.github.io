import { ArrowRight } from 'lucide-react';
import { GITHUB_URL, LICENSE_NAME } from '@/lib/site';

export function CallToActionBand() {
  return (
    <section className="px-4 pb-24 sm:px-6 sm:pb-32">
      <div className="card-raised relative container mx-auto overflow-hidden px-6 py-16 text-center sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-grid" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl sm:text-[44px] font-semibold tracking-[-0.04em] leading-[1.1] text-text-primary text-balance">
            Give your team a real view of its data
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base sm:text-[17px] leading-7 text-text-secondary">
            Inspect, edit, relate and query every Postgres, MySQL and MongoDB database you run, on your own
            infrastructure. Open source under the {LICENSE_NAME} licence.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/docs/quickstart" className="btn btn-primary w-full sm:w-auto">
              Get started
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="btn btn-secondary w-full sm:w-auto">
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

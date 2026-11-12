'use client';

import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { GITHUB_URL, LICENSE_NAME, LICENSE_URL } from '@/lib/site';
import { useGallery } from './gallery-provider';

const HERO_SHOT = '/screenshots/federated-orders-customers.png';

const engines = ['PostgreSQL', 'MySQL', 'MongoDB', 'CSV · Parquet · XLSX'];

export function Hero() {
  const gallery = useGallery();

  return (
    <section className="relative -mt-16 pt-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid" />

      <div className="relative container mx-auto px-4 sm:px-6 pt-20 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href={LICENSE_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-surface py-1 pl-1 pr-3 text-[13px] text-text-secondary hover:text-text-primary transition-colors"
            style={{ boxShadow: 'var(--shadow-btn-secondary)' }}
          >
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[12px] font-medium text-accent">
              Open source
            </span>
            {LICENSE_NAME} licensed, self-hosted
            <ArrowUpRight className="h-3.5 w-3.5 text-text-muted group-hover:text-text-primary transition-colors" />
          </a>

          <h1 className="mt-7 text-[40px] leading-[1.05] sm:text-6xl md:text-[68px] font-semibold tracking-[-0.045em] text-text-primary text-balance">
            One console for every database you run
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[17px] sm:text-lg leading-7 sm:leading-8 text-text-secondary text-pretty">
            Point Lizard at your Postgres, MySQL and MongoDB fleet. Get an editable UI for every table,
            plain-English queries, and dashboards that join across services. No config, nothing written
            to your databases.
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

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-text-muted">
            {engines.map((engine) => (
              <li key={engine} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-border-strong" />
                {engine}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mt-16 sm:mt-20">
          <div className="card-raised p-1.5 sm:p-2">
            <div className="flex items-center gap-1.5 px-2.5 pb-2 pt-1">
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="ml-3 hidden sm:block rounded-md bg-bg-tertiary px-2.5 py-0.5 font-mono text-[11px] text-text-muted">
                localhost:3111/dashboards/revenue
              </span>
            </div>
            <button
              type="button"
              onClick={() => gallery.open(HERO_SHOT)}
              aria-label="Open screenshot"
              className="relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-[10px] border border-border-primary bg-bg-secondary"
            >
              <Image
                src={HERO_SHOT}
                alt="A Lizard dashboard joining a Postgres orders table with a customers table in another database into one revenue-by-country chart"
                fill
                sizes="(min-width: 1024px) 1000px, 100vw"
                className="object-cover object-top"
                priority
              />
            </button>
          </div>
          <div className="pointer-events-none absolute inset-x-0 -bottom-px h-32 bg-linear-to-t from-bg-primary to-transparent" />
        </div>
      </div>
    </section>
  );
}

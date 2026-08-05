import type { Metadata } from 'next';
import Link from 'next/link';
import Prose from '@/components/Prose';
import { GITHUB_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Introduction',
  description: 'What Lizard is, what it does, and where to go next.',
};

export default function DocsIndexPage() {
  return (
    <Prose>
      <h1>Introduction</h1>
      <p>
        Lizard is an AI-native, zero-config data console. Point it at one or many databases — mixing
        engines freely — and get an auto-generated CRUD UI, natural-language querying, and prompt-driven
        charts across the whole fleet, with zero manual admin-panel configuration.
      </p>

      <h2>What it does</h2>
      <ul>
        <li><strong>Auto-generated CRUD UI</strong> — browse, filter, and edit every table across every schema and database, derived entirely from schema introspection.</li>
        <li><strong>Natural-language querying</strong> — an on-demand agent explores only the tables it needs, streams its progress live, and can be stopped mid-run. The generated SQL is always shown and editable.</li>
        <li><strong>One-click &amp; prompt-driven charts</strong> — visualize any result, or describe a chart in words. A single chart can join data from different microservice databases.</li>
        <li><strong>Dashboards</strong> — a saved result is a page of blocks, each one query plus how to read it: table, chart, kanban, or gallery, with variables and an optional date range in the URL.</li>
        <li><strong>Bounded by design</strong> — no unscoped catalog, no query without a limit, no cache or connection pool that only grows. Everything has a ceiling, because the target is a database per microservice.</li>
      </ul>

      <h2>Why a fleet, not a database</h2>
      <p>
        Most teams run microservices, so their data is deliberately split across many databases —
        one per service. Lizard treats that fleet as a single queryable surface: reads and analytics can
        span databases and engines via an embedded, read-only federation engine, while writes always
        target exactly one owning database.
      </p>

      <h2>Where to go next</h2>
      <ul>
        <li><Link href="/docs/features">Features</Link> — the full tour, including filters, timezones, dashboards, and the limits that keep it bounded.</li>
        <li><Link href="/docs/quickstart">Quickstart</Link> — run Lizard locally or in Docker in a few minutes.</li>
        <li><Link href="/docs/architecture">Architecture</Link> — how the console, the guard, and federation fit together.</li>
        <li><Link href="/docs/security">Security model</Link> — the two-role model, the SQL Guard, and credential encryption.</li>
        <li><Link href="/docs/roadmap">Roadmap</Link> — what's shipped, what's in progress, and what's deliberately out of scope.</li>
        <li><Link href="/docs/faq">FAQ</Link> — common questions before you self-host.</li>
        <li><a href={GITHUB_URL} target="_blank" rel="noreferrer">Source on GitHub</a> — file issues, read the code, contribute.</li>
      </ul>
    </Prose>
  );
}

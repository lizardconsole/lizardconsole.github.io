import type { Metadata } from 'next';
import Link from 'next/link';
import Prose from '@/components/Prose';
import { GITHUB_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'What Lizard supports today, what is actively being built, and what is deliberately out of scope.',
};

export default function RoadmapPage() {
  return (
    <Prose>
      <h1>Roadmap</h1>
      <p>
        Where the project actually stands — not a marketing timeline. See{' '}
        <a href={`${GITHUB_URL}/blob/main/PLAN.md`} target="_blank" rel="noreferrer">PLAN.md</a> in the repo
        for the full phased design document this page summarizes.
      </p>

      <h2>Shipped today</h2>
      <ul>
        <li>Multi-engine connections — Postgres, MySQL, and MongoDB side by side, mixed freely.</li>
        <li>Auto-generated, schema-derived CRUD UI with filters, search, and inline editing.</li>
        <li>Virtual relationships across connections and engines, with no DDL on your databases.</li>
        <li>Natural-language querying via an on-demand, tool-calling AI agent — schema exploration streams live, the generated SQL is always shown, and a run can be stopped mid-flight.</li>
        <li>One-click and prompt-driven charts, plus dashboards that pin panels from different databases.</li>
        <li>Dashboards as pages of blocks — table, chart, kanban, and gallery views over the same query, URL-backed variables, an optional date range, tags with server-side search, save-as, and a drag-and-resize grid.</li>
        <li>Type-aware filters, including whole-day datetime semantics (optional time pickers, half-open ranges that stay index-friendly).</li>
        <li>Timezone-correct timestamps end to end — the browser&apos;s zone is validated server-side and applied as a session setting on Postgres, MySQL, and the federation engine.</li>
        <li>Fleet-scale bounds throughout: scoped-only introspection, an enforced row limit on every query, bounded fan-out, a column-bounded catalog cache with stale-while-revalidate, idle connection-pool eviction, and paged, server-searched pickers.</li>
        <li>Role-based access (admin/editor/viewer), per-connection grants, and an audit log with tiered retention.</li>
        <li>Credentials encrypted at rest (AES-256-GCM); all Lizard state lives in its own local SQLite file.</li>
      </ul>
      <p>
        See <Link href="/docs/features">Features</Link> for the full detail on each of these.
      </p>

      <h2>In progress — richer data console</h2>
      <p>
        Deepening the auto-generated console itself (still zero-config, still schema-derived — not adding a
        SQL/DBA client or AI features):
      </p>
      <ul>
        <li>Rich type widgets — arrays, ranges, structured jsonb editing, bytea uploads, network types, PostGIS/pgvector-aware cells.</li>
        <li>Inline cell editing, bulk edit/delete, row duplication, client-side constraint validation.</li>
        <li>Saved views for tables themselves, plus calendar and self-referencing tree views (kanban and gallery already ship as dashboard blocks).</li>
        <li>Many-to-many linked records auto-detected from junction tables.</li>
        <li>Richer filter operators (regex, array contains/overlap, range overlap, jsonb containment).</li>
        <li>CSV import/export honoring the current filter, sort, and selection.</li>
        <li>Per-view auto-refresh, per-record comments, and record history from the audit log.</li>
      </ul>

      <h2>On the roadmap</h2>
      <ul>
        <li>SQLite as a fourth engine, behind the same driver abstraction as Postgres/MySQL/MongoDB.</li>
        <li>Embeddings-based schema retrieval for very large fleets, so the AI agent scales past what fits in a name-only skeleton.</li>
        <li>Saved AI &quot;workflows&quot; and scheduled reports.</li>
        <li>A plugin system for custom widgets and dashboard panels.</li>
      </ul>

      <h2>Deliberately out of scope</h2>
      <p>Kept out on purpose, to stay a data console rather than something broader:</p>
      <ul>
        <li>A low-code app builder — no drag-and-drop page composer.</li>
        <li>A BI warehouse tool — no ETL, no materialized-view pipelines.</li>
        <li>DBA/SQL-client tooling — no index/vacuum/activity/EXPLAIN browser, no function/trigger editor, no DDL against your databases.</li>
      </ul>
    </Prose>
  );
}

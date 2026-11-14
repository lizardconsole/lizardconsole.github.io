import type { Metadata } from "next";
import Link from "next/link";
import { Prose } from "@/components/prose";
import { GITHUB_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "What Lizard supports today, what is actively being built, and what is deliberately out of scope."
};

export default function RoadmapPage() {
  return (
    <Prose>
      <h1>Roadmap</h1>
      <p>
        Where the project actually stands — not a marketing timeline. See{" "}
        <a href={`${GITHUB_URL}/blob/main/PLAN.md`} target="_blank" rel="noreferrer">
          PLAN.md
        </a>{" "}
        in the repo for the full phased design document this page summarizes.
      </p>

      <h2>Shipped today</h2>
      <ul>
        <li>Multi-engine connections — Postgres, MySQL, and MongoDB side by side, mixed freely.</li>
        <li>Auto-generated, schema-derived CRUD UI with filters, search, and record editing.</li>
        <li>
          Five view types per table (table, kanban, gallery, calendar, tree), saved and shareable views, bulk edit and delete, row
          duplication, many-to-many links from junction tables, comments on records, CSV/JSON/NDJSON import, and ⌘K search.
        </li>
        <li>File connections: CSV, TSV, JSON, NDJSON, Parquet, XLSX and Avro uploads queried like tables.</li>
        <li>
          Virtual relationships across connections and engines, with composite keys and fixed-value conditions, and no DDL on your
          databases.
        </li>
        <li>
          AI that does the setup: a connection doctor that finds undeclared joins and readable labels, dashboard generation from a
          description, and an index doctor for slow dashboards.
        </li>
        <li>
          Natural-language querying via an on-demand, tool-calling AI agent — schema exploration streams live, the generated SQL is always
          shown, and a run can be stopped mid-flight.
        </li>
        <li>One-click and prompt-driven charts, plus dashboards that pin panels from different databases.</li>
        <li>
          Dashboards as pages of blocks — table, chart, kanban, and gallery views over the same query, URL-backed variables (multi-select
          with an &quot;All&quot;, and optional <code>[[ ... ]]</code> SQL blocks), an optional date range, tags with server-side search,
          save-as, JSON import/export, and either a drag-and-resize grid or a single block filling the whole page.
        </li>
        <li>
          Type-aware filters, including whole-day datetime semantics (optional time pickers, half-open ranges that stay index-friendly).
        </li>
        <li>
          Timezone-correct timestamps end to end — the browser&apos;s zone is validated server-side and applied as a session setting on
          Postgres, MySQL, and the federation engine.
        </li>
        <li>
          Fleet-scale bounds throughout: scoped-only introspection, an enforced row limit on every query, bounded fan-out, a column-bounded
          catalog cache with stale-while-revalidate, idle connection-pool eviction, and paged, server-searched pickers.
        </li>
        <li>
          CSV/JSON export honoring the current filters, sort, search, and column selection, with foreign keys optionally exported as a
          resolved &quot;(label)&quot; companion column. A result under the row-limit threshold streams straight back; anything larger
          becomes a background job you can leave running and cancel, tracked in Settings → Exports until you come back for it.
        </li>
        <li>
          Team-based access (reader, editor, manager), per-team connection grants, OpenID Connect single sign-on, and an audit log with
          tiered retention.
        </li>
        <li>
          Backup and restore of Lizard&apos;s own state, Postgres metadata and Redis for running several instances, and an optional DuckDB
          server for federated queries.
        </li>
        <li>Credentials encrypted at rest (AES-256-GCM); all Lizard state lives in its own metadata database (SQLite or Postgres).</li>
      </ul>
      <p>
        See <Link href="/docs/features">Features</Link> for the full detail on each of these.
      </p>

      <h2>In progress — richer data console</h2>
      <p>Deepening the auto-generated console itself, still zero-config and schema-derived:</p>
      <ul>
        <li>
          Rich type widgets: arrays, ranges, structured jsonb editing, bytea uploads, network types, PostGIS and pgvector-aware cells.
        </li>
        <li>Inline cell editing in the grid, and client-side constraint validation before a save.</li>
        <li>Richer filter operators: regex, array contains and overlap, range overlap, jsonb containment.</li>
        <li>Per-view auto-refresh, and per-record change history from the audit log.</li>
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
        <li>
          DBA/SQL-client tooling — no vacuum/activity/EXPLAIN browser, no function/trigger editor, no DDL against your databases. The one
          exception is the index doctor, which runs <code>CREATE INDEX</code> only when a user with write access clicks Apply.
        </li>
      </ul>
    </Prose>
  );
}

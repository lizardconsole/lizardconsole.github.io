import type { Metadata } from 'next';
import Prose from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Architecture',
  description: 'How the console, the SQL Guard, and the federation engine fit together.',
};

export default function ArchitecturePage() {
  return (
    <Prose>
      <h1>Architecture</h1>
      <p>
        Lizard is a single full-stack Next.js app. Every query to any target database — CRUD, AI, or
        charts — passes through one SQL Guard before it runs.
      </p>

      <h2>Request flow</h2>
      <pre>
        <code>{`Browser (table browser, AI query box, charts)
  → Next.js API layer (introspect / data / AI / charts services)
    → SQL Guard (parse, single SELECT only, LIMIT, timeout, read-only tx)
      → single connection (native)         → target database (read or write role)
      → cross-connection (federated)       → DuckDB (ATTACH, read-only) → target databases`}</code>
      </pre>

      <h2>Tech stack</h2>
      <ul>
        <li><strong>App framework:</strong> Next.js (App Router) + TypeScript.</li>
        <li><strong>DB driver / query builder:</strong> <code>pg</code> and Kysely — table/column identifiers are only known at runtime, so a compile-time ORM doesn't fit the query layer.</li>
        <li><strong>Federation engine:</strong> DuckDB embedded in the Node process. It <code>ATTACH</code>es multiple databases read-only (Postgres and MySQL natively, MongoDB via DuckDB's community <code>mongo</code> extension) and runs one SQL statement across them, with filters pushed down. Nothing is installed on your databases.</li>
        <li><strong>AI:</strong> Anthropic (Claude) by default; OpenAI and Google also supported. The model gets a cheap, name-only schema skeleton plus tools it calls on demand — never a full schema dump.</li>
        <li><strong>Charts:</strong> auto-picked from the result's own shape — time series, comparison, single value, or a plain table when nothing's chartable.</li>
        <li><strong>Metadata store:</strong> a local SQLite file holding connections, overrides, virtual relationships, saved queries, dashboards, and the audit log. Lizard never writes to the target database's schema.</li>
      </ul>

      <h2>How AI querying works</h2>
      <p>
        The model is never handed your whole schema. It gets a name-only skeleton (every connection,
        schema, and table — no columns) and three tools it calls on demand:
      </p>
      <ul>
        <li><code>search_schema</code> — fuzzy-match table/column names and comments fleet-wide.</li>
        <li><code>describe_table</code> — full column detail for exactly one table.</li>
        <li><code>get_relations</code> — real and virtual foreign keys touching one table, in either direction.</li>
      </ul>
      <p>
        It settles the plan by calling a terminal <code>submit_plan</code> tool, validated and executed
        through the same Guard/read-only-role path as everything else. Every step streams to the UI live,
        and a Stop button cancels the request end to end — it aborts the in-flight LLM call and cancels the
        database connection it's running against.
      </p>
      <p>
        By default the AI only joins tables with a real foreign key or a declared virtual relationship —
        it won't guess a join from matching column names. A cross-database join always requires a declared
        virtual relationship, since there's no way to verify a guessed one across separate databases.
      </p>

      <h2>Cross-database queries (federation)</h2>
      <p>
        Postgres can join across schemas natively but not across separate databases, and MySQL/MongoDB
        never share a server with anything else. For questions and charts that span connections — or
        involve MongoDB at all — Lizard spins up an embedded DuckDB, attaches each involved database
        read-only with its <code>lizard_read</code> credentials, and runs one SQL statement across them.
      </p>
      <p>
        Since microservice databases have no real foreign keys between them, you declare virtual
        relationships (e.g. <code>orders.customer_id → users_service.public.customers.id</code>) in the
        table &quot;Customize&quot; panel. These power cross-database reference pickers in the UI and are
        the only way the AI is allowed to join tables across connections.
      </p>
    </Prose>
  );
}

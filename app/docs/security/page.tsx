import type { Metadata } from 'next';
import Prose from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Security Model',
  description: 'The two-role model, the SQL Guard, credential encryption, and audit log retention.',
};

export default function SecurityPage() {
  return (
    <Prose>
      <h1>Security Model</h1>
      <p>The AI can generate SQL, but it can never act outside the sandbox.</p>

      <h2>1. Read-only role</h2>
      <p>
        AI, chart, and browse queries run on the <code>lizard_read</code> role. Writes (CRUD forms only)
        use <code>lizard_write</code> with parameterized queries — model SQL never reaches a write-capable
        connection.
      </p>

      <h2>2. SQL Guard</h2>
      <p>
        Every AI, chart, and federated query is parsed and validated: single <code>SELECT</code> only.
        Multi-statements, DML/DDL, comments, <code>pg_sleep</code>, file/dblink/backend-control functions,
        sequence manipulation, row locking, <code>COPY</code>, and — on the federation path —{' '}
        <code>ATTACH</code>/<code>INSTALL</code>/file readers are all rejected. A hard <code>LIMIT</code>{' '}
        wrapper caps every result.
      </p>

      <h2>3. Belt and suspenders</h2>
      <p>
        Guarded queries additionally run inside a read-only transaction with a statement timeout (30s for
        Postgres/MySQL, 45s for federated DuckDB queries). Federation attaches every database{' '}
        <code>READ_ONLY</code> and locks DuckDB's configuration and filesystem access before model SQL
        runs. Cancelling a running query (the client Stop button, or the request disconnecting) destroys
        the underlying connection immediately rather than waiting it out.
      </p>

      <h2>4. Transparency</h2>
      <p>
        The generated SQL and the set of databases touched are always shown in the UI — editable and
        re-runnable — and everything is recorded in the audit log.
      </p>

      <h2>5. Credentials encrypted at rest</h2>
      <p>
        Database passwords Lizard stores are encrypted with AES-256-GCM under{' '}
        <code>LIZARD_ENCRYPTION_KEY</code>; the server refuses to start without one. This protects file
        escaping — a backup, a volume snapshot, a copy of <code>data/</code> pulled for debugging, or
        anyone with disk read access but not the process environment. It does not protect against a
        compromised host or code execution inside Lizard. Passwords never leave the API and never reach
        query logs.
      </p>

      <h2>6. Adversarial test suite</h2>
      <p>
        <code>npm test</code> runs 30+ injection/escape vectors against the guard.
      </p>

      <h2>Audit log retention</h2>
      <p>
        Reads (<code>query</code>, <code>query_cached</code>, <code>federated_query</code>) are
        machine-driven telemetry, kept 30 days by default. Writes (<code>create</code>, <code>update</code>,{' '}
        <code>delete</code>, <code>import</code>) plus anything that errored are the audit trail proper —
        kept 365 days by default. A row cap applies on top of both windows; whichever limit is stricter
        wins.
      </p>
    </Prose>
  );
}

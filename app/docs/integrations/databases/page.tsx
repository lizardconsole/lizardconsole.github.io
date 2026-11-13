import type { Metadata } from 'next';
import Link from 'next/link';
import { Prose } from '@/components/prose';

export const metadata: Metadata = {
  title: 'Databases',
  description: 'Connect PostgreSQL, MySQL and MongoDB side by side, and query uploaded files like tables.',
};

export default function DatabasesPage() {
  return (
    <Prose>
      <h1>Databases and files</h1>
      <p>
        Add connections in Settings → Connections and mix engines freely. Single-connection reads and
        writes run natively on that database. Anything that spans connections, or touches MongoDB through
        SQL, runs through the <Link href="/docs/installation/duckdb">DuckDB engine</Link>.
      </p>

      <table>
        <thead>
          <tr><th>Source</th><th>Browse and edit</th><th>AI and SQL</th><th>Cross-database joins</th></tr>
        </thead>
        <tbody>
          <tr><td>PostgreSQL</td><td>Yes</td><td>Native</td><td>Native across schemas, DuckDB across databases</td></tr>
          <tr><td>MySQL</td><td>Yes</td><td>Native</td><td>Through DuckDB</td></tr>
          <tr><td>MongoDB</td><td>Yes</td><td>Always through DuckDB</td><td>Through DuckDB</td></tr>
          <tr><td>Uploaded files</td><td>Read-only</td><td>Through DuckDB</td><td>Through DuckDB</td></tr>
        </tbody>
      </table>

      <h2>Connection names</h2>
      <p>
        A connection’s name is its alias in cross-database SQL, as in{' '}
        <code>users_service.public.customers</code>, so it must be a lowercase identifier. Pick names that
        match your services.
      </p>

      <h2>Credentials</h2>
      <p>
        A connection has read credentials and, optionally, write credentials. Both can be the same
        database user. Leave the write credentials out and the connection is read-only. AI, chart and
        browse queries always run with the read credentials, so pointing them at a read-only user is a
        simple way to tighten things later.
      </p>

      <h2>PostgreSQL</h2>
      <p>
        Every schema in the database is introspected: tables, columns, types, primary and foreign keys,
        enums, defaults and comments. Real foreign keys become readable labels and pickers automatically.
      </p>

      <h2>MySQL</h2>
      <p>
        A MySQL connection is one database. A server hosting several databases registers as several
        connections, and joins between them go through federation.
      </p>

      <h2>MongoDB</h2>
      <p>
        MongoDB has no schema to read, so Lizard infers one by sampling documents. Collections get the same
        grid, filters and single-document editing as tables. MongoDB has no SQL dialect of its own, so SQL
        and AI queries against it always run through DuckDB, even for a single connection.
      </p>

      <h2>File connections</h2>
      <p>
        Upload a file and query it like a read-only table, including joins against live databases.
        Supported formats are CSV, TSV, JSON, NDJSON, Parquet, XLSX (each sheet becomes a table) and
        Avro. File connections need <code>LIZARD_STORAGE_URL</code>; see{' '}
        <Link href="/docs/integrations/file-storage">File storage</Link> for setup and details.
      </p>

      <h2>Virtual relationships</h2>
      <p>
        Service databases have no foreign keys between them. Declare one in a table’s Customize panel, for
        example <code>orders.customer_id → users_service.public.customers.id</code>. Relationships work
        across services <strong>and across engines</strong>: Postgres to Postgres, MySQL to Postgres, or
        MongoDB to Postgres.
      </p>
      <ul>
        <li>Match on several columns at once for composite keys.</li>
        <li>Pin a column to a fixed value for polymorphic tables, such as <code>subject_type = 'customer'</code>.</li>
        <li>Linked columns render as readable labels and searchable pickers in the grid.</li>
        <li>It is the only way the AI is allowed to join across connections; it never guesses a cross-database join.</li>
        <li>It is stored in Lizard’s metadata, never in your databases.</li>
      </ul>
    </Prose>
  );
}

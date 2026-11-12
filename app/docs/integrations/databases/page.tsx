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

      <h2>PostgreSQL</h2>
      <p>
        Every schema in the database is introspected: tables, columns, types, primary and foreign keys,
        enums, defaults and comments. Real foreign keys become readable labels and pickers automatically.
        See the <Link href="/docs/quickstart">Quickstart</Link> for the two-role grant script.
      </p>

      <h2>MySQL</h2>
      <p>
        A MySQL connection is one database. A server hosting several databases registers as several
        connections, and joins between them go through federation. Create a read-only user for{' '}
        <code>lizard_read</code> and, if you want edits, a separate user with{' '}
        <code>SELECT, INSERT, UPDATE, DELETE</code> for <code>lizard_write</code>.
      </p>

      <h2>MongoDB</h2>
      <p>
        MongoDB has no schema to read, so Lizard infers one by sampling documents. Collections get the same
        grid, filters and single-document editing as tables. MongoDB has no SQL dialect of its own, so SQL
        and AI queries against it always run through DuckDB, even for a single connection. Give{' '}
        <code>lizard_read</code> the <code>read</code> role and <code>lizard_write</code>{' '}
        <code>readWrite</code> on the databases you connect.
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
        example <code>orders.customer_id → users_service.public.customers.id</code>. It powers cross-database
        labels and pickers, and it is the only way the AI is allowed to join across connections. It is
        stored in Lizard’s metadata, never in your databases.
      </p>
    </Prose>
  );
}

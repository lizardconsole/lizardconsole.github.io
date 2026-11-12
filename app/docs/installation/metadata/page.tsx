import type { Metadata } from 'next';
import { Prose } from '@/components/prose';

export const metadata: Metadata = {
  title: 'Metadata database',
  description: 'Choose SQLite or Postgres for Lizard’s own state, and how to run Postgres in its own schema.',
};

export default function MetadataPage() {
  return (
    <Prose>
      <h1>Metadata database</h1>
      <p>
        Lizard never stores anything in the databases it connects to. Its own state (connections, users and
        sessions, teams, overrides, virtual relationships, saved queries, dashboards and the audit log)
        lives in one metadata database chosen by <code>LIZARD_METADATA_URL</code>.
      </p>

      <h2>Choosing a driver</h2>
      <table>
        <thead>
          <tr><th>Driver</th><th>Use it when</th></tr>
        </thead>
        <tbody>
          <tr><td>SQLite (default)</td><td>You run one Lizard process. Zero setup.</td></tr>
          <tr><td>Postgres</td><td>You run several instances behind a load balancer, or want metadata in a database you already operate and back up.</td></tr>
        </tbody>
      </table>
      <p>
        There is no built-in copy between the two, so pick one before the data matters.
      </p>

      <h2>SQLite</h2>
      <table>
        <thead>
          <tr><th>Value</th><th>Location</th></tr>
        </thead>
        <tbody>
          <tr><td><em>unset</em></td><td><code>./data/lizard.sqlite</code></td></tr>
          <tr><td><code>sqlite://data/lizard.sqlite</code></td><td>Relative to the working directory</td></tr>
          <tr><td><code>sqlite:///var/lib/lizard/lizard.sqlite</code></td><td>Absolute path</td></tr>
        </tbody>
      </table>
      <p>
        In the Docker image the working directory is <code>/app</code>, so the default file is{' '}
        <code>/app/data/lizard.sqlite</code>. Mount a volume there.
      </p>

      <h2>Postgres</h2>
      <pre>
        <code>{`LIZARD_METADATA_URL=postgres://lizard:…@db.internal:5432/lizard
LIZARD_METADATA_POOL_MAX=10`}</code>
      </pre>
      <ul>
        <li><code>postgresql://</code> works too, and <code>?sslmode=</code> is honoured.</li>
        <li>The database must exist and the user must be able to create tables. Tables are created and upgraded automatically at startup.</li>
        <li>Replicas starting at the same time are safe: the migrator holds an advisory lock.</li>
        <li>In-memory caches stay in step across instances through <code>LISTEN</code>/<code>NOTIFY</code>, so a change saved on one instance is seen by all.</li>
        <li><code>LIZARD_METADATA_POOL_MAX</code> caps connections per instance (default 10).</li>
      </ul>

      <h3>Sharing a database with a dedicated schema</h3>
      <p>
        Add <code>?schema=</code> to keep Lizard’s tables out of <code>public</code>. Lizard creates the
        schema if it is missing (the user then needs <code>CREATE</code> on the database) and pins every
        connection’s <code>search_path</code> to it.
      </p>
      <pre>
        <code>LIZARD_METADATA_URL=postgres://app:…@db.internal:5432/app?schema=lizard</code>
      </pre>
      <p>
        This lets Lizard live alongside an application, or two Lizard deployments share one database in
        separate schemas. If you connect through PgBouncer or another pooler, make sure it forwards the{' '}
        <code>options</code> startup parameter.
      </p>

      <h2>Path rules</h2>
      <p>
        Spaces in folder names are fine. Write <code>#</code>, <code>?</code> and <code>%</code> as{' '}
        <code>%23</code>, <code>%3F</code> and <code>%25</code>. Lizard refuses to start on an unencoded
        path rather than quietly using a different folder.
      </p>
    </Prose>
  );
}

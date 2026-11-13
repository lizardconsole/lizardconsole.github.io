import type { Metadata } from 'next';
import { Prose } from '@/components/prose';

export const metadata: Metadata = {
  title: 'DuckDB engine',
  description: 'Run federated queries on DuckDB 2.0: an embedded in-memory DuckDB, an embedded disk-spilling one, or a remote DuckDB server.',
};

export default function DuckdbPage() {
  return (
    <Prose>
      <h1>DuckDB engine</h1>
      <p>
        DuckDB powers everything that spans more than one connection: cross-database and cross-engine
        queries, SQL over MongoDB, and file connections. Each involved database is attached read-only with
        its <code>lizard_read</code> credentials, one SQL statement runs across them with filters pushed
        down, and nothing is installed on your databases. <code>LIZARD_DUCKDB_URL</code> picks where that
        work runs.
      </p>

      <table>
        <thead>
          <tr><th>Value</th><th>Mode</th></tr>
        </thead>
        <tbody>
          <tr><td><code>memory://</code> (default)</td><td>Embedded and in-memory: a private, locked-down DuckDB per query</td></tr>
          <tr><td><code>file:///var/lib/lizard/duckdb</code></td><td>Embedded, but large queries spill to this directory</td></tr>
          <tr><td><code>file://./data/duckdb</code></td><td>Same, relative to the working directory</td></tr>
          <tr><td><code>http://:&lt;token&gt;@localhost:9494</code></td><td>A DuckDB server over plain HTTP</td></tr>
          <tr><td><code>https://:&lt;token&gt;@duck.internal:9494</code></td><td>A DuckDB server over HTTPS</td></tr>
        </tbody>
      </table>

      <h2>In-memory (default)</h2>
      <p>
        Every federated query gets its own embedded DuckDB inside the Lizard process. Local file access is
        disabled and its configuration is frozen before any model-written SQL runs. Nothing to deploy and
        the strongest isolation, at the cost of memory: a very large join has to fit in RAM.
      </p>

      <h2>Embedded, spilling to disk</h2>
      <p>
        Same isolation, but DuckDB uses the directory as its <code>temp_directory</code>, so big queries
        slow down instead of failing. In Docker, put it on the data volume:
      </p>
      <pre>
        <code>LIZARD_DUCKDB_URL=file:///app/data/duckdb</code>
      </pre>

      <h2>DuckDB server</h2>
      <p>
        A DuckDB server (DuckDB 2.0 or later, Quack protocol) takes federated work off the Lizard
        process. Start one with <code>duckdb -serve</code>, which prints its address and token, or from SQL:
      </p>
      <pre>
        <code>{`CALL quack_serve('quack:localhost:9494', token = '…');`}</code>
      </pre>
      <p>Then point Lizard at it, with the token in the password slot:</p>
      <pre>
        <code>LIZARD_DUCKDB_URL=https://:&lt;token&gt;@duck.internal:9494</code>
      </pre>
      <p>
        The username is ignored, so <code>default:&lt;token&gt;@</code> also works. Percent-encode{' '}
        <code>@ : / ? # %</code> in the token. The URL is validated at startup: a missing port, a missing
        or short token, a path or any query parameter stops the server with a clear error, and the token is
        never logged.
      </p>

      <h3>What changes with a server</h3>
      <ul>
        <li><strong>Federated queries and MongoDB SQL run on the server.</strong> Each connection is attached there read-only under its own name, freshly the first time a Lizard process uses it, then reused.</li>
        <li><strong>Queries are checked before they run.</strong> A shared server can’t be locked down per session, so Lizard parses each query and rejects any that name a connection outside its scope or call file, environment or remote-access functions.</li>
        <li><strong>The server must reach your databases itself.</strong> <code>localhost</code> means the server’s machine.</li>
        <li><strong>Credentials stay attached between queries.</strong> Run it on a trusted host, bound to localhost or behind a TLS-terminating proxy, and don’t share its token with other clients.</li>
        <li><strong>Cancelling stops Lizard waiting, not the server.</strong> A statement already running there runs to completion.</li>
        <li><strong>File connections stay in-process,</strong> because their cache lives on Lizard’s disk.</li>
      </ul>

      <h3>Checking it works</h3>
      <p>After a federated query in Lizard, run this in the server’s console:</p>
      <pre>
        <code>SELECT database_name, type, readonly FROM duckdb_databases() ORDER BY 1;</code>
      </pre>
      <p>
        Avoid selecting <code>path</code> in a shared session: for Postgres and MySQL attachments it can
        include the connection string.
      </p>

      <h2>Which to choose</h2>
      <ul>
        <li><strong>In-memory</strong> for most installs, and whenever model-written SQL should never leave the Lizard process.</li>
        <li><strong>Disk-spilling</strong> when federated joins are large but you don’t want another service.</li>
        <li><strong>Server</strong> when federation is heavy enough to deserve its own machine, or many Lizard replicas should share one engine.</li>
      </ul>
    </Prose>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { Prose } from '@/components/prose';
import { DOCKER_IMAGE, APP_PORT } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Quickstart',
  description: 'Run Lizard in one command, add a connection, and provision least-privilege database roles.',
};

export default function QuickstartPage() {
  return (
    <Prose>
      <h1>Quickstart</h1>
      <p>
        One required secret, one optional LLM URL, and Lizard is running. This page gets you to a working
        console; the <Link href="/docs/installation/docker">Installation</Link> pages cover production setups.
      </p>

      <h2>1. Run Lizard</h2>
      <h3>Docker</h3>
      <pre>
        <code>{`docker run -p ${APP_PORT}:${APP_PORT} \\
  -e LIZARD_ENCRYPTION_KEY=$(openssl rand -base64 32) \\
  -e LIZARD_LLM_URL='https://:sk-ant-…@api.anthropic.com/v1?model=claude-sonnet-5' \\
  -v lizard_data:/app/data \\
  ${DOCKER_IMAGE}`}</code>
      </pre>

      <h3>Node</h3>
      <pre>
        <code>{`npm install
export LIZARD_ENCRYPTION_KEY=$(openssl rand -base64 32)
export LIZARD_LLM_URL='https://:sk-ant-…@api.anthropic.com/v1?model=claude-sonnet-5'
npm run dev`}</code>
      </pre>
      <p>
        Open <code>http://localhost:{APP_PORT}</code>. The first visitor creates the admin account.
      </p>
      <ul>
        <li>
          <strong><code>LIZARD_ENCRYPTION_KEY</code></strong> is required. It encrypts stored database
          passwords, and Lizard refuses to start without it. Keep it with your other deployment secrets:
          losing it means re-entering every stored password.
        </li>
        <li>
          <strong><code>LIZARD_LLM_URL</code></strong> is optional. AI querying and prompt charts stay off
          until it is set. Any provider works; see <Link href="/docs/integrations/llm">LLM providers</Link>.
        </li>
      </ul>

      <h2>2. Add a connection</h2>
      <p>
        Go to Settings → Connections and add Postgres, MySQL or MongoDB databases side by side. The
        connection <strong>name</strong> doubles as its alias in cross-database SQL
        (<code>users_service.public.customers</code>), so it must be a lowercase identifier.
      </p>

      <h2>3. Provision least-privilege roles</h2>
      <p>
        Lizard wants two roles per database. A connection registered with only the read role runs in
        read-only mode. For Postgres, run this as a superuser on each service database:
      </p>
      <pre>
        <code>{`CREATE ROLE lizard_read LOGIN PASSWORD '…';
CREATE ROLE lizard_write LOGIN PASSWORD '…';

GRANT USAGE ON SCHEMA public TO lizard_read, lizard_write;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO lizard_read;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO lizard_write;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO lizard_write;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO lizard_read;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO lizard_write;`}</code>
      </pre>
      <p>
        Repeat the <code>GRANT USAGE</code> line for each schema. MySQL and MongoDB follow the same shape:
        a read-only user for <code>lizard_read</code> and, optionally, a read-write one for{' '}
        <code>lizard_write</code>. Lizard never issues DDL against your databases and never stores anything
        in them.
      </p>

      <h2>Next steps</h2>
      <ul>
        <li><Link href="/docs/installation/docker-compose">Docker Compose</Link>: a production-shaped stack with Postgres metadata and Redis.</li>
        <li><Link href="/docs/installation/metadata">Metadata database</Link>: SQLite or Postgres, and when to switch.</li>
        <li><Link href="/docs/installation/duckdb">DuckDB engine</Link>: in-memory, disk-spilling or a DuckDB server.</li>
        <li><Link href="/docs/integrations/sso">Single sign-on</Link>: Entra ID, Okta, Keycloak and other OIDC providers.</li>
      </ul>
    </Prose>
  );
}

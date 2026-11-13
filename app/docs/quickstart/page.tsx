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
        Generate one secret, save it with an optional LLM URL, and Lizard is running. This page gets you to a working
        console; the <Link href="/docs/installation/docker">Installation</Link> pages cover production setups.
      </p>

      <h2>1. Generate an encryption key</h2>
      <p>
        <code>LIZARD_ENCRYPTION_KEY</code> encrypts the database passwords Lizard stores, and Lizard
        refuses to start without it. Generate it <strong>once</strong>:
      </p>
      <pre>
        <code>openssl rand -base64 32</code>
      </pre>
      <p>
        Keep the output with your other deployment secrets. Every start must use this same key: a new
        key can’t decrypt passwords saved under the old one, so you would have to re-enter every
        connection’s password.
      </p>

      <h2>2. Save it in .env</h2>
      <p>
        Create a <code>.env</code> file with the key from step 1. Add <code>LIZARD_LLM_URL</code> to turn on
        AI querying and prompt charts with any provider (see{' '}
        <Link href="/docs/integrations/llm">LLM providers</Link>), or leave it out to run without AI.
      </p>
      <pre>
        <code>{`LIZARD_ENCRYPTION_KEY=<the key from step 1>
LIZARD_LLM_URL=https://:sk-ant-…@api.anthropic.com/v1?model=claude-sonnet-5`}</code>
      </pre>

      <h2>3. Run Lizard</h2>
      <h3>Docker</h3>
      <pre>
        <code>{`docker run -d -p ${APP_PORT}:${APP_PORT} \\
  --env-file .env \\
  -v lizard_data:/app/data \\
  ${DOCKER_IMAGE}`}</code>
      </pre>

      <h3>Node</h3>
      <p>
        From the Lizard checkout, with <code>.env</code> in its root. Next.js loads it automatically.
      </p>
      <pre>
        <code>{`npm install
npm run dev`}</code>
      </pre>
      <p>
        Open <code>http://localhost:{APP_PORT}</code>. The first visitor creates the admin account.
      </p>

      <h2>4. Add a connection</h2>
      <p>
        Go to Settings → Connections and add Postgres, MySQL or MongoDB databases side by side. The
        connection <strong>name</strong> doubles as its alias in cross-database SQL
        (<code>users_service.public.customers</code>), so it must be a lowercase identifier.
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

import type { Metadata } from 'next';
import Prose from '@/components/Prose';
import { DOCKER_IMAGE, APP_PORT } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Quickstart',
  description: 'Run Lizard locally or in Docker, and provision least-privilege database roles.',
};

export default function QuickstartPage() {
  return (
    <Prose>
      <h1>Quickstart</h1>
      <p>Two required environment variables, then run it.</p>

      <h2>Run with npm</h2>
      <pre>
        <code>{`npm install
export LIZARD_ENCRYPTION_KEY=$(openssl rand -base64 32)   # required — encrypts stored DB passwords at rest
export ANTHROPIC_API_KEY=sk-ant-...                        # or set LIZARD_AI_PROVIDER=openai/google
npm run dev                                                 # → http://localhost:${APP_PORT}`}</code>
      </pre>
      <p>
        Then add your own connection(s) in the UI (Settings → Connections) — Postgres, MySQL, and MongoDB
        are all supported side by side. The connection <strong>name</strong> doubles as the database alias
        in cross-database SQL (<code>users_service.public.customers</code>), so it must be a lowercase identifier.
      </p>

      <h2>Run with Docker</h2>
      <pre>
        <code>{`docker run -p ${APP_PORT}:${APP_PORT} \\
  -e LIZARD_ENCRYPTION_KEY=$(openssl rand -base64 32) \\
  -e ANTHROPIC_API_KEY=sk-ant-... \\
  -v lizard_data:/app/data \\
  ${DOCKER_IMAGE}`}</code>
      </pre>

      <h2>Provisioning credentials on your own databases</h2>
      <p>
        Lizard wants two roles per database, least privilege (a connection may register with only a read
        role for read-only mode). For Postgres:
      </p>
      <pre>
        <code>{`-- run as a superuser on each service database
CREATE ROLE lizard_read LOGIN PASSWORD '…';
CREATE ROLE lizard_write LOGIN PASSWORD '…';

GRANT USAGE ON SCHEMA public TO lizard_read, lizard_write;   -- repeat per schema
GRANT SELECT ON ALL TABLES IN SCHEMA public TO lizard_read;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO lizard_write;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO lizard_write;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO lizard_read;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO lizard_write;`}</code>
      </pre>
      <p>
        MySQL and MongoDB follow the same shape — a read-only user/role for <code>lizard_read</code>, and
        optionally a read-write one for <code>lizard_write</code>; grant only what each needs. Lizard never
        issues DDL against your databases and never stores anything in them — all Lizard state lives in its
        own local SQLite file.
      </p>

      <h2>Key configuration</h2>
      <table>
        <thead>
          <tr><th>Env var</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr><td>LIZARD_AI_PROVIDER</td><td>anthropic | openai | google (default anthropic)</td></tr>
          <tr><td>ANTHROPIC_API_KEY</td><td>required when using the default provider</td></tr>
          <tr><td>LIZARD_ENCRYPTION_KEY</td><td>required — encrypts stored database passwords at rest</td></tr>
          <tr><td>LIZARD_METADATA_PATH</td><td>metadata SQLite location (default ./data/lizard.sqlite)</td></tr>
          <tr><td>LIZARD_ADMIN_PASSWORD</td><td>optional single admin password to gate the UI</td></tr>
        </tbody>
      </table>

      <h2>Development</h2>
      <pre>
        <code>{`npm run dev              # dev server
npm test                 # guard adversarial suite + database unit tests
npm run test:integration # end-to-end test — needs two reachable Postgres databases
npm run build             # production build`}</code>
      </pre>
    </Prose>
  );
}

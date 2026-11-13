import type { Metadata } from 'next';
import Link from 'next/link';
import { Prose } from '@/components/prose';
import { DOCKER_IMAGE, APP_PORT } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Docker Compose',
  description: 'Compose files for Lizard on SQLite, on Postgres with Redis, and with a remote DuckDB server.',
};

const envFile = `LIZARD_ENCRYPTION_KEY=<key generated once with: openssl rand -base64 32>
LIZARD_LLM_URL=https://:sk-ant-…@api.anthropic.com/v1?model=claude-sonnet-5`;

const sqliteCompose = `services:
  lizard:
    image: ${DOCKER_IMAGE}
    ports:
      - "${APP_PORT}:${APP_PORT}"
    env_file: .env
    volumes:
      - lizard_data:/app/data
    restart: unless-stopped

volumes:
  lizard_data:`;

const postgresCompose = `services:
  lizard:
    image: ${DOCKER_IMAGE}
    ports:
      - "${APP_PORT}:${APP_PORT}"
    env_file: .env
    environment:
      LIZARD_METADATA_URL: postgres://lizard:\${METADATA_PASSWORD}@metadata:5432/lizard
      LIZARD_CACHE_URL: redis://cache:6379
      LIZARD_DUCKDB_URL: file:///app/data/duckdb
      COOKIE_SECURE: "true"
    volumes:
      - lizard_data:/app/data
    depends_on:
      metadata:
        condition: service_healthy
      cache:
        condition: service_started
    restart: unless-stopped

  metadata:
    image: postgres:18
    environment:
      POSTGRES_USER: lizard
      POSTGRES_PASSWORD: \${METADATA_PASSWORD}
      POSTGRES_DB: lizard
    volumes:
      - metadata_data:/var/lib/postgresql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U lizard -d lizard"]
      interval: 5s
      retries: 10
    restart: unless-stopped

  cache:
    image: redis:8
    restart: unless-stopped

volumes:
  lizard_data:
  metadata_data:`;

const duckdbServerEnv = `    environment:
      LIZARD_DUCKDB_URL: https://:\${DUCKDB_TOKEN}@duck.internal:9494`;

export default function DockerComposePage() {
  return (
    <Prose>
      <h1>Docker Compose</h1>
      <p>
        Two starting points: a single container on SQLite for one instance, and a stack with Postgres
        metadata and Redis that is ready to scale out. Both read secrets from a <code>.env</code> file next
        to <code>docker-compose.yml</code>.
      </p>
      <p>
        Generate the encryption key once with <code>openssl rand -base64 32</code> and paste the output into{' '}
        <code>.env</code>. Keep the same key for the life of the deployment: a new one can’t decrypt
        passwords saved under the old one.
      </p>
      <pre>
        <code>{envFile}</code>
      </pre>

      <h2>Single instance on SQLite</h2>
      <p>
        Metadata lives in <code>/app/data/lizard.sqlite</code> on the named volume, and DuckDB runs
        in-memory inside the container. This is all most teams need.
      </p>
      <pre>
        <code>{sqliteCompose}</code>
      </pre>
      <pre>
        <code>docker compose up -d</code>
      </pre>

      <h2>Postgres metadata and Redis</h2>
      <p>
        Use this shape when you want to run several Lizard replicas behind a load balancer, or simply want
        metadata in a database you already back up. Add <code>METADATA_PASSWORD</code> to{' '}
        <code>.env</code>.
      </p>
      <pre>
        <code>{postgresCompose}</code>
      </pre>
      <ul>
        <li>
          <strong>Postgres metadata</strong> lets every instance share connections, users, dashboards and
          the audit log. Cache invalidation travels between instances over <code>LISTEN</code>/
          <code>NOTIFY</code>, and replicas starting together are safe because migrations take an advisory
          lock.
        </li>
        <li>
          <strong>Redis</strong> shares query and catalog caches, live updates, export downloads and
          per-connection query limits across instances.
        </li>
        <li>
          <strong><code>file:///app/data/duckdb</code></strong> lets large federated queries spill to disk
          instead of failing on memory.
        </li>
      </ul>
      <p>
        To scale out, run more <code>lizard</code> replicas against the same <code>metadata</code> and{' '}
        <code>cache</code> services. Move uploaded files to S3 with <code>LIZARD_STORAGE_URL</code> so every
        replica sees them; see <Link href="/docs/integrations/file-storage">File storage</Link>.
      </p>

      <h2>Using a DuckDB server</h2>
      <p>
        To move federated and MongoDB SQL work off the Lizard containers, replace{' '}
        <code>LIZARD_DUCKDB_URL</code> with the address and token of a DuckDB server:
      </p>
      <pre>
        <code>{duckdbServerEnv}</code>
      </pre>
      <p>
        The server connects to your databases itself, so it must be able to reach them. See{' '}
        <Link href="/docs/installation/duckdb">DuckDB engine</Link> for setup and trade-offs.
      </p>

      <h2>Trying it with sample data</h2>
      <p>
        The Lizard repository ships a <code>docker-compose.yml</code> that starts a demo fleet (Postgres,
        MySQL and MongoDB service databases) and a seeder that registers them in Lizard with virtual
        relationships and a demo dashboard. Clone the repository and run <code>docker compose up</code>.
      </p>
    </Prose>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { Prose } from '@/components/prose';
import { DOCKER_IMAGE, APP_PORT } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Docker',
  description: 'Run the Lizard container image with SQLite or Postgres metadata and an in-memory or remote DuckDB engine.',
};

export default function DockerPage() {
  return (
    <Prose>
      <h1>Docker</h1>
      <p>
        Lizard ships as a multi-arch image (<code>linux/amd64</code> and <code>linux/arm64</code>) at{' '}
        <code>{DOCKER_IMAGE}</code>. It listens on port <code>{APP_PORT}</code>, keeps its state in{' '}
        <code>/app/data</code>, and exposes a health check at <code>/api/health</code>. The image contains
        only the standalone build, no source.
      </p>

      <h2>Minimal: SQLite metadata, in-memory DuckDB</h2>
      <p>
        The defaults need nothing but the encryption key. Metadata goes to{' '}
        <code>/app/data/lizard.sqlite</code> and federated queries run on an embedded, in-memory DuckDB.
        Mount a volume on <code>/app/data</code> so state survives container restarts.
      </p>
      <pre>
        <code>{`docker run -d --name lizard \\
  -p ${APP_PORT}:${APP_PORT} \\
  -e LIZARD_ENCRYPTION_KEY=$(openssl rand -base64 32) \\
  -e LIZARD_LLM_URL='https://:sk-ant-…@api.anthropic.com/v1?model=claude-sonnet-5' \\
  -v lizard_data:/app/data \\
  ${DOCKER_IMAGE}`}</code>
      </pre>
      <p>
        Generate the key once and store it. Running <code>openssl rand</code> inline on every start would
        give the container a new key and make every stored password unreadable.
      </p>

      <h2>Postgres metadata</h2>
      <p>
        Point <code>LIZARD_METADATA_URL</code> at a Postgres database whose user can create tables. Tables
        are created and migrated at startup. Use this when you run more than one Lizard instance; see{' '}
        <Link href="/docs/installation/metadata">Metadata database</Link>.
      </p>
      <pre>
        <code>{`docker run -d --name lizard \\
  -p ${APP_PORT}:${APP_PORT} \\
  --env-file .env \\
  -e LIZARD_METADATA_URL='postgres://lizard:…@db.internal:5432/lizard' \\
  -e COOKIE_SECURE=true \\
  -v lizard_data:/app/data \\
  ${DOCKER_IMAGE}`}</code>
      </pre>

      <h2>DuckDB: spill to disk, or use a server</h2>
      <p>
        Large federated queries can spill to disk instead of running out of memory. Point the engine at a
        directory inside the data volume:
      </p>
      <pre>
        <code>{`-e LIZARD_DUCKDB_URL='file:///app/data/duckdb'`}</code>
      </pre>
      <p>Or send federated work to a DuckDB server that can reach your databases:</p>
      <pre>
        <code>{`-e LIZARD_DUCKDB_URL='https://:<token>@duck.internal:9494'`}</code>
      </pre>
      <p>
        See <Link href="/docs/installation/duckdb">DuckDB engine</Link> for what changes with a server.
      </p>

      <h2>Bootstrapping an admin</h2>
      <p>
        By default the first visitor creates the admin. For unattended installs, set{' '}
        <code>LIZARD_ADMIN_PASSWORD</code> (and optionally <code>LIZARD_ADMIN_EMAIL</code>, default{' '}
        <code>admin@lizard.local</code>). The account is created or reset on every start while the variable
        is set.
      </p>

      <h2>Production checklist</h2>
      <ul>
        <li>Persist <code>/app/data</code>, or move metadata to Postgres and uploads to S3.</li>
        <li>Serve over HTTPS and set <code>COOKIE_SECURE=true</code>.</li>
        <li>Behind a proxy, forward <code>X-Forwarded-Proto</code> and <code>X-Forwarded-Host</code>, or set <code>LIZARD_PUBLIC_URL</code>.</li>
        <li>Keep <code>LIZARD_ENCRYPTION_KEY</code> in your secret store, never in the image.</li>
      </ul>
    </Prose>
  );
}

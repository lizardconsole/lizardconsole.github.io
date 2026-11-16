import type { Metadata } from "next";
import Link from "next/link";
import { Prose } from "@/components/prose";
import { Code } from "@/components/code";
import { DOCKER_IMAGE, APP_PORT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Docker",
  description: "Run the Lizard container image with SQLite or Postgres metadata and an in-memory or remote DuckDB engine."
};

export default function DockerPage() {
  return (
    <Prose>
      <h1>Docker</h1>
      <p>
        Lizard ships as a multi-arch image (<code>linux/amd64</code> and <code>linux/arm64</code>) at <code>{DOCKER_IMAGE}</code>. It
        listens on port <code>{APP_PORT}</code>, keeps its state in <code>/app/data</code>, and exposes a health check at{" "}
        <code>/api/health</code>. The image contains only the standalone build, no source.
      </p>

      <h2>Before you start: the encryption key</h2>
      <p>
        <code>LIZARD_ENCRYPTION_KEY</code> is the only required setting. Create a <code>.env</code> file next to where you run Docker with
        this line. The key was generated in your browser when this page loaded and is unique to you:
      </p>
      <Code secrets>{"LIZARD_ENCRYPTION_KEY={{ENCRYPTION_KEY}}"}</Code>
      <p>
        Copy it into <code>.env</code> once. Reloading this page shows a new key, so if you already have a <code>.env</code>, keep yours.
        Keep a copy in your secret store. To turn on AI querying, add <code>LIZARD_LLM_URL</code> to the same file; see{" "}
        <Link href="/docs/integrations/llm">LLM providers</Link>. Without it, everything except the AI features works as normal.
      </p>
      <p>
        Never change the key once Lizard has started with it, including on redeploys. Passwords saved under one key can’t be decrypted with
        another, so a new key means re-entering every connection’s password.
      </p>

      <h2>Minimal: SQLite metadata, in-memory DuckDB</h2>
      <p>
        The defaults need nothing but the key. Metadata goes to <code>/app/data/lizard.sqlite</code> and federated queries run on an
        embedded, in-memory DuckDB. Mount a volume on <code>/app/data</code> so state survives container restarts.
      </p>
      <Code>{`docker run -d --name lizard \\
  -p ${APP_PORT}:${APP_PORT} \\
  --env-file .env \\
  -v lizard_data:/app/data \\
  ${DOCKER_IMAGE}`}</Code>

      <h2>Postgres metadata</h2>
      <p>
        Point <code>LIZARD_METADATA_URL</code> at a Postgres database whose user can create tables. Tables are created and migrated at
        startup. Use this when you run more than one Lizard instance; see <Link href="/docs/installation/metadata">Metadata database</Link>.
      </p>
      <Code>{`docker run -d --name lizard \\
  -p ${APP_PORT}:${APP_PORT} \\
  --env-file .env \\
  -e LIZARD_METADATA_URL='postgres://lizard:…@db.internal:5432/lizard' \\
  -e COOKIE_SECURE=true \\
  -v lizard_data:/app/data \\
  ${DOCKER_IMAGE}`}</Code>

      <h2>DuckDB: spill to disk, or use a server</h2>
      <p>
        Large federated queries can spill to disk instead of running out of memory. Point the engine at a directory inside the data volume:
      </p>
      <Code>{`-e LIZARD_DUCKDB_URL='file:///app/data/duckdb'`}</Code>
      <p>Or send federated work to a DuckDB server that can reach your databases:</p>
      <Code>{`-e LIZARD_DUCKDB_URL='https://:<token>@duck.internal:9494'`}</Code>
      <p>
        See <Link href="/docs/installation/duckdb">DuckDB engine</Link> for what changes with a server.
      </p>

      <h2>Bootstrapping an admin</h2>
      <p>
        By default the first visitor creates the admin. For unattended installs, set <code>LIZARD_ADMIN_PASSWORD</code> (and optionally{" "}
        <code>LIZARD_ADMIN_EMAIL</code>, default <code>admin@lizard.local</code>). The account is created or reset on every start while the
        variable is set.
      </p>

      <h2>Production checklist</h2>
      <ul>
        <li>
          Persist <code>/app/data</code>, or move metadata to Postgres and uploads to S3.
        </li>
        <li>
          Serve over HTTPS and set <code>COOKIE_SECURE=true</code>.
        </li>
        <li>
          Behind a proxy, forward <code>X-Forwarded-Proto</code> and <code>X-Forwarded-Host</code>, or set <code>LIZARD_PUBLIC_URL</code>.
        </li>
        <li>
          Keep <code>LIZARD_ENCRYPTION_KEY</code> in your secret store, never in the image.
        </li>
      </ul>
    </Prose>
  );
}

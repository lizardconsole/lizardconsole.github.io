import type { Metadata } from "next";
import Link from "next/link";
import { Prose } from "@/components/prose";
import { Code } from "@/components/code";
import { DOCKER_IMAGE, APP_PORT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Docker Compose",
  description: "Compose files for Lizard on SQLite, on Postgres with Redis, and with a remote DuckDB server."
};

const sqliteCompose = `services:
  lizard:
    image: ${DOCKER_IMAGE}
    ports:
      - "${APP_PORT}:${APP_PORT}"
    environment:
      LIZARD_ENCRYPTION_KEY: {{ENCRYPTION_KEY}}
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
    environment:
      LIZARD_ENCRYPTION_KEY: {{ENCRYPTION_KEY}}
      LIZARD_METADATA_URL: postgres://lizard:{{METADATA_PASSWORD}}@metadata:5432/lizard
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
      POSTGRES_PASSWORD: {{METADATA_PASSWORD}}
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
      LIZARD_DUCKDB_URL: https://:<server token>@duck.internal:9494`;

export default function DockerComposePage() {
  return (
    <Prose>
      <h1>Docker Compose</h1>
      <p>
        Two starting points: a single container on SQLite for one instance, and a stack with Postgres metadata and Redis that is ready to
        scale out. Settings go straight into each service’s <code>environment</code>, so the file is all you need.
      </p>
      <p>
        <code>LIZARD_ENCRYPTION_KEY</code> is the only required setting. The examples below come with a key generated in your browser when
        this page loaded, unique to you, so you can copy them as they are. Once Lizard has started with a key,{" "}
        <strong>never change it</strong>: a new key can’t decrypt passwords saved under the old one. To turn on AI querying, add{" "}
        <code>LIZARD_LLM_URL</code> under <code>environment</code>; see <Link href="/docs/integrations/llm">LLM providers</Link>.
      </p>

      <h2>Single instance on SQLite</h2>
      <p>
        Metadata lives in <code>/app/data/lizard.sqlite</code> on the named volume, and DuckDB runs in-memory inside the container. This is
        all most teams need.
      </p>
      <Code secrets>{sqliteCompose}</Code>
      <Code>{"docker compose up -d"}</Code>

      <h2>Postgres metadata and Redis</h2>
      <p>
        Use this shape when you want to run several Lizard replicas behind a load balancer, or simply want metadata in a database you
        already back up. Its metadata password is generated the same way, and appears twice so both services agree.
      </p>
      <Code secrets={{ METADATA_PASSWORD: 12 }}>{postgresCompose}</Code>
      <ul>
        <li>
          <strong>Postgres metadata</strong> lets every instance share connections, users, dashboards and the audit log. Cache invalidation
          travels between instances over <code>LISTEN</code>/<code>NOTIFY</code>, and replicas starting together are safe because migrations
          take an advisory lock.
        </li>
        <li>
          <strong>Redis</strong> shares query and catalog caches, live updates, export downloads and per-connection query limits across
          instances.
        </li>
        <li>
          <strong>
            <code>file:///app/data/duckdb</code>
          </strong>{" "}
          lets large federated queries spill to disk instead of failing on memory.
        </li>
      </ul>
      <p>
        To scale out, run more <code>lizard</code> replicas against the same <code>metadata</code> and <code>cache</code> services. Move
        uploaded files to S3 with <code>LIZARD_STORAGE_URL</code> so every replica sees them; see{" "}
        <Link href="/docs/integrations/file-storage">File storage</Link>.
      </p>

      <h2>Using a DuckDB server</h2>
      <p>
        To move federated and MongoDB SQL work off the Lizard containers, replace <code>LIZARD_DUCKDB_URL</code> with the address and token
        of a DuckDB server:
      </p>
      <Code>{duckdbServerEnv}</Code>
      <p>
        The server connects to your databases itself, so it must be able to reach them. See{" "}
        <Link href="/docs/installation/duckdb">DuckDB engine</Link> for setup and trade-offs.
      </p>

      <h2>Trying it with sample data</h2>
      <p>
        The Lizard repository ships a <code>docker-compose.yml</code> that starts a demo fleet (Postgres, MySQL and MongoDB service
        databases) and a seeder that registers them in Lizard with virtual relationships and a demo dashboard. Clone the repository and run{" "}
        <code>docker compose up</code>.
      </p>
    </Prose>
  );
}

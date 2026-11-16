import type { Metadata } from "next";
import Link from "next/link";
import { Prose } from "@/components/prose";
import { Code } from "@/components/code";
import { DOCKER_IMAGE, APP_PORT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quickstart",
  description: "Generate an encryption key, run Lizard with Docker or Node, and add your first connection."
};

export default function QuickstartPage() {
  return (
    <Prose>
      <h1>Quickstart</h1>
      <p>
        Set one secret, start Lizard, and add your databases. This page gets you to a working console; the{" "}
        <Link href="/docs/installation/docker">Installation</Link> pages cover production setups.
      </p>

      <h2>1. Create .env with an encryption key</h2>
      <p>
        <code>LIZARD_ENCRYPTION_KEY</code> encrypts the database passwords Lizard stores. It is the only setting Lizard requires, and it
        refuses to start without it. Create a <code>.env</code> file with this line, using a key generated in your browser when this page
        loaded:
      </p>
      <Code secrets>{"LIZARD_ENCRYPTION_KEY={{ENCRYPTION_KEY}}"}</Code>
      <p>
        Copy it into <code>.env</code> once: reloading this page shows a new key, so if you already have a <code>.env</code>, keep yours.
        Keep a copy of the key with your other deployment secrets, and never change it: every start must use the same one, because a new key
        can’t decrypt passwords saved under the old one.
      </p>

      <h2>2. Run Lizard</h2>
      <h3>Docker</h3>
      <Code>{`docker run -d -p ${APP_PORT}:${APP_PORT} \\
  --env-file .env \\
  -v lizard_data:/app/data \\
  ${DOCKER_IMAGE}`}</Code>

      <h3>Node</h3>
      <p>
        From the Lizard checkout, with <code>.env</code> in its root. Next.js loads it automatically.
      </p>
      <Code>{`npm install
npm run dev`}</Code>
      <p>
        Open <code>http://localhost:{APP_PORT}</code>. The first visitor creates the admin account.
      </p>

      <h2>3. Add a connection</h2>
      <p>
        Go to Settings → Connections and add Postgres, MySQL or MongoDB databases side by side. The connection <strong>name</strong> doubles
        as its alias in cross-database SQL (<code>users_service.public.customers</code>), so it must be a lowercase identifier.
      </p>

      <h2>Optional: turn on AI</h2>
      <p>
        Everything above works without an AI provider: browsing, editing, SQL, charts and dashboards. To add plain-English queries, prompt
        charts and the AI setup tools, add an LLM URL to <code>.env</code> and restart Lizard:
      </p>
      <Code>{`LIZARD_LLM_URL=https://:sk-ant-…@api.anthropic.com/v1?model=claude-sonnet-5`}</Code>
      <p>
        Any provider works, including OpenAI, Gemini, DeepSeek and self-hosted models through Ollama. See{" "}
        <Link href="/docs/integrations/llm">LLM providers</Link>.
      </p>

      <h2>Next steps</h2>
      <ul>
        <li>
          <Link href="/docs/installation/docker-compose">Docker Compose</Link>: a production-shaped stack with Postgres metadata and Redis.
        </li>
        <li>
          <Link href="/docs/installation/metadata">Metadata database</Link>: SQLite or Postgres, and when to switch.
        </li>
        <li>
          <Link href="/docs/installation/duckdb">DuckDB engine</Link>: in-memory, disk-spilling or a DuckDB server.
        </li>
        <li>
          <Link href="/docs/integrations/sso">Single sign-on</Link>: Entra ID, Okta, Keycloak and other OIDC providers.
        </li>
      </ul>
    </Prose>
  );
}

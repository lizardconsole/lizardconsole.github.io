import type { Metadata } from 'next';
import Link from 'next/link';
import { Prose } from '@/components/prose';

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'Every system Lizard connects to: databases, files, LLM providers, identity providers, caches and storage.',
};

const groups = [
  {
    href: '/docs/integrations/databases',
    title: 'Databases',
    items: 'PostgreSQL, MySQL and MongoDB, side by side',
  },
  {
    href: '/docs/integrations/llm',
    title: 'LLM providers',
    items: 'Anthropic, OpenAI, Google Gemini, DeepSeek, OpenRouter, Ollama, LiteLLM and any compatible gateway',
  },
  {
    href: '/docs/integrations/sso',
    title: 'Single sign-on',
    items: 'Microsoft Entra ID, Okta, Keycloak and any OpenID Connect provider',
  },
  {
    href: '/docs/integrations/file-storage',
    title: 'File storage',
    items: 'Upload CSV, JSON, Parquet, XLSX or Avro and query them like tables. Local disk, S3 or MinIO.',
  },
  {
    href: '/docs/integrations/cache',
    title: 'Cache',
    items: 'SQLite for one instance, Redis to share it across many',
  },
  {
    href: '/docs/installation/metadata',
    title: 'Metadata database',
    items: 'SQLite or Postgres',
  },
  {
    href: '/docs/installation/duckdb',
    title: 'DuckDB engine',
    items: 'Embedded in-memory, embedded with disk spill, or a DuckDB server',
  },
];

export default function IntegrationsPage() {
  return (
    <Prose>
      <h1>Integrations</h1>
      <p>
        Every integration is configured with one URL-shaped environment variable. Credentials go in the
        URL’s user and password slots, options go in the query string, and Lizard validates the value at
        startup instead of failing later.
      </p>

      <div className="not-prose my-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {groups.map((group) => (
          <Link
            key={group.href}
            href={group.href}
            className="card block p-5 no-underline transition-shadow hover:shadow-(--shadow-raised)"
          >
            <span className="block text-[15px] font-semibold text-text-primary">{group.title}</span>
            <span className="mt-1 block text-sm leading-6 text-text-secondary">{group.items}</span>
          </Link>
        ))}
      </div>

      <h2>Environment variables at a glance</h2>
      <table>
        <thead>
          <tr><th>Variable</th><th>Integration</th></tr>
        </thead>
        <tbody>
          <tr><td><code>LIZARD_LLM_URL</code></td><td>LLM provider for AI querying and prompt charts</td></tr>
          <tr><td><code>LIZARD_SSO_URL</code></td><td>OpenID Connect provider</td></tr>
          <tr><td><code>LIZARD_AUTH_MODE</code></td><td><code>password</code>, <code>sso</code> or <code>hybrid</code></td></tr>
          <tr><td><code>LIZARD_METADATA_URL</code></td><td>SQLite or Postgres for Lizard’s own state</td></tr>
          <tr><td><code>LIZARD_CACHE_URL</code></td><td>SQLite or Redis cache</td></tr>
          <tr><td><code>LIZARD_STORAGE_URL</code></td><td>Local disk, S3 or MinIO for uploaded files; enables file connections</td></tr>
          <tr><td><code>LIZARD_DUCKDB_URL</code></td><td>Where federated queries run</td></tr>
        </tbody>
      </table>
    </Prose>
  );
}

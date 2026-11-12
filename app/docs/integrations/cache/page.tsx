import type { Metadata } from 'next';
import Link from 'next/link';
import { Prose } from '@/components/prose';

export const metadata: Metadata = {
  title: 'Cache',
  description: 'Configure Lizard’s cache on SQLite for one instance or Redis to share it across many.',
};

export default function CachePage() {
  return (
    <Prose>
      <h1>Cache</h1>
      <p>
        Lizard keeps three kinds of state with three lifetimes. The{' '}
        <Link href="/docs/installation/metadata">metadata database</Link> is the source of truth.{' '}
        <Link href="/docs/integrations/file-storage">File storage</Link> holds uploads and is durable. The
        cache is disposable and may be wiped at any time: every value in it can be recomputed.
      </p>

      <h2>Backends</h2>
      <table>
        <thead>
          <tr><th><code>LIZARD_CACHE_URL</code></th><th>Backend</th></tr>
        </thead>
        <tbody>
          <tr><td><em>unset</em></td><td>SQLite in the OS temp directory</td></tr>
          <tr><td><code>sqlite://./data/cache.sqlite</code></td><td>SQLite, relative path</td></tr>
          <tr><td><code>sqlite:///var/lib/lizard/cache.sqlite</code></td><td>SQLite, absolute path</td></tr>
          <tr><td><code>redis://[:password@]host:6379[/db]</code></td><td>Redis</td></tr>
          <tr><td><code>rediss://…</code></td><td>Redis over TLS</td></tr>
        </tbody>
      </table>
      <p>
        SQLite is right for a single instance. With Redis, every instance shares one cache: live updates,
        schema refreshes, export downloads, query and catalog caches, and per-connection query limits all
        work across instances.
      </p>

      <h2>Stale-while-revalidate</h2>
      <p>
        Dashboard panel results are cached for the panel’s own <code>cacheSeconds</code>, then served stale
        for up to <code>LIZARD_QUERY_STALE_SECONDS</code> (default 86400) while a background query refreshes
        them. Slow panels only make a viewer wait on a cold cache. Set it to <code>0</code> to always wait for
        fresh results.
      </p>

      <h2>Running several instances</h2>
      <p>For a load-balanced deployment, every instance should share:</p>
      <ul>
        <li><strong>Postgres</strong> for metadata (<code>LIZARD_METADATA_URL</code>).</li>
        <li><strong>Redis</strong> for cache, events and query limits (<code>LIZARD_CACHE_URL</code>).</li>
        <li><strong>S3 or MinIO</strong> for uploaded files (<code>LIZARD_STORAGE_URL</code>).</li>
      </ul>
    </Prose>
  );
}

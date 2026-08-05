import type { Metadata } from 'next';
import Link from 'next/link';
import Prose from '@/components/Prose';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Common questions before you self-host Lizard.',
};

export default function FaqPage() {
  return (
    <Prose>
      <h1>FAQ</h1>

      <h3>How is this different from a hosted tool like Retool or Forest Admin?</h3>
      <p>
        Those route your database queries through vendor infrastructure. Lizard is self-hosted — you run
        the process, on your own infrastructure, so credentials and query data never pass through a
        third-party proxy.
      </p>

      <h3>Does Lizard modify my database schema?</h3>
      <p>
        No. Lizard never issues DDL against your databases and never writes anything into them. All of its
        own state — connections, overrides, virtual relationships, dashboards, the audit log — lives in a
        local SQLite file it owns.
      </p>

      <h3>Do I need an AI provider API key to use Lizard?</h3>
      <p>
        <code>LIZARD_ENCRYPTION_KEY</code> is the only strictly required environment variable — it encrypts
        stored database passwords and Lizard refuses to start without it. An AI provider key
        (<code>ANTHROPIC_API_KEY</code> by default, or OpenAI/Google) enables natural-language querying and
        prompt-driven charts specifically; it doesn't gate browsing or CRUD.
      </p>

      <h3>Does my query data get sent to the AI provider?</h3>
      <p>
        Row-level results, no. During planning, the model only ever receives schema metadata — a
        name-only table/column skeleton, plus whatever <code>search_schema</code>, <code>describe_table</code>,
        and <code>get_relations</code> return (names, types, comments, FK relations — never row data). The
        model's involvement ends when it calls the terminal <code>submit_plan</code> tool; the query then
        executes afterward through the SQL Guard, and the result rows stream directly to your browser —
        they're never sent back through another model call.
      </p>

      <h3>Can the AI write or delete data?</h3>
      <p>
        No. AI-generated queries only ever run as read-only <code>SELECT</code> statements, validated by
        the SQL Guard, on the read-only <code>lizard_read</code> role. Writes only happen through CRUD
        forms, using a separate <code>lizard_write</code> role with parameterized queries — the AI path
        can't reach it. See the <Link href="/docs/security">security model</Link> for the full guarantee.
      </p>

      <h3>Which databases are supported?</h3>
      <p>
        Postgres, MySQL, and MongoDB today, mixed freely in the same instance. SQLite is on the{' '}
        <Link href="/docs/roadmap">roadmap</Link>, behind the same driver abstraction.
      </p>

      <h3>What license is Lizard released under?</h3>
      <p>
        Lizard&apos;s source is public on GitHub — check the repository for the current license and terms.
      </p>
    </Prose>
  );
}

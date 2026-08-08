import type { Metadata } from 'next';
import Link from 'next/link';
import Prose from '@/components/Prose';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'The full tour: connections, browsing and filters, timezone-correct timestamps, AI Explore, dashboards, and the limits that keep it all bounded at fleet scale.',
};

export default function FeaturesPage() {
  return (
    <Prose>
      <h1>Features</h1>
      <p>
        The full tour of what Lizard does today. Every section here describes shipped behaviour — see the{' '}
        <Link href="/docs/roadmap">roadmap</Link> for what isn&apos;t built yet.
      </p>

      <h2>Connections</h2>
      <ul>
        <li><strong>Postgres, MySQL, and MongoDB</strong> side by side in one console, mixed freely across services.</li>
        <li><strong>Two roles per connection</strong> — a read role and a write role, with separate credentials. Analytics, AI, and charts only ever get the read one.</li>
        <li><strong>Credentials encrypted at rest</strong> (AES-256-GCM) in Lizard&apos;s own SQLite file. Nothing is written to your databases.</li>
        <li><strong>Searchable, paged pickers</strong> — every place you choose a connection is a combobox that searches server-side, because a fleet has more connections than a dropdown can hold.</li>
      </ul>

      <h2>Browsing and editing</h2>
      <p>
        The whole CRUD UI is derived from schema introspection — no per-table configuration, no generated
        admin scaffolding to maintain.
      </p>
      <ul>
        <li>Browse, filter, sort, and edit every table across every schema and database.</li>
        <li><strong>Reference columns render as labels, not ids</strong> — a foreign key (real or virtual) becomes a searchable picker showing the display column you nominate, falling back to the raw value when a row has no label.</li>
        <li><strong>Virtual relationships</strong> let you declare a foreign key that doesn&apos;t exist in the database — including across connections and engines. No DDL is ever run against your databases.</li>
        <li>Per-table &quot;Customize&quot; settings: display column, hidden columns, labels, and virtual relationships.</li>
      </ul>

      <h2>Filters</h2>
      <p>
        Filters are built from the column&apos;s real type, so a text column and a timestamp column get
        different controls and different semantics.
      </p>

      <h3>Dates and times mean the whole day</h3>
      <p>
        A timestamp filter has a date picker and a <em>separate, optional</em> time picker. Most of the time
        you only want the date — so leaving the time blank means what you&apos;d expect it to mean:
      </p>
      <table>
        <thead>
          <tr>
            <th>You pick</th>
            <th>Lizard runs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>= 2026-01-01</code> (no time)</td>
            <td>the entire day — <code>&gt;= 2026-01-01 00:00:00</code> and <code>&lt; 2026-01-02 00:00:00</code></td>
          </tr>
          <tr>
            <td><code>&gt; 2026-01-01</code> (no time)</td>
            <td>after the end of that day</td>
          </tr>
          <tr>
            <td><code>&lt; 2026-01-01</code> (no time)</td>
            <td>before the start of that day</td>
          </tr>
          <tr>
            <td><code>between</code> two dates</td>
            <td>start of the first day → end of the last day</td>
          </tr>
          <tr>
            <td>either side with a time</td>
            <td>that exact instant; the other side still expands to its day boundary</td>
          </tr>
        </tbody>
      </table>
      <p>
        The expansion is deliberately a half-open range rather than a cast like{' '}
        <code>DATE(created_at) = &#39;2026-01-01&#39;</code>: wrapping the column in a function makes the
        predicate unsargable, so any index on that column stops being usable. A range comparison keeps the
        index in play, which is the difference between an index seek and a sequential scan on a large table.
      </p>
      <p>
        The same rules drive the dashboard date-range picker: <code>from</code> is the start of its day,{' '}
        <code>to</code> is the end of its day, times are optional on both ends, and a time you didn&apos;t
        pick never shows up in the label or the URL.
      </p>

      <h2>Timezones</h2>
      <p>
        A date range is meaningless without a timezone: &quot;yesterday&quot; in Berlin and &quot;yesterday&quot;
        in Chicago select different rows. Lizard resolves this once, at the session level, instead of
        converting timestamps ad hoc in a dozen places.
      </p>
      <ul>
        <li>The browser&apos;s IANA timezone is captured and sent with each request.</li>
        <li>The server validates it against the platform&apos;s own timezone database and falls back to UTC if it isn&apos;t a zone it recognises — the value ends up in a database session setting, so it is treated as untrusted input.</li>
        <li>Each pooled connection has its session timezone set to match, lazily and only when it changes: <code>SET TimeZone</code> on Postgres, <code>SET time_zone</code> on MySQL, and the equivalent on the embedded DuckDB used for federated queries.</li>
        <li>Timezone is part of the query cache key, so two people in different zones never see each other&apos;s results.</li>
      </ul>
      <p>
        The upshot: day boundaries, <code>date_trunc</code> buckets in charts, and rendered{' '}
        <code>timestamptz</code> values all agree with each other and with your wall clock, without any
        timestamp arithmetic in application code.
      </p>

      <h2>AI Explore</h2>
      <p>
        Ask a question in plain English; an agent works out the query. Claude is the default, with OpenAI
        and Gemini also supported. See <Link href="/docs/architecture">Architecture</Link> for the tool loop
        itself — what follows is what makes it fast enough to sit in front of.
      </p>
      <ul>
        <li><strong>Never a schema dump.</strong> The model starts from a name-only skeleton — connections, schemas, table names, no columns — and pulls detail on demand with <code>search_schema</code>, <code>describe_table</code>, and <code>get_relations</code>.</li>
        <li><strong>The skeleton is tiered and budgeted.</strong> It&apos;s generated lazily and stops the moment it hits its size budget, marking itself truncated rather than blowing the context window on a fleet that doesn&apos;t fit. Search still reaches everything that was cut.</li>
        <li><strong>Prompt caching.</strong> The stable prefix — instructions and skeleton — is marked for caching, so follow-up turns in the same session skip re-reading it.</li>
        <li><strong>The catalog is served stale while it refreshes.</strong> Past its TTL you get the last known schema immediately and the re-introspection happens behind you, so only the very first question about a connection ever waits on introspection.</li>
        <li><strong>Live streaming and a real Stop.</strong> Every step streams as it happens, and stopping aborts the in-flight model call <em>and</em> cancels the database work it started.</li>
        <li><strong>The SQL is always shown</strong>, always editable, and always runs through the same Guard and read-only role as anything you typed yourself.</li>
      </ul>

      <h2>Dashboards</h2>
      <p>
        A query worth keeping is worth reading. Saving a result produces a dashboard — a page of blocks,
        where a block is one query plus how to display it. Saved queries as a separate concept are gone;
        every saved result is a dashboard now, down to a single block.
      </p>
      <ul>
        <li><strong>Four views over the same query</strong> — table, chart, kanban, and gallery. Switching view never means rewriting the query. Kanban and gallery let you pick which column is the row&apos;s identity and which is its title, since an arbitrary <code>SELECT</code> has no primary key to assume one from.</li>
        <li><strong>Each block can target a different database</strong>, or a federated query spanning several.</li>
        <li><strong>Variables</strong> — text, single- or multi-select, and date range. Multi-select has an optional <strong>All</strong> that means &quot;no filter&quot;, not &quot;every option expanded into an IN list&quot;. Values live in the URL, so a filtered dashboard is a link you can send someone.</li>
        <li><strong>Optional SQL blocks</strong> — wrap a clause in <code>[[ ... ]]</code> and it&apos;s dropped from the query whenever the variable inside it is empty, instead of every dashboard hand-rolling its own conditional <code>WHERE</code>-clause string-building.</li>
        <li><strong>An optional date range</strong>, enabled per dashboard rather than forced on every one, wired to the same whole-day semantics as table filters.</li>
        <li><strong>Tags and server-side search</strong> in the dashboard library, so it stays navigable past a few dozen.</li>
        <li><strong>Grid or solo layout</strong> — a resizable grid of panels, or one block filling the whole page, which is what a saved query or a kanban board actually is. Adding a second panel promotes a solo page to a grid automatically.</li>
        <li><strong>Duplicate as save-as</strong>, and a full-screen panel editor — describe the panel in English or write the SQL directly — for when a dialog isn&apos;t enough room.</li>
        <li><strong>Import/export as JSON</strong> — a dashboard&apos;s full definition (panels, variables, layout) is one portable document you can version, diff, or hand to someone else&apos;s Lizard.</li>
      </ul>

      <h2>Built for a fleet</h2>
      <p>
        The design assumption is a database per microservice, thousands of them. That rules out anything
        that walks the fleet, so every list, cache, fan-out, and pool has a ceiling.
      </p>
      <table>
        <thead>
          <tr>
            <th>Bound</th>
            <th>Why it exists</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Introspection requires an explicit connection scope</td>
            <td>There is no &quot;whole fleet catalog&quot; call to accidentally make — asking for one with an empty scope is an error, not a full sweep.</td>
          </tr>
          <tr>
            <td>Global search is scoped by <code>connection/table</code></td>
            <td>Search splits the scope you typed and fans out only to that, instead of querying every database.</td>
          </tr>
          <tr>
            <td>1,000-row cap on every result</td>
            <td>Applies to hand-written, AI-generated, and federated queries alike, with the truncation surfaced in the UI rather than hidden.</td>
          </tr>
          <tr>
            <td>30s read statement timeout, 45s federated</td>
            <td>Enforced by the database itself, not just the client, so a runaway query dies server-side.</td>
          </tr>
          <tr>
            <td>8 connections introspected at once, 20s each</td>
            <td>An unbounded fan-out across a thousand hosts is a thundering herd; a slow database is reported as one failed entry while the rest proceed.</td>
          </tr>
          <tr>
            <td>Catalog cache bounded by column count (~400k)</td>
            <td>Counting columns rather than connections holds up across very different fleet shapes — a hundred huge schemas and ten thousand tiny ones settle at a similar footprint.</td>
          </tr>
          <tr>
            <td>Connection pools expire after 10 idle minutes</td>
            <td>Browsing five hundred databases used to leave five hundred live pools behind forever. Idle ones are now closed and forgotten, swept on access.</td>
          </tr>
          <tr>
            <td>Connection lists page at 20 (100 max)</td>
            <td>An endpoint that fills a dropdown has no business returning thousands of rows; the pickers search instead of scrolling.</td>
          </tr>
        </tbody>
      </table>

      <h2>Access control and audit</h2>
      <ul>
        <li>Admin, editor, and viewer roles, plus per-connection read/write grants.</li>
        <li>An audit log of every query and every write, with tiered, configurable retention.</li>
        <li>Every statement — CRUD, AI, chart, or dashboard — passes the same SQL Guard: one parsed <code>SELECT</code>, an enforced limit, a timeout, and a read-only transaction. See the{' '}
          <Link href="/docs/security">security model</Link> for the details.</li>
      </ul>
    </Prose>
  );
}

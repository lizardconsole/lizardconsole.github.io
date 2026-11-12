import type { Metadata } from 'next';
import Link from 'next/link';
import { Prose } from '@/components/prose';
import { DOCKER_IMAGE, APP_PORT } from '@/lib/site';

export const metadata: Metadata = {
  title: 'File storage',
  description:
    'Set LIZARD_STORAGE_URL to upload CSV, JSON, Parquet, XLSX and Avro files and query them like tables, joined against your live databases.',
};

const localRun = `docker run -d --name lizard \\
  -p ${APP_PORT}:${APP_PORT} \\
  --env-file .env \\
  -e LIZARD_STORAGE_URL=file:///app/data \\
  -v lizard_data:/app/data \\
  ${DOCKER_IMAGE}`;

const minioCompose = `services:
  lizard:
    image: ${DOCKER_IMAGE}
    ports:
      - "${APP_PORT}:${APP_PORT}"
    env_file: .env
    environment:
      LIZARD_STORAGE_URL: s3://lizard:\${MINIO_PASSWORD}@minio:9000/lizard?use_ssl=false
    depends_on:
      - minio

  minio:
    image: minio/minio
    command: server /data
    environment:
      MINIO_ROOT_USER: lizard
      MINIO_ROOT_PASSWORD: \${MINIO_PASSWORD}
    volumes:
      - minio_data:/data

volumes:
  minio_data:`;

const federatedJoin = `SELECT t.region, t.target, sum(o.total) AS actual
FROM targets."Q1" t
JOIN orders_service.public.orders o ON o.region = t.region
GROUP BY 1, 2`;

export default function FileStoragePage() {
  return (
    <Prose>
      <h1>File storage</h1>
      <p>
        <code>LIZARD_STORAGE_URL</code> turns on <strong>file connections</strong>: upload a spreadsheet,
        an export or a data dump, and Lizard serves it like any other table. You can browse it, filter it,
        ask questions about it in plain English, chart it, put it on a dashboard, and join it against your
        live Postgres, MySQL and MongoDB databases.
      </p>
      <p>
        It is the quickest way to bring in data that doesn’t live in a database yet: a finance team’s
        targets in Excel, a partner’s Parquet export, a JSON dump from an API, or event logs as NDJSON.
      </p>

      <h2>Turning it on</h2>
      <p>
        File connections are off until storage is configured. Once <code>LIZARD_STORAGE_URL</code> is set,
        the add-connection dialog in Settings → Connections gets a <strong>File</strong> tab.
      </p>
      <table>
        <thead>
          <tr><th>Value</th><th>Backend</th></tr>
        </thead>
        <tbody>
          <tr><td><code>file://./data</code></td><td>Local directory, relative to the working directory</td></tr>
          <tr><td><code>file:///var/lib/lizard/data</code></td><td>Local directory, absolute path</td></tr>
          <tr><td><code>s3://&lt;key&gt;:&lt;secret&gt;@&lt;host&gt;/&lt;bucket&gt;</code></td><td>Amazon S3 or an S3-compatible store such as MinIO</td></tr>
        </tbody>
      </table>
      <p>
        Nothing but uploaded files is stored there. Path rules match the other URL settings: spaces are
        fine, and <code>#</code>, <code>?</code> and <code>%</code> must be written as <code>%23</code>,{' '}
        <code>%3F</code> and <code>%25</code>.
      </p>

      <h2>Supported formats</h2>
      <table>
        <thead>
          <tr><th>Format</th><th>Extensions</th><th>Tables</th></tr>
        </thead>
        <tbody>
          <tr><td>CSV</td><td><code>.csv</code></td><td>One per file</td></tr>
          <tr><td>TSV</td><td><code>.tsv</code></td><td>One per file</td></tr>
          <tr><td>Excel</td><td><code>.xlsx</code></td><td><strong>One per sheet</strong></td></tr>
          <tr><td>JSON</td><td><code>.json</code></td><td>One per file</td></tr>
          <tr><td>Newline-delimited JSON</td><td><code>.jsonl</code>, <code>.ndjson</code></td><td>One per file</td></tr>
          <tr><td>Parquet</td><td><code>.parquet</code></td><td>One per file</td></tr>
          <tr><td>Avro</td><td><code>.avro</code></td><td>One per file</td></tr>
        </tbody>
      </table>
      <p>There is no upload size limit.</p>

      <h2>How a file becomes a table</h2>
      <ul>
        <li>
          <strong>Upload.</strong> The file is stored under a generated key in your storage backend. The
          connection label defaults to the original filename, and its name, used in SQL, to the
          snake_cased filename.
        </li>
        <li>
          <strong>Header row.</strong> For CSV, TSV and XLSX, the form has a “First row contains column
          names” option, on by default. Lizard passes it to DuckDB explicitly rather than relying on
          auto-detection, which gets all-text sheets wrong.
        </li>
        <li>
          <strong>Column types.</strong> Excel columns load as text. Set a column’s widget to number or
          date and Lizard casts it, so sorting, filtering and charts treat it as that type. Other formats
          keep the types DuckDB infers.
        </li>
        <li>
          <strong>Materialized once.</strong> The file is parsed once into a read-only DuckDB database and
          cached, so browsing a large spreadsheet doesn’t re-parse it on every request. Changing a column’s
          widget rebuilds that cache.
        </li>
        <li>
          <strong>Replace file.</strong> Upload a new version onto an existing connection to keep its
          dashboards, saved queries and relationships. The old file is deleted once nothing references it.
        </li>
      </ul>

      <h2>Querying files</h2>
      <p>
        A file’s tables are addressed as <code>connection.table</code>, never with the filename in
        between. For an Excel workbook uploaded as <code>targets</code> with a sheet named <code>Q1</code>,
        query <code>"Q1"</code> on the connection itself, or <code>targets."Q1"</code> from a federated
        query. This compares targets in a spreadsheet against live orders:
      </p>
      <pre>
        <code>{federatedJoin}</code>
      </pre>
      <p>
        Declare a <Link href="/docs/integrations/databases">virtual relationship</Link> from a file column
        to a database table and the AI can make that join for you, and the grid shows linked records as
        readable labels.
      </p>

      <h3>What works on a file connection</h3>
      <table>
        <thead>
          <tr><th>Feature</th><th>Supported</th></tr>
        </thead>
        <tbody>
          <tr><td>Browse, filter, sort and search</td><td>Yes</td></tr>
          <tr><td>Plain-English queries and SQL</td><td>Yes</td></tr>
          <tr><td>Charts and dashboards</td><td>Yes</td></tr>
          <tr><td>Joins with databases and other files</td><td>Yes</td></tr>
          <tr><td>Editing rows</td><td>No. File connections are read-only.</td></tr>
        </tbody>
      </table>

      <h2>Local disk</h2>
      <p>
        For a single instance, keep uploads on the same volume as the rest of Lizard’s data:
      </p>
      <pre>
        <code>{localRun}</code>
      </pre>

      <h2>Amazon S3</h2>
      <pre>
        <code>{`LIZARD_STORAGE_URL=s3://AKIA…:…@s3.amazonaws.com/lizard-uploads?region=eu-west-1&prefix=prod`}</code>
      </pre>
      <table>
        <thead>
          <tr><th>Option</th><th>Meaning</th></tr>
        </thead>
        <tbody>
          <tr><td><code>region</code></td><td>S3 region (default <code>us-east-1</code>)</td></tr>
          <tr><td><code>use_ssl=false</code></td><td>Use HTTP instead of HTTPS</td></tr>
          <tr><td><code>url_style</code></td><td><code>path</code> (default) or <code>vhost</code> addressing</td></tr>
          <tr><td><code>prefix</code></td><td>Key prefix inside the bucket</td></tr>
        </tbody>
      </table>
      <p>Percent-encode <code>@ : / ? # %</code> in the key and secret.</p>

      <h2>MinIO</h2>
      <p>
        Any S3-compatible store works. With MinIO in the same Compose project, use path-style addressing
        and plain HTTP on the internal network. Create the <code>lizard</code> bucket in MinIO before the
        first upload.
      </p>
      <pre>
        <code>{minioCompose}</code>
      </pre>

      <h2>Several instances</h2>
      <p>
        With more than one Lizard instance, use S3 or MinIO rather than local disk so every instance sees
        the same files. With Redis as the <Link href="/docs/integrations/cache">cache</Link>, the
        materialized copy of each file is shared too: one instance builds it and the others download it.
        Copies larger than <code>LIZARD_FILE_CACHE_SHARE_MAX_BYTES</code> (default 256 MB) are built on
        each instance instead.
      </p>

      <h2>With a DuckDB server</h2>
      <p>
        Queries that include a file connection always run inside the Lizard process, even when{' '}
        <code>LIZARD_DUCKDB_URL</code> points at a <Link href="/docs/installation/duckdb">DuckDB server</Link>,
        because the materialized file lives on Lizard’s disk.
      </p>
    </Prose>
  );
}

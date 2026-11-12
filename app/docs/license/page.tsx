import type { Metadata } from 'next';
import { Prose } from '@/components/prose';
import { LICENSE_NAME, LICENSE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Licence',
  description: `Lizard is open source under the ${LICENSE_NAME} licence.`,
};

export default function LicensePage() {
  return (
    <Prose>
      <h1>Licence</h1>
      <p>
        Lizard is open source under the <strong>{LICENSE_NAME} licence</strong>. The full text is in the{' '}
        <a href={LICENSE_URL} target="_blank" rel="noreferrer">LICENSE file</a> in the repository.
      </p>

      <h2>What you can do</h2>
      <ul>
        <li>Use Lizard for any purpose, commercial or not, at no cost.</li>
        <li>Run it on as many machines and against as many databases as you like.</li>
        <li>Read, modify and fork the source.</li>
        <li>Redistribute it, modified or not, including inside your own products.</li>
      </ul>

      <h2>What the licence asks</h2>
      <ul>
        <li>Keep the copyright notice and the licence text with any copy or substantial portion of the software.</li>
      </ul>

      <h2>No warranty</h2>
      <p>
        The software is provided “as is”, without warranty of any kind. Lizard is designed to be safe to
        point at production databases (see the security model), but you are responsible for how you deploy
        it and which credentials you give it.
      </p>

      <h2>Third-party components</h2>
      <p>
        Lizard depends on open-source packages, including DuckDB, Next.js and Kysely, each under its own
        licence. Nothing in the {LICENSE_NAME} licence changes your rights under those.
      </p>
    </Prose>
  );
}

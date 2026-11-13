import type { Metadata } from 'next';
import { Prose } from '@/components/prose';
import { LICENSE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Licence',
  description: 'Lizard is open source under the Apache License 2.0.',
};

export default function LicensePage() {
  return (
    <Prose>
      <h1>Licence</h1>
      <p>
        Lizard is open source under the <strong>Apache License 2.0</strong>. The full text is in the{' '}
        <a href={LICENSE_URL} target="_blank" rel="noreferrer">LICENSE file</a> in the repository. Copyright
        stays with Lizard Console and the individual contributors.
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
        <li>Include a copy of the licence with any copy you redistribute.</li>
        <li>Keep existing copyright, patent, trademark and attribution notices, including the NOTICE file if there is one.</li>
        <li>Mark files you changed as modified.</li>
      </ul>

      <h2>Patents</h2>
      <p>
        Every contributor grants you a licence to any of their patents that their contribution covers.
        That grant ends for anyone who sues claiming Lizard infringes a patent.
      </p>

      <h2>Trademarks</h2>
      <p>
        The licence covers the code, not the name. A fork can’t present itself as Lizard or use its name
        and logo in a way that suggests endorsement.
      </p>

      <h2>Contributions</h2>
      <p>
        Unless stated otherwise, anything you submit for inclusion in Lizard is contributed under the same
        Apache License 2.0.
      </p>

      <h2>No warranty</h2>
      <p>
        The software is provided “as is”, without warranty of any kind. Lizard is designed to be safe to
        point at production databases (see the security model), but you are responsible for how you deploy
        it and which credentials you give it.
      </p>

      <h2>Third-party components</h2>
      <p>
        Lizard depends on open-source packages, including DuckDB, Next.js and Kysely, each under its own
        licence. Nothing in the Apache License changes your rights under those.
      </p>
    </Prose>
  );
}

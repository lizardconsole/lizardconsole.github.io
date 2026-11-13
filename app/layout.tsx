import type { Metadata, Viewport } from 'next';
import { SerwistProvider } from '@serwist/turbopack/react';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

const siteUrl = 'https://lizardconsole.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Lizard Console — one console for every database you run',
    template: '%s · Lizard Console',
  },
  description:
    'Point Lizard Console at one or many Postgres, MySQL, and MongoDB databases and get an auto-generated CRUD UI, natural-language querying, and prompt-driven charts across the fleet — 100% self-hosted, zero schema pollution.',
  applicationName: 'Lizard Console',
  keywords: [
    'Lizard Console',
    'database admin console',
    'self-hosted admin panel',
    'Postgres admin UI',
    'MySQL admin UI',
    'MongoDB admin UI',
    'AI SQL assistant',
    'natural language database query',
    'self-hosted data console',
    'multi-database console',
  ],
  authors: [{ name: 'Lizard Console', url: 'https://github.com/lizardconsole/lizard' }],
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Lizard Console',
    title: 'Lizard Console — one console for every database you run',
    description:
      'Auto-generated CRUD UI, natural-language querying, and prompt-driven charts across your Postgres, MySQL, and MongoDB fleet. 100% self-hosted.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lizard Console — one console for every database you run',
    description:
      'Auto-generated CRUD UI, natural-language querying, and prompt-driven charts across your Postgres, MySQL, and MongoDB fleet. 100% self-hosted.',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0d' },
  ],
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.add(theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans antialiased overflow-x-clip">
        <NextTopLoader color="var(--accent)" height={2} showSpinner={false} shadow={false} />

        <SerwistProvider swUrl="/sw.js" disable={process.env.NODE_ENV === 'development'}>
          {children}
        </SerwistProvider>
      </body>
    </html>
  );
}

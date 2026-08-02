import type { Metadata, Viewport } from 'next';
import { SerwistProvider } from '@serwist/turbopack/react';
import './globals.css';

const siteUrl = 'https://lizardconsole.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Lizard — AI-native, zero-config data console',
    template: '%s · Lizard',
  },
  description:
    'Point Lizard at one or many Postgres, MySQL, and MongoDB databases and get an auto-generated CRUD UI, natural-language querying, and prompt-driven charts across the fleet — 100% self-hosted, zero schema pollution.',
  applicationName: 'Lizard',
  keywords: [
    'Lizard',
    'database admin console',
    'self-hosted admin panel',
    'Postgres admin UI',
    'MySQL admin UI',
    'MongoDB admin UI',
    'AI SQL assistant',
    'natural language database query',
    'open source admin panel',
    'multi-database console',
  ],
  authors: [{ name: 'Lizard contributors', url: 'https://github.com/lizardconsole/lizard' }],
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Lizard',
    title: 'Lizard — AI-native, zero-config data console',
    description:
      'Auto-generated CRUD UI, natural-language querying, and prompt-driven charts across your Postgres, MySQL, and MongoDB fleet. 100% self-hosted.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lizard — AI-native, zero-config data console',
    description:
      'Auto-generated CRUD UI, natural-language querying, and prompt-driven charts across your Postgres, MySQL, and MongoDB fleet. 100% self-hosted.',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans antialiased overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-300">
        {/* Registers the offline/app-shell service worker (app/sw.ts) — a
            no-op in development so an active SW can't shadow live-reloaded
            code while iterating. */}
        <SerwistProvider swUrl="/sw.js" disable={process.env.NODE_ENV === 'development'}>
          {children}
        </SerwistProvider>
      </body>
    </html>
  );
}

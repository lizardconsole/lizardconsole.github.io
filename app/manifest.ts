import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lizard',
    short_name: 'Lizard',
    description: 'AI-native, zero-config data console for your Postgres, MySQL, and MongoDB fleet',
    start_url: '/',
    display: 'standalone',
    background_color: '#030712',
    theme_color: '#0d9488',
    icons: [
      { src: '/icon-64.png', sizes: '64x64', type: 'image/png' },
      { src: '/icon-128.png', sizes: '128x128', type: 'image/png' },
      { src: '/icon-256.png', sizes: '256x256', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}

import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Lizard Console',
    short_name: 'Lizard',
    description: 'One console for every Postgres, MySQL and MongoDB database you run',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      { src: '/icon-64.png', sizes: '64x64', type: 'image/png' },
      { src: '/icon-128.png', sizes: '128x128', type: 'image/png' },
      { src: '/icon-256.png', sizes: '256x256', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}

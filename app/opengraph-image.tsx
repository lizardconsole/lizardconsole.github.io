import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Lizard Console — one console for every database you run';

export default async function Image() {
  const logo = await readFile(join(process.cwd(), 'public/lizard-logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          backgroundColor: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <img src={logoSrc} width={96} height={96} alt="" />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
            <div style={{ display: 'flex', fontSize: 88, fontWeight: 700, letterSpacing: -3, color: '#131316' }}>
              Lizard
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 76,
                fontFamily: 'monospace',
                color: '#5e5f6e',
              }}
            >
              console
              <div style={{ display: 'flex', width: 34, height: 70, marginLeft: 8, backgroundColor: '#2a7f1c' }} />
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 48,
            fontSize: 40,
            lineHeight: 1.35,
            color: '#5e5f6e',
            maxWidth: 900,
          }}
        >
          One console for every Postgres, MySQL and MongoDB database you run. Open source and self-hosted.
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#030712',
          backgroundImage:
            'radial-gradient(circle at 25% 15%, rgba(16,185,129,0.20), transparent 45%), radial-gradient(circle at 80% 85%, rgba(59,130,246,0.16), transparent 45%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 96,
              height: 96,
              borderRadius: 24,
              background: 'linear-gradient(135deg, #34d399, #0d9488)',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 56,
              fontWeight: 700,
              color: '#030712',
            }}
          >
            L
          </div>
          <div style={{ display: 'flex', fontSize: 96, fontWeight: 700, color: '#f3f4f6' }}>
            Lizard
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 32,
            fontSize: 32,
            color: '#9ca3af',
            maxWidth: 880,
            textAlign: 'center',
          }}
        >
          AI-native, zero-config data console for your Postgres, MySQL & MongoDB fleet
        </div>
      </div>
    ),
    { ...size }
  );
}

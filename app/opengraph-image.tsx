import { ImageResponse } from 'next/og';

export const alt = 'Math Problem Generator';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export const dynamic = 'force-dynamic';

export default async function Image() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center',
            }}
          >
            Math Problem Generator
          </div>
        </div>
      ),
      size
    );
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}

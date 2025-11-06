import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MathProblemProvider } from './context/MathProblemContext';
import './globals.css';
import { themeInitScript } from '@/lib/initThemeScript';
const inter = Inter({ subsets: ['latin'] });
import { ModalProvider } from './context/useModalContext';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  title: 'Math Problem Generator',
  description:
    'AI-powered math problem generator for Grade 1 to 12 students. Utilize Gemini AI to generate math problems.',
  keywords: [
    'Math Problem Generator',
    'AI-powered math problems',
    'Gemini AI',
    'Arithmetic Problems',
  ],
  authors: [{ name: 'Reanz Arthur A. Monera' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {/* Script to initialize theme and Prevent Flash of Unstyled Content (FOUC) */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <MathProblemProvider>
          <ModalProvider>{children}</ModalProvider>
        </MathProblemProvider>
      </body>
    </html>
  );
}

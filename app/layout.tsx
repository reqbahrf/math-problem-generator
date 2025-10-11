import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MathProblemProvider } from './context/MathProblemContext';
import './globals.css';
import { themeInitScript } from '@/lib/initThemeScript';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Math Problem Generator',
  description: 'AI-powered math problem generator for Primary 5 students',
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
        <MathProblemProvider>{children}</MathProblemProvider>
      </body>
    </html>
  );
}

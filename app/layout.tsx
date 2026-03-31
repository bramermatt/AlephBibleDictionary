import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aleph Bible Dictionary',
  description: 'A clean Bible dictionary for pastors, teachers, and serious students.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}

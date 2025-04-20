// // app/metadata.ts
// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'DreamTeam',
//   description: 'AI-powered IPL fantasy team builder',
//   icons: {
//     icon: '/favicon.png', // 👈 favicon here
//   },
// };









// app/layout.tsx
import './globals.css';
import { metadata } from './metadata';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = metadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

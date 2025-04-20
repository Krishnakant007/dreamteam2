// // app/metadata.ts
// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'DreamTeam',
//   description: 'AI-powered IPL fantasy team builder',
//   icons: {
//     icon: '/favicon.png', // 👈 favicon here
//   },
// };





// app/metadata.ts
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fashtra | AI Team Generator for Dream11 & IPL 2025',
  description: 'Build AI-powered IPL Dream11 fantasy teams in seconds. Fashtra helps you generate winning cricket teams using real stats and advanced AI.',
  keywords: ['Fashtra', 'AI Team Generator', 'Dream11 AI Team', 'IPL 2025 Fantasy', 'AI Cricket Team Builder'],
  authors: [{ name: 'Fashtra Team', url: 'https://fashtra.com' }],
  creator: 'Fashtra',
  openGraph: {
    title: 'Fashtra | AI Dream11 Team Generator',
    description: 'Generate IPL Dream11 fantasy teams with AI. Just ₹5 per team. Fast, smart, and data-driven.',
    url: 'https://fashtra.com',
    siteName: 'Fashtra',
    type: 'website',
    images: [
      {
        url: 'https://fashtra.com/og-image.png', // 👈 Replace with your OG image
        width: 1200,
        height: 630,
        alt: 'Fashtra AI Team Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fashtra | AI Team Generator',
    description: 'Generate AI-powered IPL teams. Make better Dream11 picks.',
    images: ['https://fashtra.com/og-image.png'], // 👈 Replace this too
    creator: '@FashtraOfficial', // optional
  },
  icons: {
    icon: '/favicon.png', // ✅ Favicon
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ғажап Қалам - Creative League Kazakhstan',
  description:
    'Платформа для юных авторов, иллюстраторов и комиксистов Казахстана.',
  openGraph: {
    title: 'Ғажап Қалам',
    description:
      'Творческий сезон, подача работ, жюри, галерея финалистов и фестиваль.',
    images: ['/images/gajap-qalam-hero.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

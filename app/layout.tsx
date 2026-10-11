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
  title: 'Gajap Qalam — республиканский творческий турнир',
  description:
    'Открытая творческая сцена для школьников Казахстана 10–17 лет: комиксы, сценарии и концепт-арт.',
  icons: {
    icon: '/images/gajap-qalam-favicon.png',
    apple: '/images/gajap-qalam-favicon.png',
  },
  openGraph: {
    title: 'Gajap Qalam',
    description:
      'Комиксы, сценарии, концепт-арт и финальный фестиваль для юных авторов Казахстана.',
    images: ['/images/gajap-qalam-banner.png'],
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

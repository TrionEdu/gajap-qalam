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
  metadataBase: new URL('https://gajapqalam.kz'),
  title: {
    default: 'Gajap Qalam — платформа юных авторов',
    template: '%s — Gajap Qalam',
  },
  description:
    'Цифровые комикс-журналы, онлайн-читалка, афиша и творческий турнир Gajap Qalam для нового поколения авторов Казахстана.',
  icons: {
    icon: [{ url: '/images/gajap-qalam-favicon-v2.png', type: 'image/png', sizes: '1589x1589' }],
    shortcut: '/images/gajap-qalam-favicon-v2.png',
    apple: '/images/gajap-qalam-favicon-v2.png',
  },
  openGraph: {
    title: 'Gajap Qalam',
    description:
      'Читайте цифровые комиксы, следите за фестивалями и участвуйте в творческом турнире Gajap Qalam.',
    url: 'https://gajapqalam.kz',
    siteName: 'Gajap Qalam',
    locale: 'ru_KZ',
    type: 'website',
    images: ['/images/gajap-qalam-banner-v2.png'],
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

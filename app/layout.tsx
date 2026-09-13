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
  title: 'Ғажап Қалам — республиканский творческий турнир',
  description:
    'Турнир для подростков 10–17 лет, которые пишут, рисуют обложки и делают комиксы.',
  openGraph: {
    title: 'Ғажап Қалам',
    description:
      'Дело юных авторов: архив работ, хроника турнира, досье участника и финальный фестиваль.',
    images: ['/images/gajap-qalam-noir.png'],
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

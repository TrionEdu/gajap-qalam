import { ShelfClient } from '@/components/shelf-client';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Моя полка | Gajap Qalam' };

export default function ShelfPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-intro shelf-intro"><p className="eyebrow">Личная библиотека</p><h1>Моя полка</h1><p>Купленные выпуски, закладки и продолжение чтения с последней страницы.</p></section>
      <section className="section shelf-section"><ShelfClient /></section>
      <SiteFooter />
    </main>
  );
}

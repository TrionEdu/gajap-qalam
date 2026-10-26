import { MagazineCatalog } from '@/components/magazine-catalog';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';

export const metadata = { title: 'Цифровые журналы | Gajap Qalam' };

export default function MagazinesPage() {
  return (
    <main>
      <SiteHeader />
      <section className="page-intro store-intro">
        <p className="eyebrow">Магазин и онлайн-читалка</p>
        <h1>Комиксы, которые живут на экране</h1>
        <p>Откройте бесплатные страницы, выберите выпуск и читайте его на телефоне, планшете или компьютере.</p>
      </section>
      <section className="section store-section"><MagazineCatalog /></section>
      <SiteFooter />
    </main>
  );
}

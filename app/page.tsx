import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, CalendarDays, Play, Sparkles } from 'lucide-react';
import { HomeCarousel } from '@/components/home-carousel';
import { MagazineCatalog } from '@/components/magazine-catalog';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';

const news = [
  {
    title: 'Алибек Кожагельдиев: «Не пускать корни, а постоянно двигаться»',
    source: 'soz.art.podcast',
    href: 'https://youtu.be/6SdI8Z_woVA?si=Utb6T9bSDN7vahQO',
    image: '/images/news/alibek-kozhageldiev.jpg',
  },
  {
    title: 'Как художник из Казахстана начал работать с Marvel?',
    source: 'Покупайте Шапочку',
    href: 'https://www.youtube.com/watch?v=AY83aavSEvs',
    image: '/images/news/madibek-marvel.jpg',
  },
  {
    title: 'Работа в Marvel, комиксы и казахстанский супергерой',
    source: 'Aitore Joldasqali',
    href: 'https://www.youtube.com/watch?v=hnavIvfB9jg',
    image: '/images/news/marvel-comics-kazakhstan.jpg',
  },
];

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <HomeCarousel />

      <section className="storefront-section section" aria-labelledby="home-comics-title">
        <div className="storefront-heading">
          <div>
            <p className="eyebrow">Цифровая библиотека</p>
            <h2 id="home-comics-title">Комиксы</h2>
          </div>
          <Link className="section-link" href="/magazines">Смотреть все <ArrowRight /></Link>
        </div>
        <MagazineCatalog preview limit={5} />
      </section>

      <section className="news-section section-band" aria-labelledby="news-title">
        <div className="section news-inner">
          <div className="storefront-heading">
            <div><p className="eyebrow">Видео и разговоры</p><h2 id="news-title">Новости</h2></div>
            <span className="section-caption">Временная редакционная подборка</span>
          </div>
          <div className="news-grid">
            {news.map((item) => (
              <a className="news-card" href={item.href} target="_blank" rel="noreferrer" key={item.href}>
                <span className="news-image">
                  <Image src={item.image} alt="" fill sizes="(max-width: 720px) 100vw, 33vw" />
                  <i><Play aria-hidden="true" /></i>
                </span>
                <small>{item.source} · YouTube</small>
                <h3>{item.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="storefront-section section" aria-labelledby="new-title">
        <div className="storefront-heading">
          <div><p className="eyebrow">Первые на полке</p><h2 id="new-title">Новинки</h2></div>
          <Link className="section-link" href="/magazines?section=new">Все новинки <ArrowRight /></Link>
        </div>
        <MagazineCatalog preview section="new" limit={5} />
      </section>

      <section className="home-about-strip">
        <div className="section home-about-grid">
          <div>
            <p className="eyebrow">О нас</p>
            <h2>Истории Казахстана — от первой идеи до читателя.</h2>
          </div>
          <div>
            <p>Ғажап Қалам вырос из любви к рисунку, семейным историям и собственным мирам — от первых эскизов до работы в дизайне, образовании и комиксах. Наша миссия — дать молодым авторам Казахстана пространство, где историю можно придумать, оформить, показать читателю и развивать дальше.</p>
            <Link className="text-link" href="/about">Познакомиться с проектом <ArrowRight /></Link>
          </div>
        </div>
      </section>

      <section className="home-paths section" aria-label="Главные разделы">
        <Link href="/contest"><CalendarDays /><span><small>Турнир и фестиваль</small><strong>Конкурс Ғажап Қалам</strong></span><ArrowRight /></Link>
        <Link href="/magazines"><BookOpen /><span><small>Превью и онлайн-читалка</small><strong>Библиотека комиксов</strong></span><ArrowRight /></Link>
        <Link href="/submit"><Sparkles /><span><small>До 25 МБ</small><strong>Отправить свою работу</strong></span><ArrowRight /></Link>
      </section>

      <SiteFooter />
    </main>
  );
}

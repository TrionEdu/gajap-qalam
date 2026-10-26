import Link from 'next/link';
import { ArrowRight, BookOpen, HeartHandshake, PencilRuler, Users } from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';

export const metadata = { title: 'О нас | Gajap Qalam' };

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="about-hero section">
        <p className="eyebrow">Gajap Qalam · Ғажап Қалам</p>
        <h1>Место, где идея становится историей, а история находит читателя.</h1>
        <p>Проект вырос из любви к рисунку, семейным историям и собственным мирам — от первых эскизов до работы в дизайне, образовании и комиксах. Сегодня Ғажап Қалам соединяет молодых авторов, читателей, художников, школы и издательскую практику.</p>
      </section>
      <section className="about-values section-band">
        <div className="section about-value-grid">
          <article><PencilRuler /><h2>Создавать</h2><p>Помогаем пройти путь от замысла и сценария до законченной визуальной истории.</p></article>
          <article><BookOpen /><h2>Читать</h2><p>Собираем цифровую библиотеку, где комиксы удобно открывать на телефоне, планшете и компьютере.</p></article>
          <article><Users /><h2>Встречаться</h2><p>Публикуем анонсы конкурсов, фестивалей, встреч с авторами и важных событий сообщества.</p></article>
          <article><HeartHandshake /><h2>Поддерживать</h2><p>Лучшие молодые авторы получают редакционную сцену, обратную связь и безопасную публикацию с согласиями.</p></article>
        </div>
      </section>
      <section className="about-cta section">
        <div><p className="eyebrow">Два входа в проект</p><h2>Читайте новые выпуски или принесите свою историю.</h2></div>
        <div><Link className="button button-primary" href="/magazines">Открыть комиксы <ArrowRight /></Link><Link className="button button-outline" href="/submit">Подать работу</Link></div>
      </section>
      <SiteFooter />
    </main>
  );
}

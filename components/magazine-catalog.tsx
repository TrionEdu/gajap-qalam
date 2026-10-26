'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Search, ShoppingBag, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatPriceKzt, PublicationSummary } from '@/lib/catalog-shared';

const upcoming = [
  { title: 'Новые голоса', issue: 'Выпуск 01', copy: 'Комиксы и визуальные истории нового сезона.', image: '/images/gajap-qalam-hero.png', tone: 'blue' },
  { title: 'Нео-Номады', issue: 'Спецвыпуск', copy: 'Легенды Великой Степи в новых мирах.', image: '/images/gajap-qalam-noir.png', tone: 'ink' },
  { title: 'Фестиваль', issue: 'Альманах', copy: 'Истории, авторы и лучшие моменты сезона.', image: '/images/gajap-qalam-banner-v2.png', tone: 'yellow' },
];

export function MagazineCatalog({ preview = false }: { preview?: boolean }) {
  const [items, setItems] = useState<PublicationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [availability, setAvailability] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (availability) params.set('availability', availability);
    const timer = window.setTimeout(() => {
      setLoading(true);
      fetch(`/api/publications?${params}`)
        .then((response) => response.json() as Promise<{ publications?: PublicationSummary[] }>)
        .then((data) => setItems(data.publications ?? []))
        .catch(() => setItems([]))
        .finally(() => setLoading(false));
    }, query ? 250 : 0);
    return () => window.clearTimeout(timer);
  }, [availability, query]);

  const visible = preview ? items.slice(0, 4) : items;

  return (
    <>
      {!preview && (
        <div className="store-tools">
          <label className="search-field"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Название, автор или выпуск" /></label>
          <div className="store-filter" role="group" aria-label="Доступность выпусков">
            {[['', 'Все'], ['paid', 'Платные'], ['free', 'Бесплатные'], ['soon', 'Скоро']].map(([value, label]) => (
              <button type="button" className={availability === value ? 'active' : ''} onClick={() => setAvailability(value)} key={value}>{label}</button>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div className="magazine-grid is-loading" aria-label="Загрузка каталога">
          {[0, 1, 2].map((item) => <div className="magazine-skeleton" key={item} />)}
        </div>
      ) : visible.length ? (
        <div className="magazine-grid">
          {visible.map((publication) => (
            <article className="magazine-card" key={publication.id}>
              <Link className="magazine-cover" href={`/magazines/${publication.slug}`}>
                {publication.coverKey ? (
                  <Image src={`/api/publications/${publication.slug}/cover`} alt={`Обложка «${publication.title}»`} fill unoptimized sizes="(max-width: 620px) 70vw, 25vw" />
                ) : (
                  <span className="magazine-cover-fallback"><BookOpen /><small>Gajap Qalam</small></span>
                )}
                <span className={`magazine-badge ${publication.status}`}>{publication.status === 'coming_soon' ? 'Скоро' : `${publication.previewPages} стр. бесплатно`}</span>
              </Link>
              <div className="magazine-card-body">
                <p>{publication.issueLabel || 'Цифровой выпуск'} · {publication.language}</p>
                <h3><Link href={`/magazines/${publication.slug}`}>{publication.title}</Link></h3>
                {publication.subtitle && <span>{publication.subtitle}</span>}
                <div className="magazine-card-meta">
                  <strong>{publication.status === 'coming_soon' ? 'Готовится' : formatPriceKzt(Number(publication.priceKzt))}</strong>
                  <span><Star /> {Number(publication.rating).toFixed(1)} ({publication.reviewCount})</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="upcoming-magazines" aria-label="Будущие серии Gajap Qalam">
          {upcoming.map((item) => (
            <article className={`upcoming-magazine ${item.tone}`} key={item.title}>
              <Image src={item.image} alt="" fill sizes="(max-width: 620px) 100vw, 33vw" />
              <div><span>{item.issue}</span><h3>{item.title}</h3><p>{item.copy}</p><b>Готовится</b></div>
            </article>
          ))}
          {!preview && <p className="catalog-note"><ShoppingBag /> Первые коммерческие выпуски появятся после проверки прав и подключения оплаты. Пока деньги не списываются.</p>}
        </div>
      )}

      {preview && <Link className="text-link library-more" href="/magazines">Открыть магазин <ArrowRight /></Link>}
    </>
  );
}

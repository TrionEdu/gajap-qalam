'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, ChevronDown, Search, ShoppingBag, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { formatPriceKzt, PublicationSummary } from '@/lib/catalog-shared';

const upcoming = [
  { title: 'Жошы хан', issue: 'Историческая серия', image: '/images/comics/zhoshy.webp' },
  { title: 'Бату хан', issue: 'Историческая серия', image: '/images/comics/batu.webp' },
  { title: 'Берке хан', issue: 'Историческая серия', image: '/images/comics/berke.webp' },
  { title: 'Ноғай хан', issue: 'Историческая серия', image: '/images/comics/nogai.webp' },
  { title: 'Тұрандот', issue: 'Историческая серия', image: '/images/comics/turandot.webp' },
];

const sections = [
  ['', 'Все комиксы'],
  ['hits', 'Хиты'],
  ['new', 'Новинки'],
  ['history', '100 исторических личностей'],
  ['author', 'Авторские комиксы'],
  ['children', 'Детские комиксы'],
  ['merch', 'Мерч'],
] as const;

export function MagazineCatalog({ preview = false, section = '', limit = 4 }: { preview?: boolean; section?: string; limit?: number }) {
  const [items, setItems] = useState<PublicationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [availability, setAvailability] = useState('');
  const [activeSection, setActiveSection] = useState(section);

  useEffect(() => {
    if (preview) return;
    const frame = window.requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      setQuery(params.get('q') ?? '');
      setActiveSection(params.get('section') ?? '');
    });
    return () => window.cancelAnimationFrame(frame);
  }, [preview]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (availability) params.set('availability', availability);
    if (activeSection) params.set('section', activeSection);
    const timer = window.setTimeout(() => {
      setLoading(true);
      fetch(`/api/publications?${params}`)
        .then((response) => response.json() as Promise<{ publications?: PublicationSummary[] }>)
        .then((data) => setItems(data.publications ?? []))
        .catch(() => setItems([]))
        .finally(() => setLoading(false));
    }, query ? 250 : 0);
    return () => window.clearTimeout(timer);
  }, [activeSection, availability, query]);

  const visible = preview ? items.slice(0, limit) : items;

  return (
    <>
      {!preview && (
        <div className="store-tools">
          <label className="search-field"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Название, герой, автор или серия" /></label>
          <details className="category-menu">
            <summary>Разделы <ChevronDown /></summary>
            <div role="group" aria-label="Разделы каталога">
              {sections.map(([value, label]) => <button type="button" className={activeSection === value ? 'active' : ''} onClick={() => setActiveSection(value)} key={value}>{label}</button>)}
            </div>
          </details>
          <div className="store-filter" role="group" aria-label="Доступность выпусков">
            {[['', 'Все'], ['paid', 'Платные'], ['free', 'Бесплатные'], ['soon', 'Скоро']].map(([value, label]) => <button type="button" className={availability === value ? 'active' : ''} onClick={() => setAvailability(value)} key={value}>{label}</button>)}
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
                  <Image src={`/api/publications/${publication.slug}/cover`} alt={`Обложка «${publication.title}»`} fill unoptimized loading={preview ? 'eager' : 'lazy'} sizes="(max-width: 620px) 70vw, 25vw" />
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
        <div className="magazine-grid fallback-catalog" aria-label="Серия 100 исторических личностей Казахстана">
          {upcoming.map((item) => (
            <article className="magazine-card" key={item.title}>
              <span className="magazine-cover">
                <Image src={item.image} alt={`Обложка «${item.title}»`} fill unoptimized loading={preview ? 'eager' : 'lazy'} sizes="(max-width: 620px) 44vw, 20vw" />
                <span className="magazine-badge coming_soon">Скоро</span>
              </span>
              <div className="magazine-card-body"><p>{item.issue} · Қазақша</p><h3>{item.title}</h3><div className="magazine-card-meta"><strong>Готовится</strong></div></div>
            </article>
          ))}
          {!preview && <p className="catalog-note"><ShoppingBag /> Первые коммерческие выпуски появятся после проверки прав и подключения оплаты. Пока деньги не списываются.</p>}
        </div>
      )}

      {preview && <Link className="text-link library-more" href="/magazines">Открыть магазин <ArrowRight /></Link>}
    </>
  );
}

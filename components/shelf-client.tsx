'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookHeart, BookOpen, LogIn } from 'lucide-react';
import { useEffect, useState } from 'react';

type ShelfItem = {
  slug: string;
  title: string;
  subtitle?: string | null;
  authorLabel: string;
  issueLabel?: string | null;
  coverKey?: string | null;
  pageCount: number;
  savedPage?: number | null;
  purchasedAt: string;
};

export function ShelfClient() {
  const [items, setItems] = useState<ShelfItem[]>([]);
  const [signInPath, setSignInPath] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/shelf')
      .then(async (response) => {
        const payload = await response.json() as { items?: ShelfItem[]; signInPath?: string; error?: string };
        if (response.status === 401) { setSignInPath(payload.signInPath ?? '/signin-with-chatgpt?return_to=%2Fshelf'); return; }
        if (!response.ok) throw new Error(payload.error);
        setItems(payload.items ?? []);
      })
      .catch((reason) => setError(reason.message || 'Не удалось открыть полку.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="shelf-loading"><span /><span /><span /></div>;
  if (error) return <div className="shelf-empty"><BookHeart /><h2>Полка временно недоступна</h2><p>{error}</p></div>;
  if (signInPath) return <div className="shelf-signin"><div><p className="eyebrow">Личная библиотека</p><h2>Одна полка на всех устройствах</h2><p>Войдите через ChatGPT, чтобы купленные выпуски и последняя прочитанная страница сохранялись безопасно.</p><a className="button button-primary" href={signInPath} target="_top"><LogIn /> Войти и открыть полку</a></div><BookHeart aria-hidden="true" /></div>;
  if (!items.length) return <div className="shelf-empty"><BookOpen /><h2>Полка пока пустая</h2><p>Здесь появятся купленные цифровые выпуски. Бесплатные превью можно читать без входа.</p><Link className="button button-primary" href="/magazines">Выбрать журнал <ArrowRight /></Link></div>;

  return (
    <div className="shelf-grid">
      {items.map((item) => {
        const savedPage = Math.max(1, Number(item.savedPage ?? 1));
        const progress = Math.min(100, Math.round((savedPage / item.pageCount) * 100));
        return <article className="shelf-card" key={item.slug}><Link className="shelf-cover" href={`/magazines/${item.slug}#reader`}>{item.coverKey ? <Image src={`/api/publications/${item.slug}/cover`} alt={`Обложка «${item.title}»`} fill unoptimized sizes="220px" /> : <span><BookOpen /></span>}</Link><div><p>{item.issueLabel || 'Цифровой выпуск'}</p><h2>{item.title}</h2>{item.subtitle && <span>{item.subtitle}</span>}<small>{item.authorLabel}</small><div className="shelf-progress"><i style={{ width: `${progress}%` }} /><span>{progress}% · страница {savedPage}</span></div><Link className="button button-outline" href={`/magazines/${item.slug}#reader`}>Продолжить <ArrowRight /></Link></div></article>;
      })}
    </div>
  );
}

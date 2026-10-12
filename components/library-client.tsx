'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Search, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DIRECTIONS, LANGUAGES } from '@/lib/platform-shared';

type Work = { id: string; slug: string; title: string; authorName: string; city: string; ageGroup: string; direction: string; language: string; summary: string; coverKey?: string | null; viewCount: number; rating: number; reviewCount: number };

export function LibraryClient({ preview = false }: { preview?: boolean }) {
  const [works, setWorks] = useState<Work[]>([]); const [loading, setLoading] = useState(true);
  const [q, setQ] = useState(''); const [direction, setDirection] = useState(''); const [language, setLanguage] = useState('');
  useEffect(() => {
    const params = new URLSearchParams(); if (q) params.set('q', q); if (direction) params.set('direction', direction); if (language) params.set('language', language);
    const timer = window.setTimeout(() => { setLoading(true); fetch(`/api/works?${params}`).then((r) => r.json() as Promise<{ works?: Work[] }>).then((data) => setWorks(data.works ?? [])).catch(() => setWorks([])).finally(() => setLoading(false)); }, q ? 250 : 0);
    return () => window.clearTimeout(timer);
  }, [q, direction, language]);
  const visible = preview ? works.slice(0, 4) : works;
  return <>
    {!preview && <div className="library-tools"><label className="search-field"><Search /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Название, автор или тема" /></label><select value={direction} onChange={(e) => setDirection(e.target.value)} aria-label="Направление"><option value="">Все направления</option>{DIRECTIONS.map((item) => <option key={item}>{item}</option>)}</select><select value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Язык"><option value="">Все языки</option>{LANGUAGES.map((item) => <option key={item}>{item}</option>)}</select></div>}
    {loading ? <div className="library-empty"><span className="loading-line" /><span className="loading-line" /><span className="loading-line" /></div> : visible.length ? <div className="work-grid">{visible.map((work) => <article className="work-card" key={work.id}><Link className="work-cover" href={`/library/${work.slug}`}>{work.coverKey ? <Image src={`/api/works/${work.slug}/cover`} alt={`Обложка работы «${work.title}»`} fill unoptimized sizes="(max-width: 620px) 50vw, 25vw" /> : <span><BookOpen /><small>{work.direction}</small></span>}</Link><div className="work-card-body"><p>{work.direction} · {work.language}</p><h3><Link href={`/library/${work.slug}`}>{work.title}</Link></h3><span>{work.authorName} · {work.city}</span><div className="work-meta"><span><Star />{Number(work.rating).toFixed(1)} ({work.reviewCount})</span><span>{work.viewCount} просмотров</span></div></div></article>)}</div> : <div className="library-empty"><BookOpen /><h3>Библиотека откроется после отбора</h3><p>Здесь появятся только работы, выбранные редакцией и разрешённые родителем к публикации.</p>{preview ? <Link className="button button-outline" href="/library">Открыть библиотеку</Link> : <Link className="button button-primary" href="/submit">Подать первую работу <ArrowRight /></Link>}</div>}
    {preview && works.length > 0 && <Link className="text-link library-more" href="/library">Вся библиотека <ArrowRight /></Link>}
  </>;
}

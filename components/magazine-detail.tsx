'use client';

import { ArrowLeft, BookOpen, Eye, LockKeyhole, Send, ShoppingBag, Star, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { formatPriceKzt } from '@/lib/catalog-shared';
import { PdfReader } from './pdf-reader';

type Publication = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  description: string;
  authorLabel: string;
  language: string;
  issueLabel?: string | null;
  coverKey?: string | null;
  priceKzt: number;
  previewPages: number;
  pageCount: number;
  status: 'published' | 'coming_soon';
  viewCount: number;
};
type Review = { displayName: string; rating: number; body: string; createdAt: string };

export function MagazineDetail({ slug }: { slug: string }) {
  const [publication, setPublication] = useState<Publication | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [access, setAccess] = useState<'preview' | 'full'>('preview');
  const [savedPage, setSavedPage] = useState(1);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    fetch(`/api/publications/${encodeURIComponent(slug)}`)
      .then(async (response) => {
        const payload = await response.json() as { publication?: Publication; reviews?: Review[]; access?: 'preview' | 'full'; savedPage?: number; error?: string };
        if (!response.ok || !payload.publication) throw new Error(payload.error);
        setPublication(payload.publication);
        setReviews(payload.reviews ?? []);
        setAccess(payload.access ?? 'preview');
        setSavedPage(payload.savedPage ?? 1);
      })
      .catch((reason) => setError(reason.message || 'Выпуск не найден.'));
  }, [slug]);

  async function sendReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    const form = event.currentTarget;
    const response = await fetch(`/api/publications/${encodeURIComponent(slug)}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const payload = await response.json() as { message?: string; error?: string };
    setMessage(payload.message || payload.error || 'Не удалось отправить отзыв.');
    if (response.ok) form.reset();
  }

  if (error) return <section className="section work-missing"><h1>{error}</h1><Link className="button button-outline" href="/magazines"><ArrowLeft /> В магазин</Link></section>;
  if (!publication) return <section className="section reader-loading">Открываем выпуск…</section>;

  const canReadFull = access === 'full';
  const isComing = publication.status === 'coming_soon';
  const readerLabel = canReadFull ? 'Полная версия' : `Превью · ${publication.previewPages} стр.`;

  return (
    <>
      <section className="magazine-hero section">
        <Link className="back-link" href="/magazines"><ArrowLeft /> Все выпуски</Link>
        <div className="magazine-hero-grid">
          <div className="magazine-detail-cover">
            {publication.coverKey ? <Image src={`/api/publications/${slug}/cover`} alt={`Обложка «${publication.title}»`} fill unoptimized sizes="320px" /> : <div className="work-cover-fallback"><BookOpen /><span>{publication.title}</span></div>}
          </div>
          <div className="magazine-info">
            <p className="eyebrow">{publication.issueLabel || 'Цифровой выпуск'} · {publication.language}</p>
            <h1>{publication.title}</h1>
            {publication.subtitle && <p className="magazine-subtitle">{publication.subtitle}</p>}
            <p className="work-author">{publication.authorLabel} · {publication.pageCount} стр.</p>
            <p className="work-summary">{publication.description}</p>
            <div className="magazine-facts"><span><Eye /> {publication.viewCount} просмотров</span><span><LockKeyhole /> Чтение онлайн</span></div>
            <div className="magazine-purchase-row">
              <strong>{isComing ? 'Скоро' : formatPriceKzt(Number(publication.priceKzt))}</strong>
              {isComing ? (
                <button className="button button-disabled" type="button" disabled>Выпуск готовится</button>
              ) : canReadFull ? (
                <a className="button button-primary" href="#reader">Продолжить чтение</a>
              ) : (
                <button className="button button-primary" type="button" onClick={() => dialogRef.current?.showModal()}><ShoppingBag /> Купить выпуск</button>
              )}
              {!isComing && !canReadFull && <a className="button button-outline" href="#reader">Читать превью</a>}
            </div>
          </div>
        </div>
      </section>

      <section className="reader-band" id="reader">
        <div className="reader-heading">
          <p className="eyebrow">Онлайн-читалка</p>
          <h2>{canReadFull ? 'Выпуск полностью открыт' : 'Начните с бесплатного превью'}</h2>
          <p>Перелистывайте страницы свайпом или стрелками. Полная версия выдаётся сервером только при наличии права доступа.</p>
        </div>
        <PdfReader
          src={`/api/publications/${slug}/file`}
          initialPage={canReadFull ? savedPage : 1}
          progressSlug={canReadFull ? slug : undefined}
          accessLabel={readerLabel}
        />
        {!canReadFull && !isComing && (
          <div className="reader-paywall">
            <LockKeyhole />
            <div><p className="eyebrow">Конец бесплатного фрагмента</p><h3>Продолжите историю в онлайн-читалке</h3><span>После подключения оплаты выпуск появится в «Моей полке» и запомнит последнюю страницу.</span></div>
            <button className="button button-primary" type="button" onClick={() => dialogRef.current?.showModal()}>Купить за {formatPriceKzt(Number(publication.priceKzt))}</button>
          </div>
        )}
      </section>

      <section className="section review-section">
        <div><p className="eyebrow">Обсуждение</p><h2>Отзывы читателей</h2>{reviews.length ? <div className="review-list">{reviews.map((review, index) => <article key={`${review.createdAt}-${index}`}><div><strong>{review.displayName}</strong><span>{Array.from({ length: 5 }, (_, item) => <Star key={item} className={item < review.rating ? 'filled' : ''} />)}</span></div><p>{review.body}</p></article>)}</div> : <p className="muted-copy">Пока нет опубликованных отзывов.</p>}</div>
        <form className="review-form" onSubmit={sendReview}><h3>Оставить отзыв</h3><label>Имя или псевдоним<input name="displayName" required maxLength={60} /></label><label>Оценка<select name="rating" required defaultValue="5"><option value="5">5, отлично</option><option value="4">4, хорошо</option><option value="3">3, интересно</option><option value="2">2</option><option value="1">1</option></select></label><label>Отзыв<textarea name="body" required minLength={10} maxLength={600} rows={5} /></label><label className="hidden-honeypot">Сайт<input name="website" tabIndex={-1} /></label><button className="button button-primary"><Send /> Отправить на модерацию</button>{message && <p className="form-note">{message}</p>}</form>
      </section>

      <dialog className="purchase-dialog" ref={dialogRef} onClick={(event) => { if (event.target === dialogRef.current) dialogRef.current.close(); }}>
        <button className="dialog-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Закрыть"><X /></button>
        <p className="eyebrow">Покупка цифрового выпуска</p>
        <h2>{publication.title}</h2>
        <strong>{formatPriceKzt(Number(publication.priceKzt))}</strong>
        <p>Интерфейс магазина и защищённый доступ уже подготовлены. Платёжный провайдер ещё не подключён, поэтому сейчас деньги не списываются.</p>
        <div><a className="button button-primary" href={`mailto:ibeimish@gmail.com?subject=${encodeURIComponent(`Gajap Qalam — сообщить о старте продаж: ${publication.title}`)}`}>Сообщить о старте</a><Link className="button button-outline" href="/shelf">Открыть мою полку</Link></div>
      </dialog>
    </>
  );
}

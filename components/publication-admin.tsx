'use client';

import { Check, ExternalLink, RefreshCw, UploadCloud, X } from 'lucide-react';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { PUBLICATION_STATUS_LABELS, PublicationStatus, formatPriceKzt } from '@/lib/catalog-shared';

type Publication = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  authorLabel: string;
  language: string;
  issueLabel?: string | null;
  priceKzt: number;
  previewPages: number;
  pageCount: number;
  status: PublicationStatus;
  featured: number;
  category: 'history' | 'author' | 'children' | 'merch' | 'other';
  seriesLabel?: string | null;
  isNew: number;
  rightsConfirmed: number;
  viewCount: number;
};
type Review = { id: string; displayName: string; rating: number; body: string; publicationTitle: string; createdAt: string };

export function PublicationAdmin() {
  const [items, setItems] = useState<Publication[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const response = await fetch('/api/admin/publications');
    const payload = await response.json() as { publications?: Publication[]; reviews?: Review[]; error?: string };
    if (!response.ok) setMessage(payload.error ?? 'Не удалось открыть витрину.');
    else { setItems(payload.publications ?? []); setReviews(payload.reviews ?? []); }
    setLoading(false);
  }, []);

  useEffect(() => { void Promise.resolve().then(load); }, [load]);

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true); setMessage('');
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set('rightsConfirmed', data.get('rightsConfirmed') === 'on' ? 'true' : 'false');
    data.set('isNew', data.get('isNew') === 'on' ? 'true' : 'false');
    const response = await fetch('/api/admin/publications', { method: 'POST', body: data });
    const payload = await response.json() as { error?: string };
    setMessage(response.ok ? 'Выпуск создан и превью подготовлено.' : payload.error ?? 'Не удалось создать выпуск.');
    if (response.ok) { form.reset(); await load(); }
    setSaving(false);
  }

  async function update(event: FormEvent<HTMLFormElement>, id: string) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch('/api/admin/publications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...data, featured: data.featured === 'on' }),
    });
    const payload = await response.json() as { error?: string };
    setMessage(response.ok ? 'Настройки выпуска сохранены.' : payload.error ?? 'Не удалось сохранить выпуск.');
    if (response.ok) await load();
  }

  async function moderate(id: string, status: 'approved' | 'rejected') {
    await fetch('/api/admin/publications', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, action: 'review', status }) });
    await load();
  }

  return (
    <section className="publication-admin">
      <div className="admin-toolbar"><div><p className="eyebrow">Цифровое издательство</p><h1>Выпуски и магазин</h1></div><button className="icon-button" type="button" onClick={load} aria-label="Обновить"><RefreshCw /></button></div>

      <form className="publication-create" onSubmit={create}>
        <div className="publication-create-heading"><UploadCloud /><div><h2>Новый цифровой выпуск</h2><p>Система сохранит полный PDF отдельно и автоматически создаст бесплатное превью.</p></div></div>
        <div className="form-row"><label>Название<input name="title" required maxLength={140} /></label><label>Подзаголовок<input name="subtitle" maxLength={180} /></label></div>
        <div className="form-row"><label>Автор / редакция<input name="authorLabel" required maxLength={120} /></label><label>Язык<select name="language" defaultValue="Русский"><option>Қазақша</option><option>Русский</option><option>Два языка</option></select></label></div>
        <label>Описание<textarea name="description" required rows={4} maxLength={1600} /></label>
        <div className="form-row"><label>Метка выпуска<input name="issueLabel" placeholder="Выпуск 01" maxLength={80} /></label><label>Серия<input name="seriesLabel" placeholder="100 исторических личностей Казахстана" maxLength={120} /></label></div>
        <div className="form-row"><label>Раздел<select name="category" defaultValue="other"><option value="history">Историческая серия</option><option value="author">Авторские комиксы</option><option value="children">Детские комиксы</option><option value="merch">Мерч</option><option value="other">Другое</option></select></label><label>Цена, ₸<input name="priceKzt" type="number" min="0" max="1000000" defaultValue="0" required /></label></div>
        <div className="form-row"><label>Страниц в превью<input name="previewPages" type="number" min="1" max="20" defaultValue="3" required /></label><label>Статус<select name="status" defaultValue="draft"><option value="draft">Черновик</option><option value="coming_soon">Скоро</option><option value="published">Опубликовать</option></select></label></div>
        <div className="form-row"><label>Полный PDF до 25 МБ<input name="file" type="file" accept="application/pdf" required /></label><label>Обложка до 4 МБ<input name="cover" type="file" accept="image/png,image/jpeg,image/webp" /></label></div>
        <label className="consent-check"><input name="isNew" type="checkbox" defaultChecked /><span>Показывать в разделе «Новинки».</span></label>
        <label className="consent-check"><input name="rightsConfirmed" type="checkbox" /><span>Подтверждаю права на цифровое и коммерческое размещение. Обязательно только для статуса «В продаже».</span></label>
        <button className="button button-primary" disabled={saving}>{saving ? 'Готовим превью…' : 'Создать выпуск'}</button>
      </form>

      {message && <p className="admin-message">{message}</p>}
      {loading ? <p>Загружаем витрину…</p> : <div className="publication-admin-list">{items.map((item) => <form className="publication-admin-item" onSubmit={(event) => update(event, item.id)} key={item.id}><div><span>{item.issueLabel || 'Цифровой выпуск'}</span><h3>{item.title}</h3><p>{item.authorLabel} · {item.pageCount} стр. · {item.viewCount} просмотров</p></div><div className={`status-badge status-${item.status}`}>{PUBLICATION_STATUS_LABELS[item.status]}</div><label>Цена<input name="priceKzt" type="number" min="0" max="1000000" defaultValue={item.priceKzt} /></label><label>Превью<input name="previewPages" type="number" min="1" max="20" defaultValue={item.previewPages} /></label><label>Метка<input name="issueLabel" defaultValue={item.issueLabel ?? ''} maxLength={80} /></label><label>Серия<input name="seriesLabel" defaultValue={item.seriesLabel ?? ''} maxLength={120} /></label><label>Раздел<select name="category" defaultValue={item.category}><option value="history">Историческая серия</option><option value="author">Авторские комиксы</option><option value="children">Детские комиксы</option><option value="merch">Мерч</option><option value="other">Другое</option></select></label><label>Статус<select name="status" defaultValue={item.status}><option value="draft">Черновик</option><option value="coming_soon">Скоро</option><option value="published">В продаже</option><option value="archived">Архив</option></select></label><label className="compact-check"><input name="featured" type="checkbox" defaultChecked={Boolean(item.featured)} /> Хит</label><label className="compact-check"><input name="isNew" type="checkbox" defaultChecked={Boolean(item.isNew)} /> Новинка</label><div className="publication-admin-actions"><a className="button button-outline" href={`/magazines/${item.slug}`} target="_blank">Открыть <ExternalLink /></a><button className="button button-primary">Сохранить</button></div><small>{formatPriceKzt(item.priceKzt)} · права {item.rightsConfirmed ? 'подтверждены' : 'не подтверждены'}</small></form>)}</div>}

      <section className="admin-reviews"><h2>Отзывы на выпуски</h2>{reviews.length ? reviews.map((review) => <article key={review.id}><div><strong>{review.displayName}</strong><span>{review.rating}/5 · {review.publicationTitle}</span></div><p>{review.body}</p><div><button className="icon-button approve" type="button" onClick={() => moderate(review.id, 'approved')} aria-label="Одобрить"><Check /></button><button className="icon-button reject" type="button" onClick={() => moderate(review.id, 'rejected')} aria-label="Отклонить"><X /></button></div></article>) : <p className="muted-copy">Нет отзывов, ожидающих проверки.</p>}</section>
    </section>
  );
}

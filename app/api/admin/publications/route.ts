import { env } from 'cloudflare:workers';
import { PDFDocument } from 'pdf-lib';
import {
  cleanText,
  isAdmin,
  json,
  MAX_PUBLICATION_COVER_BYTES,
  MAX_PUBLICATION_PDF_BYTES,
  randomToken,
  slugify,
} from '@/lib/platform';

export const runtime = 'edge';

async function makePreview(bytes: ArrayBuffer, requestedPages: number) {
  const source = await PDFDocument.load(bytes);
  const pageCount = source.getPageCount();
  if (pageCount < 1 || pageCount > 500) throw new Error('page_count');
  const previewPages = Math.min(Math.max(1, requestedPages), pageCount);
  const preview = await PDFDocument.create();
  const pages = await preview.copyPages(source, Array.from({ length: previewPages }, (_, index) => index));
  pages.forEach((page) => preview.addPage(page));
  preview.setTitle('Gajap Qalam — preview');
  preview.setProducer('Gajap Qalam digital reader');
  return { pageCount, previewPages, bytes: await preview.save() };
}

export async function GET(request: Request) {
  if (!isAdmin(request)) return json({ error: 'Требуется вход редактора.' }, { status: 403 });
  if (!env.DB) return json({ error: 'База данных недоступна.' }, { status: 503 });
  const publications = await env.DB.prepare(
    `SELECT id, slug, title, subtitle, author_label AS authorLabel, language,
      issue_label AS issueLabel, price_kzt AS priceKzt, preview_pages AS previewPages,
      page_count AS pageCount, status, featured, rights_confirmed AS rightsConfirmed,
      view_count AS viewCount, created_at AS createdAt
     FROM publications ORDER BY created_at DESC LIMIT 200`,
  ).all();
  const reviews = await env.DB.prepare(
    `SELECT r.id, r.display_name AS displayName, r.rating, r.body, r.created_at AS createdAt,
      p.title AS publicationTitle FROM publication_reviews r
     JOIN publications p ON p.id = r.publication_id
     WHERE r.status = 'pending' ORDER BY r.created_at ASC LIMIT 100`,
  ).all();
  return json({ publications: publications.results, reviews: reviews.results });
}

export async function POST(request: Request) {
  if (!isAdmin(request)) return json({ error: 'Требуется вход редактора.' }, { status: 403 });
  if (!env.DB || !env.BUCKET) return json({ error: 'Хранилище недоступно.' }, { status: 503 });
  try {
    const contentLength = Number(request.headers.get('content-length') ?? 0);
    if (contentLength > MAX_PUBLICATION_PDF_BYTES + MAX_PUBLICATION_COVER_BYTES + 1024 * 1024) {
      return json({ error: 'Общий размер загрузки превышает лимит.' }, { status: 413 });
    }
    const form = await request.formData();
    const title = cleanText(form.get('title'), 140);
    const subtitle = cleanText(form.get('subtitle'), 180);
    const description = cleanText(form.get('description'), 1600);
    const authorLabel = cleanText(form.get('authorLabel'), 120);
    const language = cleanText(form.get('language'), 40);
    const issueLabel = cleanText(form.get('issueLabel'), 80);
    const priceKzt = Number(form.get('priceKzt'));
    const requestedPreviewPages = Number(form.get('previewPages'));
    const status = cleanText(form.get('status'), 30);
    const rightsConfirmed = form.get('rightsConfirmed') === 'true';
    const file = form.get('file');
    const cover = form.get('cover');
    if (!title || !description || !authorLabel || !language) {
      return json({ error: 'Заполните название, описание, автора и язык.' }, { status: 400 });
    }
    if (!rightsConfirmed) {
      return json({ error: 'Сначала подтвердите права на коммерческое размещение.' }, { status: 400 });
    }
    if (!Number.isInteger(priceKzt) || priceKzt < 0 || priceKzt > 1_000_000) {
      return json({ error: 'Цена должна быть от 0 до 1 000 000 ₸.' }, { status: 400 });
    }
    if (!Number.isInteger(requestedPreviewPages) || requestedPreviewPages < 1 || requestedPreviewPages > 20) {
      return json({ error: 'Превью должно содержать от 1 до 20 страниц.' }, { status: 400 });
    }
    if (!['draft', 'coming_soon', 'published'].includes(status)) {
      return json({ error: 'Некорректный статус выпуска.' }, { status: 400 });
    }
    if (!(file instanceof File) || file.type !== 'application/pdf' || file.size < 100 || file.size > MAX_PUBLICATION_PDF_BYTES) {
      return json({ error: 'Загрузите PDF размером не более 25 МБ.' }, { status: 400 });
    }
    if (cover instanceof File && cover.size > 0 &&
      (!['image/jpeg', 'image/png', 'image/webp'].includes(cover.type) || cover.size > MAX_PUBLICATION_COVER_BYTES)) {
      return json({ error: 'Обложка должна быть JPG, PNG или WebP размером до 4 МБ.' }, { status: 400 });
    }
    const fullBytes = await file.arrayBuffer();
    if (new TextDecoder().decode(fullBytes.slice(0, 5)) !== '%PDF-') {
      return json({ error: 'Файл не похож на корректный PDF.' }, { status: 400 });
    }
    const preview = await makePreview(fullBytes, requestedPreviewPages);
    const id = `PUB-${randomToken(10)}`;
    const slug = `${slugify(title)}-${id.slice(-4).toLowerCase()}`;
    const extension = cover instanceof File && cover.size > 0 ? cover.type.split('/')[1].replace('jpeg', 'jpg') : null;
    const fullKey = `publications/${id}/full.pdf`;
    const previewKey = `publications/${id}/preview.pdf`;
    const coverKey = extension ? `publications/${id}/cover.${extension}` : null;
    await env.BUCKET.put(fullKey, fullBytes, { httpMetadata: { contentType: 'application/pdf', contentDisposition: 'inline' } });
    await env.BUCKET.put(previewKey, preview.bytes, { httpMetadata: { contentType: 'application/pdf', contentDisposition: 'inline' } });
    if (coverKey && cover instanceof File) {
      await env.BUCKET.put(coverKey, await cover.arrayBuffer(), { httpMetadata: { contentType: cover.type } });
    }
    const now = new Date().toISOString();
    try {
      await env.DB.prepare(
        `INSERT INTO publications (id, slug, title, subtitle, description, author_label, language,
          issue_label, full_key, preview_key, cover_key, price_kzt, preview_pages, page_count,
          status, featured, rights_confirmed, view_count, created_at, published_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 1, 0, ?, ?)`,
      ).bind(id, slug, title, subtitle || null, description, authorLabel, language, issueLabel || null,
        fullKey, previewKey, coverKey, priceKzt, preview.previewPages, preview.pageCount,
        status, now, status === 'published' ? now : null).run();
    } catch (error) {
      await env.BUCKET.delete(fullKey); await env.BUCKET.delete(previewKey); if (coverKey) await env.BUCKET.delete(coverKey);
      throw error;
    }
    return json({ ok: true, id, slug }, { status: 201 });
  } catch (error) {
    console.error('publication_create_failed', error);
    return json({ error: error instanceof Error && error.message === 'page_count' ? 'PDF должен содержать от 1 до 500 страниц.' : 'Не удалось создать выпуск.' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!isAdmin(request)) return json({ error: 'Требуется вход редактора.' }, { status: 403 });
  if (!env.DB || !env.BUCKET) return json({ error: 'Хранилище недоступно.' }, { status: 503 });
  const data = await request.json().catch(() => null) as Record<string, unknown> | null;
  const action = String(data?.action ?? 'publication');
  const id = String(data?.id ?? '');
  if (action === 'review') {
    const status = String(data?.status ?? '');
    if (!['approved', 'rejected'].includes(status)) return json({ error: 'Некорректный статус.' }, { status: 400 });
    await env.DB.prepare('UPDATE publication_reviews SET status = ? WHERE id = ?').bind(status, id).run();
    return json({ ok: true });
  }
  const status = String(data?.status ?? '');
  const priceKzt = Number(data?.priceKzt);
  const previewPages = Number(data?.previewPages);
  const issueLabel = cleanText(String(data?.issueLabel ?? ''), 80);
  const featured = Boolean(data?.featured);
  if (!['draft', 'coming_soon', 'published', 'archived'].includes(status)) return json({ error: 'Некорректный статус.' }, { status: 400 });
  if (!Number.isInteger(priceKzt) || priceKzt < 0 || priceKzt > 1_000_000) return json({ error: 'Некорректная цена.' }, { status: 400 });
  if (!Number.isInteger(previewPages) || previewPages < 1 || previewPages > 20) return json({ error: 'Некорректный объём превью.' }, { status: 400 });
  const publication = await env.DB.prepare(
    'SELECT full_key AS fullKey, preview_key AS previewKey, rights_confirmed AS rightsConfirmed FROM publications WHERE id = ? LIMIT 1',
  ).bind(id).first<{ fullKey: string; previewKey: string; rightsConfirmed: number }>();
  if (!publication) return json({ error: 'Выпуск не найден.' }, { status: 404 });
  if (status === 'published' && !publication.rightsConfirmed) return json({ error: 'Нет подтверждения коммерческих прав.' }, { status: 400 });
  const full = await env.BUCKET.get(publication.fullKey);
  if (!full) return json({ error: 'Исходный PDF не найден.' }, { status: 404 });
  const preview = await makePreview(await full.arrayBuffer(), previewPages);
  await env.BUCKET.put(publication.previewKey, preview.bytes, { httpMetadata: { contentType: 'application/pdf', contentDisposition: 'inline' } });
  await env.DB.prepare(
    `UPDATE publications SET status = ?, price_kzt = ?, preview_pages = ?, page_count = ?,
      issue_label = ?, featured = ?, published_at = CASE WHEN ? = 'published' THEN COALESCE(published_at, ?) ELSE published_at END
     WHERE id = ?`,
  ).bind(status, priceKzt, preview.previewPages, preview.pageCount, issueLabel || null,
    featured ? 1 : 0, status, new Date().toISOString(), id).run();
  return json({ ok: true });
}

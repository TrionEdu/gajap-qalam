import { env } from 'cloudflare:workers';
import { cleanText, json, randomToken, rateLimit } from '@/lib/platform';

export const runtime = 'edge';

export async function POST(request: Request, context: { params: Promise<{ slug: string }> }) {
  if (!env.DB) return json({ error: 'Отзывы временно недоступны.' }, { status: 503 });
  if (!(await rateLimit(request, 'publication-review', 5, 86400))) {
    return json({ error: 'Лимит отзывов на сегодня исчерпан.' }, { status: 429 });
  }
  const { slug } = await context.params;
  const data = await request.json().catch(() => null) as Record<string, unknown> | null;
  const displayName = cleanText(String(data?.displayName ?? ''), 60);
  const body = cleanText(String(data?.body ?? ''), 600);
  const rating = Number(data?.rating);
  if (cleanText(String(data?.website ?? ''), 100)) return json({ error: 'Некорректная форма.' }, { status: 400 });
  if (displayName.length < 2 || body.length < 10 || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return json({ error: 'Укажите имя, оценку и отзыв не короче 10 символов.' }, { status: 400 });
  }
  const publication = await env.DB.prepare(
    `SELECT id FROM publications WHERE slug = ? AND status = 'published' LIMIT 1`,
  ).bind(slug).first<{ id: string }>();
  if (!publication) return json({ error: 'Выпуск не найден.' }, { status: 404 });
  await env.DB.prepare(
    `INSERT INTO publication_reviews (id, publication_id, display_name, rating, body, status, created_at)
     VALUES (?, ?, ?, ?, ?, 'pending', ?)`,
  ).bind(`PREV-${randomToken(10)}`, publication.id, displayName, rating, body, new Date().toISOString()).run();
  return json({ ok: true, message: 'Спасибо. Отзыв появится после проверки модератором.' }, { status: 201 });
}

import { env } from 'cloudflare:workers';
import { cleanText, json, randomToken, rateLimit } from '@/lib/platform';

export const runtime = 'edge';

export async function POST(request: Request, context: { params: Promise<{ slug: string }> }) {
  if (!env.DB) return json({ error: 'Отзывы временно недоступны.' }, { status: 503 });
  if (!(await rateLimit(request, 'review', 5, 86400))) {
    return json({ error: 'Лимит отзывов на сегодня исчерпан.' }, { status: 429 });
  }
  const { slug } = await context.params;
  const data = await request.json().catch(() => null) as Record<string, unknown> | null;
  const displayName = cleanText(String(data?.displayName ?? ''), 60);
  const body = cleanText(String(data?.body ?? ''), 600);
  const rating = Number(data?.rating);
  const website = cleanText(String(data?.website ?? ''), 100);
  if (website) return json({ error: 'Некорректная форма.' }, { status: 400 });
  if (displayName.length < 2 || body.length < 10 || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return json({ error: 'Укажите имя, оценку и отзыв не короче 10 символов.' }, { status: 400 });
  }
  const work = await env.DB.prepare('SELECT id FROM works WHERE slug = ? LIMIT 1').bind(slug).first<{ id: string }>();
  if (!work) return json({ error: 'Работа не найдена.' }, { status: 404 });
  await env.DB.prepare(
    `INSERT INTO reviews (id, work_id, display_name, rating, body, status, created_at)
     VALUES (?, ?, ?, ?, ?, 'pending', ?)`,
  ).bind(`REV-${randomToken(10)}`, work.id, displayName, rating, body, new Date().toISOString()).run();
  return json({ ok: true, message: 'Спасибо. Отзыв появится после проверки модератором.' }, { status: 201 });
}

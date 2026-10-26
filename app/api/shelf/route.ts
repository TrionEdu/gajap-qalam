import { env } from 'cloudflare:workers';
import { chatGPTSignInPath } from '@/app/chatgpt-auth';
import { getReaderAccess, json, requestUserId } from '@/lib/platform';

export const runtime = 'edge';

export async function GET(request: Request) {
  const userId = requestUserId(request);
  if (!userId) {
    return json({ error: 'Войдите, чтобы открыть полку.', signInPath: chatGPTSignInPath('/shelf') }, { status: 401 });
  }
  if (!env.DB) return json({ error: 'Полка временно недоступна.' }, { status: 503 });
  const result = await env.DB.prepare(
    `SELECT p.slug, p.title, p.subtitle, p.author_label AS authorLabel, p.issue_label AS issueLabel,
      p.cover_key AS coverKey, p.page_count AS pageCount, p.price_kzt AS priceKzt,
      pr.page AS savedPage, o.purchased_at AS purchasedAt
     FROM purchases o JOIN publications p ON p.id = o.publication_id
     LEFT JOIN reading_progress pr ON pr.publication_id = p.id AND pr.user_id = o.user_id
     WHERE o.user_id = ? AND o.status = 'active' AND p.status = 'published'
     ORDER BY o.purchased_at DESC`,
  ).bind(userId).all();
  return json({ items: result.results });
}

export async function PATCH(request: Request) {
  const userId = requestUserId(request);
  if (!userId) return json({ error: 'Требуется вход.' }, { status: 401 });
  if (!env.DB) return json({ error: 'Прогресс временно недоступен.' }, { status: 503 });
  const data = await request.json().catch(() => null) as Record<string, unknown> | null;
  const slug = String(data?.slug ?? '').slice(0, 80);
  const page = Number(data?.page);
  if (!slug || !Number.isInteger(page) || page < 1 || page > 10000) {
    return json({ error: 'Некорректный прогресс.' }, { status: 400 });
  }
  const publication = await env.DB.prepare(
    `SELECT id, price_kzt AS priceKzt, status, page_count AS pageCount
     FROM publications WHERE slug = ? LIMIT 1`,
  ).bind(slug).first<{ id: string; priceKzt: number; status: string; pageCount: number }>();
  if (!publication) return json({ error: 'Выпуск не найден.' }, { status: 404 });
  const { access } = await getReaderAccess(request, publication);
  if (access !== 'full') return json({ error: 'Полная версия недоступна.' }, { status: 403 });
  const safePage = Math.min(page, publication.pageCount);
  await env.DB.prepare(
    `INSERT INTO reading_progress (user_id, publication_id, page, updated_at) VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, publication_id) DO UPDATE SET page = excluded.page, updated_at = excluded.updated_at`,
  ).bind(userId, publication.id, safePage, new Date().toISOString()).run();
  return json({ ok: true, page: safePage });
}

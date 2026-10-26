import { env } from 'cloudflare:workers';
import { json } from '@/lib/platform';

export const runtime = 'edge';

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  if (!env.DB) return json({ error: 'Каталог недоступен.' }, { status: 503 });
  const { slug } = await context.params;
  const work = await env.DB.prepare(
    `SELECT id, slug, title, author_name AS authorName, age_group AS ageGroup, direction,
      language, summary, cover_key AS coverKey, view_count AS viewCount, published_at AS publishedAt
     FROM works WHERE slug = ? LIMIT 1`,
  ).bind(slug).first<Record<string, unknown>>();
  if (!work) return json({ error: 'Работа не найдена.' }, { status: 404 });
  await env.DB.prepare('UPDATE works SET view_count = view_count + 1 WHERE slug = ?').bind(slug).run();
  const reviews = await env.DB.prepare(
    `SELECT display_name AS displayName, rating, body, created_at AS createdAt
     FROM reviews WHERE work_id = ? AND status = 'approved' ORDER BY created_at DESC LIMIT 50`,
  ).bind(work.id).all();
  return json({ work: { ...work, viewCount: Number(work.viewCount ?? 0) + 1 }, reviews: reviews.results });
}

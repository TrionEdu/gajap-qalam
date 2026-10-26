import { env } from 'cloudflare:workers';
import { getReaderAccess, json } from '@/lib/platform';

export const runtime = 'edge';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  if (!env.DB) return json({ error: 'Каталог недоступен.' }, { status: 503 });
  const { slug } = await context.params;
  const publication = await env.DB.prepare(
    `SELECT id, slug, title, subtitle, description, author_label AS authorLabel, language,
      issue_label AS issueLabel, cover_key AS coverKey, price_kzt AS priceKzt,
      preview_pages AS previewPages, page_count AS pageCount, status,
      view_count AS viewCount, published_at AS publishedAt
     FROM publications WHERE slug = ? AND status IN ('published', 'coming_soon') LIMIT 1`,
  ).bind(slug).first<Record<string, unknown>>();
  if (!publication) return json({ error: 'Выпуск не найден.' }, { status: 404 });
  const access = await getReaderAccess(request, {
    id: String(publication.id),
    priceKzt: Number(publication.priceKzt),
    status: String(publication.status),
  });
  let savedPage = 1;
  if (access.userId) {
    const progress = await env.DB.prepare(
      'SELECT page FROM reading_progress WHERE user_id = ? AND publication_id = ? LIMIT 1',
    ).bind(access.userId, publication.id).first<{ page: number }>();
    savedPage = Math.max(1, Number(progress?.page ?? 1));
  }
  await env.DB.prepare('UPDATE publications SET view_count = view_count + 1 WHERE id = ?')
    .bind(publication.id).run();
  const reviews = await env.DB.prepare(
    `SELECT display_name AS displayName, rating, body, created_at AS createdAt
     FROM publication_reviews WHERE publication_id = ? AND status = 'approved'
     ORDER BY created_at DESC LIMIT 50`,
  ).bind(publication.id).all();
  return json({
    publication: { ...publication, viewCount: Number(publication.viewCount ?? 0) + 1 },
    access: access.access,
    savedPage,
    reviews: reviews.results,
  });
}

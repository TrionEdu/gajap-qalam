import { env } from 'cloudflare:workers';
import { json } from '@/lib/platform';

export const runtime = 'edge';

export async function GET(request: Request) {
  if (!env.DB) return json({ works: [] });
  const url = new URL(request.url);
  const direction = url.searchParams.get('direction');
  const language = url.searchParams.get('language');
  const query = (url.searchParams.get('q') ?? '').trim().slice(0, 80);
  const clauses: string[] = [];
  const values: string[] = [];
  if (direction) { clauses.push('direction = ?'); values.push(direction); }
  if (language) { clauses.push('language = ?'); values.push(language); }
  if (query) { clauses.push('(title LIKE ? OR author_name LIKE ? OR summary LIKE ?)'); values.push(`%${query}%`, `%${query}%`, `%${query}%`); }
  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const result = await env.DB.prepare(
    `SELECT w.id, w.slug, w.title, w.author_name AS authorName, w.city, w.age_group AS ageGroup,
      w.direction, w.language, w.summary, w.cover_key AS coverKey, w.featured,
      w.view_count AS viewCount, w.published_at AS publishedAt,
      COALESCE(AVG(CASE WHEN r.status = 'approved' THEN r.rating END), 0) AS rating,
      COUNT(CASE WHEN r.status = 'approved' THEN 1 END) AS reviewCount
     FROM works w LEFT JOIN reviews r ON r.work_id = w.id
     ${where} GROUP BY w.id ORDER BY w.featured DESC, w.published_at DESC LIMIT 60`,
  ).bind(...values).all();
  return json({ works: result.results }, { headers: { 'Cache-Control': 'public, max-age=60' } });
}

import { env } from 'cloudflare:workers';
import { json } from '@/lib/platform';

export const runtime = 'edge';

export async function GET(request: Request) {
  if (!env.DB) return json({ publications: [] });
  const url = new URL(request.url);
  const query = (url.searchParams.get('q') ?? '').trim().slice(0, 80);
  const language = (url.searchParams.get('language') ?? '').trim().slice(0, 30);
  const availability = (url.searchParams.get('availability') ?? '').trim();
  const clauses = [`p.status IN ('published', 'coming_soon')`];
  const values: Array<string | number> = [];
  if (query) {
    clauses.push('(p.title LIKE ? OR p.subtitle LIKE ? OR p.description LIKE ? OR p.author_label LIKE ?)');
    values.push(`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`);
  }
  if (language) { clauses.push('p.language = ?'); values.push(language); }
  if (availability === 'free') clauses.push("p.status = 'published' AND p.price_kzt = 0");
  if (availability === 'paid') clauses.push("p.status = 'published' AND p.price_kzt > 0");
  if (availability === 'soon') clauses.push("p.status = 'coming_soon'");
  const result = await env.DB.prepare(
    `SELECT p.id, p.slug, p.title, p.subtitle, p.description, p.author_label AS authorLabel,
      p.language, p.issue_label AS issueLabel, p.cover_key AS coverKey, p.price_kzt AS priceKzt,
      p.preview_pages AS previewPages, p.page_count AS pageCount, p.status, p.featured,
      p.view_count AS viewCount,
      COALESCE(AVG(CASE WHEN r.status = 'approved' THEN r.rating END), 0) AS rating,
      COUNT(CASE WHEN r.status = 'approved' THEN 1 END) AS reviewCount
     FROM publications p LEFT JOIN publication_reviews r ON r.publication_id = p.id
     WHERE ${clauses.join(' AND ')} GROUP BY p.id
     ORDER BY p.featured DESC, COALESCE(p.published_at, p.created_at) DESC LIMIT 60`,
  ).bind(...values).all();
  return json({ publications: result.results }, { headers: { 'Cache-Control': 'public, max-age=60' } });
}

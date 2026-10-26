import { env } from 'cloudflare:workers';
import { getReaderAccess } from '@/lib/platform';

export const runtime = 'edge';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  if (!env.DB || !env.BUCKET) return new Response(null, { status: 404 });
  const { slug } = await context.params;
  const publication = await env.DB.prepare(
    `SELECT id, full_key AS fullKey, preview_key AS previewKey, price_kzt AS priceKzt,
      status, preview_pages AS previewPages
     FROM publications WHERE slug = ? AND status IN ('published', 'coming_soon') LIMIT 1`,
  ).bind(slug).first<{ id: string; fullKey: string; previewKey: string; priceKzt: number; status: string; previewPages: number }>();
  if (!publication) return new Response(null, { status: 404 });
  const { access } = await getReaderAccess(request, publication);
  const object = await env.BUCKET.get(access === 'full' ? publication.fullKey : publication.previewKey);
  if (!object) return new Response(null, { status: 404 });
  return new Response(object.body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="gajap-qalam-${access}.pdf"`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'",
      'X-Gajap-Reader-Access': access,
      'X-Gajap-Preview-Pages': String(publication.previewPages),
    },
  });
}

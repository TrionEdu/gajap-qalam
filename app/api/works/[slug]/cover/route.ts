import { env } from 'cloudflare:workers';

export const runtime = 'edge';

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  if (!env.DB || !env.BUCKET) return new Response(null, { status: 404 });
  const { slug } = await context.params;
  const row = await env.DB.prepare('SELECT cover_key AS coverKey FROM works WHERE slug = ? LIMIT 1').bind(slug).first<{ coverKey: string | null }>();
  if (!row?.coverKey) return new Response(null, { status: 404 });
  const object = await env.BUCKET.get(row.coverKey);
  if (!object) return new Response(null, { status: 404 });
  return new Response(object.body, {
    headers: {
      'Content-Type': object.httpMetadata?.contentType ?? 'image/webp',
      'Cache-Control': 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

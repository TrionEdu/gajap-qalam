import { env } from 'cloudflare:workers';

export const runtime = 'edge';

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  if (!env.DB || !env.BUCKET) return new Response(null, { status: 404 });
  const { slug } = await context.params;
  const row = await env.DB.prepare('SELECT file_key AS fileKey FROM works WHERE slug = ? LIMIT 1').bind(slug).first<{ fileKey: string }>();
  if (!row?.fileKey) return new Response(null, { status: 404 });
  const object = await env.BUCKET.get(row.fileKey);
  if (!object) return new Response(null, { status: 404 });
  return new Response(object.body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="gajap-qalam-reader.pdf"',
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'",
    },
  });
}

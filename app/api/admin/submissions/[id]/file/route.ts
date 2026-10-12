import { env } from 'cloudflare:workers';
import { isAdmin } from '@/lib/platform';

export const runtime = 'edge';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) return new Response('Forbidden', { status: 403 });
  if (!env.DB || !env.BUCKET) return new Response('Unavailable', { status: 503 });
  const { id } = await context.params;
  const row = await env.DB.prepare('SELECT file_key AS fileKey, file_name AS fileName FROM submissions WHERE id = ? LIMIT 1').bind(id).first<{ fileKey: string; fileName: string }>();
  if (!row) return new Response('Not found', { status: 404 });
  const object = await env.BUCKET.get(row.fileKey);
  if (!object) return new Response('Not found', { status: 404 });
  return new Response(object.body, { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `inline; filename="${row.fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}"`, 'Cache-Control': 'private, no-store' } });
}

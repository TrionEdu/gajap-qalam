import { env } from 'cloudflare:workers';
import { json, sha256, STATUS_LABELS } from '@/lib/platform';

export const runtime = 'edge';

export async function GET(request: Request) {
  if (!env.DB) return json({ error: 'База данных недоступна.' }, { status: 503 });
  const url = new URL(request.url);
  const id = (url.searchParams.get('id') ?? '').trim().toUpperCase();
  const code = (url.searchParams.get('code') ?? '').trim().toUpperCase();
  if (!/^GQ26-[A-Z0-9]{8}$/.test(id) || !/^[A-Z0-9]{8}$/.test(code)) {
    return json({ error: 'Проверьте номер заявки и код.' }, { status: 400 });
  }
  const row = await env.DB.prepare(
    `SELECT id, title, status, correction_note, created_at FROM submissions
     WHERE id = ? AND status_code_hash = ? LIMIT 1`,
  ).bind(id, await sha256(code)).first<Record<string, string | null>>();
  if (!row) return json({ error: 'Заявка не найдена.' }, { status: 404 });
  return json({
    id: row.id,
    title: row.title,
    status: row.status,
    statusLabel: STATUS_LABELS[row.status ?? ''] ?? row.status,
    correctionNote: row.correction_note,
    createdAt: row.created_at,
  });
}

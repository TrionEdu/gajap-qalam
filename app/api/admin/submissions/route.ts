import { env } from 'cloudflare:workers';
import { isAdmin, json, slugify } from '@/lib/platform';

export const runtime = 'edge';

export async function GET(request: Request) {
  if (!isAdmin(request)) return json({ error: 'Требуется вход редактора.' }, { status: 403 });
  if (!env.DB) return json({ error: 'База данных недоступна.' }, { status: 503 });
  const submissions = await env.DB.prepare(
    `SELECT id, status, title, participant_name AS participantName, pen_name AS penName, age, city,
      school, direction, language, summary, parent_name AS parentName, parent_email AS parentEmail,
      parent_phone AS parentPhone, mentor, consent_publication AS consentPublication,
      file_name AS fileName, file_size AS fileSize, cover_key AS coverKey,
      correction_note AS correctionNote, created_at AS createdAt
     FROM submissions ORDER BY created_at DESC LIMIT 250`,
  ).all();
  const reviews = await env.DB.prepare(
    `SELECT r.id, r.display_name AS displayName, r.rating, r.body, r.created_at AS createdAt,
      w.title AS workTitle FROM reviews r JOIN works w ON w.id = r.work_id
     WHERE r.status = 'pending' ORDER BY r.created_at ASC LIMIT 100`,
  ).all();
  return json({ submissions: submissions.results, reviews: reviews.results });
}

export async function PATCH(request: Request) {
  if (!isAdmin(request)) return json({ error: 'Требуется вход редактора.' }, { status: 403 });
  if (!env.DB) return json({ error: 'База данных недоступна.' }, { status: 503 });
  const data = await request.json().catch(() => null) as Record<string, unknown> | null;
  const id = String(data?.id ?? '');
  const action = String(data?.action ?? '');
  if (action === 'review') {
    const status = String(data?.status ?? '');
    if (!['approved', 'rejected'].includes(status)) return json({ error: 'Некорректный статус.' }, { status: 400 });
    await env.DB.prepare('UPDATE reviews SET status = ? WHERE id = ?').bind(status, id).run();
    return json({ ok: true });
  }
  const status = String(data?.status ?? '');
  const correctionNote = String(data?.correctionNote ?? '').trim().slice(0, 800);
  if (!['received', 'review', 'correction', 'accepted', 'finalist', 'published', 'declined'].includes(status)) {
    return json({ error: 'Некорректный статус.' }, { status: 400 });
  }
  const row = await env.DB.prepare('SELECT * FROM submissions WHERE id = ? LIMIT 1').bind(id).first<Record<string, unknown>>();
  if (!row) return json({ error: 'Заявка не найдена.' }, { status: 404 });
  if (status === 'published') {
    if (!row.consent_publication) return json({ error: 'Нет отдельного согласия на публичную публикацию.' }, { status: 400 });
    const baseSlug = slugify(String(row.title));
    const slug = `${baseSlug}-${id.slice(-4).toLowerCase()}`;
    const author = String(row.pen_name || row.participant_name).slice(0, 80);
    const age = Number(row.age);
    await env.DB.prepare(
      `INSERT INTO works (id, submission_id, slug, title, author_name, city, age_group, direction,
        language, summary, file_key, cover_key, featured, view_count, published_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, ?)
       ON CONFLICT(submission_id) DO UPDATE SET title = excluded.title, author_name = excluded.author_name,
        summary = excluded.summary, cover_key = excluded.cover_key, published_at = excluded.published_at`,
    ).bind(`WORK-${id}`, id, slug, row.title, author, row.city, `${age} лет`, row.direction,
      row.language, row.summary, row.file_key, row.cover_key, new Date().toISOString()).run();
  }
  await env.DB.prepare(
    'UPDATE submissions SET status = ?, correction_note = ?, updated_at = ? WHERE id = ?',
  ).bind(status, correctionNote || null, new Date().toISOString(), id).run();
  return json({ ok: true });
}

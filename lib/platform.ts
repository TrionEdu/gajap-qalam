import { env } from 'cloudflare:workers';
export * from './platform-shared';

export function json(data: unknown, init: ResponseInit = {}) {
  return Response.json(data, {
    ...init,
    headers: { 'Cache-Control': 'no-store', ...init.headers },
  });
}

export function randomToken(length = 10) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('');
}

export async function sha256(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function cleanText(value: FormDataEntryValue | null, max = 240) {
  return String(value ?? '').replace(/[<>]/g, '').trim().slice(0, max);
}

export function slugify(value: string) {
  const base = value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9а-яёқғңүұіәөһ\s-]/gi, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 64);
  return base || `work-${randomToken(6).toLowerCase()}`;
}

export async function rateLimit(request: Request, scope: string, limit: number, windowSeconds: number) {
  if (!env.DB) throw new Error('D1 binding DB is not configured');
  const ip = request.headers.get('cf-connecting-ip') ?? 'local';
  const salt = env.RATE_LIMIT_SALT ?? 'local-preview';
  const identity = await sha256(`${salt}:${ip}`);
  const now = Math.floor(Date.now() / 1000);
  const bucket = Math.floor(now / windowSeconds);
  const key = `${scope}:${identity}:${bucket}`;
  const row = await env.DB.prepare(
    `INSERT INTO rate_limits (key, count, expires_at) VALUES (?, 1, ?)
     ON CONFLICT(key) DO UPDATE SET count = count + 1
     RETURNING count`,
  ).bind(key, now + windowSeconds).first<{ count: number }>();
  return (row?.count ?? 1) <= limit;
}

export function isAdmin(request: Request) {
  const email = request.headers.get('oai-authenticated-user-email')?.toLowerCase();
  return Boolean(email && env.ADMIN_EMAIL && email === env.ADMIN_EMAIL.toLowerCase());
}

export async function notifySubmission(input: {
  id: string;
  title: string;
  parentEmail: string;
  participantName: string;
}) {
  if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL) return false;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Ғажап Қалам <noreply@gajapqalam.kz>',
      to: [env.NOTIFY_EMAIL],
      subject: `Новая заявка ${input.id}: ${input.title}`,
      text: `Участник: ${input.participantName}\nКонтакт: ${input.parentEmail}\nОткройте редакционную панель: https://gajapqalam.kz/admin`,
    }),
  });
  return response.ok;
}

import { getBindings } from '@/db';
import {
  cleanText,
  DIRECTIONS,
  json,
  LANGUAGES,
  MAX_COVER_BYTES,
  MAX_PDF_BYTES,
  notifySubmission,
  randomToken,
  rateLimit,
  sha256,
} from '@/lib/platform';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get('content-length') ?? 0);
    if (contentLength > MAX_PDF_BYTES + MAX_COVER_BYTES + 1024 * 1024) {
      return json({ error: 'Общий размер загрузки превышает лимит.' }, { status: 413 });
    }
    if (!(await rateLimit(request, 'submission', 3, 86400))) {
      return json({ error: 'С этого подключения уже отправлено несколько заявок. Попробуйте завтра.' }, { status: 429 });
    }

    const form = await request.formData();
    if (cleanText(form.get('website'))) return json({ error: 'Некорректная форма.' }, { status: 400 });

    const title = cleanText(form.get('title'), 120);
    const participantName = cleanText(form.get('participantName'), 100);
    const penName = cleanText(form.get('penName'), 80);
    const age = Number(form.get('age'));
    const city = cleanText(form.get('city'), 80);
    const school = cleanText(form.get('school'), 120);
    const direction = cleanText(form.get('direction'), 100);
    const language = cleanText(form.get('language'), 30);
    const summary = cleanText(form.get('summary'), 1200);
    const parentName = cleanText(form.get('parentName'), 100);
    const parentEmail = cleanText(form.get('parentEmail'), 160).toLowerCase();
    const parentPhone = cleanText(form.get('parentPhone'), 50);
    const mentor = cleanText(form.get('mentor'), 100);
    const consentProcessing = form.get('consentProcessing') === 'true';
    const consentPublication = form.get('consentPublication') === 'true';
    const file = form.get('work');
    const cover = form.get('cover');

    if (!title || !participantName || !city || !school || !summary || !parentName || !parentPhone) {
      return json({ error: 'Заполните все обязательные поля.' }, { status: 400 });
    }
    if (!Number.isInteger(age) || age < 10 || age > 17) {
      return json({ error: 'Возраст участника должен быть от 10 до 17 лет.' }, { status: 400 });
    }
    if (!DIRECTIONS.includes(direction as (typeof DIRECTIONS)[number]) || !LANGUAGES.includes(language as (typeof LANGUAGES)[number])) {
      return json({ error: 'Выберите направление и язык из списка.' }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(parentEmail)) {
      return json({ error: 'Укажите корректную почту родителя.' }, { status: 400 });
    }
    if (!consentProcessing) {
      return json({ error: 'Для подачи заявки необходимо согласие на обработку данных.' }, { status: 400 });
    }
    if (!(file instanceof File) || file.type !== 'application/pdf' || file.size < 100 || file.size > MAX_PDF_BYTES) {
      return json({ error: 'Загрузите PDF размером не более 20 МБ.' }, { status: 400 });
    }
    if (cover instanceof File && cover.size > 0) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(cover.type) || cover.size > MAX_COVER_BYTES) {
        return json({ error: 'Обложка должна быть JPG, PNG или WebP размером до 2 МБ.' }, { status: 400 });
      }
    }

    const fileBytes = await file.arrayBuffer();
    const signature = new TextDecoder().decode(fileBytes.slice(0, 5));
    if (signature !== '%PDF-') return json({ error: 'Файл не похож на корректный PDF.' }, { status: 400 });

    const id = `GQ26-${randomToken(8)}`;
    const statusCode = randomToken(8);
    const now = new Date().toISOString();
    const fileKey = `submissions/${id}/original.pdf`;
    const coverKey = cover instanceof File && cover.size > 0 ? `submissions/${id}/cover.${cover.type.split('/')[1]}` : null;
    const { db, bucket } = getBindings();

    await bucket.put(fileKey, fileBytes, {
      httpMetadata: { contentType: 'application/pdf', contentDisposition: 'inline' },
      customMetadata: { submissionId: id },
    });
    if (coverKey && cover instanceof File) {
      await bucket.put(coverKey, await cover.arrayBuffer(), {
        httpMetadata: { contentType: cover.type },
        customMetadata: { submissionId: id },
      });
    }

    try {
      await db.prepare(
        `INSERT INTO submissions (
          id, status_code_hash, status, title, participant_name, pen_name, age, city, school,
          direction, language, summary, parent_name, parent_email, parent_phone, mentor,
          consent_processing, consent_publication, file_key, file_name, file_size, cover_key,
          created_at, updated_at
        ) VALUES (?, ?, 'received', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?)`,
      ).bind(
        id, await sha256(statusCode), title, participantName, penName || null, age, city, school,
        direction, language, summary, parentName, parentEmail, parentPhone, mentor || null,
        consentPublication ? 1 : 0, fileKey, file.name.slice(0, 180), file.size, coverKey, now, now,
      ).run();
    } catch (error) {
      await bucket.delete(fileKey);
      if (coverKey) await bucket.delete(coverKey);
      throw error;
    }

    await notifySubmission({ id, title, parentEmail, participantName }).catch(() => false);
    return json({ id, statusCode, status: 'received' }, { status: 201 });
  } catch (error) {
    console.error('submission_failed', error);
    return json({ error: 'Не удалось сохранить заявку. Попробуйте ещё раз.' }, { status: 500 });
  }
}

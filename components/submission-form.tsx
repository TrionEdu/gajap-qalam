'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, FileText, ImageIcon, ShieldCheck, UploadCloud } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import { DIRECTIONS, LANGUAGES, MAX_COVER_BYTES, MAX_PDF_BYTES } from '@/lib/platform-shared';

type Result = { id: string; statusCode: string };

function sizeLabel(bytes: number) { return `${(bytes / 1024 / 1024).toFixed(1)} МБ`; }

export function SubmissionForm() {
  const [work, setWork] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const workError = useMemo(() => {
    if (!work) return '';
    if (work.type !== 'application/pdf') return 'Нужен файл PDF.';
    if (work.size > MAX_PDF_BYTES) return 'PDF превышает 20 МБ.';
    return '';
  }, [work]);
  const coverError = useMemo(() => {
    if (!cover) return '';
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(cover.type)) return 'Обложка должна быть JPG, PNG или WebP.';
    if (cover.size > MAX_COVER_BYTES) return 'Обложка превышает 2 МБ.';
    return '';
  }, [cover]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    if (!work || workError || coverError) { setError(workError || coverError || 'Добавьте PDF с работой.'); return; }
    setBusy(true);
    const data = new FormData(event.currentTarget);
    data.set('work', work);
    if (cover) data.set('cover', cover);
    data.set('consentProcessing', data.get('consentProcessing') ? 'true' : 'false');
    data.set('consentPublication', data.get('consentPublication') ? 'true' : 'false');
    try {
      const response = await fetch('/api/submissions', { method: 'POST', body: data });
      const payload = await response.json() as Result & { error?: string };
      if (!response.ok) throw new Error(payload.error || 'Не удалось отправить заявку.');
      setResult(payload);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Не удалось отправить заявку.');
    } finally { setBusy(false); }
  }

  if (result) return (
    <section className="submission-success" aria-live="polite">
      <CheckCircle2 aria-hidden="true" />
      <p className="eyebrow">Заявка сохранена</p>
      <h1>Работа принята системой</h1>
      <p>Сохраните номер и код. Они понадобятся для проверки статуса и исправлений.</p>
      <div className="receipt-grid"><div><span>Номер заявки</span><strong>{result.id}</strong></div><div><span>Код статуса</span><strong>{result.statusCode}</strong></div></div>
      <p className="privacy-note">Код показывается только сейчас. Не публикуйте его и не отправляйте посторонним.</p>
      <Link className="button button-primary" href={`/status?id=${encodeURIComponent(result.id)}`}>Проверить статус <ArrowRight /></Link>
    </section>
  );

  return (
    <form className="platform-form" onSubmit={submit}>
      <div className="form-section-title"><span>01</span><div><h2>Об участнике</h2><p>Мы не показываем эти данные публично.</p></div></div>
      <div className="form-row"><label>Имя и фамилия<input name="participantName" autoComplete="name" required maxLength={100} /></label><label>Псевдоним <small>необязательно</small><input name="penName" maxLength={80} /></label></div>
      <div className="form-row"><label>Возраст<input name="age" type="number" min="10" max="17" required /></label><label>Город<input name="city" required maxLength={80} /></label></div>
      <label>Школа / лицей / колледж<input name="school" required maxLength={120} /></label>
      <label>Учитель-наставник <small>необязательно</small><input name="mentor" maxLength={100} /></label>

      <div className="form-section-title"><span>02</span><div><h2>О работе</h2><p>Эти сведения попадут в карточку только после отбора.</p></div></div>
      <label>Название работы<input name="title" required maxLength={120} /></label>
      <div className="form-row"><label>Направление<select name="direction" required defaultValue=""><option value="" disabled>Выберите направление</option>{DIRECTIONS.map((item) => <option key={item}>{item}</option>)}</select></label><label>Язык<select name="language" required defaultValue=""><option value="" disabled>Выберите язык</option>{LANGUAGES.map((item) => <option key={item}>{item}</option>)}</select></label></div>
      <label>Короткое описание<textarea name="summary" required minLength={40} maxLength={1200} rows={5} placeholder="О чём история, кто её герой и что поставлено на карту?" /></label>

      <div className="form-section-title"><span>03</span><div><h2>Файлы</h2><p>PDF до 20 МБ и отдельная обложка до 2 МБ.</p></div></div>
      <div className="upload-grid">
        <label className={`upload-field${workError ? ' invalid' : ''}`}><FileText /><strong>{work ? work.name : 'Работа в PDF'}</strong><span>{work ? sizeLabel(work.size) : 'Обязательно, до 20 МБ'}</span><input type="file" accept="application/pdf,.pdf" onChange={(event) => setWork(event.target.files?.[0] ?? null)} required />{workError && <em>{workError}</em>}</label>
        <label className={`upload-field${coverError ? ' invalid' : ''}`}><ImageIcon /><strong>{cover ? cover.name : 'Обложка'}</strong><span>{cover ? sizeLabel(cover.size) : 'JPG, PNG или WebP, до 2 МБ'}</span><input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setCover(event.target.files?.[0] ?? null)} />{coverError && <em>{coverError}</em>}</label>
      </div>
      <div className="file-standard"><ShieldCheck /><div><strong>Автоматическая проверка до отправки</strong><p>Формат, размер и сигнатура PDF проверяются сервером. Исходник хранится закрыто и не появляется в библиотеке без решения редакции и отдельного согласия.</p></div></div>

      <div className="form-section-title"><span>04</span><div><h2>Контакт родителя</h2><p>Для участника младше 18 лет согласие обязательно.</p></div></div>
      <label>Имя родителя или законного представителя<input name="parentName" required maxLength={100} /></label>
      <div className="form-row"><label>Электронная почта<input name="parentEmail" type="email" autoComplete="email" required /></label><label>Телефон / Telegram<input name="parentPhone" autoComplete="tel" required maxLength={50} /></label></div>
      <label className="hidden-honeypot" aria-hidden="true">Ваш сайт<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label className="consent-row"><input name="consentProcessing" type="checkbox" required /><span>Я подтверждаю согласие родителя или законного представителя на обработку данных для организации турнира и ознакомился(-ась) с <Link href="/privacy">условиями конфиденциальности</Link>.</span></label>
      <label className="consent-row"><input name="consentPublication" type="checkbox" /><span>Разрешаю публикацию выбранной редакцией работы под указанным именем или псевдонимом. Это согласие можно отозвать.</span></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button button-primary submit-button" type="submit" disabled={busy}>{busy ? 'Загружаем…' : <><UploadCloud /> Отправить работу</>}</button>
      <p className="form-note">Не закрывайте страницу во время загрузки. После успешной отправки появятся номер заявки и код статуса.</p>
    </form>
  );
}

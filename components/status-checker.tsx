'use client';

import { Search, ShieldCheck } from 'lucide-react';
import { FormEvent, useState } from 'react';

type StatusResult = { id: string; title: string; status: string; statusLabel: string; correctionNote?: string | null; createdAt: string };

export function StatusChecker({ initialId = '' }: { initialId?: string }) {
  const [id, setId] = useState(initialId); const [code, setCode] = useState('');
  const [result, setResult] = useState<StatusResult | null>(null); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  async function check(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setResult(null);
    try { const response = await fetch(`/api/status?id=${encodeURIComponent(id)}&code=${encodeURIComponent(code)}`); const payload = await response.json() as StatusResult & { error?: string }; if (!response.ok) throw new Error(payload.error || 'Заявка не найдена.'); setResult(payload); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Заявка не найдена.'); }
    finally { setBusy(false); }
  }
  return <div className="status-tool">
    <form onSubmit={check} className="status-form"><label>Номер заявки<input value={id} onChange={(e) => setId(e.target.value.toUpperCase())} placeholder="GQ26-XXXXXXXX" required /></label><label>Код статуса<input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="XXXXXXXX" required /></label><button className="button button-primary" disabled={busy}><Search />{busy ? 'Проверяем…' : 'Проверить'}</button></form>
    {error && <p className="form-error" role="alert">{error}</p>}
    {result && <article className="status-result" aria-live="polite"><div className={`status-badge status-${result.status}`}>{result.statusLabel}</div><p>{result.id}</p><h2>{result.title}</h2><span>Заявка зарегистрирована {new Date(result.createdAt).toLocaleDateString('ru-RU')}</span>{result.correctionNote && <div className="correction-note"><strong>Что нужно исправить</strong><p>{result.correctionNote}</p></div>}</article>}
    <div className="privacy-strip"><ShieldCheck /><p>Статус доступен только по номеру и коду. Мы не публикуем списки участников и контактные данные.</p></div>
  </div>;
}

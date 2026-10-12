import { Check, FileCheck2, ScanSearch, ShieldCheck } from 'lucide-react';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { SubmissionForm } from '@/components/submission-form';

export const metadata = { title: 'Подать работу | Gajap Qalam' };

export default function SubmitPage() {
  return <main><SiteHeader />
    <section className="page-intro submit-intro"><p className="eyebrow">Подача работы</p><h1>Одна понятная форма.<br />Никаких тяжёлых писем.</h1><p>Файл попадёт в закрытое хранилище, а редакция получит заявку в единой системе.</p></section>
    <section className="submission-layout section">
      <aside className="submission-guide">
        <p className="eyebrow">Стандарт файла</p><h2>Проверьте перед загрузкой</h2>
        <ul><li><Check /> PDF, не более 20 МБ</li><li><Check /> RGB/sRGB, без меток реза</li><li><Check /> Все шрифты встроены</li><li><Check /> Страницы идут в порядке чтения</li><li><Check /> Обложка отдельно, до 2 МБ</li></ul>
        <div className="guide-step"><FileCheck2 /><div><strong>Комикс и манга</strong><span>One-shot 4–10 страниц или законченный веб-стрип.</span></div></div>
        <div className="guide-step"><ScanSearch /><div><strong>Сценарий</strong><span>Титульный лист, логлайн, синопсис и основной текст.</span></div></div>
        <div className="guide-step"><ShieldCheck /><div><strong>Приватность</strong><span>Не помещайте в работу адрес, телефон и другие личные данные ребёнка.</span></div></div>
      </aside>
      <SubmissionForm />
    </section><SiteFooter /></main>;
}

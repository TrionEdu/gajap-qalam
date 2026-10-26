import { LibraryClient } from '@/components/library-client';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';

export const metadata = { title: 'Работы участников | Gajap Qalam' };
export default function LibraryPage() { return <main><SiteHeader /><section className="page-intro library-intro"><p className="eyebrow">Бесплатная библиотека</p><h1>Истории нового поколения</h1><p>Отобранные работы участников публикуются только с отдельного согласия. Коммерческие журналы находятся в разделе «Журналы».</p></section><section className="section library-section"><LibraryClient /></section><SiteFooter /></main>; }

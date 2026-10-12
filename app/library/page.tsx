import { LibraryClient } from '@/components/library-client';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';

export const metadata = { title: 'Библиотека | Gajap Qalam' };
export default function LibraryPage() { return <main><SiteHeader /><section className="page-intro library-intro"><p className="eyebrow">Читать онлайн</p><h1>Истории нового поколения</h1><p>Комиксы, сценарии и визуальные миры участников. Без скачивания исходных файлов.</p></section><section className="section library-section"><LibraryClient /></section><SiteFooter /></main>; }

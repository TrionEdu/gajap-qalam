import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { StatusChecker } from '@/components/status-checker';

export const metadata = { title: 'Статус заявки | Gajap Qalam' };
export default async function StatusPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) { const { id = '' } = await searchParams; return <main><SiteHeader /><section className="page-intro compact-intro"><p className="eyebrow">Личный статус</p><h1>Где сейчас ваша работа</h1><p>Введите данные из квитанции, которую получили после загрузки.</p></section><section className="section status-section"><StatusChecker initialId={id} /></section><SiteFooter /></main>; }

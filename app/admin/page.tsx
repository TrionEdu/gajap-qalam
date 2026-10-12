import { env } from 'cloudflare:workers';
import { requireChatGPTUser } from '@/app/chatgpt-auth';
import { AdminDashboard } from '@/components/admin-dashboard';
import { SiteHeader } from '@/components/site-chrome';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Редакция | Gajap Qalam' };

export default async function AdminPage() {
  const user = await requireChatGPTUser('/admin');
  const allowed = Boolean(env.ADMIN_EMAIL && user.email.toLowerCase() === env.ADMIN_EMAIL.toLowerCase());
  return <main><SiteHeader />{allowed ? <AdminDashboard /> : <section className="section access-denied"><h1>Нет доступа</h1><p>Аккаунт {user.email} не добавлен в редакторы проекта.</p></section>}</main>;
}

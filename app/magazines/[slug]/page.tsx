import { MagazineDetail } from '@/components/magazine-detail';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';

export default async function MagazinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <main><SiteHeader /><MagazineDetail slug={decodeURIComponent(slug)} /><SiteFooter /></main>;
}

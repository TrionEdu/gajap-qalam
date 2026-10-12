import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { WorkDetail } from '@/components/work-detail';

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  return <main><SiteHeader /><WorkDetail slug={decodedSlug} /><SiteFooter /></main>;
}

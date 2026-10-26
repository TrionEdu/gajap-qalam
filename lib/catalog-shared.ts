export type PublicationStatus = 'draft' | 'coming_soon' | 'published' | 'archived';

export type PublicationSummary = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  description: string;
  authorLabel: string;
  language: string;
  issueLabel?: string | null;
  coverKey?: string | null;
  priceKzt: number;
  previewPages: number;
  pageCount: number;
  status: PublicationStatus;
  featured: number;
  viewCount: number;
  rating: number;
  reviewCount: number;
};

export const PUBLICATION_STATUS_LABELS: Record<PublicationStatus, string> = {
  draft: 'Черновик',
  coming_soon: 'Скоро',
  published: 'В продаже',
  archived: 'Снято с витрины',
};

export function formatPriceKzt(price: number) {
  if (price <= 0) return 'Бесплатно';
  return `${new Intl.NumberFormat('ru-KZ').format(price)} ₸`;
}

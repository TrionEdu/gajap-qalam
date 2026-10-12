export const MAX_PDF_BYTES = 20 * 1024 * 1024;
export const MAX_COVER_BYTES = 2 * 1024 * 1024;

export const DIRECTIONS = [
  'Комиксы и манга',
  'Сценарий и сторителлинг',
  'Концепт-арт и мерч',
  'Легенды Великой Степи: Нео-Номады',
] as const;

export const LANGUAGES = ['Қазақша', 'Русский', 'Два языка'] as const;

export const STATUS_LABELS: Record<string, string> = {
  received: 'Получена',
  review: 'На проверке',
  correction: 'Нужны исправления',
  accepted: 'Принята',
  finalist: 'Финалист',
  published: 'Опубликована',
  declined: 'Не прошла отбор',
};

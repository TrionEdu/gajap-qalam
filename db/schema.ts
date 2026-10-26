import { integer, primaryKey, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const submissions = sqliteTable('submissions', {
  id: text('id').primaryKey(),
  statusCodeHash: text('status_code_hash').notNull(),
  status: text('status').notNull().default('received'),
  title: text('title').notNull(),
  participantName: text('participant_name').notNull(),
  penName: text('pen_name'),
  age: integer('age').notNull(),
  city: text('city').notNull(),
  school: text('school').notNull(),
  direction: text('direction').notNull(),
  language: text('language').notNull(),
  summary: text('summary').notNull(),
  parentName: text('parent_name').notNull(),
  parentEmail: text('parent_email').notNull(),
  parentPhone: text('parent_phone').notNull(),
  mentor: text('mentor'),
  consentProcessing: integer('consent_processing', { mode: 'boolean' }).notNull(),
  consentPublication: integer('consent_publication', { mode: 'boolean' }).notNull(),
  fileKey: text('file_key').notNull(),
  fileName: text('file_name').notNull(),
  fileSize: integer('file_size').notNull(),
  coverKey: text('cover_key'),
  correctionNote: text('correction_note'),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const works = sqliteTable('works', {
  id: text('id').primaryKey(),
  submissionId: text('submission_id').notNull().unique(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  authorName: text('author_name').notNull(),
  city: text('city').notNull(),
  ageGroup: text('age_group').notNull(),
  direction: text('direction').notNull(),
  language: text('language').notNull(),
  summary: text('summary').notNull(),
  fileKey: text('file_key').notNull(),
  coverKey: text('cover_key'),
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
  viewCount: integer('view_count').notNull().default(0),
  publishedAt: text('published_at').notNull(),
});

export const publications = sqliteTable('publications', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  description: text('description').notNull(),
  authorLabel: text('author_label').notNull(),
  language: text('language').notNull(),
  issueLabel: text('issue_label'),
  fullKey: text('full_key').notNull(),
  previewKey: text('preview_key').notNull(),
  coverKey: text('cover_key'),
  priceKzt: integer('price_kzt').notNull().default(0),
  previewPages: integer('preview_pages').notNull().default(3),
  pageCount: integer('page_count').notNull(),
  status: text('status').notNull().default('draft'),
  featured: integer('featured', { mode: 'boolean' }).notNull().default(false),
  category: text('category').notNull().default('other'),
  seriesLabel: text('series_label'),
  isNew: integer('is_new', { mode: 'boolean' }).notNull().default(true),
  rightsConfirmed: integer('rights_confirmed', { mode: 'boolean' }).notNull().default(false),
  viewCount: integer('view_count').notNull().default(0),
  createdAt: text('created_at').notNull(),
  publishedAt: text('published_at'),
});

export const purchases = sqliteTable('purchases', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  publicationId: text('publication_id').notNull(),
  status: text('status').notNull().default('active'),
  amountKzt: integer('amount_kzt').notNull(),
  provider: text('provider'),
  providerPaymentId: text('provider_payment_id'),
  purchasedAt: text('purchased_at').notNull(),
}, (table) => [
  uniqueIndex('purchases_user_publication_unique').on(table.userId, table.publicationId),
]);

export const readingProgress = sqliteTable('reading_progress', {
  userId: text('user_id').notNull(),
  publicationId: text('publication_id').notNull(),
  page: integer('page').notNull().default(1),
  updatedAt: text('updated_at').notNull(),
}, (table) => [
  primaryKey({ columns: [table.userId, table.publicationId] }),
]);

export const publicationReviews = sqliteTable('publication_reviews', {
  id: text('id').primaryKey(),
  publicationId: text('publication_id').notNull(),
  displayName: text('display_name').notNull(),
  rating: integer('rating').notNull(),
  body: text('body').notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
});

export const reviews = sqliteTable('reviews', {
  id: text('id').primaryKey(),
  workId: text('work_id').notNull(),
  displayName: text('display_name').notNull(),
  rating: integer('rating').notNull(),
  body: text('body').notNull(),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull(),
});

export const rateLimits = sqliteTable('rate_limits', {
  key: text('key').primaryKey(),
  count: integer('count').notNull().default(1),
  expiresAt: integer('expires_at').notNull(),
});

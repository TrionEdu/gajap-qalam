import { env } from 'cloudflare:workers';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDb() {
  if (!env.DB) throw new Error('D1 binding DB is not configured');
  return drizzle(env.DB, { schema });
}

export function getBindings() {
  if (!env.DB || !env.BUCKET) {
    throw new Error('Storage bindings are not configured');
  }
  return { db: env.DB, bucket: env.BUCKET };
}

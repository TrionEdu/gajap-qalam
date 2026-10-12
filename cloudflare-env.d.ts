declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    ADMIN_EMAIL?: string;
    NOTIFY_EMAIL?: string;
    RESEND_API_KEY?: string;
    RATE_LIMIT_SALT?: string;
  }
}

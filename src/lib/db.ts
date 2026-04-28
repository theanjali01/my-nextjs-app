import { neon } from "@neondatabase/serverless";

export function getDb() {
  if (!process.env.DATABASE_URL) return null;
  return neon(process.env.DATABASE_URL);
}

export async function initDb() {
  const sql = getDb();
  if (!sql) return;
  await sql`
    CREATE TABLE IF NOT EXISTS post_views (
      slug TEXT PRIMARY KEY,
      views INTEGER NOT NULL DEFAULT 0,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}

export async function incrementView(slug: string): Promise<number> {
  const sql = getDb();
  if (!sql) return 0;
  const result = await sql`
    INSERT INTO post_views (slug, views)
    VALUES (${slug}, 1)
    ON CONFLICT (slug)
    DO UPDATE SET views = post_views.views + 1, updated_at = NOW()
    RETURNING views
  `;
  return result[0]?.views ?? 0;
}

export async function getViews(slug: string): Promise<number> {
  const sql = getDb();
  if (!sql) return 0;
  const result = await sql`SELECT views FROM post_views WHERE slug = ${slug}`;
  return result[0]?.views ?? 0;
}

export async function saveContactMessage(name: string, email: string, message: string) {
  const sql = getDb();
  if (!sql) return;
  await sql`INSERT INTO contact_messages (name, email, message) VALUES (${name}, ${email}, ${message})`;
}

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
  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      cover_image TEXT NOT NULL DEFAULT '',
      tags TEXT[] NOT NULL DEFAULT '{}',
      published BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS cover_image TEXT NOT NULL DEFAULT ''`;
}

/* ── Views ── */
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

export async function getAllViews(): Promise<Record<string, number>> {
  const sql = getDb();
  if (!sql) return {};
  const rows = await sql`SELECT slug, views FROM post_views`;
  const map: Record<string, number> = {};
  for (const r of rows as { slug: string; views: number }[]) map[r.slug] = r.views;
  return map;
}

/* ── Contact ── */
export async function saveContactMessage(name: string, email: string, message: string) {
  const sql = getDb();
  if (!sql) return;
  await sql`INSERT INTO contact_messages (name, email, message) VALUES (${name}, ${email}, ${message})`;
}

export interface ContactMessage {
  id: number; name: string; email: string; message: string; created_at: string;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const sql = getDb();
  if (!sql) return [];
  const rows = await sql`SELECT * FROM contact_messages ORDER BY created_at DESC`;
  return rows as ContactMessage[];
}

export async function deleteContactMessage(id: number) {
  const sql = getDb();
  if (!sql) return;
  await sql`DELETE FROM contact_messages WHERE id = ${id}`;
}

export async function togglePublished(id: number, published: boolean): Promise<DbPost | null> {
  const sql = getDb();
  if (!sql) return null;
  const rows = await sql`
    UPDATE blog_posts SET published=${published}, updated_at=NOW()
    WHERE id=${id} RETURNING *
  `;
  return (rows[0] as DbPost) ?? null;
}

/* ── Blog posts (admin-created) ── */
export interface DbPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  cover_image: string;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export async function getAllDbPosts(): Promise<DbPost[]> {
  const sql = getDb();
  if (!sql) return [];
  const rows = await sql`SELECT * FROM blog_posts ORDER BY created_at DESC`;
  return rows as DbPost[];
}

export async function getPublishedDbPosts(): Promise<DbPost[]> {
  const sql = getDb();
  if (!sql) return [];
  try {
    const rows = await sql`SELECT * FROM blog_posts WHERE published = true ORDER BY created_at DESC`;
    return rows as DbPost[];
  } catch {
    return [];
  }
}

export async function getDbPost(slug: string): Promise<DbPost | null> {
  const sql = getDb();
  if (!sql) return null;
  const rows = await sql`SELECT * FROM blog_posts WHERE slug = ${slug} AND published = true`;
  return (rows[0] as DbPost) ?? null;
}

export async function getDbPostById(id: number): Promise<DbPost | null> {
  const sql = getDb();
  if (!sql) return null;
  const rows = await sql`SELECT * FROM blog_posts WHERE id = ${id}`;
  return (rows[0] as DbPost) ?? null;
}

export async function createDbPost(data: {
  slug: string; title: string; description: string;
  content: string; cover_image: string; tags: string[]; published: boolean;
}): Promise<DbPost> {
  const sql = getDb()!;
  const rows = await sql`
    INSERT INTO blog_posts (slug, title, description, content, cover_image, tags, published)
    VALUES (${data.slug}, ${data.title}, ${data.description}, ${data.content}, ${data.cover_image}, ${data.tags}, ${data.published})
    RETURNING *
  `;
  return rows[0] as DbPost;
}

export async function updateDbPost(id: number, data: {
  slug: string; title: string; description: string;
  content: string; cover_image: string; tags: string[]; published: boolean;
}): Promise<DbPost> {
  const sql = getDb()!;
  const rows = await sql`
    UPDATE blog_posts
    SET slug=${data.slug}, title=${data.title}, description=${data.description},
        content=${data.content}, cover_image=${data.cover_image}, tags=${data.tags},
        published=${data.published}, updated_at=NOW()
    WHERE id=${id}
    RETURNING *
  `;
  return rows[0] as DbPost;
}

export async function deleteDbPost(id: number) {
  const sql = getDb();
  if (!sql) return;
  await sql`DELETE FROM blog_posts WHERE id = ${id}`;
}

import pg from "pg";
import { readFileSync, readdirSync, unlinkSync } from "fs";
import { join } from "path";
import matter from "gray-matter";

const env = readFileSync(".env.local", "utf-8");
const url = env.match(/DATABASE_URL=(.+)/)?.[1]?.trim();
if (!url) { console.error("No DATABASE_URL in .env.local"); process.exit(1); }

const BLOG_DIR = "content/blog";
const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
if (files.length === 0) { console.log("No MDX files found in content/blog"); process.exit(0); }

const client = new pg.Client({ connectionString: url });
await client.connect();

const deleteAfter = process.argv.includes("--delete-files");

for (const file of files) {
  const slug = file.replace(/\.mdx?$/, "");
  const raw = readFileSync(join(BLOG_DIR, file), "utf-8");
  const { data, content } = matter(raw);

  const title = data.title ?? slug;
  const description = data.description ?? "";
  const tags = data.tags ?? [];
  const createdAt = data.date ? new Date(data.date).toISOString() : new Date().toISOString();

  await client.query(
    `INSERT INTO blog_posts (slug, title, description, content, cover_image, tags, published, created_at, updated_at)
     VALUES ($1, $2, $3, $4, '', $5, true, $6, $6)
     ON CONFLICT (slug) DO UPDATE
     SET title=EXCLUDED.title, description=EXCLUDED.description, content=EXCLUDED.content,
         tags=EXCLUDED.tags, published=true, updated_at=NOW()`,
    [slug, title, description, content.trim(), tags, createdAt]
  );
  console.log(`✓ ${slug}`);

  if (deleteAfter) {
    unlinkSync(join(BLOG_DIR, file));
    console.log(`  ↳ removed ${file}`);
  }
}

await client.end();
console.log("Done.");

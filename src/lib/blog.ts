import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getPublishedDbPosts, getDbPost } from "./db";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  source: "file" | "db";
}

export interface Post extends PostMeta {
  content: string;
}

function readFilePosts(): (PostMeta & { _ts: number })[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        description: data.description ?? "",
        date: data.date ? new Date(data.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "",
        tags: data.tags ?? [],
        source: "file" as const,
        _ts: data.date ? new Date(data.date).getTime() : 0,
      };
    });
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const filePosts = readFilePosts();
  const dbPosts = await getPublishedDbPosts();

  const fromDb: (PostMeta & { _ts: number })[] = dbPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: new Date(p.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    tags: p.tags,
    source: "db" as const,
    _ts: new Date(p.created_at).getTime(),
  }));

  const fileSet = new Set(filePosts.map((p) => p.slug));
  const merged = [
    ...filePosts,
    ...fromDb.filter((p) => !fileSet.has(p.slug)),
  ];

  return merged
    .sort((a, b) => b._ts - a._ts)
    .map(({ _ts, ...rest }) => rest);
}

export async function getRecentPosts(count: number): Promise<PostMeta[]> {
  return (await getAllPosts()).slice(0, count);
}

export async function getPost(slug: string): Promise<Post | null> {
  // Try file first
  if (fs.existsSync(BLOG_DIR)) {
    for (const ext of [".mdx", ".md"]) {
      const filePath = path.join(BLOG_DIR, `${slug}${ext}`);
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(raw);
        return {
          slug,
          title: data.title ?? slug,
          description: data.description ?? "",
          date: data.date ? new Date(data.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "",
          tags: data.tags ?? [],
          content,
          source: "file",
        };
      }
    }
  }

  // Fall back to DB
  const dbPost = await getDbPost(slug);
  if (!dbPost) return null;
  return {
    slug: dbPost.slug,
    title: dbPost.title,
    description: dbPost.description,
    date: new Date(dbPost.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    tags: dbPost.tags,
    content: dbPost.content,
    source: "db",
  };
}

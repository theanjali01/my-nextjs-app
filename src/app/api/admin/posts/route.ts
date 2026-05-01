import { NextRequest, NextResponse } from "next/server";
import { getAllDbPosts, createDbPost, getAllViews } from "@/lib/db";
import { initDb } from "@/lib/db";

export async function GET() {
  await initDb();
  const [posts, views] = await Promise.all([getAllDbPosts(), getAllViews()]);
  return NextResponse.json(posts.map(p => ({ ...p, views: views[p.slug] ?? 0 })));
}

export async function POST(req: NextRequest) {
  await initDb();
  const body = await req.json();
  const { slug, title, description, content, cover_image, tags, published } = body;
  if (!slug || !title) return NextResponse.json({ error: "slug and title required" }, { status: 400 });
  const post = await createDbPost({ slug, title, description: description ?? "", content: content ?? "", cover_image: cover_image ?? "", tags: tags ?? [], published: published ?? false });
  return NextResponse.json(post);
}

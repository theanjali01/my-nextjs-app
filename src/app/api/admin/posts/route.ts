import { NextRequest, NextResponse } from "next/server";
import { getAllDbPosts, createDbPost } from "@/lib/db";
import { initDb } from "@/lib/db";

export async function GET() {
  await initDb();
  const posts = await getAllDbPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  await initDb();
  const body = await req.json();
  const { slug, title, description, content, tags, published } = body;
  if (!slug || !title) return NextResponse.json({ error: "slug and title required" }, { status: 400 });
  const post = await createDbPost({ slug, title, description: description ?? "", content: content ?? "", tags: tags ?? [], published: published ?? false });
  return NextResponse.json(post);
}

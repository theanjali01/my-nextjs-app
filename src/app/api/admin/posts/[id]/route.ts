import { NextRequest, NextResponse } from "next/server";
import { getDbPostById, updateDbPost, deleteDbPost } from "@/lib/db";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getDbPostById(Number(id));
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { slug, title, description, content, cover_image, tags, published } = body;
  const post = await updateDbPost(Number(id), { slug, title, description, content, cover_image: cover_image ?? "", tags, published });
  return NextResponse.json(post);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteDbPost(Number(id));
  return NextResponse.json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";
import { incrementView, getViews } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { slug } = await req.json();
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  const views = await incrementView(slug);
  return NextResponse.json({ views });
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  const views = await getViews(slug);
  return NextResponse.json({ views });
}

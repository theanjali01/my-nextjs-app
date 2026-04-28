import { NextRequest, NextResponse } from "next/server";
import { saveContactMessage } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }
  await saveContactMessage(name, email, message);
  return NextResponse.json({ ok: true });
}

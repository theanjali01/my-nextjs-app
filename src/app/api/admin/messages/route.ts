import { NextResponse } from "next/server";
import { getContactMessages, initDb } from "@/lib/db";

export async function GET() {
  await initDb();
  const messages = await getContactMessages();
  return NextResponse.json(messages);
}

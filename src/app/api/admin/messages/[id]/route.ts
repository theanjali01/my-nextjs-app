import { NextRequest, NextResponse } from "next/server";
import { deleteContactMessage } from "@/lib/db";

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await deleteContactMessage(Number(id));
  return NextResponse.json({ ok: true });
}

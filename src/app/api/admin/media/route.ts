import { NextResponse } from "next/server";
import { requireAdminApi } from "@/admin/lib/server/auth";
import { deleteMediaFile, listMedia } from "@/admin/lib/server/media";

export async function GET() {
  const profile = await requireAdminApi();
  if (!profile) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ ok: true, items: listMedia() });
}

export async function DELETE(request: Request) {
  const profile = await requireAdminApi();
  if (!profile) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file") ?? "";
  const result = deleteMediaFile(file);
  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}

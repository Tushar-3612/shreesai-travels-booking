import { NextResponse } from "next/server";
import { requireAdminApi } from "@/admin/lib/server/auth";
import { saveUpload } from "@/admin/lib/server/media";

export async function POST(request: Request) {
  const profile = await requireAdminApi();
  if (!profile) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ ok: false, error: "Invalid upload" }, { status: 400 });
  }
  const files = form
    .getAll("files")
    .filter((entry): entry is File => entry instanceof File);
  if (!files.length) {
    return NextResponse.json({ ok: false, error: "No files provided" }, { status: 400 });
  }
  const results = [];
  for (const file of files) {
    results.push(await saveUpload(file));
  }
  const failed = results.find((result) => result.error);
  if (failed) {
    return NextResponse.json({ ok: false, error: failed.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, urls: results.map((r) => r.url) });
}

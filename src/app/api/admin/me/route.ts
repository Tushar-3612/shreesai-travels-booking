import { NextResponse } from "next/server";
import { requireAdminApi } from "@/admin/lib/server/auth";

export async function GET() {
  const profile = await requireAdminApi();
  if (!profile) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    ok: true,
    email: profile.email,
    name: profile.name,
    photoUrl: profile.photoUrl,
  });
}

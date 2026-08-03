import { NextResponse } from "next/server";
import { updateProfile } from "@/admin/lib/server/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { name, photoUrl } = body as { name?: string; photoUrl?: string };
  const result = await updateProfile({ name, photoUrl });
  if (!result.ok) {
    return NextResponse.json(result, { status: 401 });
  }
  return NextResponse.json({
    ok: true,
    name: result.profile?.name,
    photoUrl: result.profile?.photoUrl,
  });
}

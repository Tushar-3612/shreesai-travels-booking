import { NextResponse } from "next/server";
import { changePassword } from "@/admin/lib/server/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { currentPassword, newPassword } = body as {
    currentPassword?: string;
    newPassword?: string;
  };
  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { ok: false, error: "Current and new password are required" },
      { status: 400 }
    );
  }
  const result = await changePassword(currentPassword, newPassword);
  if (!result.ok) {
    return NextResponse.json(result, {
      status: result.error === "Unauthorized" ? 401 : 400,
    });
  }
  return NextResponse.json({ ok: true });
}

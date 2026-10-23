import { NextResponse } from "next/server";
import { login } from "@/admin/lib/server/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, password } = body as { email?: string; password?: string };
    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email and password are required" },
        { status: 400 }
      );
    }
    const result = await login(email, password);
    if (!result.ok) {
      return NextResponse.json(result, { status: 401 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Login API route error:", err);
    return NextResponse.json(
      { ok: false, error: "Login failed. Please check credentials or try again." },
      { status: 500 }
    );
  }
}

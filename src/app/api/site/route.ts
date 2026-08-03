import { NextResponse } from "next/server";
import { getSiteSnapshot } from "@/lib/cms/site";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(getSiteSnapshot(), {
    headers: { "Cache-Control": "no-store" },
  });
}

import { NextResponse } from "next/server";
import { getSiteSnapshot } from "@/lib/cms/site";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getSiteSnapshot();
  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store" },
  });
}

import { NextResponse } from "next/server";
import { addPublicReview } from "@/lib/cms/site";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      route?: string;
      rating?: number;
      text?: string;
    };
    const name = (body.name ?? "").trim();
    const text = (body.text ?? "").trim();
    const rating = Number(body.rating);

    if (!name || !text) {
      return NextResponse.json(
        { ok: false, error: "Name and review text are required" },
        { status: 400 }
      );
    }
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { ok: false, error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    addPublicReview({ name, route: body.route ?? "", rating, text });

    return NextResponse.json(
      { ok: true, message: "Review submitted for approval" },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

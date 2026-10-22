import { NextResponse } from "next/server";
import { readCollection } from "@/lib/cms/store";
import { calculateTourCost, type TourCostInput } from "@/lib/pricing";
import type { PricingConfig } from "@/admin/types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<TourCostInput> & {
      collection?: string;
    };

    const input: TourCostInput = {
      pickup: (body.pickup ?? "").toString().trim(),
      destination: (body.destination ?? "").toString().trim(),
      vehicle: (body.vehicle ?? "").toString().trim(),
      tripType: body.tripType === "Round Trip" ? "Round Trip" : "One Way",
      days: Number(body.days) || 1,
      passengers: Number(body.passengers) || 1,
      extraKm: Number(body.extraKm) || 0,
    };

    if (!input.destination) {
      return NextResponse.json(
        { ok: false, error: "Please select a destination" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }
    if (!input.vehicle) {
      return NextResponse.json(
        { ok: false, error: "Please select a vehicle" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const config = await readCollection<PricingConfig>("pricing");
    const destinations = await readCollection<{ name: string; distance: number; status?: string }[]>("destinations");
    const result = calculateTourCost(config, input, destinations);

    return NextResponse.json(
      { ok: true, result },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not calculate the estimate" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

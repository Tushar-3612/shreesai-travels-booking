import { NextResponse } from "next/server";
import { readCollection, writeCollection } from "@/lib/cms/store";
import type { AdminBooking, BookingStatus, TripType } from "@/admin/types";

export const dynamic = "force-dynamic";

function genId(): string {
  const ts = Date.now().toString(36);
  const rnd = Math.random().toString(36).slice(2, 7);
  return `bk-${ts}-${rnd}`;
}

function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidTime(value: string): boolean {
  return /^\d{2}:\d{2}$/.test(value);
}

function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get("bookingId");

  const bookings = await readCollection<AdminBooking[]>("bookings");

  if (bookingId) {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) {
      return NextResponse.json(
        { ok: false, error: "Booking not found" },
        { status: 404, headers: { "Cache-Control": "no-store" } }
      );
    }
    return NextResponse.json(
      { ok: true, booking },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  const phone = searchParams.get("phone");
  if (phone) {
    const digits = phoneDigits(phone);
    const matches = bookings
      .filter((b) => phoneDigits(b.phone) === digits)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    return NextResponse.json(
      { ok: true, bookings: matches },
      { headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    { ok: false, error: "Provide bookingId or phone query parameter" },
    { status: 400, headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      customerName?: string;
      phone?: string;
      pickup?: string;
      drop?: string;
      pickupAddress?: string;
      date?: string;
      time?: string;
      vehicle?: string;
      passengers?: number | string;
      tripType?: string;
      message?: string;
    };

    const customerName = (body.customerName ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const pickup = (body.pickup ?? "").trim();
    const drop = (body.drop ?? "").trim();
    const pickupAddress = (body.pickupAddress ?? "").trim();
    const date = (body.date ?? "").trim();
    const time = (body.time ?? "").trim();
    const vehicle = (body.vehicle ?? "").trim();
    const passengers = Number(body.passengers);
    const tripType = (body.tripType ?? "") as TripType;
    const message = (body.message ?? "").trim();

    if (!customerName) {
      return NextResponse.json(
        { ok: false, error: "Full Name is required" },
        { status: 400 }
      );
    }
    if (!phone || phoneDigits(phone).length < 10) {
      return NextResponse.json(
        { ok: false, error: "A valid Mobile Number is required" },
        { status: 400 }
      );
    }
    if (!pickup) {
      return NextResponse.json(
        { ok: false, error: "Pickup Location is required" },
        { status: 400 }
      );
    }
    if (!drop) {
      return NextResponse.json(
        { ok: false, error: "Drop Location is required" },
        { status: 400 }
      );
    }
    if (!pickupAddress) {
      return NextResponse.json(
        { ok: false, error: "Full Pickup Address is required" },
        { status: 400 }
      );
    }
    if (!isValidDate(date)) {
      return NextResponse.json(
        { ok: false, error: "A valid Journey Date is required" },
        { status: 400 }
      );
    }
    if (!isValidTime(time)) {
      return NextResponse.json(
        { ok: false, error: "A valid Journey Time is required" },
        { status: 400 }
      );
    }
    if (!vehicle) {
      return NextResponse.json(
        { ok: false, error: "Vehicle is required" },
        { status: 400 }
      );
    }
    if (!Number.isFinite(passengers) || passengers < 1 || passengers > 12) {
      return NextResponse.json(
        { ok: false, error: "Number of passengers must be between 1 and 12" },
        { status: 400 }
      );
    }
    if (tripType !== "One Way" && tripType !== "Round Trip") {
      return NextResponse.json(
        { ok: false, error: "Journey Type is required" },
        { status: 400 }
      );
    }

    const booking: AdminBooking = {
      id: genId(),
      customerName,
      phone,
      pickup,
      drop,
      pickupAddress,
      date,
      time,
      vehicle,
      passengers,
      tripType,
      message,
      status: "Pending" as BookingStatus,
      createdAt: new Date().toISOString(),
    };

  const list = await readCollection<AdminBooking[]>("bookings");
  list.unshift(booking);
  await writeCollection("bookings", list);

    return NextResponse.json(
      { ok: true, booking },
      { status: 201, headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}

import type { PricingConfig } from "@/admin/types";

export type TripType = "One Way" | "Round Trip";

export interface TourCostInput {
  pickup: string;
  destination: string;
  vehicle: string;
  tripType: TripType;
  days: number;
  passengers: number;
  extraKm?: number;
}

export interface CostLine {
  label: string;
  amount: number;
  hint?: string;
}

export interface TourCostResult {
  currency: string;
  pickup: string;
  destination: string;
  vehicle: string;
  passengers: number;
  tripType: TripType;
  days: number;
  distance: number;
  lines: CostLine[];
  baseFare: number;
  distanceCharge: number;
  driverCharge: number;
  perDayCharge: number;
  extraKmCharge: number;
  additionalCharges: CostLine[];
  total: number;
  minApplied: boolean;
}

function round(n: number): number {
  return Math.round(n);
}

export function calculateTourCost(
  config: PricingConfig,
  input: TourCostInput,
  allDestinations?: { name: string; distance: number; status?: string }[]
): TourCostResult {
  const days = Math.max(1, Math.floor(Number(input.days) || 1));
  const extraKm = Math.max(0, Number(input.extraKm) || 0);
  const currency = config?.calculator?.currency || config?.extraCharges?.currency || "INR";

  const vehicle = (config?.vehiclePricing ?? []).find(
    (v) => v.name === input.vehicle && v.status === "active"
  );
  const destinationPricing = (config?.destinationPricing ?? []).find(
    (d) => d.name === input.destination && d.status === "active"
  );

  const fallbackDest = allDestinations?.find(
    (d) => d.name === input.destination && (d.status === undefined || d.status === "active")
  );

  const baseFare = round(vehicle?.baseFare ?? 0);

  const distanceKm = destinationPricing?.distance ?? fallbackDest?.distance ?? 0;
  const tripKm = input.tripType === "Round Trip" ? distanceKm * 2 : distanceKm;
  const distanceCharge = round((vehicle?.perKm ?? 0) * tripKm);

  const driverPerDay = vehicle?.driverCharge ?? config?.extraCharges?.driverAllowance ?? 0;
  const driverCharge = round(driverPerDay * days);

  const perDayCharge =
    days > 1 ? round((vehicle?.perDay ?? 0) * (days - 1)) : 0;

  const extraKmCharge = extraKm > 0 ? round((vehicle?.extraKmRate ?? config?.extraCharges?.extraKm ?? 0) * extraKm) : 0;

  const destinationExtra = round(destinationPricing?.additionalCharge ?? 0);

  const additionalCharges: CostLine[] = [];
  if (destinationExtra > 0) {
    additionalCharges.push({
      label: "Destination Charge",
      amount: destinationExtra,
      hint: input.destination,
    });
  }
  const extras = config?.extraCharges;
  if (extras) {
    if (extras.toll > 0)
      additionalCharges.push({ label: "Toll Charges", amount: round(extras.toll) });
    if (extras.parking > 0)
      additionalCharges.push({ label: "Parking Charges", amount: round(extras.parking) });
    if (extras.nightCharge > 0)
      additionalCharges.push({ label: "Night Charges", amount: round(extras.nightCharge) });
  }

  const subtotal =
    baseFare +
    distanceCharge +
    driverCharge +
    perDayCharge +
    extraKmCharge +
    additionalCharges.reduce((sum, line) => sum + line.amount, 0);

  const minFare =
    config?.calculator?.minFare ?? config?.extraCharges?.minFare ?? 0;
  const total = Math.max(round(minFare), round(subtotal));
  const minApplied = round(minFare) > round(subtotal) && round(minFare) > 0;

  return {
    currency,
    pickup: input.pickup,
    destination: input.destination,
    vehicle: input.vehicle,
    passengers: input.passengers,
    tripType: input.tripType,
    days,
    distance: tripKm,
    lines: [],
    baseFare,
    distanceCharge,
    driverCharge,
    perDayCharge,
    extraKmCharge,
    additionalCharges,
    total,
    minApplied,
  };
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FaCarSide, FaWhatsapp } from "react-icons/fa6";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { HiOutlineCalculator } from "react-icons/hi2";
import { useSiteData, whatsappHref } from "@/lib/site";
import type { VehiclePricing } from "@/admin/types";

export interface CalculatorVehicle {
  id: string;
  name: string;
  rate: number;
  label: string;
  seats?: string;
}

export const DEFAULT_CALCULATOR_VEHICLES: CalculatorVehicle[] = [
  {
    id: "veh-dzire",
    name: "New Model Swift Dzire",
    rate: 13,
    label: "New Model Swift Dzire — ₹13/km",
    seats: "4+1",
  },
  {
    id: "veh-ertiga",
    name: "Maruti Suzuki Ertiga",
    rate: 15,
    label: "Maruti Suzuki Ertiga — ₹15/km",
    seats: "6+1",
  },
  {
    id: "veh-innova",
    name: "Toyota Innova Crysta",
    rate: 20,
    label: "Toyota Innova Crysta — ₹20/km",
    seats: "6/7+1",
  },
  {
    id: "veh-traveller-14",
    name: "Force Tempo Traveller (14 Seater)",
    rate: 25,
    label: "Force Tempo Traveller (14 Seater) — ₹25/km",
    seats: "14+1",
  },
  {
    id: "veh-traveller-17",
    name: "Force Tempo Traveller (17 Seater)",
    rate: 28,
    label: "Force Tempo Traveller (17 Seater) — ₹28/km",
    seats: "17+1",
  },
  {
    id: "veh-urbania",
    name: "Force Urbania Luxury (17 Seater)",
    rate: 38,
    label: "Force Urbania Luxury (17 Seater) — ₹38/km",
    seats: "17+1",
  },
];

const KNOWN_DESTINATION_DISTANCES: Record<string, number> = {
  nashik: 300,
  trimbakeshwar: 320,
  "shani shingnapur": 150,
  shingnapur: 150,
  mumbai: 700,
  pune: 420,
  aurangabad: 260,
  "chhatrapati sambhajinagar": 260,
  "sambhaji nagar": 260,
  bhimashankar: 400,
  "ajanta & ellora": 350,
  ellora: 250,
  mahabaleshwar: 750,
  lonavala: 550,
  khandala: 550,
  kolhapur: 1000,
  tuljapur: 750,
  pandharpur: 680,
  saptashrungi: 380,
};

export interface TourCostCalculatorProps {
  selectedDestination?: string;
  onDestinationChange?: (name: string) => void;
  isHeroEmbedded?: boolean;
}

export function TourCostCalculatorCard({
  selectedDestination,
  onDestinationChange,
  isHeroEmbedded = false,
}: TourCostCalculatorProps) {
  const site = useSiteData();
  const settings = site?.settings;
  const pricing = site?.pricing;

  // Build vehicle options from pricing or defaults
  const vehicleOptions = useMemo<CalculatorVehicle[]>(() => {
    const list = (pricing?.vehiclePricing ?? [])
      .filter((v: VehiclePricing) => v.status === "active" && v.perKm > 0)
      .map((v: VehiclePricing) => ({
        id: v.id,
        name: v.name,
        rate: v.perKm,
        label: `${v.name} — ₹${v.perKm}/km`,
        seats: `${v.capacity} Seats`,
      }));

    if (list.length >= 3) {
      return list;
    }
    return DEFAULT_CALCULATOR_VEHICLES;
  }, [pricing]);

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(
    vehicleOptions[0]?.id || "veh-dzire"
  );
  const [distance, setDistance] = useState<number>(75);
  const [activeDestination, setActiveDestination] = useState<string>("");

  // Sync with selectedDestination prop from outside (e.g. clicking destination cards)
  useEffect(() => {
    if (!selectedDestination) return;
    setActiveDestination(selectedDestination);

    const lower = selectedDestination.toLowerCase().trim();
    // Check if known
    let matchedDistance = 0;
    for (const [key, d] of Object.entries(KNOWN_DESTINATION_DISTANCES)) {
      if (lower.includes(key)) {
        matchedDistance = d;
        break;
      }
    }

    if (!matchedDistance && site?.destinations) {
      const found = site.destinations.find((d) =>
        lower.includes(d.name.toLowerCase()) || d.name.toLowerCase().includes(lower)
      );
      if (found && found.distance > 0) {
        matchedDistance = found.distance;
      }
    }

    if (matchedDistance > 0) {
      setDistance(Math.min(1200, Math.max(50, matchedDistance)));
    }
  }, [selectedDestination, site]);

  const currentVehicle =
    vehicleOptions.find((v) => v.id === selectedVehicleId) || vehicleOptions[0];

  const rate = currentVehicle?.rate || 13;
  const estimatedFare = Math.round(distance * rate);

  // Slider progress percentage
  const sliderPercentage = Math.min(
    100,
    Math.max(0, ((distance - 50) / (1200 - 50)) * 100)
  );

  const handleMilestoneClick = (km: number, destName?: string) => {
    setDistance(km);
    if (destName) {
      setActiveDestination(destName);
      if (onDestinationChange) {
        onDestinationChange(destName);
      }
    }
  };

  const businessName = settings?.businessName || "Shree Sai Travels";
  const whatsappNumber =
    settings?.whatsapp?.replace(/[^0-9]/g, "") || "918459209595";

  const handleBookNow = () => {
    const lines = [
      `*${businessName} - Cab Booking Inquiry*`,
      `---------------------------------`,
      `Vehicle: ${currentVehicle?.name}`,
      `Distance: ~${distance} km (Roundtrip)${
        activeDestination ? ` - ${activeDestination}` : ""
      }`,
      `Estimated Base Fare: ₹${estimatedFare.toLocaleString("en-IN")}`,
      `Per-KM Rate: ₹${rate}/km (Driver Included)`,
      `---------------------------------`,
      `Please confirm cab availability & share details!`,
    ];

    const href = whatsappHref(whatsappNumber, lines.join("\n"));
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const prefillUrl = useMemo(() => {
    const payload = {
      pickup: "Shirdi",
      drop: activeDestination || "Roundtrip Tour",
      vehicle: currentVehicle?.name,
      journeyType: "Round Trip",
      message: `Estimated Tour Cost: ₹${estimatedFare.toLocaleString(
        "en-IN"
      )} (${distance} km @ ₹${rate}/km, Driver Included).`,
    };
    return `/book?prefill=${encodeURIComponent(JSON.stringify(payload))}`;
  }, [activeDestination, currentVehicle, distance, estimatedFare, rate]);

  return (
    <div
      className={`w-full max-w-lg bg-white rounded-3xl p-4 sm:p-7 shadow-2xl border-2 border-amber-300/80 text-slate-900 transition-all relative ${
        isHeroEmbedded ? "mx-auto lg:ml-auto lg:mr-0" : "mx-auto"
      }`}
      style={{
        boxShadow:
          "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(245, 158, 11, 0.15)",
      }}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <span className="block text-[11px] sm:text-xs font-black tracking-wider uppercase text-amber-600 mb-1">
            INSTANT FARE ESTIMATOR
          </span>
          <h3 className="text-2xl sm:text-[26px] font-black tracking-tight text-slate-900 font-serif leading-tight">
            Calculate Tour Cost
          </h3>
        </div>

        <div
          className="w-10 h-10 rounded-xl bg-amber-100/80 border border-amber-200/90 flex items-center justify-center text-amber-700 shrink-0 shadow-sm"
          title="Instant Tour Calculator"
        >
          <HiOutlineCalculator size={22} className="stroke-[2.2]" />
        </div>
      </div>

      {/* Select Vehicle Type */}
      <div className="mb-5">
        <label
          htmlFor="calc-vehicle-select"
          className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5"
        >
          Select Vehicle Type
        </label>
        <div className="relative">
          <select
            id="calc-vehicle-select"
            value={selectedVehicleId}
            onChange={(e) => setSelectedVehicleId(e.target.value)}
            className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-bold text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 shadow-sm transition-all appearance-none cursor-pointer"
          >
            {vehicleOptions.map((v) => (
              <option key={v.id} value={v.id} className="text-slate-900 py-1 font-semibold">
                {v.label}
              </option>
            ))}
          </select>
          <FiChevronDown
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
            size={18}
          />
        </div>
      </div>

      {/* Distance Slider */}
      <div className="mb-5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            Distance (Approx Roundtrip):
          </span>
          <span className="text-base sm:text-lg font-black text-amber-700 tracking-tight">
            {distance} km
          </span>
        </div>

        {/* Range Slider Track */}
        <div className="relative py-1">
          <input
            type="range"
            min={50}
            max={1200}
            step={10}
            value={distance}
            onChange={(e) => {
              setDistance(Number(e.target.value));
              setActiveDestination("");
            }}
            className="custom-fare-slider"
            style={{
              background: `linear-gradient(to right, #ea580c 0%, #ea580c ${sliderPercentage}%, #334155 ${sliderPercentage}%, #334155 100%)`,
            }}
            aria-label="Distance in kilometers"
          />
        </div>

        {/* Milestone Marks Below Slider */}
        <div className="flex justify-between items-center text-[10px] sm:text-xs text-slate-400 font-semibold mt-1.5 select-none gap-1">
          <button
            type="button"
            onClick={() => handleMilestoneClick(50)}
            className={`transition-colors hover:text-amber-600 ${
              distance === 50 ? "text-amber-700 font-bold" : ""
            }`}
          >
            50 km
          </button>
          <button
            type="button"
            onClick={() => handleMilestoneClick(300, "Nashik Darshan")}
            className={`transition-colors hover:text-amber-600 ${
              distance === 300 ? "text-amber-700 font-bold" : ""
            }`}
          >
            300 km <span className="hidden sm:inline">(Nashik)</span>
          </button>
          <button
            type="button"
            onClick={() => handleMilestoneClick(700, "Mumbai City Tour")}
            className={`transition-colors hover:text-amber-600 ${
              distance === 700 ? "text-amber-700 font-bold" : ""
            }`}
          >
            700 km <span className="hidden sm:inline">(Mumbai)</span>
          </button>
          <button
            type="button"
            onClick={() => handleMilestoneClick(1200)}
            className={`transition-colors hover:text-amber-600 ${
              distance === 1200 ? "text-amber-700 font-bold" : ""
            }`}
          >
            1200 km
          </button>
        </div>
      </div>

      {/* Estimated Base Fare Box */}
      <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-4 sm:p-5 flex items-center justify-between mb-4 shadow-sm">
        <div>
          <span className="block text-xs sm:text-sm font-medium text-slate-500">
            Estimated Base Fare:
          </span>
          <span className="block text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif mt-0.5">
            ₹{estimatedFare.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="text-right">
          <span className="block text-xs sm:text-sm font-bold text-slate-800">
            Rate: ₹{rate}/km
          </span>
          <span className="inline-flex items-center justify-end gap-1 text-xs sm:text-sm font-extrabold text-emerald-700 mt-0.5">
            <FiCheck size={14} className="stroke-[3]" />
            Driver Included
          </span>
        </div>
      </div>

      {/* Book This Ride Now Button */}
      <button
        type="button"
        onClick={handleBookNow}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FF5500] to-[#FF6B00] hover:from-[#E64D00] hover:to-[#E55F00] text-white font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-xl shadow-orange-500/30 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
      >
        <FaCarSide size={20} />
        Book This Ride Now
      </button>

      {/* Quick alternative / note below button */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 mt-3 px-1">
        <span className="truncate">Fuel, AC & Toll transparency guaranteed</span>
        <Link
          href={prefillUrl}
          className="text-amber-700 font-bold hover:underline shrink-0 ml-2"
        >
          Online Form →
        </Link>
      </div>
    </div>
  );
}

export default function TourCostCalculator({
  selectedDestination,
  onDestinationChange,
  isHeroEmbedded = false,
}: TourCostCalculatorProps) {
  // If embedded in Hero, return just the card
  if (isHeroEmbedded) {
    return (
      <TourCostCalculatorCard
        selectedDestination={selectedDestination}
        onDestinationChange={onDestinationChange}
        isHeroEmbedded={true}
      />
    );
  }

  // Standalone section mode (with id="calculator" anchor)
  return (
    <section
      id="calculator"
      className="section-padding bg-slate-900 text-white relative overflow-hidden"
    >
      {/* Decorative Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-orange-600/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/20 text-orange-400 font-bold text-xs uppercase tracking-widest mb-3 border border-orange-500/30">
            <FaCarSide size={14} />
            Instant Fare Estimator
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Tour Cost <span className="gradient-text">Calculator</span>
          </h2>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl mx-auto leading-relaxed">
            Select your preferred AC cab, slide roundtrip distance, and calculate 100% transparent rates with no hidden driver fees.
          </p>
        </div>

        <div className="flex justify-center">
          <TourCostCalculatorCard
            selectedDestination={selectedDestination}
            onDestinationChange={onDestinationChange}
            isHeroEmbedded={false}
          />
        </div>
      </div>
    </section>
  );
}

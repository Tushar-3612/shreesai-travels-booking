"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { TravelPackage } from "@/data/packages";
import type {
  AdminDestination,
  AdminReview,
  AdminVehicle,
  GalleryItem,
  PricingConfig,
  SiteSettings,
} from "@/admin/types";

export interface SiteStats {
  avgRating: number;
  reviewCount: number;
}

export interface SiteData {
  settings: SiteSettings;
  categories: string[];
  packages: TravelPackage[];
  vehicles: AdminVehicle[];
  reviews: AdminReview[];
  gallery: GalleryItem[];
  destinations: AdminDestination[];
  pricing: PricingConfig;
  stats: SiteStats;
}

const SiteContext = createContext<SiteData | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/site", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("failed"))))
      .then((payload: SiteData) => {
        if (!cancelled) setData(payload);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <SiteContext.Provider value={data}>{children}</SiteContext.Provider>;
}

export function useSiteData(): SiteData | null {
  return useContext(SiteContext);
}

export function whatsappHref(number: string, text: string) {
  const digits = (number ?? "").replace(/\D/g, "");
  const clean = digits.length >= 10 ? digits : "919225396800";
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

export function getRelated(
  all: TravelPackage[],
  slug: string,
  limit = 3
): TravelPackage[] {
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);
  const pool = all.filter((p) => p.slug !== slug);
  const same = pool.filter((p) => p.category === current.category);
  return [...same, ...pool.filter((p) => p.category !== current.category)].slice(
    0,
    limit
  );
}

export function splitBusinessName(name: string): { line1: string; line2: string } {
  const parts = (name ?? "").trim().split(/\s+/);
  if (parts.length <= 1) return { line1: name ?? "", line2: "" };
  const line2 = parts.pop() ?? "";
  return { line1: parts.join(" "), line2 };
}

export function bookMessage(businessName: string, detail: string) {
  const name = businessName || "Sai Vaishnavi Tours and Travels";
  return `Hi ${name}! ${detail}`;
}

export function packageBookingMessage(
  businessName: string,
  pkg: TravelPackage
): string {
  const agency = businessName || "Sai Vaishnavi Tours and Travels";
  const lines: string[] = [
    `*Namaste ${agency}!* 🙏`,
    `I want to book the following tour package:`,
    ``,
    `📍 *Package Name:* ${pkg.name}`,
    `🏷️ *Category:* ${pkg.category}`,
    `🛣️ *Route:* ${pkg.route}`,
    `📏 *Distance:* ${pkg.distance}`,
    `⏱️ *Duration:* ${pkg.duration}`,
    `💰 *Fare:* One Way: ${pkg.price} | Round Trip: ${pkg.roundTrip}`,
  ];

  if (pkg.description) {
    lines.push(``, `📝 *Overview:*`, pkg.description);
  }

  if (pkg.highlights && pkg.highlights.length > 0) {
    lines.push(``, `✨ *Trip Highlights:*`);
    pkg.highlights.forEach((h, i) => lines.push(`${i + 1}. ${h}`));
  }

  if (pkg.included && pkg.included.length > 0) {
    lines.push(``, `✅ *What's Included:*`);
    pkg.included.forEach((inc) => lines.push(`• ${inc}`));
  }

  if (pkg.notIncluded && pkg.notIncluded.length > 0) {
    lines.push(``, `❌ *What's Not Included:*`);
    pkg.notIncluded.forEach((notInc) => lines.push(`• ${notInc}`));
  }

  lines.push(
    ``,
    `🚗 *Available Cars:* Dzire / Ertiga / Innova Crysta / Traveller`,
    `Please share cab availability, driver details, and final booking confirmation.`
  );

  return lines.join("\n");
}

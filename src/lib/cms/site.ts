import "server-only";

import {
  packages as seedPackages,
  type Category,
  type PackageFaq,
  type PackageReview,
  type TravelPackage,
} from "@/data/packages";
import type {
  AdminDestination,
  AdminPackage,
  AdminReview,
  AdminVehicle,
  GalleryItem,
  PricingConfig,
  SiteSettings,
  VehiclePricing,
} from "@/admin/types";
import { seedVehicles, seedPricing } from "@/admin/lib/seed";
import { readCollection, writeCollection, type CollectionName } from "./store";

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

const DEFAULT_FAQS: PackageFaq[] = [
  {
    q: "How much does this package cost?",
    a: "The fare shown is our transparent starting price. Fuel, tolls, parking and our verified driver are all included. The final amount depends on the car type you choose.",
  },
  {
    q: "Can I book one-way?",
    a: "Yes. Every package supports one-way and round-trip bookings. Pick one way when you plan to stay back or travel onward - we share an exact one-way fare at the time of booking.",
  },
  {
    q: "Can I book round trip?",
    a: "Absolutely. Most pilgrims prefer a round trip, where the car waits at the temple or hotel for your return. You get a fixed return fare with no last-minute surprises.",
  },
  {
    q: "Is night travel available?",
    a: "Yes, we operate 24x7. Night travel and early-morning airport or darshan pickups are handled by our experienced night drivers.",
  },
];

function deriveName(pkg: AdminPackage): string {
  const from = pkg.from.trim();
  const to = pkg.to.trim();
  if (pkg.category === "Airport") return `${to} Pickup`;
  if (pkg.category === "Local") {
    if (/station/i.test(to)) return `${from} Railway Station Pickup`;
    if (/temple|darshan/i.test(to)) return `Local ${to}`;
    return `Local ${to} Tour`;
  }
  if (pkg.category === "Weekend Trips" && /any|flexible/i.test(to)) {
    return "Custom Tour Package";
  }
  return `${from} to ${to}`;
}

function toPackageReview(review: AdminReview): PackageReview {
  return {
    name: review.name,
    location: "",
    rating: review.rating,
    text: review.text,
    route: review.route,
    date: review.date,
  };
}

export function toTravelPackage(
  pkg: AdminPackage,
  approved: AdminReview[]
): TravelPackage {
  const seed = seedPackages.find((s) => s.slug === pkg.slug);
  const matched = approved
    .filter((r) => r.route === pkg.route)
    .slice(0, 4);
  const packageReviews = matched.length ? matched : approved.slice(0, 4);

  return {
    slug: pkg.slug,
    name: seed?.name ?? deriveName(pkg),
    destination: pkg.to,
    route: pkg.route,
    category: pkg.category as Category,
    distance: pkg.distance,
    duration: pkg.duration,
    price: pkg.price,
    priceNum: pkg.priceNum,
    roundTrip: pkg.roundTrip,
    description: pkg.description,
    longDescription: seed?.longDescription ?? pkg.description,
    included: pkg.included ?? [],
    notIncluded: seed?.notIncluded ?? [],
    highlights: seed?.highlights ?? [],
    image:
      (seed?.image?.startsWith("/images/") ? seed.image : null) ||
      pkg.image ||
      seed?.image ||
      "/images/logo.jpeg",
    imageAlt: pkg.imageAlt || `${seed?.name ?? deriveName(pkg)} taxi service`,
    gallery: (seed?.gallery && seed.gallery[0]?.src?.startsWith("/images/")
      ? seed.gallery
      : (pkg.gallery ?? []).map((src) => ({
          src,
          alt: pkg.imageAlt || `${pkg.route} taxi gallery`,
        }))),
    reviews: packageReviews.map(toPackageReview),
    faqs: seed?.faqs ?? DEFAULT_FAQS,
    badge: pkg.badge || undefined,
    featured: pkg.featured,
    seoTitle: pkg.seoTitle,
    seoDescription: pkg.seoDescription,
  };
}

export async function getSiteSnapshot(): Promise<SiteData> {
  const [settings, adminPackages, allReviews, vehicles, gallery, destinations, pricing] =
    await Promise.all([
      readCollection<SiteSettings>("settings" as CollectionName),
      readCollection<AdminPackage[]>("packages" as CollectionName),
      readCollection<AdminReview[]>("reviews" as CollectionName),
      readCollection<AdminVehicle[]>("vehicles" as CollectionName),
      readCollection<GalleryItem[]>("gallery" as CollectionName),
      readCollection<AdminDestination[]>("destinations" as CollectionName),
      readCollection<PricingConfig>("pricing" as CollectionName),
    ]);

  const approved = allReviews
    .filter((r) => r.status === "approved")
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const packages = adminPackages
    .filter((p) => p.status === "active")
    .map((p) => toTravelPackage(p, approved));

  const reviewCount = approved.length;
  const avgRating = reviewCount
    ? Math.round((approved.reduce((sum, r) => sum + r.rating, 0) / reviewCount) * 10) / 10
    : 4.9;

  const categories = [
    "All",
    ...Array.from(new Set(adminPackages.map((p) => p.category))),
  ];

  // Guarantee logo, favicon and ogImage fallbacks for Sai Vaishnavi Tours and Travels
  const safeSettings: SiteSettings = {
    ...settings,
    logo: settings?.logo || "/images/logo.jpeg",
    favicon: settings?.favicon || "/images/metadata-emblem.png",
    seo: {
      ...(settings?.seo || {}),
      ogImage: "/images/metadata-emblem.png",
    },
  };

  // Merge seedVehicles to guarantee Winger, 20-Seater, 26-Seater and Urbania are always loaded
  const seedList = seedVehicles();
  const allVehicles = [...vehicles];
  for (const s of seedList) {
    if (!allVehicles.some((v) => v.id === s.id)) {
      allVehicles.push(s);
    }
  }

  const safeVehicles = allVehicles
    .filter((v) => v.status === "available")
    .map((v) => {
      const name = (v.name || "").toLowerCase();
      if (v.id === "veh-dzire" || name.includes("dzire")) {
        return { ...v, image: "/images/dzire.jpg", price: "₹13 / km" };
      }
      if (
        v.id === "veh-ertiga" ||
        name.includes("ertiga") ||
        name.includes("maruti")
      ) {
        return { ...v, image: "/images/xuv.jpeg", price: "₹15 / km" };
      }
      if (
        v.id === "veh-innova" ||
        name.includes("innova") ||
        name.includes("crysta")
      ) {
        return { ...v, image: "/images/crysta1.jpeg", price: "₹20 / km" };
      }
      if (name.includes("26") && (name.includes("non") || v.id.includes("non"))) {
        return { ...v, price: "₹35 / km" };
      }
      if (name.includes("26")) {
        return { ...v, price: "₹40 / km" };
      }
      if (name.includes("20") && (name.includes("non") || v.id.includes("non"))) {
        return { ...v, price: "₹28 / km" };
      }
      if (name.includes("20")) {
        return { ...v, price: "₹32 / km" };
      }
      if (name.includes("winger") && (name.includes("non") || v.id.includes("non"))) {
        return { ...v, price: "₹25 / km" };
      }
      if (name.includes("winger")) {
        return { ...v, price: "₹28 / km" };
      }
      if (name.includes("urbania") || name.includes("urbaniya")) {
        return { ...v, price: "₹35 / km" };
      }
      return v;
    });

  const safeDestinations = destinations
    .filter((d) => d.status === "active")
    .map((d) => {
      const name = (d.name || "").toLowerCase();
      const city = (d.city || "").toLowerCase();
      if (d.id === "dst-1" || name.includes("nashik") || city.includes("nashik")) {
        return { ...d, image: "/images/nashik_img.avif" };
      }
      if (
        d.id === "dst-2" ||
        name.includes("sambhaji") ||
        name.includes("aurangabad") ||
        city.includes("aurangabad")
      ) {
        return { ...d, image: "/images/sambhaji_nagar.jpg" };
      }
      if (d.id === "dst-4" || name.includes("shani") || name.includes("shingnapur")) {
        return { ...d, image: "/images/shignapur.webp" };
      }
      if (d.id === "dst-6" || name.includes("kolhapur")) {
        return { ...d, image: "/images/mahalaxmi-temple-kolhapur-1-attr-nearby.jpg" };
      }
      if (d.id === "dst-7" || name.includes("pandharpur")) {
        return { ...d, image: "/images/pandharpur.webp" };
      }
      if (d.id === "dst-8" || name.includes("saptashringi") || name.includes("vani")) {
        return { ...d, image: "/images/vani.jpg" };
      }
      if (d.id === "dst-10" || name.includes("malshej")) {
        return { ...d, image: "/images/malshej.webp" };
      }
      if (d.id === "dst-11" || name.includes("shivneri")) {
        return { ...d, image: "/images/shivneri.jpg" };
      }
      if (d.id === "dst-12" || name.includes("sinhagad")) {
        return { ...d, image: "/images/Sinhagad-Fort.avif" };
      }
      if (d.id === "dst-13" || name.includes("lonavala") || name.includes("lonavla")) {
        return { ...d, image: "/images/lonavla.jpg" };
      }
      if (d.id === "dst-14" || name.includes("mahabaleshwar") || name.includes("panchgani")) {
        return { ...d, image: "/images/panchgani-mahabaleshwar-maharashtra-2-attr-hero.jpg" };
      }
      if (d.id === "dst-15" || name.includes("igatpuri")) {
        return { ...d, image: "/images/Igatpuri.jpg" };
      }
      if (d.id === "dst-17" || name.includes("ahmednagar") || name.includes("ahilya")) {
        return { ...d, image: "/images/ahilyanagr.jpg" };
      }
      return d;
    });

  const seedP = seedPricing();
  const baseVehiclePricing =
    pricing?.vehiclePricing && pricing.vehiclePricing.length >= 8
      ? pricing.vehiclePricing
      : seedP.vehiclePricing;

  const safePricing: PricingConfig = {
    vehiclePricing: baseVehiclePricing.map((vp) => {
      const name = (vp.name || "").toLowerCase();
      let perKm = vp.perKm;
      if (name.includes("26") && (name.includes("non") || vp.vehicleId?.includes("non"))) perKm = 35;
      else if (name.includes("26")) perKm = 40;
      else if (name.includes("20") && (name.includes("non") || vp.vehicleId?.includes("non"))) perKm = 28;
      else if (name.includes("20")) perKm = 32;
      else if (name.includes("winger") && (name.includes("non") || vp.vehicleId?.includes("non"))) perKm = 25;
      else if (name.includes("winger")) perKm = 28;
      else if (name.includes("urbania") || name.includes("urbaniya")) perKm = 35;
      else if (vp.vehicleId === "veh-dzire" || name.includes("dzire")) perKm = 13;
      else if (vp.vehicleId === "veh-ertiga" || name.includes("ertiga") || name.includes("maruti")) perKm = 15;
      else if (vp.vehicleId === "veh-innova" || name.includes("innova") || name.includes("crysta")) perKm = 20;

      return { ...vp, perKm, extraKmRate: perKm };
    }),
    destinationPricing: pricing?.destinationPricing ?? seedP.destinationPricing,
    extraCharges: pricing?.extraCharges ?? seedP.extraCharges,
    calculator: pricing?.calculator ?? seedP.calculator,
  };

  return {
    settings: safeSettings,
    categories,
    packages,
    vehicles: safeVehicles,
    reviews: approved,
    gallery,
    destinations: safeDestinations,
    pricing: safePricing,
    stats: { avgRating, reviewCount },
  };
}

export async function addPublicReview(input: {
  name: string;
  route: string;
  rating: number;
  text: string;
}): Promise<AdminReview> {
  const reviews = await readCollection<AdminReview[]>("reviews" as CollectionName);
  const review: AdminReview = {
    id: `user-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    name: input.name.trim().slice(0, 80),
    route: input.route.trim().slice(0, 120) || "Shirdi Darshan",
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    text: input.text.trim().slice(0, 1000),
    date: new Date().toISOString().slice(0, 10),
    status: "pending",
    featured: false,
    source: "user",
  };
  await writeCollection("reviews" as CollectionName, [review, ...reviews]);
  return review;
}

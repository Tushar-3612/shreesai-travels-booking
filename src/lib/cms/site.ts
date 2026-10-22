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
} from "@/admin/types";
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
    image: pkg.image,
    imageAlt: pkg.imageAlt,
    gallery: (pkg.gallery ?? []).map((src) => ({
      src,
      alt: pkg.imageAlt || `${pkg.route} taxi gallery`,
    })),
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

  return {
    settings,
    categories,
    packages,
    vehicles: vehicles.filter((v) => v.status === "available"),
    reviews: approved,
    gallery,
    destinations: destinations.filter((d) => d.status === "active"),
    pricing,
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

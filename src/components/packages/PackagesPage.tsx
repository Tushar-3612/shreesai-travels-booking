"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiBox } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { type TravelPackage } from "@/data/packages";
import { bookMessage, useSiteData, whatsappHref } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageCard from "@/components/packages/PackageCard";
import OurVehicles from "@/components/OurVehicles";
import FaqAccordion from "@/components/packages/FaqAccordion";

interface PackagesPageProps {
  initialCategory?: string;
  packages: TravelPackage[];
  categories: string[];
}

function SkeletonCard() {
  return (
    <div className="rounded-[28px] bg-white border border-border/60 overflow-hidden shadow-sm">
      <div className="aspect-[16/11] bg-slate-100 animate-pulse" />
      <div className="p-6 space-y-3">
        <div className="h-2.5 bg-slate-100 animate-pulse rounded-full w-1/3" />
        <div className="h-5 bg-slate-100 animate-pulse rounded-lg w-3/4" />
        <div className="flex gap-2">
          <div className="h-7 bg-slate-100 animate-pulse rounded-xl w-20" />
          <div className="h-7 bg-slate-100 animate-pulse rounded-xl w-20" />
        </div>
        <div className="h-3 bg-slate-100 animate-pulse rounded w-full" />
        <div className="h-3 bg-slate-100 animate-pulse rounded w-5/6" />
      </div>
    </div>
  );
}

const FAQS = [
  {
    q: "How much does a taxi package from Shirdi cost?",
    a: "Prices are transparent and starting fares are shown on every card. Fuel, tolls, parking and driver are included; the exact amount depends on car type (sedan / SUV / tempo) and the route you choose.",
  },
  {
    q: "Can I book a one-way taxi from Shirdi?",
    a: "Yes. Every package supports one-way journeys. One-way is best when you plan to stay back or travel onward, and we confirm the exact one-way fare with you before the trip.",
  },
  {
    q: "Can I book a round trip to the same destination?",
    a: "Absolutely. Round trips are our most popular choice - the car waits comfortably (temple, office or hotel) and returns you to Shirdi. Fares are fixed in advance.",
  },
  {
    q: "Is night travel available?",
    a: "Yes, we operate 24x7. Night journeys and early-morning darshan or airport pickups are handled by experienced night drivers familiar with the route.",
  },
  {
    q: "Which cars are available for these packages?",
    a: "We offer a clean AC fleet - Swift Dzire, Mahindra XUV, Ertiga, Innova Crysta and 7-seater travellers for larger groups. A suitable car is assigned based on your package and guest count.",
  },
  {
    q: "How quickly can I book?",
    a: "Instant. Tap Book Now or Call/WhatsApp below - share your date and pickup point, and get a confirmed driver within minutes.",
  },
];

export default function PackagesPage({
  initialCategory,
  packages,
  categories,
}: PackagesPageProps) {
  const site = useSiteData();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(
    categories.includes(initialCategory ?? "") ? (initialCategory as string) : "All"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return packages.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.destination.toLowerCase().includes(q) ||
        p.route.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category, packages]);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    packages.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1));
    return map;
  }, [packages]);

  const planHref = whatsappHref(
    site?.settings.whatsapp || "",
    bookMessage(
      site?.settings.businessName || "Shirdi Car Rental",
      "I'd like to book a taxi package from Shirdi."
    )
  );

  return (
    <div className="bg-white">
      <Navbar />

      <main className="pt-12 lg:pt-16">
        {/* ===== PAGE HEADER (no hero) ===== */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-10"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/15 text-primary text-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {packages.length}+ Verified Packages · 24x7 Support
              </span>
              <h1 className="section-title mt-4">
                Popular Taxi Packages From{" "}
                <span className="gradient-text">Shirdi</span>
              </h1>
              <p className="section-subtitle">
                Choose your destination and enjoy a safe, comfortable and
                affordable journey with professional drivers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===== SEARCH + FILTER ===== */}
        <section className="bg-bg-alt pb-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-[24px] bg-white border border-border/70 shadow-xl shadow-black/5 p-4 sm:p-5"
            >
              <div className="grid lg:grid-cols-[1fr_auto] items-center gap-3">
                <div className="relative">
                  <FiSearch
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-primary"
                    size={20}
                  />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search destination..."
                    aria-label="Search destination"
                    className="w-full h-14 pl-14 pr-5 rounded-2xl bg-bg-alt border-2 border-transparent focus:border-primary text-secondary font-medium placeholder:text-slate-400 outline-none transition-all duration-300"
                  />
                </div>
                <a
                  href={planHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-14 px-6 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white font-semibold text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FaWhatsapp size={18} />
                  Plan My Trip
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-4 border-t border-border/70 pt-4">
                {categories.map((cat) => {
                  const active = category === cat;
                  const count =
                    cat === "All" ? packages.length : counts.get(cat) ?? 0;
                  return (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                        active
                          ? "bg-primary text-white border-primary shadow-md shadow-primary/25"
                          : "bg-white text-secondary border-border hover:border-primary hover:text-primary"
                      }`}
                    >
                      {cat}
                      <span
                        className={`inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-bg-alt text-text-muted group-hover:bg-primary/10 group-hover:text-primary"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
                <p className="ml-auto text-sm text-text-muted hidden md:block">
                  {filtered.length} package{filtered.length !== 1 ? "s" : ""}{" "}
                  found
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== PACKAGE GRID ===== */}
        <section id="packages" className="py-12 lg:py-16 bg-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                {category === "All" ? "All Packages" : category}
              </span>
              <h2 className="section-title mt-2">
                {category === "All" ? (
                  <>
                    Popular{" "}
                    <span className="gradient-text">Destinations</span> From
                    Shirdi
                  </>
                ) : (
                  <>
                    {category} <span className="gradient-text">Taxi Packages</span>
                  </>
                )}
              </h2>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-2xl mb-0">
                Transparent fares, fuel & tolls included, and a fleet of clean
                AC cars - pick a package and we&apos;ll handle the rest.
              </p>
            </motion.div>

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            ) : (
              <motion.div
                layout
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((pkg, i) => (
                    <PackageCard key={pkg.slug} pkg={pkg} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {!loading && filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <FiBox size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">
                  No packages found
                </h3>
                <p className="text-text-muted mb-6">
                  Try a different search or clear your filters.
                </p>
                <button
                  onClick={() => {
                    setQuery("");
                    setCategory("All");
                  }}
                  className="btn-primary"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </div>
        </section>

        <OurVehicles />

        {/* ===== COMPANY PROMISE ===== */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary/95" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-6">
                We provide clean, comfortable and well-maintained{" "}
                <span className="gradient-gold">vehicles</span> for every
                journey.
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Every car is sanitised before each trip, serviced on schedule
                and driven by verified professionals - so your only job is to
                enjoy the ride.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-8 text-white/80 text-sm font-medium">
                {[
                  "Sanitised fleet",
                  "Verified drivers",
                  "Transparent fares",
                  "24x7 support",
                ].map((feat) => (
                  <span key={feat} className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {feat}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <FaqAccordion faqs={FAQS} />
      </main>

      <Footer />
    </div>
  );
}

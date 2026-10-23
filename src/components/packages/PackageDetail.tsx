"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiMapPin,
  FiClock,
  FiCheck,
  FiX,
  FiPhone,
  FiStar,
  FiShield,
  FiChevronRight,
  FiTrendingUp,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { BsCarFront } from "react-icons/bs";
import { type TravelPackage } from "@/data/packages";
import { bookMessage, getRelated, packageBookingMessage, useSiteData, whatsappHref } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageCard from "@/components/packages/PackageCard";
import PackageReviews from "@/components/packages/PackageReviews";
import FaqAccordion from "@/components/packages/FaqAccordion";

interface PackageDetailProps {
  pkg: TravelPackage;
  allPackages: TravelPackage[];
}

export default function PackageDetail({ pkg, allPackages }: PackageDetailProps) {
  const site = useSiteData();
  const settings = site?.settings;
  const businessName = settings?.businessName || "Sai Vaishnavi Tours and Travels";
  const isCustom = pkg.priceNum === 0;
  const bookText = packageBookingMessage(businessName, pkg);
  const bookHref = whatsappHref(settings?.whatsapp || "917498462597", bookText);

  const rating = site && site.stats.reviewCount > 0 ? site.stats.avgRating : 4.9;
  const ratingText = site && site.stats.reviewCount > 0
    ? `${site.stats.avgRating}/5 from ${site.stats.reviewCount.toLocaleString("en-IN")} happy travellers`
    : "4.9/5 from 1,200+ happy travellers";

  const reviewItems = useMemo(() => pkg.reviews.slice(0, 4), [pkg.reviews]);
  const related = useMemo(
    () => getRelated(allPackages, pkg.slug, 3),
    [allPackages, pkg.slug]
  );

  return (
    <div id="app" className="bg-white pb-24 lg:pb-0">
      <Navbar />

      <main>
        {/* ===== BANNER ===== */}
        <section className="relative">
          <div className="relative h-[520px] lg:h-[560px] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pkg.image}
              alt={pkg.imageAlt}
              width={1920}
              height={1080}
              fetchPriority="high"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/30 to-secondary/20" />
          </div>

          <div className="absolute inset-0 z-10 flex flex-col">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
              <nav
                className="flex items-center gap-2 text-white/70 text-sm font-medium mb-auto"
                aria-label="Breadcrumb"
              >
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <FiChevronRight size={14} />
                <Link
                  href="/packages"
                  className="hover:text-white transition-colors"
                >
                  Packages
                </Link>
                <FiChevronRight size={14} />
                <span className="text-white">{pkg.name}</span>
              </nav>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] font-semibold uppercase tracking-wider text-white">
                    {pkg.category}
                  </span>
                  {pkg.badge && (
                    <span className="px-3 py-1.5 rounded-full bg-accent text-secondary text-[11px] font-bold shadow-lg shadow-accent/40">
                      {pkg.badge}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-sm font-semibold text-white">
                    <FiStar className="fill-accent text-accent" size={16} />
                    {rating.toFixed(1)} ·{" "}
                    {site && site.stats.reviewCount > 0
                      ? `${site.stats.reviewCount.toLocaleString("en-IN")} rides`
                      : "1,200+ rides"}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-white max-w-3xl leading-tight mb-6 drop-shadow-lg">
                  {pkg.name}
                </h1>

                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-white font-semibold">
                    <FiMapPin size={18} className="text-accent" />
                    {pkg.distance}
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-white font-semibold">
                    <FiClock size={18} className="text-accent" />
                    {pkg.duration}
                  </span>
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 text-white font-semibold">
                    <BsCarFront size={18} className="text-accent" />
                    Premium AC Fleet
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== CONTENT ===== */}
        <section className="section-padding bg-white pt-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1fr_380px] gap-10">
              {/* LEFT COLUMN */}
              <div className="space-y-12 min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="section-title !text-2xl sm:!text-3xl">
                    About This <span className="gradient-text">Trip</span>
                  </h2>
                  <p className="text-text-muted leading-relaxed text-[15px] sm:text-base">
                    {pkg.longDescription}
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4 mt-8">
                    <div className="rounded-2xl bg-bg-alt border border-border/60 p-5 text-center">
                      <p className="text-sm font-medium text-accent mb-1">
                        One Way
                      </p>
                      <p className="text-xl font-extrabold text-secondary">
                        {isCustom ? "Custom" : pkg.price}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-bg-alt border border-border/60 p-5 text-center">
                      <p className="text-sm font-medium text-success mb-1">
                        Round Trip
                      </p>
                      <p className="text-xl font-extrabold text-secondary">
                        {isCustom ? "Custom" : pkg.roundTrip}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-bg-alt border border-border/60 p-5 text-center">
                      <p className="text-sm font-medium text-primary mb-1">
                        Car Type
                      </p>
                      <p className="text-xl font-extrabold text-secondary">
                        AC Sedan+
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="section-title mb-6 text-2xl sm:text-3xl">
                    Trip Highlights
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {pkg.highlights.map((h, i) => (
                      <div
                        key={h}
                        className="group rounded-2xl border border-border/70 p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
                      >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white font-extrabold shadow-lg shadow-primary/30 mb-4">
                          {i + 1}
                        </span>
                        <p className="font-semibold text-secondary leading-snug">
                          {h}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Included / Not included */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid sm:grid-cols-2 gap-5"
                >
                  <div className="rounded-3xl bg-green-50/60 border border-green-100 p-7">
                    <h3 className="font-bold text-secondary text-lg mb-4 flex items-center gap-2">
                      <FiCheck className="text-success" size={20} />
                      What&apos;s Included
                    </h3>
                    <ul className="space-y-3">
                      {pkg.included.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm font-medium text-secondary/85"
                        >
                          <span className="w-6 h-6 rounded-full bg-white text-success flex items-center justify-center shrink-0 shadow-sm">
                            <FiCheck size={14} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl bg-rose-50/60 border border-rose-100 p-7">
                    <h3 className="font-bold text-secondary text-lg mb-4 flex items-center gap-2">
                      <FiX className="text-rose-500" size={20} />
                      What&apos;s Not Included
                    </h3>
                    <ul className="space-y-3">
                      {pkg.notIncluded.length === 0 ? (
                        <li className="text-sm font-medium text-secondary/85">
                          Nothing! Our rate covers fuel, tolls, parking and
                          driver throughout the trip.
                        </li>
                      ) : (
                        pkg.notIncluded.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm font-medium text-secondary/85"
                          >
                            <span className="w-6 h-6 rounded-full bg-white text-rose-500 flex items-center justify-center shrink-0 shadow-sm">
                              <FiX size={14} />
                            </span>
                            {item}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </motion.div>

                {/* Gallery */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="section-title mb-6 text-2xl sm:text-3xl">
                    Gallery & The Route
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {pkg.gallery.map((g, i) => (
                      <div
                        key={g.src + i}
                        className={`group overflow-hidden rounded-2xl ${
                          i === 0 ? "md:col-span-2 md:row-span-2" : ""
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={g.src}
                          alt={g.alt}
                          loading="lazy"
                          className={`${
                            i === 0
                              ? "h-full min-h-[180px] md:min-h-[360px]"
                              : "aspect-[4/3]"
                          } w-full object-cover transition-transform duration-700 group-hover:scale-110`}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* RIGHT SIDEBAR */}
              <motion.aside
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:sticky lg:top-28 h-fit"
              >
                <div className="rounded-[28px] border border-border/70 shadow-[0_20px_50px_-20px_rgba(37,99,235,0.25)] overflow-hidden">
                  <div className="bg-gradient-to-br from-primary to-primary-dark p-6 text-white">
                    <p className="text-white/80 text-sm font-medium">
                      Starting from
                    </p>
                    <p className="text-4xl font-extrabold mt-1">
                      {isCustom ? "Custom" : pkg.price}
                    </p>
                    {!isCustom && (
                      <p className="text-white/80 text-sm mt-1">
                        Round trip {pkg.roundTrip}
                      </p>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <div className="rounded-xl bg-bg-alt p-3 text-center">
                        <FiMapPin className="text-primary mx-auto mb-1" size={16} />
                        <p className="text-xs font-bold text-secondary">
                          {pkg.distance}
                        </p>
                        <p className="text-[10px] text-text-muted">Distance</p>
                      </div>
                      <div className="rounded-xl bg-bg-alt p-3 text-center">
                        <FiClock className="text-primary mx-auto mb-1" size={16} />
                        <p className="text-xs font-bold text-secondary">
                          {pkg.duration}
                        </p>
                        <p className="text-[10px] text-text-muted">Travel</p>
                      </div>
                      <div className="rounded-xl bg-bg-alt p-3 text-center">
                        <FiTrendingUp className="text-primary mx-auto mb-1" size={16} />
                        <p className="text-xs font-bold text-secondary">24x7</p>
                        <p className="text-[10px] text-text-muted">Service</p>
                      </div>
                    </div>

                    <a
                      href={bookHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 mb-3"
                    >
                      <FiCheck size={20} />
                      Book Now
                    </a>
                    <a
                      href={bookHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#25D366] text-white font-bold shadow-md shadow-[#25D366]/30 hover:bg-[#1eb858] transition-all duration-300 mb-3"
                    >
                      <FaWhatsapp size={20} />
                      WhatsApp Us
                    </a>
                    <a
                      href={`tel:${settings?.phone || "+919225396800"}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-border text-secondary font-bold hover:border-primary hover:text-primary transition-all duration-300"
                    >
                      <FiPhone size={18} />
                      Call {settings?.phoneDisplay || "+91 92253 96800"}
                    </a>

                    <div className="mt-5 space-y-2.5">
                      {[
                        "Fuel, tolls & parking included",
                        "Free cancellation up to 24 hrs",
                        "Verified professional driver",
                      ].map((f) => (
                        <p
                          key={f}
                          className="flex items-center gap-2 text-[13px] text-text-muted"
                        >
                          <FiShield className="text-success shrink-0" size={14} />
                          {f}
                        </p>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-2 rounded-xl bg-bg-alt p-3">
                      <FiStar className="fill-accent text-accent shrink-0" size={16} />
                      <p className="text-xs font-medium text-secondary">
                        {ratingText}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        <PackageReviews
          items={reviewItems}
          headline={`What Fellow Travellers Say`}
          subtitle={`Real reviews for the ${pkg.name} package.`}
        />

        <FaqAccordion faqs={pkg.faqs} />

        {/* Related */}
        <section id="related" className="section-padding bg-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest">
                Keep Exploring
              </span>
              <h2 className="section-title mt-2">
                More Popular <span className="gradient-text">Packages</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <PackageCard key={p.slug} pkg={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Mobile sticky booking bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border/70 bg-white/95 backdrop-blur-xl px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-10px_30px_-15px_rgba(2,6,23,0.3)]">
        <div>
          <p className="text-[11px] text-text-muted font-medium">
            Starting from
          </p>
          <p className="text-2xl font-extrabold text-secondary leading-none">
            {isCustom ? "Custom" : pkg.price}
          </p>
        </div>
        <a
          href={bookHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white font-bold text-base shadow-lg shadow-primary/30"
        >
          <FaWhatsapp size={20} />
          Book Now
        </a>
      </div>
    </div>
  );
}

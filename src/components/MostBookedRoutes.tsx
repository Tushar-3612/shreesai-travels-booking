"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiMapPin, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { type TravelPackage } from "@/data/packages";
import { packageBookingMessage, useSiteData, whatsappHref } from "@/lib/site";

export default function MostBookedRoutes() {
  const site = useSiteData();
  const settings = site?.settings;
  const businessName = settings?.businessName || "Sai Vaishnavi Tours and Travels";

  const routes = (settings?.mostBookedRoutes ?? [])
    .map((item) => {
      const pkg = site?.packages.find((p) => p.slug === item.slug);
      if (!pkg) return null;
      return pkg;
    })
    .filter((r): r is TravelPackage => r !== null);

  const track = [...routes, ...routes];

  return (
    <section id="routes" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Top Routes
          </span>
          <h2 className="section-title mt-2">
            Most Booked <span className="gradient-text">Routes</span>
          </h2>
          <p className="section-subtitle">
            Our travellers book these journeys the most - transparent fares,
            fuel & tolls included, professional drivers.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent" />

        <div
          className="marquee-track flex gap-5 w-max py-4"
          style={{ animationDuration: "55s" }}
        >
          {track.map((pkg, i) => {
            const isCustom = pkg.priceNum === 0;
            const bookHref = whatsappHref(
              settings?.whatsapp || "917498462597",
              packageBookingMessage(businessName, pkg)
            );
            return (
              <div
                key={`${pkg.slug}-${i}`}
                className="group relative w-[300px] sm:w-[330px] shrink-0 rounded-[24px] bg-white border border-border/60 overflow-hidden shadow-[0_12px_35px_-15px_rgba(2,6,23,0.15)] hover:shadow-[0_28px_55px_-18px_rgba(37,99,235,0.3)] hover:-translate-y-1.5 transition-all duration-500"
              >
                <Link
                  href={`/packages/${pkg.slug}`}
                  className="relative block h-44 overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] font-bold uppercase tracking-wider text-white">
                    {pkg.category}
                  </span>
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="text-[11px] font-medium uppercase tracking-widest text-white/70">
                      Starting from
                    </p>
                    <p className="text-2xl font-extrabold text-white leading-tight">
                      {isCustom ? "Custom Quote" : pkg.price}
                    </p>
                  </div>
                </Link>

                <div className="p-5">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-secondary mb-4">
                    <FiMapPin className="text-primary shrink-0" size={16} />
                    {pkg.route}
                  </h3>
                  <div className="flex gap-2.5">
                    <a
                      href={bookHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white text-sm font-bold shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <FaWhatsapp size={14} />
                      Book Now
                    </a>
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-border text-secondary text-sm font-semibold hover:border-primary hover:text-primary transition-all duration-300"
                    >
                      View Details
                      <FiArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

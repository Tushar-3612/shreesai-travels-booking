"use client";

import { motion } from "framer-motion";
import { FiMapPin, FiClock, FiCheck, FiArrowRight, FiStar } from "react-icons/fi";
import { BsCarFront } from "react-icons/bs";
import { type TravelPackage } from "@/data/packages";
import { packageBookingMessage, useSiteData, whatsappHref } from "@/lib/site";

interface PackageCardProps {
  pkg: TravelPackage;
  index: number;
}

export default function PackageCard({ pkg, index }: PackageCardProps) {
  const site = useSiteData();
  const settings = site?.settings;
  const businessName = settings?.businessName || "Sai Vaishnavi Tours and Travels";
  const isCustom = pkg.priceNum === 0;
  const bookHref = whatsappHref(
    settings?.whatsapp || "917498462597",
    packageBookingMessage(businessName, pkg)
  );

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.06 }}
      className="group relative bg-white rounded-[28px] overflow-hidden border border-slate-100 shadow-[0_10px_30px_-12px_rgba(2,6,23,0.12)] hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.28)] hover:-translate-y-2 transition-all duration-500"
    >
      <a href={`/packages/${pkg.slug}`} className="relative block overflow-hidden">
        <div className="relative aspect-[16/11] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pkg.image}
            alt={pkg.imageAlt}
            width={1200}
            height={750}
            loading={index < 3 ? "eager" : "lazy"}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent opacity-80" />

          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] font-semibold uppercase tracking-wider text-white">
              {pkg.category}
            </span>
            {pkg.badge && (
              <span className="px-3 py-1.5 rounded-full bg-accent text-secondary text-[11px] font-bold shadow-lg shadow-accent/40">
                {pkg.badge}
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <div className="rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 px-4 py-2.5 shadow-xl">
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/70 leading-tight">
                Starting from
              </p>
              <p className="text-white font-extrabold text-xl leading-snug">
                {isCustom ? "Custom Quote" : pkg.price}
              </p>
            </div>
            <div className="w-11 h-11 rounded-full bg-white/90 text-primary flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 shadow-lg">
              <FiArrowRight size={18} />
            </div>
          </div>
        </div>
      </a>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
            {pkg.route}
          </p>
          <div className="flex items-center gap-1 text-accent">
            <FiStar className="fill-accent" size={14} />
            <span className="text-xs font-bold text-secondary">
              {site && site.stats.reviewCount > 0 ? site.stats.avgRating.toFixed(1) : "4.9"}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-secondary mb-3">
          {pkg.name}
        </h3>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg-alt text-sm font-medium text-text-muted">
            <FiMapPin className="text-primary" size={14} />
            {pkg.distance}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg-alt text-sm font-medium text-text-muted">
            <FiClock className="text-primary" size={14} />
            {pkg.duration}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-success/10 text-sm font-medium text-success">
            <BsCarFront size={14} />
            AC Car
          </span>
        </div>

        <p className="text-sm text-text-muted leading-relaxed mb-5">
          {pkg.description}
        </p>

        <ul className="grid grid-cols-2 gap-2 mb-6">
          {pkg.included.slice(0, 4).map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-[13px] font-medium text-secondary/80"
            >
              <span className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                <FiCheck className="text-success" size={12} />
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="border-t border-border pt-4 flex gap-3">
          <a
            href={bookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            Book Now
          </a>
          <a
            href={`/packages/${pkg.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-border text-secondary text-sm font-semibold hover:border-primary hover:text-primary transition-all duration-300"
          >
            View Details
          </a>
        </div>
      </div>
    </motion.article>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useSiteData } from "@/lib/site";
import PackageCard from "@/components/packages/PackageCard";

export default function FeaturedPackages() {
  const site = useSiteData();
  const all = site?.packages ?? [];
  const flagged = all.filter((p) => p.featured);
  const featured = (flagged.length ? flagged : all).slice(0, 4);

  return (
    <section id="packages" className="section-padding bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Popular Packages
          </span>
          <h2 className="section-title mt-2">
            Featured Taxi <span className="gradient-text">Packages</span> From
            Shirdi
          </h2>
          <p className="section-subtitle">
            Transparent fares, fuel & tolls included, and professional drivers
            - choose your destination and we&apos;ll handle the rest.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((pkg, i) => (
            <PackageCard key={pkg.slug} pkg={pkg} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link
            href="/packages"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-primary text-primary font-bold text-base hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300"
          >
            View All Packages
            <FiArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

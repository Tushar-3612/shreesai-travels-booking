"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight, FiStar } from "react-icons/fi";
import { useSiteData } from "@/lib/site";
import ReviewCard from "@/components/ReviewCard";

export default function ReviewsPreview() {
  const site = useSiteData();
  const reviews = site?.reviews ?? [];
  const latest = reviews.slice(0, 3);

  const avg =
    site && site.stats.reviewCount > 0
      ? site.stats.avgRating.toFixed(1)
      : "4.9";
  const reviewCount = site?.stats.reviewCount ?? 0;

  return (
    <section id="reviews" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="section-title mt-2">
            Latest Customer <span className="gradient-text">Reviews</span>
          </h2>
          <p className="section-subtitle">
            Real feedback from travellers who booked taxi packages with us from
            Shirdi.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-border/70 shadow-sm">
            <span className="text-3xl font-extrabold text-secondary">{avg}</span>
            <div className="text-left">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FiStar key={i} size={16} className="fill-accent text-accent" />
                ))}
              </div>
              <p className="text-xs text-text-muted mt-0.5">
                Based on {reviewCount.toLocaleString("en-IN")} verified trips
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {latest.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="h-full"
            >
              <ReviewCard review={review} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center mt-10"
        >
          <Link
            href="/reviews"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-primary text-primary font-bold text-base hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300"
          >
            View All Reviews
            <FiArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

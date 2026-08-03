"use client";

import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import { sortNewestFirst, type Review } from "@/data/reviews";
import { useSiteData } from "@/lib/site";
import ReviewCard from "@/components/ReviewCard";
import FeedbackForm from "@/components/FeedbackForm";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ReviewsPage() {
  const site = useSiteData();
  const reviews: Review[] = (site?.reviews ?? []).map((r) => ({
    id: r.id,
    name: r.name,
    route: r.route,
    rating: r.rating,
    text: r.text,
    date: r.date,
    verified: true,
  }));

  const avg =
    site && site.stats.reviewCount > 0
      ? site.stats.avgRating.toFixed(1)
      : "4.9";
  const reviewCount = site?.stats.reviewCount ?? 0;

  return (
    <>
      <section id="reviews" className="pt-14 lg:pt-20 pb-4 bg-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Testimonials
            </span>
            <h1 className="section-title mt-2">
              Approved Customer <span className="gradient-text">Reviews</span>
            </h1>
            <p className="section-subtitle">
              Real feedback from verified travellers who booked taxi packages
              with us from Shirdi - newest reviews first.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-border/70 shadow-sm">
              <span className="text-3xl font-extrabold text-secondary">
                {avg}
              </span>
              <div className="text-left">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      size={16}
                      className="fill-accent text-accent"
                    />
                  ))}
                </div>
                <p className="text-xs text-text-muted mt-0.5">
                  Based on {reviewCount.toLocaleString("en-IN")} verified trips
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-4 bg-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {sortNewestFirst(reviews).map((review) => (
              <motion.div key={review.id} variants={cardVariants} className="h-full">
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <FeedbackForm />
    </>
  );
}

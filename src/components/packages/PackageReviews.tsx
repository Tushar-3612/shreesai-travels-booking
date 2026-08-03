"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiStar,
  FiChevronLeft,
  FiChevronRight,
  FiMessageSquare,
  FiMapPin,
} from "react-icons/fi";
import type { PackageReview } from "@/data/packages";
import { formatReviewDate } from "@/data/reviews";

interface PackageReviewsProps {
  items: PackageReview[];
  headline?: string;
  subtitle?: string;
}

export default function PackageReviews({
  items,
  headline = "What Travelers Say",
  subtitle = "Real feedback from travellers who booked these packages from Shirdi.",
}: PackageReviewsProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + items.length) % items.length);
    },
    [items.length]
  );

  useEffect(() => {
    if (paused || items.length < 2) return;
    const id = setInterval(() => go(1), 6000);
    return () => clearInterval(id);
  }, [paused, go, items.length]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 240 : -240, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -240 : 240, opacity: 0 }),
  };

  const review = items[current];
  const initial = (review?.name ?? "S").trim().charAt(0).toUpperCase() || "S";

  if (!items.length) return null;

  return (
    <section id="reviews" className="section-padding bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="section-title mt-2">
            {headline.includes("What") ? (
              <>
                What Our <span className="gradient-text">Customers</span> Say
              </>
            ) : (
              <span className="gradient-text">{headline}</span>
            )}
          </h2>
          <p className="section-subtitle">{subtitle}</p>
        </motion.div>

        <div
          className="max-w-3xl mx-auto relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-visible rounded-[28px]">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.figure
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="relative bg-white rounded-[28px] p-8 sm:p-12 text-center border border-border/50 shadow-[0_20px_60px_-20px_rgba(37,99,235,0.25)]"
              >
                <span className="absolute -top-5 -left-2 sm:left-6 w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/40">
                  <FiMessageSquare size={20} />
                </span>
                <span className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-3xl font-extrabold mx-auto mb-4 border-4 border-white shadow-xl ring-2 ring-primary/10">
                  {initial}
                </span>
                <div className="flex justify-center gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      size={18}
                      className={
                        i < review.rating
                          ? "fill-accent text-accent"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <blockquote className="text-lg sm:text-xl text-text-muted leading-relaxed mb-6 font-medium">
                  &ldquo;{review.text}&rdquo;
                </blockquote>
                <figcaption className="text-lg font-bold text-secondary">
                  {review.name}
                </figcaption>
                <p className="text-sm text-text-muted mt-1 flex items-center justify-center gap-1.5">
                  <FiMapPin className="text-primary" size={13} />
                  {review.route ?? `Travelled from ${review.location}`}
                  {review.date && (
                    <span className="text-text-muted/70">
                      · {formatReviewDate(review.date)}
                    </span>
                  )}
                </p>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => go(-1)}
              className="w-12 h-12 rounded-full border border-border hover:border-primary hover:text-primary flex items-center justify-center transition-all duration-300 bg-white shadow-sm hover:shadow-md"
              aria-label="Previous review"
            >
              <FiChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-8" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="w-12 h-12 rounded-full border border-border hover:border-primary hover:text-primary flex items-center justify-center transition-all duration-300 bg-white shadow-sm hover:shadow-md"
              aria-label="Next review"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
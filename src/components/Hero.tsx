"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPhone,
  FiCalendar,
  FiStar,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";
import { BsShieldFillCheck } from "react-icons/bs";
import { bookMessage, useSiteData, whatsappHref } from "@/lib/site";

const trustBadges = [
  { icon: <FiClock size={18} />, label: "24x7 Service" },
  { icon: <BsShieldFillCheck size={16} />, label: "Professional Drivers" },
  { icon: <FiStar size={18} />, label: "Clean Vehicles" },
  { icon: <FiDollarSign size={18} />, label: "Affordable Pricing" },
];

export default function Hero() {
  const site = useSiteData();
  const [index, setIndex] = useState(0);

  const slides = site?.settings.heroSlides ?? [];
  const settings = site?.settings;
  const businessName = settings?.businessName || "Shirdi Car Rental";

  useEffect(() => {
    if (slides.length < 2) return;
    const pick = () =>
      setIndex((i) => {
        const next = Math.floor(Math.random() * slides.length);
        return next === i ? (next + 1) % slides.length : next;
      });
    const first = setTimeout(pick, 400);
    const id = setInterval(pick, 6500);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [slides.length]);

  const slide = slides.length ? slides[index % slides.length] : null;
  const [before, after] = slide
    ? slide.gold
      ? slide.heading.split(slide.gold)
      : [slide.heading, ""]
    : ["", ""];

  const bookHref = whatsappHref(
    settings?.whatsapp || "",
    bookMessage(businessName, "I'd like to book a taxi. Please share available packages.")
  );

  return (
    <section
      id="home"
      className="relative min-h-[88vh] lg:min-h-screen flex items-center overflow-hidden bg-secondary"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-primary/90 z-10" />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {slide && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.35) saturate(0.55)" }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-white/80">
                {settings?.tagline || "Trusted Car Rental & Taxi Service in Shirdi"}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6">
              {before}
              {slide?.gold && <span className="gradient-gold">{slide.gold}</span>}
              {after}
            </h1>

            <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-9 max-w-xl">
              {slide?.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={bookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg px-8 py-4 shadow-2xl shadow-primary/40"
              >
                <FiCalendar size={20} />
                Book Now
              </a>
              <a
                href={`tel:${settings?.phone || ""}`}
                className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-accent hover:text-accent text-lg px-8 py-4"
              >
                <FiPhone size={20} />
                Call Now
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12">
              {trustBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
                >
                  <span className="text-accent shrink-0">{badge.icon}</span>
                  <span className="text-sm font-medium text-white/80">
                    {badge.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {slides.length > 0 && (
              <div className="flex items-center gap-2 mt-10">
                {slides.map((s, i) => (
                  <button
                    key={s.heading}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      i === index
                        ? "w-10 bg-accent"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

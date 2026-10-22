"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPhone,
  FiStar,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";
import { BsShieldFillCheck } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa6";
import { bookMessage, useSiteData, whatsappHref } from "@/lib/site";
import { TourCostCalculatorCard } from "./TourCostCalculator";

const trustBadges = [
  { icon: <FiClock size={16} />, label: "24x7 Service Available" },
  { icon: <BsShieldFillCheck size={16} />, label: "Airport Pick & Drop" },
  { icon: <FiStar size={16} />, label: "Clean AC Vehicles" },
  { icon: <FiDollarSign size={16} />, label: "Zero Hidden Charges" },
];

export interface HeroProps {
  selectedDestination?: string;
  onDestinationChange?: (name: string) => void;
}

export default function Hero({
  selectedDestination,
  onDestinationChange,
}: HeroProps) {
  const site = useSiteData();
  const [index, setIndex] = useState(0);

  const slides = site?.settings.heroSlides ?? [];
  const settings = site?.settings;
  const businessName = settings?.businessName || "Shree Sai Travels";

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
    settings?.whatsapp || "918459209595",
    bookMessage(businessName, "Hello Shree Sai Travels, I would like to book a taxi. Please share details.")
  );

  const primaryPhone = settings?.phone || "8459209595";
  const secondaryPhone = settings?.secondaryPhone || "8804729595";

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-secondary py-6 sm:py-10 lg:py-16 w-full lg:min-h-[85vh] lg:flex lg:items-center"
    >
      {/* Background overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/95 to-primary/80 z-10" />

      {/* Background slide images */}
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
              style={{ filter: "brightness(0.32) saturate(0.65)" }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Badges, Call/WhatsApp CTA */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Gold Top Tagline */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-amber-400/30 mb-5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider">
                    {settings?.tagline || "Premier Tour & Cab Services in Shirdi"}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black text-white leading-[1.12] mb-5 tracking-tight font-serif">
                  {before}
                  {slide?.gold ? (
                    <span className="text-amber-400 font-serif"> {slide.gold} </span>
                  ) : (
                    <span className="text-amber-400 font-serif"> Shirdi </span>
                  )}
                  {after}
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed mb-7 max-w-xl">
                  {slide?.subtitle ||
                    "Seamless pilgrimage darshans, hill station vacation packages, and 24*7 airport pickup/drop. Clean AC vehicles driven by courteous local experts with 100% transparent per-km billing."}
                </p>

                {/* Call & WhatsApp CTAs */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <a
                    href={`tel:${primaryPhone}`}
                    className="btn-primary text-sm sm:text-base px-6 py-3.5 shadow-xl shadow-primary/30 flex items-center gap-2 font-black rounded-xl"
                  >
                    <FiPhone size={18} />
                    Call {primaryPhone}
                  </a>

                  {secondaryPhone && (
                    <a
                      href={`tel:${secondaryPhone}`}
                      className="px-5 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-amber-400 text-white font-bold text-sm sm:text-base flex items-center gap-2 transition-all hover:bg-slate-800"
                    >
                      <FiPhone size={18} />
                      {secondaryPhone}
                    </a>
                  )}

                  <a
                    href={bookHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-black text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-[#25D366]/25 transition-all"
                  >
                    <FaWhatsapp size={19} />
                    WhatsApp Booking
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {trustBadges.map((badge, i) => (
                    <motion.div
                      key={badge.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-white/90"
                    >
                      <span className="text-amber-400 shrink-0">{badge.icon}</span>
                      <span className="text-xs font-semibold leading-tight">{badge.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Slide indicator dots */}
                {slides.length > 0 && (
                  <div className="flex items-center gap-2 mt-6">
                    {slides.map((s, i) => (
                      <button
                        key={s.heading}
                        onClick={() => setIndex(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i === index
                            ? "w-8 bg-amber-400"
                            : "w-2 bg-white/30 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Tour Cost Calculator Card */}
          <div
            className="lg:col-span-5 w-full flex justify-center lg:justify-end mt-8 lg:mt-0 scroll-mt-24"
            id="calculator"
          >
            <TourCostCalculatorCard
              selectedDestination={selectedDestination}
              onDestinationChange={onDestinationChange}
              isHeroEmbedded={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

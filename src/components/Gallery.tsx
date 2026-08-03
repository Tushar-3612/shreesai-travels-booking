"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight, FiEye } from "react-icons/fi";
import { useSiteData } from "@/lib/site";

interface GalleryItem {
  src: string;
  label: string;
  tag: string;
  span?: string;
}

function withSpans(items: GalleryItem[]): GalleryItem[] {
  return items.map((item, i) =>
    i === 0 || i === 4 ? { ...item, span: "md:row-span-2" } : item
  );
}

export default function Gallery() {
  const site = useSiteData();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const images = withSpans(site?.gallery ?? []);

  const next = () => setCurrent((i) => (i + 1) % images.length);
  const prev = () =>
    setCurrent((i) => (i - 1 + images.length) % images.length);

  return (
    <section id="gallery" className="section-padding bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Gallery
          </span>
          <h2 className="section-title mt-2">
            Explore Our <span className="gradient-text">Destinations</span>
          </h2>
          <p className="section-subtitle">
            From Shirdi darshan to the beaches of Mumbai and the temples of the
            Deccan - see where our fleet takes you.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[170px] sm:auto-rows-[210px]">
          {images.map((img, i) => (
            <motion.button
              key={img.src + i}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              onClick={() => {
                setCurrent(i);
                setOpen(true);
              }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-primary ${img.span ?? ""}`}
              aria-label={`Open ${img.label} photo`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={`${img.label} - ${img.tag}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/10 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-sm sm:text-base">
                  {img.label}
                </p>
                <p className="text-white/70 text-[11px] sm:text-xs">
                  {img.tag}
                </p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-primary/0 group-hover:bg-primary/30 transition-all duration-300">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 rounded-full bg-white/20 backdrop-blur-sm">
                  <FiEye size={22} className="text-white" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => {
                setCurrent(0);
                setOpen(true);
              }}
              className="btn-primary text-lg px-10 py-4 shadow-2xl shadow-primary/30"
            >
              <FiEye size={20} />
              Explore Gallery
            </button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {open && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-secondary/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <button
              className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close gallery"
            >
              <FiX size={26} />
            </button>

            <button
              className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-primary text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous photo"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-primary text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next photo"
            >
              <FiChevronRight size={24} />
            </button>

            <div
              className="w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35 }}
                  className="relative"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images[current].src}
                    alt={`${images[current].label} - ${images[current].tag}`}
                    className="w-full max-h-[72vh] object-contain rounded-2xl shadow-2xl"
                  />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-3 text-center whitespace-nowrap">
                    <p className="text-white font-bold">
                      {images[current].label}
                    </p>
                    <p className="text-white/70 text-xs">
                      {images[current].tag}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center gap-2 mt-5">
                {images.map((img, i) => (
                  <button
                    key={img.src + i}
                    onClick={() => setCurrent(i)}
                    aria-label={`View ${img.label}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-8 bg-accent"
                        : "w-2.5 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { FiUsers, FiWind, FiCheck } from "react-icons/fi";
import { BsFuelPump } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";
import { bookMessage, useSiteData, whatsappHref } from "@/lib/site";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function OurVehicles() {
  const site = useSiteData();
  const settings = site?.settings;
  const businessName = settings?.businessName || "Shirdi Car Rental";
  const vehicles = site?.vehicles ?? [];

  return (
    <section id="vehicles" className="section-padding bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Our Fleet
          </span>
          <h2 className="section-title mt-2">
            Our <span className="gradient-text">Vehicles</span>
          </h2>
          <p className="section-subtitle">
            Choose from a clean, modern fleet maintained to the highest
            standards for every kind of journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {vehicles.map((car) => (
            <motion.div
              key={car.id}
              variants={cardVariants}
              className="group card-hover bg-white rounded-[24px] border border-border/50 overflow-hidden shadow-sm hover:shadow-xl"
            >
              <div className="relative overflow-hidden h-56">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={car.image}
                  alt={car.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-accent text-secondary text-xs font-bold shadow-lg shadow-accent/40">
                  {car.ac}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary mb-4">
                  {car.name}
                </h3>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  <div className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-bg-alt">
                    <FiUsers size={18} className="text-primary" />
                    <span className="text-xs font-semibold text-text-muted">
                      {car.seats} Seats
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-bg-alt">
                    <FiWind size={18} className="text-primary" />
                    <span className="text-xs font-semibold text-text-muted">
                      {car.ac}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-bg-alt">
                    <BsFuelPump size={18} className="text-primary" />
                    <span className="text-xs font-semibold text-text-muted">
                      {car.fuel}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-text-muted leading-relaxed mb-6">
                  {car.description}
                </p>

                <a
                  href={whatsappHref(
                    settings?.whatsapp || "",
                    bookMessage(
                      businessName,
                      `I'd like to book the *${car.name}*. Please share availability.`
                    )
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FaWhatsapp size={16} />
                  Book Now
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-medium text-text-muted"
        >
          {["Sanitised before every trip", "Daily maintenance checks", "Experienced drivers"].map(
            (feat) => (
              <span key={feat} className="inline-flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center">
                  <FiCheck className="text-success" size={12} />
                </span>
                {feat}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { FiUsers, FiWind, FiCheck, FiBriefcase, FiCheckCircle } from "react-icons/fi";
import { BsFuelPump } from "react-icons/bs";
import { FaWhatsapp, FaCarSide } from "react-icons/fa6";
import { bookMessage, useSiteData, whatsappHref } from "@/lib/site";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function OurVehicles() {
  const site = useSiteData();
  const settings = site?.settings;
  const businessName = settings?.businessName || "Sai Vaishnavi Tours and Travels";
  const vehicles = site?.vehicles ?? [];

  const getLuggageCapacity = (seats: number, name: string) => {
    const n = name.toLowerCase();
    if (n.includes("urbania")) return "12-15 Large Bags & Luggage Boot";
    if (seats >= 24 || n.includes("26")) return "22-26 Bags & Heavy Roof Carrier";
    if (seats >= 19 || n.includes("20")) return "16-20 Bags & Roof Carrier";
    if (seats >= 12 || n.includes("winger")) return "10-12 Large Bags & Rear Boot";
    if (seats >= 7) return "4-5 Large Suitcases";
    if (seats >= 6) return "3-4 Medium Bags";
    return "2 Large / 3 Medium Bags";
  };

  const getBestSuitableFor = (seats: number, name: string) => {
    const n = name.toLowerCase();
    if (n.includes("urbania")) {
      return "VIP Groups, Luxury Outstation Pilgrimage Charters & Wedding Trips";
    }
    if (seats >= 24 || n.includes("26")) {
      return "Large Group Tours (20-26 passengers), Multi-Day Jyotirlinga Charters & Wedding Trips";
    }
    if (seats >= 19 || n.includes("20")) {
      return "Medium to Large Pilgrim Groups (16-20 passengers), Shirdi & Nashik Charters";
    }
    if (seats >= 12 || n.includes("winger")) {
      return "Extended Family Groups (9-12 passengers), Comfortable Pilgrimage & Airport Transfers";
    }
    if (seats >= 7) {
      return "VIPs, Seniors, Long Distance Tours (Mumbai, Kolhapur, Mahabaleshwar)";
    }
    if (seats >= 6) {
      return "Families of 5-6, Temple Darshan (Trimbakeshwar, Bhimashankar & Sambhaji Nagar)";
    }
    return "Couples & Small Families, Quick Temple Darshan, Local & Airport Pickups";
  };

  const handleSelectVehicle = (vehicleName: string) => {
    const calcElement = document.getElementById("calculator");
    if (calcElement) {
      calcElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="vehicles" className="section-padding bg-slate-50/60 relative">
      <div id="tariffs" className="absolute -top-24 left-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-3">
            <FaCarSide size={14} />
            Our Clean Fleet
          </span>
          <h2 className="section-title">
            Our <span className="gradient-text">Vehicles & Cabs</span>
          </h2>
          <p className="section-subtitle mt-2">
            Choose from a well-maintained, sanitized fleet of sedans, MUVs, and Tempo Travellers for every journey.
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
              className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Vehicle Image */}
                <div className="relative overflow-hidden h-56 bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={car.image}
                    alt={car.name}
                    loading="lazy"
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100 ${
                      car.id === "veh-innova" || (car.image && car.image.includes("crysta"))
                        ? "object-[center_65%]"
                        : car.id === "veh-ertiga" || (car.image && car.image.includes("xuv"))
                        ? "object-[center_35%]"
                        : "object-center"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-400 text-xs font-bold border border-white/20 shadow-md">
                      {car.seats} + 1 Driver Seats
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md">
                      {car.ac || "AC Available"}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Title & Price Header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl font-black text-slate-900 leading-tight">
                      {car.name}
                    </h3>
                    {car.price && (
                      <span className="text-xs font-extrabold text-white px-3 py-1.5 rounded-xl bg-primary shadow-sm whitespace-nowrap">
                        {car.price}
                      </span>
                    )}
                  </div>

                  {/* Specification Pills */}
                  <div className="grid grid-cols-3 gap-2.5 mb-4">
                    <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                      <FiUsers size={16} className="text-primary mb-1" />
                      <span className="text-[11px] font-bold text-slate-700">
                        {car.seats} Seats
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                      <FiWind size={16} className="text-primary mb-1" />
                      <span className="text-[11px] font-bold text-slate-700">
                        {car.ac || "Chilling AC"}
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                      <FiBriefcase size={16} className="text-primary mb-1" />
                      <span className="text-[10px] font-bold text-slate-700 truncate max-w-full">
                        Luggage
                      </span>
                    </div>
                  </div>

                  {/* Luggage Detail */}
                  <p className="text-[11px] text-slate-500 font-medium mb-3 flex items-center gap-1.5">
                    <FiBriefcase className="text-slate-400 shrink-0" size={13} />
                    <span>Capacity: {getLuggageCapacity(car.seats, car.name)}</span>
                  </p>

                  {/* Suitability Banner */}
                  <div className="bg-orange-50/80 border border-orange-200/60 rounded-xl p-3 mb-4">
                    <p className="text-[11px] font-extrabold text-orange-900 uppercase tracking-wider flex items-center gap-1.5">
                      <FiCheckCircle className="text-primary shrink-0" size={13} />
                      Best Suitable For:
                    </p>
                    <p className="text-xs font-semibold text-slate-800 mt-0.5 leading-snug">
                      {getBestSuitableFor(car.seats, car.name)}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5 line-clamp-2">
                    {car.description}
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSelectVehicle(car.name)}
                  className="inline-flex items-center justify-center gap-1.5 py-3 rounded-xl border border-primary text-primary text-xs font-bold hover:bg-primary/10 transition-colors"
                >
                  <FiCheck size={14} />
                  Calculate Fare
                </button>
                <a
                  href={whatsappHref(
                    settings?.whatsapp || "",
                    bookMessage(
                      businessName,
                      `I'd like to inquire about booking the *${car.name}* (${car.seats} Seater) from Shirdi.`
                    )
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-md hover:bg-[#1eb858] transition-colors"
                >
                  <FaWhatsapp size={15} />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-bold text-slate-600 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm"
        >
          {["Clean & Sanitized Before Every Trip", "Verified & Experienced Drivers", "24x7 Customer Assistance", "No Hidden Charges"].map(
            (feat) => (
              <span key={feat} className="inline-flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <FiCheck size={12} />
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

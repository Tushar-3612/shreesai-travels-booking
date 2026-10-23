"use client";

import { useMemo, useState } from "react";
import { FiMapPin, FiSearch, FiArrowRight, FiNavigation, FiCheck, FiCompass, FiMap } from "react-icons/fi";
import { FaCarSide, FaWhatsapp } from "react-icons/fa6";
import { useSiteData, whatsappHref } from "@/lib/site";
import type { AdminDestination } from "@/admin/types";
import type { TravelPackage } from "@/data/packages";

interface DestinationSectionProps {
  onSelectDestination?: (name: string) => void;
}

export default function DestinationSection({ onSelectDestination }: DestinationSectionProps) {
  const site = useSiteData();
  const settings = site?.settings;
  const businessName = settings?.businessName || "Sai Vaishnavi Tours and Travels";
  const whatsappNumber = settings?.whatsapp?.replace(/[^0-9]/g, "") || "917498462597";
  const destinations: AdminDestination[] = useMemo(() => {
    const list = site?.destinations ?? [];
    return list.filter((d) => d.status === "active");
  }, [site]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "religious" | "tour">("all");

  const filteredDestinations = useMemo(() => {
    return destinations.filter((d) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        d.name.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q);

      const isHillStation =
        /mahabaleshwar|lonavala|khandala|bhandardara|malshej|shivneri|sinhagad|igatpuri|lavasa|kalsubai|fort/i.test(
          d.name
        );
      const matchesCategory =
        filter === "all" ||
        (filter === "religious" && !isHillStation) ||
        (filter === "tour" && isHillStation);

      return matchesSearch && matchesCategory;
    });
  }, [destinations, searchQuery, filter]);

  const handleSelect = (destName: string) => {
    if (onSelectDestination) {
      onSelectDestination(destName);
    }
    const calcElement = document.getElementById("calculator");
    if (calcElement) {
      calcElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getRecommendedVehicles = (dist: number, name: string) => {
    if (name.toLowerCase().includes("mumbai") || name.toLowerCase().includes("kolhapur") || dist >= 600) {
      return "Innova Crysta, Ertiga, Tempo Traveller";
    }
    if (dist >= 400) {
      return "Innova Crysta, Ertiga MUV";
    }
    if (dist >= 200) {
      return "Swift Dzire, Ertiga, Innova Crysta";
    }
    return "Swift Dzire, Ertiga (4-6 Passengers)";
  };

  const getCategoryName = (name: string) => {
    if (
      /mahabaleshwar|lonavala|khandala|bhandardara|malshej|shivneri|sinhagad|igatpuri|lavasa|kalsubai|fort/i.test(
        name
      )
    ) {
      return "Hill Station & Fort";
    }
    return "Religious Darshan";
  };

  const findMatchedPackage = (dest: AdminDestination): TravelPackage | null => {
    if (!site?.packages) return null;
    const nameNorm = dest.name.toLowerCase();
    const cityNorm = dest.city.toLowerCase();
    return (
      site.packages.find((p) => {
        const pName = p.name.toLowerCase();
        const pDest = p.destination.toLowerCase();
        return (
          pName.includes(cityNorm) ||
          pDest.includes(cityNorm) ||
          nameNorm.includes(pDest) ||
          pName === nameNorm
        );
      }) ?? null
    );
  };

  const getWhatsAppBookingLink = (dest: AdminDestination) => {
    const matchedPkg = findMatchedPackage(dest);
    const agency = businessName;
    const lines: string[] = [
      `*Namaste ${agency}!* 🙏`,
      `I want to book the following tour package:`,
      ``,
      `📍 *Tour Package:* ${dest.name}`,
      `🏷️ *Category:* ${getCategoryName(dest.name)}`,
      `🗺️ *Destination:* ${dest.city}, ${dest.state || "Maharashtra"}`,
      `📏 *Distance:* ${dest.distance} km Round Trip`,
    ];

    if (matchedPkg?.route) {
      lines.push(`🛣️ *Route:* ${matchedPkg.route}`);
    }
    if (matchedPkg?.duration) {
      lines.push(`⏱️ *Duration:* ${matchedPkg.duration}`);
    }
    if (matchedPkg?.price && matchedPkg.priceNum > 0) {
      lines.push(`💰 *Fare:* One Way: ${matchedPkg.price} | Round Trip: ${matchedPkg.roundTrip}`);
    }

    if (dest.description) {
      lines.push(``, `📝 *Details:*`, dest.description);
    }

    const recVehicles = getRecommendedVehicles(dest.distance, dest.name);
    lines.push(
      ``,
      `🚗 *Suitable Vehicles:* ${recVehicles}`,
      `✅ *Includes:* Clean AC Cabs, Verified Driver, Fuel, Tolls & Parking`
    );

    if (matchedPkg?.highlights && matchedPkg.highlights.length > 0) {
      lines.push(``, `✨ *Key Sightseeing Points:*`);
      matchedPkg.highlights.slice(0, 4).forEach((h, i) => lines.push(`${i + 1}. ${h}`));
    }

    lines.push(
      ``,
      `Please share cab availability, car options (Dzire, Ertiga, Innova Crysta), and confirm my booking.`
    );

    return whatsappHref(whatsappNumber, lines.join("\n"));
  };

  return (
    <section id="destinations" className="section-padding bg-slate-50/80 border-y border-slate-200/80 relative">
      <div id="darshan" className="absolute -top-24 left-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-3">
            <FiNavigation size={14} />
            Explore Routes & Sightseeing
          </span>
          <h2 className="section-title">
            Popular Destinations from <span className="gradient-text">Shirdi</span>
          </h2>
          <p className="section-subtitle mt-2">
            Choose your tour destination to calculate exact taxi fare, view route details, and book clean AC cabs.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm w-full md:w-auto">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                filter === "all"
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-600 hover:text-primary hover:bg-slate-50"
              }`}
            >
              All Packages ({destinations.length})
            </button>
            <button
              onClick={() => setFilter("religious")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                filter === "religious"
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-600 hover:text-primary hover:bg-slate-50"
              }`}
            >
              <FiCompass size={14} />
              <span>Religious Darshan</span>
            </button>
            <button
              onClick={() => setFilter("tour")}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 ${
                filter === "tour"
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-600 hover:text-primary hover:bg-slate-50"
              }`}
            >
              <FiMap size={14} />
              <span>Hill Stations & Forts</span>
            </button>
          </div>

          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destination (e.g. Nashik, Mumbai)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <FiMapPin className="mx-auto text-slate-300 mb-3" size={36} />
            <h3 className="text-base font-bold text-slate-700">No matching destinations found</h3>
            <p className="text-xs text-slate-500 mt-1">Try searching for another city or tour package.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="group rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image Header with Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  {dest.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={dest.image}
                      alt={dest.imageAlt || dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-slate-400">
                      <FiCompass size={40} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="bg-primary text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md tracking-wide">
                      {getCategoryName(dest.name)}
                    </span>
                    {dest.distance > 0 && (
                      <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 shadow-md">
                        {dest.distance} km Round Trip
                      </span>
                    )}
                  </div>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h3 className="text-lg font-black leading-tight drop-shadow-md text-white">{dest.name}</h3>
                    {dest.city && (
                      <p className="text-xs text-amber-300 font-semibold mt-0.5 flex items-center gap-1">
                        <FiMapPin size={12} />
                        {dest.city}, {dest.state || "Maharashtra"}
                      </p>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
                      {dest.description || `Enjoy safe, comfortable cab travel from Shirdi to ${dest.name} with clean AC vehicles.`}
                    </p>

                    <div className="bg-orange-50/80 border border-orange-200/60 rounded-xl p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold text-orange-900 uppercase tracking-wider inline-flex items-center gap-1.5">
                          <FaCarSide size={12} className="text-orange-700" />
                          Suitable Vehicles:
                        </span>
                        <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
                          AC Cabs
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800 mt-1">
                        {getRecommendedVehicles(dest.distance, dest.name)}
                      </p>
                    </div>
                  </div>

                  {/* Action Row */}
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelect(dest.name)}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-primary/30 text-primary text-xs font-bold hover:bg-primary/10 transition-colors"
                    >
                      <FiCheck size={14} />
                      Calculate Fare
                    </button>

                    <a
                      href={getWhatsAppBookingLink(dest)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-bold shadow-md shadow-primary/25 hover:bg-primary-dark hover:shadow-lg transition-all"
                    >
                      <FaWhatsapp size={14} />
                      Book Tour
                      <FiArrowRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

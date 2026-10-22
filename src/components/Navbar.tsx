"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiChevronDown,
  FiArrowRight,
  FiCompass,
  FiHome,
  FiClock,
  FiMap,
  FiStar,
  FiInfo,
} from "react-icons/fi";
import { FaWhatsapp, FaCarSide, FaPlaneDeparture } from "react-icons/fa6";
import { HiOutlineCalculator } from "react-icons/hi2";
import { BsShieldFillCheck } from "react-icons/bs";
import { bookMessage, useSiteData, whatsappHref } from "@/lib/site";

interface DarshanItem {
  title: string;
  distance: string;
  desc: string;
  href: string;
}

const DARSHAN_MENU: DarshanItem[] = [
  {
    title: "Shirdi to Nashik Darshan",
    distance: "300 km Roundtrip",
    desc: "Trimbakeshwar Jyotirlinga, Panchavati & Muktidham",
    href: "/#destinations",
  },
  {
    title: "Shirdi to Shani Shingnapur",
    distance: "150 km Roundtrip",
    desc: "Famous open-air Swayambhu 5.5 ft Shani Dev Mandir",
    href: "/#destinations",
  },
  {
    title: "Shirdi to Bhimashankar",
    distance: "400 km Roundtrip",
    desc: "Sacred 6th Jyotirlinga nestled in Western Ghats",
    href: "/#destinations",
  },
  {
    title: "Shirdi to Sambhaji Nagar (Aurangabad)",
    distance: "260 km Roundtrip",
    desc: "Grishneshwar Jyotirlinga, Ellora Caves & Bhadra Maruti",
    href: "/#destinations",
  },
];

const HILL_STATION_MENU = [
  {
    title: "Mahabaleshwar Tour (4 Days / 2 Days)",
    desc: "Venna Lake, Arthur's Seat, Mapro Garden & Strawberry Plucking",
    href: "/packages",
  },
  {
    title: "Lonavala & Khandala Tour",
    desc: "Tiger's Leap, Karla Caves, Bhushi Dam & Pawna Lake",
    href: "/packages",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const site = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Dropdown states
  const [darshanOpen, setDarshanOpen] = useState(false);
  const [hillOpen, setHillOpen] = useState(false);

  const darshanRef = useRef<HTMLDivElement>(null);
  const hillRef = useRef<HTMLDivElement>(null);

  const settings = site?.settings;
  const businessName = settings?.businessName || "OM SAI TOURS & TRAVELS";
  const primaryPhone = settings?.phone || "8459209595";
  const secondaryPhone = settings?.secondaryPhone || "8804729595";
  const whatsappNumber =
    settings?.whatsapp?.replace(/[^0-9]/g, "") || "918459209595";

  const bookHref = whatsappHref(
    whatsappNumber,
    bookMessage(
      businessName,
      "Hello, I would like to book a taxi service in Shirdi. Please share package details and rates."
    )
  );

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        darshanRef.current &&
        !darshanRef.current.contains(e.target as Node)
      ) {
        setDarshanOpen(false);
      }
      if (hillRef.current && !hillRef.current.contains(e.target as Node)) {
        setHillOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToAnchor = (id: string) => {
    setMobileOpen(false);
    setDarshanOpen(false);
    setHillOpen(false);
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full max-w-full font-sans transition-all duration-300">
        {/* Top Utility Bar (Desktop only) */}
        <div className="hidden md:block bg-[#0B1120] text-slate-300 text-xs py-2 border-b border-slate-800 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            {/* Left Badges */}
            <div className="flex items-center gap-5 text-[11px] font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 text-amber-400">
                <BsShieldFillCheck size={13} className="text-amber-400 shrink-0" />
                <span>24*7 Service Available</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5 hover:text-white transition-colors">
                <FaPlaneDeparture size={12} className="text-amber-400 shrink-0" />
                <span>Airport Pickup & Drop Service Available</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <FiMapPin className="text-amber-400 shrink-0" size={13} />
                <span>Shirdi, Maharashtra</span>
              </span>
            </div>

            {/* Right Helpline Numbers */}
            <div className="flex items-center gap-4 text-xs">
              <span className="text-slate-400 font-medium">Helpline No:</span>
              <a
                href={`tel:${primaryPhone}`}
                className="flex items-center gap-1.5 font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <FiPhone size={12} />
                <span>{primaryPhone}</span>
              </a>
              {secondaryPhone && (
                <>
                  <span className="text-slate-600">|</span>
                  <a
                    href={`tel:${secondaryPhone}`}
                    className="flex items-center gap-1.5 font-bold text-slate-300 hover:text-white transition-colors"
                  >
                    <FiPhone size={12} />
                    <span>{secondaryPhone}</span>
                  </a>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main Desktop & Mobile Navbar */}
        <nav
          className={`w-full transition-all duration-300 ${
            mounted && scrolled
              ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200/80 py-2"
              : "bg-white border-b border-slate-100 py-2.5 sm:py-3"
          }`}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-between h-13 sm:h-16 gap-2">
              {/* Brand Logo */}
              <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink min-w-0 group">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-[#EA580C] to-[#F59E0B] text-white flex items-center justify-center shadow-md shadow-orange-500/25 shrink-0 group-hover:scale-105 transition-transform">
                  <FaCarSide size={18} className="text-white" />
                </div>
                <div className="flex flex-col leading-tight min-w-0">
                  <span className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-slate-900 group-hover:text-primary transition-colors truncate">
                    {businessName}
                  </span>
                  <span className="text-[9px] sm:text-[10px] lg:text-[11px] font-bold text-amber-600 uppercase tracking-wider truncate">
                    Premier Cabs & Outstation Packages • Shirdi
                  </span>
                </div>
              </Link>

              {/* Desktop Nav Items */}
              <div className="hidden md:flex items-center gap-1 xl:gap-2">
                {/* Home */}
                <Link
                  href="/"
                  className={`px-3 py-2 text-sm font-extrabold rounded-xl transition-all ${
                    pathname === "/"
                      ? "text-primary bg-orange-50 font-black"
                      : "text-slate-700 hover:text-primary hover:bg-slate-50"
                  }`}
                >
                  Home
                </Link>

                {/* Religious Darshans Dropdown */}
                <div
                  ref={darshanRef}
                  className="relative"
                  onMouseEnter={() => setDarshanOpen(true)}
                  onMouseLeave={() => setDarshanOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setDarshanOpen(!darshanOpen)}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-bold text-slate-700 hover:text-primary hover:bg-slate-50 rounded-xl transition-all"
                  >
                    <span>Religious Darshans</span>
                    <FiChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${
                        darshanOpen ? "rotate-180 text-primary" : "text-slate-400"
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {darshanOpen && (
                    <div className="absolute top-full left-0 w-80 pt-2 z-50">
                      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2.5 space-y-1">
                        <div className="px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-amber-600 border-b border-slate-100 flex items-center justify-between">
                          <span>Sacred Jyotirlinga & Temple Cabs</span>
                          <span>Roundtrip</span>
                        </div>
                        {DARSHAN_MENU.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => scrollToAnchor("destinations")}
                            className="block p-2.5 rounded-xl hover:bg-orange-50/80 transition-colors group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">
                                {item.title}
                              </span>
                              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
                                {item.distance.split(" ")[0]} km
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-1">
                              {item.desc}
                            </p>
                          </Link>
                        ))}
                        <div className="pt-1.5 border-t border-slate-100">
                          <Link
                            href="/packages"
                            onClick={() => setDarshanOpen(false)}
                            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-primary hover:bg-orange-50 transition-colors"
                          >
                            <span>Explore All Darshan Packages</span>
                            <FiArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Hill Stations Dropdown */}
                <div
                  ref={hillRef}
                  className="relative"
                  onMouseEnter={() => setHillOpen(true)}
                  onMouseLeave={() => setHillOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setHillOpen(!hillOpen)}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-bold text-slate-700 hover:text-primary hover:bg-slate-50 rounded-xl transition-all"
                  >
                    <span>Hill Stations</span>
                    <FiChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${
                        hillOpen ? "rotate-180 text-primary" : "text-slate-400"
                      }`}
                    />
                  </button>

                  {hillOpen && (
                    <div className="absolute top-full left-0 w-72 pt-2 z-50">
                      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2.5 space-y-1">
                        <div className="px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-amber-600 border-b border-slate-100">
                          Vacation & Scenic Specials
                        </div>
                        {HILL_STATION_MENU.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setHillOpen(false)}
                            className="block p-2.5 rounded-xl hover:bg-orange-50/80 transition-colors group"
                          >
                            <span className="block text-xs font-bold text-slate-900 group-hover:text-primary transition-colors">
                              {item.title}
                            </span>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-1">
                              {item.desc}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Car Tariff Rates */}
                <Link
                  href="/#tariffs"
                  onClick={() => scrollToAnchor("tariffs")}
                  className="px-3 py-2 text-sm font-bold text-slate-700 hover:text-primary hover:bg-slate-50 rounded-xl transition-all"
                >
                  Car Tariff Rates
                </Link>

                {/* Tour Cost Calculator (Highlighted Badge Link) */}
                <Link
                  href="/#calculator"
                  onClick={() => scrollToAnchor("calculator")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100/90 border border-amber-300/80 text-amber-900 font-extrabold text-sm transition-all shadow-sm group"
                >
                  <HiOutlineCalculator
                    size={17}
                    className="text-amber-700 group-hover:scale-110 transition-transform"
                  />
                  <span>Calculator</span>
                  <span className="px-1.5 py-0.2 rounded-md bg-[#EA580C] text-white text-[9px] font-black uppercase tracking-tight">
                    Instant
                  </span>
                </Link>

                {/* Airport Service */}
                <Link
                  href="/packages"
                  className="px-3 py-2 text-sm font-bold text-slate-700 hover:text-primary hover:bg-slate-50 rounded-xl transition-all"
                >
                  Airport Service
                </Link>
              </div>

              {/* Desktop Action Buttons */}
              <div className="hidden md:flex items-center gap-2.5">
                {/* WhatsApp Chat Button */}
                <a
                  href={bookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 flex items-center justify-center transition-all relative group"
                  title="24/7 WhatsApp Chat Support"
                >
                  <FaWhatsapp size={20} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#25D366] border-2 border-white animate-pulse" />
                </a>

                {/* Primary Book Cab Now Button */}
                <Link
                  href="/book"
                  className="px-4 xl:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5500] to-[#FF6B00] hover:from-[#E64D00] hover:to-[#E55F00] text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <FaCarSide size={15} />
                  <span>Book Cab Now</span>
                </Link>
              </div>

              {/* Mobile Header Right Controls: Quick Call + Hamburger */}
              <div className="flex items-center gap-1.5 md:hidden shrink-0">
                <a
                  href={`tel:${primaryPhone}`}
                  className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-orange-50 text-primary border border-orange-200 text-xs font-black"
                >
                  <FiPhone size={13} />
                  <span>Call</span>
                </a>

                <button
                  type="button"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200"
                  aria-label="Toggle navigation menu"
                >
                  {mobileOpen ? <HiX size={22} /> : <HiMenu size={22} />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Slide-down Drawer */}
        {mobileOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white/98 backdrop-blur-xl shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-orange-50/70 text-primary font-black text-sm"
              >
                <span className="flex items-center gap-2">
                  <FiHome size={16} className="text-primary" />
                  <span>Home</span>
                </span>
                <FiArrowRight size={16} />
              </Link>

              {/* Calculator Quick Jump */}
              <Link
                href="/#calculator"
                onClick={() => scrollToAnchor("calculator")}
                className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 font-black text-sm"
              >
                <div className="flex items-center gap-2">
                  <HiOutlineCalculator size={18} className="text-amber-700" />
                  <span>Tour Cost Calculator</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#EA580C] text-white text-[10px] font-black uppercase">
                  Instant Fare
                </span>
              </Link>

              {/* Tariff Rates */}
              <Link
                href="/#tariffs"
                onClick={() => scrollToAnchor("tariffs")}
                className="flex items-center justify-between px-3.5 py-3 rounded-xl hover:bg-slate-50 text-slate-800 font-extrabold text-sm"
              >
                <span className="flex items-center gap-2">
                  <FaCarSide size={16} className="text-primary" />
                  <span>Car Tariff Rates (Per KM)</span>
                </span>
                <FiArrowRight size={16} className="text-slate-400" />
              </Link>

              {/* Darshan Packages */}
              <Link
                href="/#destinations"
                onClick={() => scrollToAnchor("destinations")}
                className="flex items-center justify-between px-3.5 py-3 rounded-xl hover:bg-slate-50 text-slate-800 font-extrabold text-sm"
              >
                <span className="flex items-center gap-2">
                  <FiCompass size={16} className="text-primary" />
                  <span>Shirdi Outstation Darshan Packages</span>
                </span>
                <FiArrowRight size={16} className="text-slate-400" />
              </Link>

              <Link
                href="/packages"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3.5 py-3 rounded-xl hover:bg-slate-50 text-slate-800 font-extrabold text-sm"
              >
                <span className="flex items-center gap-2">
                  <FiMap size={16} className="text-primary" />
                  <span>Hill Station Vacation Specials</span>
                </span>
                <FiArrowRight size={16} className="text-slate-400" />
              </Link>

              <Link
                href="/why-choose-us"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3.5 py-3 rounded-xl hover:bg-slate-50 text-slate-800 font-extrabold text-sm"
              >
                <span className="flex items-center gap-2">
                  <FiStar size={16} className="text-primary" />
                  <span>Why Choose Us</span>
                </span>
                <FiArrowRight size={16} className="text-slate-400" />
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3.5 py-3 rounded-xl hover:bg-slate-50 text-slate-800 font-extrabold text-sm"
              >
                <span className="flex items-center gap-2">
                  <FiInfo size={16} className="text-primary" />
                  <span>About Us & Contact</span>
                </span>
                <FiArrowRight size={16} className="text-slate-400" />
              </Link>

              {/* Direct Booking & WhatsApp Actions */}
              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${primaryPhone}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-300 text-slate-800 font-black text-xs hover:border-primary transition-colors"
                >
                  <FiPhone size={15} className="text-primary" />
                  <span>Call {primaryPhone}</span>
                </a>

                <a
                  href={bookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-black text-xs shadow-md shadow-[#25D366]/20"
                >
                  <FaWhatsapp size={16} />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ======================================================== */}
      {/* MOBILE APP-LIKE BOTTOM NAVIGATION DOCK (Native App Feel)  */}
      {/* ======================================================== */}
      <nav
        aria-label="Mobile Bottom App Bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-2 py-1.5 w-full"
      >
        <div className="max-w-md mx-auto grid grid-cols-5 items-center text-center">
          {/* 1. Home */}
          <Link
            href="/"
            onClick={() => scrollToAnchor("home")}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              pathname === "/"
                ? "text-primary font-black"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <FiHome size={20} />
            <span className="text-[10px] font-bold mt-0.5">Home</span>
          </Link>

          {/* 2. Calculator (Elevated Amber App Button) */}
          <Link
            href="/#calculator"
            onClick={() => scrollToAnchor("calculator")}
            className="flex flex-col items-center justify-center py-0.5 group relative"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#EA580C] to-[#F59E0B] text-white flex items-center justify-center shadow-lg shadow-orange-500/35 -mt-3 border-2 border-white group-hover:scale-105 transition-transform">
              <HiOutlineCalculator size={22} className="stroke-[2.4]" />
            </div>
            <span className="text-[10px] font-black text-amber-800 mt-0.5 tracking-tight">
              Calculator
            </span>
          </Link>

          {/* 3. Car Tariff Rates */}
          <Link
            href="/#tariffs"
            onClick={() => scrollToAnchor("tariffs")}
            className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-primary transition-all"
          >
            <FaCarSide size={20} />
            <span className="text-[10px] font-bold mt-0.5">Rates</span>
          </Link>

          {/* 4. Darshan Packages */}
          <Link
            href="/#destinations"
            onClick={() => scrollToAnchor("destinations")}
            className="flex flex-col items-center justify-center py-1 text-slate-500 hover:text-primary transition-all"
          >
            <FiCompass size={20} />
            <span className="text-[10px] font-bold mt-0.5">Darshan</span>
          </Link>

          {/* 5. WhatsApp Chat */}
          <a
            href={bookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1 text-[#25D366] hover:text-[#1eb858] transition-all relative"
          >
            <div className="relative">
              <FaWhatsapp size={21} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-white animate-pulse" />
            </div>
            <span className="text-[10px] font-black mt-0.5">Chat</span>
          </a>
        </div>
      </nav>
    </>
  );
}

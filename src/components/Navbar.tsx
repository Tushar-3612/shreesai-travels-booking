"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { bookMessage, splitBusinessName, useSiteData, whatsappHref } from "@/lib/site";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "About Us", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Book Now", href: "/book" },
];

export default function Navbar() {
  const pathname = usePathname();
  const site = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const settings = site?.settings;
  const businessName = settings?.businessName || "Shirdi Car Rental";
  const logo = settings?.logo || "";
  const logoText = splitBusinessName(businessName);
  const bookHref = whatsappHref(
    settings?.whatsapp || "",
    bookMessage(businessName, "I'd like to book a taxi. Please share available packages.")
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b transition-all duration-500 ${
        scrolled
          ? "border-border/70 shadow-lg shadow-black/5"
          : "border-border/40"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo}
                alt={businessName}
                className="w-11 h-11 rounded-xl object-contain shadow-lg shadow-primary/30 bg-white"
              />
            ) : (
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="text-white font-bold text-lg">
                  {businessName.trim().charAt(0) || "S"}
                </span>
              </div>
            )}
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-secondary">
                {logoText.line1}
              </span>
              <span className="text-[11px] font-semibold text-primary -mt-0.5 tracking-wide">
                {logoText.line2}
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    active
                      ? "text-primary bg-primary/5"
                      : "text-secondary/75 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  <span className="text-base leading-none" aria-hidden></span>
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute -bottom-[1px] left-3 right-3 h-[3px] rounded-full bg-gradient-to-r from-primary to-primary-light shadow-md shadow-primary/40"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${settings?.phone || ""}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-secondary font-semibold text-sm hover:border-primary hover:text-primary hover:-translate-y-0.5 transition-all duration-300"
            >
              <FiPhone className="text-primary" size={16} />
              Call Now
            </a>
            <a
              href={bookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaWhatsapp size={16} />
              Book Now
            </a>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-primary/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <HiX size={26} className="text-secondary" />
            ) : (
              <HiMenu size={26} className="text-secondary" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border/50 bg-white"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                      active
                        ? "text-primary bg-primary/5 border-l-4 border-primary"
                        : "text-secondary/80 hover:text-primary hover:bg-primary/5 border-l-4 border-transparent"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-3 space-y-2">
                <a
                  href={`tel:${settings?.phone || ""}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-border text-secondary font-semibold text-sm hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <FiPhone className="text-primary" size={16} />
                  Call Now
                </a>
                <a
                  href={bookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white font-bold text-sm shadow-lg shadow-primary/25"
                >
                  <FaWhatsapp size={16} />
                  Book Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

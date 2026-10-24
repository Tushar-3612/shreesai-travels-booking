"use client";

import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiArrowUp,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import {
  bookMessage,
  splitBusinessName,
  useSiteData,
  whatsappHref,
} from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "About Us", href: "/about" },
  { label: "Reviews", href: "/reviews" },
];

export default function Footer() {
  const site = useSiteData();
  const settings = site?.settings;

  const businessName = settings?.businessName || "Sai Vaishnavi Tours and Travels";
  const logo = settings?.logo || "/images/logo.jpeg";
  const logoText = splitBusinessName(businessName);
  const services = (site?.packages ?? []).slice(0, 6);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-secondary text-white">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white shadow-lg border-2 border-orange-500/50 flex items-center justify-center p-0.5 shrink-0 ring-2 ring-orange-400/30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo}
                  alt={businessName}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight text-white">
                  {logoText.line1}
                </span>
                <span className="text-xs font-medium text-primary -mt-0.5">
                  {logoText.line2}
                </span>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              {settings?.companyDescription}
            </p>
            <div className="flex gap-3">
              <a
                href={whatsappHref(
                  settings?.whatsapp || "",
                  bookMessage(businessName, "")
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-success flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-success/30"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={16} />
              </a>
              {settings?.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
                  aria-label="Instagram"
                >
                  <FaInstagram size={16} />
                </a>
              )}
              {settings?.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={16} />
                </a>
              )}
              {settings?.youtube && (
                <a
                  href={settings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
                  aria-label="YouTube"
                >
                  <FaYoutube size={16} />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold mb-5 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 hover:text-primary transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/60" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold mb-5 text-white">
              Popular Destinations
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`/packages/${service.slug}`}
                    className="text-sm text-white/60 hover:text-primary transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/60" />
                    {service.route}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold mb-5 text-white">
              Contact Info
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <FiMapPin className="text-primary shrink-0 mt-0.5" size={16} />
                {settings?.googleMapsLink ? (
                  <a
                    href={settings.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors duration-300"
                  >
                    {settings?.address || "Airport Road, Dwarawati, Shirdi, Maharashtra 423109"}
                  </a>
                ) : (
                  <span>
                    {settings?.address || "Airport Road, Dwarawati, Shirdi, Maharashtra 423109"}
                  </span>
                )}
              </li>
              <li>
                <a
                  href={`tel:${settings?.phone || "+919225396800"}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-primary transition-colors duration-300"
                >
                  <FiPhone className="text-accent shrink-0" size={16} />
                  {settings?.phoneDisplay || "+91 92253 96800"}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings?.email || "autadevishal74@gmail.com"}`}
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-primary transition-colors duration-300"
                >
                  <FiMail className="text-success shrink-0" size={16} />
                  {settings?.email || "autadevishal74@gmail.com"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} {settings?.footerCopyright}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-white/40 hover:text-primary transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-white/40 hover:text-primary transition-colors"
            >
              Terms of Service
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-primary flex items-center justify-center transition-all duration-300"
            aria-label="Scroll to top"
          >
            <FiArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}

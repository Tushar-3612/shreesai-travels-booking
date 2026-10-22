"use client";

import { useState } from "react";
import {
  FiBriefcase,
  FiChevronDown,
  FiChevronUp,
  FiGlobe,
  FiHome,
  FiImage,
  FiInfo,
  FiLink,
  FiMail,
  FiMapPin,
  FiPhone,
  FiPlus,
  FiRefreshCw,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import { FaInstagram, FaYoutube, FaPalette } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { useSettings } from "../../lib/db";
import type { HeroSlide, RouteItem, TrustCounter, WhyItem } from "../../types";
import { slugify } from "../../lib/utils";
import { toast } from "../../lib/toast";
import { ICON_MAP } from "../../lib/constants";
import Card from "../ui/Card";
import PageHeader from "../ui/PageHeader";
import { Field, Select, TextArea, TextInput } from "../ui/Field";
import ImageUpload from "../ui/ImageUpload";

type TabKey =
  | "business"
  | "contact"
  | "social"
  | "hero"
  | "home"
  | "seo"
  | "colors";

const TABS: { key: TabKey; label: string; icon: typeof FiHome }[] = [
  { key: "business", label: "Business", icon: FiBriefcase },
  { key: "contact", label: "Contact", icon: FiPhone },
  { key: "social", label: "Social Links", icon: FiGlobe },
  { key: "hero", label: "Hero Section", icon: FiImage },
  { key: "home", label: "Home Content", icon: FiHome },
  { key: "seo", label: "SEO", icon: FiSearch },
  { key: "colors", label: "Colors", icon: FaPalette },
];

export default function SettingsPage() {
  const { settings, update, save, reset } = useSettings();
  const [tab, setTab] = useState<TabKey>("business");
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      save(settings);
      setSaving(false);
      toast("Website settings saved successfully");
    }, 300);
  };

  const patch = (partial: Partial<typeof settings>) => update(partial);

  const updateHeroSlide = (index: number, field: keyof HeroSlide, value: string) => {
    const slides = settings.heroSlides.map((slide, i) =>
      i === index ? { ...slide, [field]: value } : slide
    );
    patch({ heroSlides: slides });
  };

  const addHeroSlide = () => {
    patch({
      heroSlides: [
        ...settings.heroSlides,
        { heading: "New Slide", gold: "", subtitle: "", image: "" },
      ],
    });
  };

  const removeHeroSlide = (index: number) => {
    patch({ heroSlides: settings.heroSlides.filter((_, i) => i !== index) });
  };

  const moveHeroSlide = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= settings.heroSlides.length) return;
    const next = [...settings.heroSlides];
    [next[index], next[target]] = [next[target], next[index]];
    patch({ heroSlides: next });
  };

  const updateCounter = (index: number, field: keyof TrustCounter, value: string) => {
    patch({
      trustCounters: settings.trustCounters.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      ),
    });
  };

  const updateWhy = (index: number, field: keyof WhyItem, value: string) => {
    patch({
      whyChooseUs: settings.whyChooseUs.map((w, i) =>
        i === index ? { ...w, [field]: value } : w
      ),
    });
  };

  const updateRoute = (index: number, field: keyof RouteItem, value: string) => {
    const routes = settings.mostBookedRoutes.map((r, i) =>
      i === index ? { ...r, [field]: value, slug: slugify(value) } : r
    );
    patch({ mostBookedRoutes: routes });
  };

  return (
    <div>
      <PageHeader
        title="Website Settings"
        subtitle="Everything about the website, editable from one place"
        actions={
          <>
            <button className="adm-btn adm-btn-ghost" onClick={() => { reset(); toast("Settings reset to defaults", "info"); }}>
              <FiRefreshCw size={15} />
              Reset
            </button>
            <button className="adm-btn adm-btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </>
        }
      />

      <div className="flex gap-2 mb-6 overflow-x-auto adm-scroll">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`adm-tab inline-flex items-center gap-2 ${tab === t.key ? "active" : ""}`}
          >
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "business" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card title="Business Identity" subtitle="Name, logo and branding basics">
            <div className="space-y-4">
              <Field label="Business Name" required>
                <TextInput
                  value={settings.businessName}
                  onChange={(e) => patch({ businessName: e.target.value })}
                />
              </Field>
              <Field label="Tagline">
                <TextInput
                  value={settings.tagline}
                  onChange={(e) => patch({ tagline: e.target.value })}
                />
              </Field>
              <Field label="Business Logo">
                <ImageUpload
                  value={settings.logo}
                  onChange={(url) => patch({ logo: url })}
                  label="Upload Business Logo"
                />
              </Field>
              <Field label="Favicon" hint="Upload an ICO or PNG favicon">
                <ImageUpload
                  value={settings.favicon}
                  onChange={(url) => patch({ favicon: url })}
                  label="Upload Favicon"
                />
              </Field>
            </div>
          </Card>
          <Card title="Company & Footer" subtitle="Description, copyright and hours">
            <div className="space-y-4">
              <Field label="Company Description">
                <TextArea
                  rows={4}
                  value={settings.companyDescription}
                  onChange={(e) => patch({ companyDescription: e.target.value })}
                />
              </Field>
              <Field label="Footer Copyright">
                <TextInput
                  value={settings.footerCopyright}
                  onChange={(e) => patch({ footerCopyright: e.target.value })}
                />
              </Field>
              <Field label="Working Hours">
                <TextInput
                  value={settings.workingHours}
                  onChange={(e) => patch({ workingHours: e.target.value })}
                />
              </Field>
            </div>
          </Card>
        </div>
      )}

      {tab === "contact" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card title="Contact Details" subtitle="Phone, WhatsApp, email and address - these update everywhere on the website">
            <div className="space-y-4">
              <Field label="Phone Number">
                <TextInput
                  value={settings.phone}
                  onChange={(e) => patch({ phone: e.target.value })}
                  placeholder="+919225396800"
                />
              </Field>
              <Field label="Phone (Display Format)">
                <TextInput
                  value={settings.phoneDisplay}
                  onChange={(e) => patch({ phoneDisplay: e.target.value })}
                  placeholder="+91 92253 96800"
                />
              </Field>
              <Field label="WhatsApp Number">
                <TextInput
                  value={settings.whatsapp}
                  onChange={(e) => patch({ whatsapp: e.target.value })}
                  placeholder="919225396800"
                />
              </Field>
              <Field label="Email">
                <TextInput
                  type="email"
                  value={settings.email}
                  onChange={(e) => patch({ email: e.target.value })}
                />
              </Field>
              <Field label="Address">
                <TextInput
                  value={settings.address}
                  onChange={(e) => patch({ address: e.target.value })}
                />
              </Field>
              <Field label="Google Maps Link">
                <TextInput
                  value={settings.googleMapsLink}
                  onChange={(e) => patch({ googleMapsLink: e.target.value })}
                  placeholder="https://maps.google.com/?q=..."
                />
              </Field>
            </div>
          </Card>
          <Card title="Live Preview" subtitle="How your contact info appears">
            <div className="space-y-3">
              {[
                { icon: FiPhone, label: "Phone", value: settings.phoneDisplay, href: `tel:${settings.phone}` },
                { icon: FiMail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
                { icon: FiMapPin, label: "Address", value: settings.address },
                { icon: FiLink, label: "Google Maps", value: settings.googleMapsLink },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-100 p-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <row.icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{row.label}</p>
                    <a
                      href={row.href}
                      className="text-sm font-semibold text-slate-700 truncate block hover:text-blue-600"
                    >
                      {row.value || "Not set"}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "social" && (
        <Card title="Social Links" subtitle="Instagram, Facebook and YouTube">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Instagram URL">
              <div className="relative">
                <FaInstagram size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-pink-500" />
                <TextInput
                  className="pl-10"
                  value={settings.instagram}
                  onChange={(e) => patch({ instagram: e.target.value })}
                  placeholder="https://instagram.com/your-page"
                />
              </div>
            </Field>
            <Field label="Facebook URL">
              <div className="relative">
                <FaFacebookF size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-600" />
                <TextInput
                  className="pl-10"
                  value={settings.facebook}
                  onChange={(e) => patch({ facebook: e.target.value })}
                  placeholder="https://facebook.com/your-page"
                />
              </div>
            </Field>
            <Field label="YouTube URL">
              <div className="relative">
                <FaYoutube size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-red-500" />
                <TextInput
                  className="pl-10"
                  value={settings.youtube}
                  onChange={(e) => patch({ youtube: e.target.value })}
                  placeholder="https://youtube.com/@your-channel"
                />
              </div>
            </Field>
          </div>
        </Card>
      )}

      {tab === "hero" && (
        <Card
          title="Hero Slides"
          subtitle="Headings, subtitles and background images for the homepage hero"
          actions={
            <button className="adm-btn adm-btn-outline adm-btn-sm" onClick={addHeroSlide}>
              <FiPlus size={14} />
              Add Slide
            </button>
          }
        >
          <div className="space-y-6">
            {settings.heroSlides.map((slide, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 p-5 bg-slate-50/50">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <p className="text-sm font-extrabold text-slate-700">Slide {index + 1}</p>
                  <div className="flex items-center gap-1.5">
                    <button
                      className="adm-icon-btn"
                      title="Move up"
                      onClick={() => moveHeroSlide(index, -1)}
                    >
                      <FiChevronUp size={14} />
                    </button>
                    <button
                      className="adm-icon-btn"
                      title="Move down"
                      onClick={() => moveHeroSlide(index, 1)}
                    >
                      <FiChevronDown size={14} />
                    </button>
                    <button
                      className="adm-icon-btn danger"
                      title="Remove slide"
                      onClick={() => removeHeroSlide(index)}
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Heading" required>
                    <TextInput
                      value={slide.heading}
                      onChange={(e) => updateHeroSlide(index, "heading", e.target.value)}
                    />
                  </Field>
                  <Field label="Gold Highlight Word" hint="This word renders in gold gradient">
                    <TextInput
                      value={slide.gold}
                      onChange={(e) => updateHeroSlide(index, "gold", e.target.value)}
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Subtitle">
                      <TextArea
                        rows={2}
                        value={slide.subtitle}
                        onChange={(e) => updateHeroSlide(index, "subtitle", e.target.value)}
                      />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Background Image">
                      <ImageUpload
                        value={slide.image}
                        onChange={(url) => updateHeroSlide(index, "image", url)}
                        label="Upload Hero Image"
                      />
                    </Field>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === "home" && (
        <div className="space-y-6">
          <Card title="Trust Counter" subtitle="Stats shown in the about section">
            <div className="grid sm:grid-cols-2 gap-4">
              {settings.trustCounters.map((counter, index) => (
                <div key={index} className="flex items-end gap-3">
                  <Field label={`Counter ${index + 1} - Value`}>
                    <TextInput
                      value={counter.value}
                      onChange={(e) => updateCounter(index, "value", e.target.value)}
                    />
                  </Field>
                  <div className="flex-1">
                    <Field label="Label">
                      <TextInput
                        value={counter.label}
                        onChange={(e) => updateCounter(index, "label", e.target.value)}
                      />
                    </Field>
                  </div>
                  <button
                    className="adm-icon-btn danger mb-0.5"
                    title="Remove counter"
                    onClick={() =>
                      patch({
                        trustCounters: settings.trustCounters.filter((_, i) => i !== index),
                      })
                    }
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button
              className="adm-btn adm-btn-outline adm-btn-sm mt-2"
              onClick={() => patch({ trustCounters: [...settings.trustCounters, { value: "1000+", label: "New Stat" }] })}
            >
              <FiPlus size={14} />
              Add Counter
            </button>
          </Card>

          <Card title="About Section" subtitle="Heading, mission, vision and description">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Heading">
                <TextInput
                  value={settings.about.heading}
                  onChange={(e) => patch({ about: { ...settings.about, heading: e.target.value } })}
                />
              </Field>
              <Field label="Subtitle">
                <TextInput
                  value={settings.about.subtitle}
                  onChange={(e) => patch({ about: { ...settings.about, subtitle: e.target.value } })}
                />
              </Field>
              <Field label="Mission">
                <TextArea
                  rows={3}
                  value={settings.about.mission}
                  onChange={(e) => patch({ about: { ...settings.about, mission: e.target.value } })}
                />
              </Field>
              <Field label="Vision">
                <TextArea
                  rows={3}
                  value={settings.about.vision}
                  onChange={(e) => patch({ about: { ...settings.about, vision: e.target.value } })}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Description">
                  <TextArea
                    rows={3}
                    value={settings.about.description}
                    onChange={(e) => patch({ about: { ...settings.about, description: e.target.value } })}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="About Image">
                  <ImageUpload
                    value={settings.about.image}
                    onChange={(url) => patch({ about: { ...settings.about, image: url } })}
                  />
                </Field>
              </div>
            </div>
          </Card>

          <Card
            title="Why Choose Us"
            subtitle="Reasons displayed on the homepage"
            actions={
              <button
                className="adm-btn adm-btn-outline adm-btn-sm"
                onClick={() =>
                  patch({
                    whyChooseUs: [...settings.whyChooseUs, { icon: "FiStar", title: "New Reason", description: "" }],
                  })
                }
              >
                <FiPlus size={14} />
                Add Reason
              </button>
            }
          >
            <div className="space-y-5">
              {settings.whyChooseUs.map((item, index) => {
                const Icon = ICON_MAP[item.icon] ?? FiInfo;
                return (
                  <div key={index} className="rounded-2xl border border-slate-200 p-5 bg-slate-50/50">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="grid sm:grid-cols-2 gap-3">
                          <Field label="Title">
                            <TextInput
                              value={item.title}
                              onChange={(e) => updateWhy(index, "title", e.target.value)}
                            />
                          </Field>
                          <Field label="Icon">
                            <Select
                              value={item.icon}
                              onChange={(e) => updateWhy(index, "icon", e.target.value)}
                            >
                              {Object.keys(ICON_MAP).map((key) => (
                                <option key={key} value={key}>
                                  {key}
                                </option>
                              ))}
                            </Select>
                          </Field>
                        </div>
                        <Field label="Description">
                          <TextArea
                            rows={2}
                            value={item.description}
                            onChange={(e) => updateWhy(index, "description", e.target.value)}
                          />
                        </Field>
                      </div>
                      <button
                        className="adm-icon-btn danger shrink-0"
                        title="Remove"
                        onClick={() =>
                          patch({ whyChooseUs: settings.whyChooseUs.filter((_, i) => i !== index) })
                        }
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card
            title="Most Booked Routes"
            subtitle="Routes shown in the scrolling marquee"
            actions={
              <button
                className="adm-btn adm-btn-outline adm-btn-sm"
                onClick={() =>
                  patch({
                    mostBookedRoutes: [...settings.mostBookedRoutes, { route: "Shirdi → New Destination", slug: "shirdi-to-new-destination", price: "₹2,000" }],
                  })
                }
              >
                <FiPlus size={14} />
                Add Route
              </button>
            }
          >
            <div className="space-y-3">
              {settings.mostBookedRoutes.map((route, index) => (
                <div key={index} className="flex items-end gap-3">
                  <div className="flex-1">
                    <Field label="Route Name">
                      <TextInput
                        value={route.route}
                        onChange={(e) => updateRoute(index, "route", e.target.value)}
                      />
                    </Field>
                  </div>
                  <div className="w-32">
                    <Field label="Price">
                      <TextInput
                        value={route.price}
                        onChange={(e) => updateRoute(index, "price", e.target.value)}
                      />
                    </Field>
                  </div>
                  <button
                    className="adm-icon-btn danger mb-0.5"
                    title="Remove route"
                    onClick={() =>
                      patch({
                        mostBookedRoutes: settings.mostBookedRoutes.filter((_, i) => i !== index),
                      })
                    }
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "seo" && (
        <Card title="SEO Settings" subtitle="Search engine optimization fields">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Field label="Website Title">
                <TextInput
                  value={settings.seo.title}
                  onChange={(e) => patch({ seo: { ...settings.seo, title: e.target.value } })}
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Meta Description">
                <TextArea
                  rows={3}
                  value={settings.seo.description}
                  onChange={(e) => patch({ seo: { ...settings.seo, description: e.target.value } })}
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Keywords" hint="Comma separated">
                <TextInput
                  value={settings.seo.keywords}
                  onChange={(e) => patch({ seo: { ...settings.seo, keywords: e.target.value } })}
                />
              </Field>
            </div>
            <Field label="Open Graph Image">
              <ImageUpload
                value={settings.seo.ogImage}
                onChange={(url) => patch({ seo: { ...settings.seo, ogImage: url } })}
                label="Upload OG Image"
              />
            </Field>
            <Field label="Google Analytics ID">
              <TextInput
                value={settings.seo.gaId}
                onChange={(e) => patch({ seo: { ...settings.seo, gaId: e.target.value } })}
                placeholder="G-XXXXXXXXXX"
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Google Search Console Verification Code">
                <TextInput
                  value={settings.seo.gscVerification}
                  onChange={(e) => patch({ seo: { ...settings.seo, gscVerification: e.target.value } })}
                  placeholder="your-verification-code"
                />
              </Field>
            </div>
          </div>
        </Card>
      )}

      {tab === "colors" && (
        <Card title="Theme Colors" subtitle="Primary, secondary and accent colors">
          <div className="grid sm:grid-cols-3 gap-6">
            {([
              ["primaryColor", "Primary Color", "Buttons, links and highlights"],
              ["secondaryColor", "Secondary Color", "Headings and dark sections"],
              ["accentColor", "Accent Color", "Special highlights and badges"],
            ] as const).map(([key, label, hint]) => (
              <div key={key} className="rounded-2xl border border-slate-200 p-5">
                <p className="text-sm font-extrabold text-slate-700 mb-1">{label}</p>
                <p className="text-[11px] text-slate-400 mb-4">{hint}</p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings[key]}
                    onChange={(e) => patch({ [key]: e.target.value } as Partial<typeof settings>)}
                    className="w-14 h-14 rounded-xl border border-slate-200 cursor-pointer bg-white p-1"
                  />
                  <TextInput
                    value={settings[key]}
                    onChange={(e) => patch({ [key]: e.target.value } as Partial<typeof settings>)}
                    className="w-28 uppercase"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="h-20 flex items-center justify-center text-white font-extrabold" style={{ background: settings.primaryColor }}>
              Primary
            </div>
            <div className="h-20 flex items-center justify-center text-white font-extrabold" style={{ background: settings.secondaryColor }}>
              Secondary
            </div>
            <div className="h-20 flex items-center justify-center text-white font-extrabold" style={{ background: settings.accentColor }}>
              Accent
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

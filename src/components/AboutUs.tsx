"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiTarget, FiEye, FiAward, FiCalendar, FiArrowRight } from "react-icons/fi";
import { useSiteData } from "@/lib/site";

const STAT_ICONS = [FiAward, FiCalendar, FiTarget, FiEye];

export default function AboutUs({ preview = false }: { preview?: boolean }) {
  const site = useSiteData();
  const settings = site?.settings;
  const about = settings?.about;
  const counters = settings?.trustCounters ?? [];
  const stats = counters.map((counter, i) => ({
    icon: STAT_ICONS[i % STAT_ICONS.length],
    value: counter.value,
    label: counter.label,
  }));
  const experience = counters[1]?.value ?? "8+";
  const aboutHeading =
    about?.heading ?? "Your Trusted Travel Partner in Shirdi";
  const [headingBefore, headingAfter] = aboutHeading.includes("Shirdi")
    ? aboutHeading.split("Shirdi")
    : [aboutHeading, ""];

  return (
    <section id="about" className="section-padding bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            About Us
          </span>
          <h2 className="section-title mt-2">
            {headingBefore}
            <span className="gradient-text">Shirdi</span>
            {headingAfter}
          </h2>
          <p className="section-subtitle">{about?.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[24px] blur-2xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={about?.image || "/images/xuv.jpeg"}
          alt="About Shirdi Car Rental"
                className="relative rounded-[24px] shadow-xl w-full object-cover aspect-[4/3]"
                loading="lazy"
              />
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl px-6 py-4 shadow-xl border border-border/50 hidden sm:block">
                <p className="text-3xl font-bold text-primary">{experience}</p>
                <p className="text-sm text-text-muted">Years Experience</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-white border border-border/50 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FiTarget size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-secondary mb-1">
                    Our Mission
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {about?.mission}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border/50 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <FiEye size={22} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-secondary mb-1">
                    Our Vision
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {about?.vision}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-text-muted leading-relaxed pl-2">
              {about?.description}
            </p>
          </motion.div>
        </div>

        {!preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="glass rounded-2xl p-6 text-center border border-border/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary">
                    <Icon size={24} />
                  </div>
                  <p className="text-3xl font-bold text-secondary">{stat.value}</p>
                  <p className="text-sm text-text-muted">{stat.label}</p>
                </div>
              );
            })}
          </motion.div>
        )}

        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-primary text-primary font-bold text-base hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              More About Us
              <FiArrowRight size={20} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

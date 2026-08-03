"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useSiteData } from "@/lib/site";
import { ICON_MAP } from "@/admin/lib/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const COLORS = [
  { color: "from-blue-500 to-blue-600", bg: "bg-blue-50", iconColor: "text-blue-600" },
  { color: "from-green-500 to-green-600", bg: "bg-green-50", iconColor: "text-green-600" },
  { color: "from-accent to-orange-500", bg: "bg-amber-50", iconColor: "text-amber-600" },
  { color: "from-purple-500 to-purple-600", bg: "bg-purple-50", iconColor: "text-purple-600" },
  { color: "from-red-500 to-red-600", bg: "bg-red-50", iconColor: "text-red-600" },
  { color: "from-teal-500 to-teal-600", bg: "bg-teal-50", iconColor: "text-teal-600" },
];

export default function WhyChooseUs({ preview = false }: { preview?: boolean }) {
  const site = useSiteData();
  const rawReasons = site?.settings.whyChooseUs ?? [];
  const reasons = rawReasons.map((item, i) => {
    const Icon = ICON_MAP[item.icon] ?? ICON_MAP.FiSmile;
    const palette = COLORS[i % COLORS.length];
    return {
      icon: <Icon size={28} />,
      title: item.title,
      description: item.description,
      ...palette,
    };
  });
  const shown = preview ? reasons.slice(0, 3) : reasons;

  return (
    <section className="section-padding bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Why Choose Us
          </span>
          <h2 className="section-title mt-2">
            The Best Car Rental Service in{" "}
            <span className="gradient-text">Shirdi</span>
          </h2>
          <p className="section-subtitle">
            We provide premium car rental and taxi services with a focus on
            safety, reliability, and customer satisfaction.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {shown.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className="group card-hover bg-white rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-xl"
            >
              <div
                className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <span className={item.iconColor}>{item.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-secondary mb-2">
                {item.title}
              </h3>
              <p className="text-text-muted leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-center mt-12"
          >
            <Link
              href="/why-choose-us"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-primary text-primary font-bold text-base hover:bg-primary hover:text-white hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300"
            >
              Why Choose Us
              <FiArrowRight size={20} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

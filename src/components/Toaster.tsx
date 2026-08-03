"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";
import { useToaster } from "@/lib/toast";

const ICONS = {
  success: FiCheckCircle,
  error: FiAlertCircle,
  warning: FiAlertTriangle,
  info: FiInfo,
};

export default function Toaster() {
  const [toasts] = useToaster();

  if (!toasts.length) return null;

  const toneClass = (type: keyof typeof ICONS) => {
    switch (type) {
      case "success":
        return "border-green-500 text-green-800";
      case "error":
        return "border-rose-500 text-rose-800";
      case "warning":
        return "border-amber-500 text-amber-800";
      case "info":
        return "border-blue-500 text-blue-800";
      default:
        return "border-blue-500 text-blue-800";
    }
  };

  const iconColor = (type: keyof typeof ICONS) => {
    switch (type) {
      case "success":
        return "text-green-500";
      case "error":
        return "text-rose-500";
      case "warning":
        return "text-amber-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2.5 w-[calc(100vw-2.5rem)] max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => {
          const Icon = ICONS[t.type];
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 48, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 48, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-lg shadow-black/15 border-l-4 ${toneClass(
                t.type
              )} pointer-events-auto`}
            >
              <Icon size={18} className={iconColor(t.type)} />
              <span className="flex-1 text-sm font-medium">{t.message}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

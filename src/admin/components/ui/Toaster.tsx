"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";
import { useToaster } from "../../lib/toast";

const ICONS = {
  success: FiCheckCircle,
  error: FiAlertCircle,
  warning: FiAlertTriangle,
  info: FiInfo,
};

export default function Toaster() {
  const [toasts] = useToaster();

  return (
    <div className="fixed top-5 right-5 z-[90] flex flex-col gap-2.5 w-[calc(100vw-2.5rem)] max-w-sm pointer-events-none">
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
              transition={{ duration: 0.28, ease: "easeOut" }}
              className={`adm-toast ${t.type} pointer-events-auto`}
            >
              <Icon size={16} className="shrink-0" />
              <span className="flex-1">{t.message}</span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

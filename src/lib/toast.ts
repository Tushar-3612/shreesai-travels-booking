"use client";

import { useCallback, useEffect, useState } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

type Listener = (toast: ToastItem) => void;

let emit: Listener | null = null;

export const TOAST_DURATION = 2600;

export function toast(message: string, type: ToastType = "success") {
  emit?.({
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    message,
    type,
  });
}

export function useToaster(): [ToastItem[], (id: string) => void] {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    emit = (toastItem: ToastItem) => {
      setToasts((prev) => [...prev.slice(-4), toastItem]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toastItem.id));
      }, TOAST_DURATION);
    };
    return () => {
      emit = null;
    };
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return [toasts, dismiss];
}

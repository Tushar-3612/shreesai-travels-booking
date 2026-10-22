"use client";

import { useCallback, useEffect, useState } from "react";
import { uid } from "./storage";
import {
  seedBookings,
  seedDestinations,
  seedGallery,
  seedPackages,
  seedPricing,
  seedReviews,
  seedServices,
  seedSettings,
  seedVehicles,
} from "./seed";
import type { PricingConfig, SiteSettings } from "../types";

export const DB_KEYS = {
  bookings: "bookings",
  packages: "packages",
  vehicles: "vehicles",
  services: "services",
  reviews: "reviews",
  gallery: "gallery",
  settings: "settings",
  destinations: "destinations",
} as const;

async function apiPost(body: unknown) {
  await fetch("/api/admin/data", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function useCollection<T extends { id: string }>(
  key: string,
  seed: () => T[]
) {
  const [items, setItems] = useState<T[]>(() => seed());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/admin/data?collection=${encodeURIComponent(key)}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("load failed");
        const data = (await res.json()) as unknown;
        if (!cancelled && Array.isArray(data)) setItems(data as T[]);
      } catch {
        // keep seeded fallback
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [key]);

  const persist = useCallback(
    (body: Record<string, unknown>) => {
      void apiPost({ collection: key, ...body }).catch(() => {
        /* offline / transient - local state stays in sync */
      });
    },
    [key]
  );

  const add = useCallback(
    (item: Omit<T, "id"> & { id?: string }) => {
      const full = { id: item.id ?? uid(), ...item } as T;
      setItems((prev) => [full, ...prev]);
      persist({ action: "add", item: full });
      return full;
    },
    [persist]
  );

  const update = useCallback(
    (id: string, patch: Partial<T>) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...patch } : item))
      );
      persist({ action: "update", id, item: patch });
    },
    [persist]
  );

  const remove = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      persist({ action: "remove", id });
    },
    [persist]
  );

  const setAll = useCallback(
    (next: T[]) => {
      setItems(next);
      persist({ action: "setAll", items: next });
    },
    [persist]
  );

  return { items, setItems, setAll, add, update, remove, isLoading };
}

export function useBookings() {
  return useCollection(DB_KEYS.bookings, seedBookings);
}

export function usePackages() {
  return useCollection(DB_KEYS.packages, seedPackages);
}

export function useVehicles() {
  return useCollection(DB_KEYS.vehicles, seedVehicles);
}

export function useServices() {
  return useCollection(DB_KEYS.services, seedServices);
}

export function useReviews() {
  return useCollection(DB_KEYS.reviews, seedReviews);
}

export function useGalleryItems() {
  return useCollection(DB_KEYS.gallery, seedGallery);
}

export function useDestinations() {
  return useCollection(DB_KEYS.destinations, seedDestinations);
}

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(() => seedSettings());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/admin/data?collection=${DB_KEYS.settings}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("load failed");
        const data = (await res.json()) as unknown;
        if (
          !cancelled &&
          typeof data === "object" &&
          data !== null &&
          "businessName" in data
        ) {
          setSettings(data as SiteSettings);
        }
      } catch {
        // keep seeded fallback
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const update = useCallback((patch: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const save = useCallback((next: SiteSettings) => {
    setSettings(next);
    void apiPost({ collection: DB_KEYS.settings, action: "save", item: next }).catch(
      () => {
        /* offline / transient */
      }
    );
  }, []);

  const reset = useCallback(() => {
    const defaults = seedSettings();
    setSettings(defaults);
    void apiPost({ collection: DB_KEYS.settings, action: "reset" }).catch(() => {
      /* offline / transient */
    });
  }, []);

  return { settings, update, save, reset, isLoading };
}

export function usePricing() {
  const [pricing, setPricing] = useState<PricingConfig>(() => seedPricing());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/admin/data?collection=pricing`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("load failed");
        const data = (await res.json()) as unknown;
        if (!cancelled && typeof data === "object" && data !== null) {
          setPricing(data as PricingConfig);
        }
      } catch {
        /* keep seeded fallback */
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const update = useCallback((patch: Partial<PricingConfig>) => {
    setPricing((prev) => ({ ...prev, ...patch }));
  }, []);

  const setPricingState = useCallback((next: PricingConfig) => {
    setPricing(next);
  }, []);

  const save = useCallback((next: PricingConfig) => {
    setPricing(next);
    void apiPost({ collection: "pricing", action: "save", item: next }).catch(() => {
      /* offline / transient */
    });
  }, []);

  return { pricing, update, setPricing: setPricingState, save, isLoading };
}

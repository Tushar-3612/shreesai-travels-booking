import fs from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { requireAdminApi } from "@/admin/lib/server/auth";
import {
  isCollectionName,
  readCollection,
  resetCollection,
  writeCollection,
} from "@/lib/cms/store";
import type { SiteSettings } from "@/admin/types";

export const dynamic = "force-dynamic";

type Mutation =
  | { action: "add"; item: Record<string, unknown> }
  | { action: "update"; id: string; item: Record<string, unknown> }
  | { action: "remove"; id: string }
  | { action: "setAll"; items: unknown[] }
  | { action: "save"; item: Record<string, unknown> }
  | { action: "reset" };

function applyCollectionMutation<T>(
  collection: string,
  mutation: Mutation
): T {
  const current = readCollection<unknown[] | Record<string, unknown>>(
    collection as never
  );

  if (mutation.action === "reset") {
    return resetCollection(collection as never) as T;
  }

  let next: unknown;

  if (!Array.isArray(current)) {
    // Object collections (e.g. settings) - merge or replace.
    switch (mutation.action) {
      case "update":
        next = { ...current, ...(mutation.item ?? {}) };
        break;
      case "save":
        next = mutation.item ?? current;
        break;
      default:
        next = current;
    }
    writeCollection(collection as never, next);
    return next as T;
  }

  const list = [...current];

  switch (mutation.action) {
    case "add": {
      list.unshift(mutation.item);
      next = list;
      break;
    }
    case "update": {
      next = list.map((entry) =>
        (entry as { id?: string }).id === mutation.id
          ? { ...(entry as object), ...mutation.item }
          : entry
      );
      break;
    }
    case "remove": {
      next = list.filter(
        (entry) => (entry as { id?: string }).id !== mutation.id
      );
      break;
    }
    case "setAll": {
      next = mutation.items ?? [];
      break;
    }
    case "save": {
      next = mutation.item;
      break;
    }
    default:
      next = current;
  }

  writeCollection(collection as never, next);
  return next as T;
}

function syncFavicon(favicon: string) {
  if (!favicon.startsWith("/admin/media/")) return;
  const fileName = path.basename(favicon);
  const source = path.join(process.cwd(), "public", "admin", "media", fileName);
  if (!fs.existsSync(source)) return;
  try {
    fs.copyFileSync(source, path.join(process.cwd(), "public", "favicon.ico"));
  } catch {
    // favicon sync is best-effort
  }
}

export async function GET(request: Request) {
  const profile = await requireAdminApi();
  if (!profile) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const collection = new URL(request.url).searchParams.get("collection") ?? "";
  if (!isCollectionName(collection)) {
    return NextResponse.json({ ok: false, error: "Unknown collection" }, { status: 400 });
  }
  return NextResponse.json(readCollection(collection), {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  const profile = await requireAdminApi();
  if (!profile) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      collection?: string;
      action?: string;
      id?: string;
      item?: Record<string, unknown>;
      items?: unknown[];
    };
    const collection = body.collection ?? "";
    if (!isCollectionName(collection) || !body.action) {
      return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
    }

    const mutation = { action: body.action, id: body.id, item: body.item, items: body.items } as Mutation;

    if (collection === "settings") {
      const settings = applyCollectionMutation<SiteSettings>(collection, mutation);
      if (mutation.action === "save" && settings.favicon) {
        syncFavicon(settings.favicon);
      }
    } else {
      applyCollectionMutation<unknown[]>(collection, mutation);
    }

    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save" }, { status: 500 });
  }
}

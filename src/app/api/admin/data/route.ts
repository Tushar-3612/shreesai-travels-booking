import { NextResponse } from "next/server";
import { requireAdminApi } from "@/admin/lib/server/auth";
import {
  isCollectionName,
  readCollection,
  resetCollection,
  writeCollection,
  type CollectionName,
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

async function applyCollectionMutation<T>(
  collection: CollectionName,
  mutation: Mutation
): Promise<T> {
  const current = await readCollection<unknown[] | Record<string, unknown>>(collection);

  if (mutation.action === "reset") {
    return (await resetCollection(collection)) as T;
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
    await writeCollection(collection, next);
    return next as T;
  }

  const list = [...current] as Record<string, unknown>[];

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

  await writeCollection(collection, next);
  return next as T;
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
  const data = await readCollection(collection);
  return NextResponse.json(data, {
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
      await applyCollectionMutation<SiteSettings>(collection, mutation);
    } else {
      await applyCollectionMutation<unknown[]>(collection, mutation);
    }

    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to save" }, { status: 500 });
  }
}

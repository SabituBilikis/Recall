import type { Collection } from "@/types/collection";
import type { Notification } from "@/types/notification";
import type { SavedItem } from "@/types/saved-item";

import type { Database } from "./generated/database.types";

type CollectionRow = Database["public"]["Tables"]["collections"]["Row"];
type SavedItemRow = Database["public"]["Tables"]["saved_items"]["Row"];
type NotificationRow = Database["public"]["Tables"]["notifications"]["Row"];

// DB rows → app display types. Keeps the Zustand stores unchanged when wired.
function relativeDateLabel(iso: string): string {
  const date = new Date(iso);
  const startOfDay = (value: Date) => new Date(value.getFullYear(), value.getMonth(), value.getDate());
  const diffDays = Math.round((startOfDay(new Date()).getTime() - startOfDay(date).getTime()) / 86400000);
  if (diffDays <= 0) {
    return "Today";
  }
  if (diffDays === 1) {
    return "Yesterday";
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function toCollection(row: CollectionRow, itemCount = 0): Collection {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    color: row.color,
    icon: row.icon,
    itemCount,
    lastUpdatedLabel: relativeDateLabel(row.updated_at),
    createdAt: relativeDateLabel(row.created_at)
  };
}

export function toNotification(row: NotificationRow): Notification {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    body: row.body,
    createdAtLabel: relativeDateLabel(row.created_at),
    read: row.read_at !== null,
    data: (row.data as Record<string, unknown> | null) ?? undefined
  };
}

export function toSavedItem(row: SavedItemRow, collectionName = "Unsorted"): SavedItem {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    collectionName,
    savedAtLabel: relativeDateLabel(row.created_at),
    fileType: row.file_type ?? undefined,
    url: row.url ?? undefined,
    content: row.content || undefined,
    description: row.description || undefined
  };
}

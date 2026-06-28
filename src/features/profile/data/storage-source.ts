import { USE_BACKEND } from "@/lib/config/backend-flag";
import { supabase } from "@/services/supabase-client";
import type { SavedItemType } from "@/types/saved-item";

import { mockStorageBreakdown, mockStorageUsage } from "../mock/mock-storage";
import type { StorageBreakdownEntry, StorageUsage } from "../types/profile.types";

// Storage figures. Mock (flag off): the Figma demo values. Backend (flag on):
// real usage — item counts from `saved_items`, byte sizes from `files.size_bytes`
// (recorded on upload). Notes/links carry no file, so they contribute counts but
// ~0 bytes; total used = sum of file sizes.
const QUOTA_BYTES = 10 * 1024 * 1024 * 1024;

const TYPES: { type: SavedItemType; label: string }[] = [
  { type: "screenshot", label: "Screenshots" },
  { type: "link", label: "Links" },
  { type: "note", label: "Notes" },
  { type: "file", label: "Files" }
];

export type StorageData = { usage: StorageUsage; breakdown: StorageBreakdownEntry[] };

// Sync usage used by the Profile hub (% bar). Real per-type figures live in
// loadStorage(); this stays 0 on backend until that async fetch runs.
export function getStorageUsage(): StorageUsage {
  return USE_BACKEND ? { usedBytes: 0, totalBytes: QUOTA_BYTES } : mockStorageUsage;
}

export async function loadStorage(): Promise<StorageData> {
  if (!USE_BACKEND) {
    return { usage: mockStorageUsage, breakdown: mockStorageBreakdown };
  }

  const [itemsRes, filesRes] = await Promise.all([
    supabase.from("saved_items").select("id,type").is("deleted_at", null),
    supabase.from("files").select("saved_item_id,size_bytes")
  ]);
  if (itemsRes.error) {
    throw itemsRes.error;
  }
  if (filesRes.error) {
    throw filesRes.error;
  }

  const typeById = new Map<string, SavedItemType>();
  const counts: Record<SavedItemType, number> = { screenshot: 0, link: 0, note: 0, file: 0 };
  for (const row of itemsRes.data ?? []) {
    const type = row.type as SavedItemType;
    typeById.set(row.id, type);
    counts[type] += 1;
  }

  const bytes: Record<SavedItemType, number> = { screenshot: 0, link: 0, note: 0, file: 0 };
  for (const file of filesRes.data ?? []) {
    const type = typeById.get(file.saved_item_id);
    if (type) {
      bytes[type] += file.size_bytes ?? 0;
    }
  }

  const breakdown = TYPES.map((entry) => ({ ...entry, bytes: bytes[entry.type], itemCount: counts[entry.type] }));
  const usedBytes = breakdown.reduce((sum, entry) => sum + entry.bytes, 0);
  return { usage: { usedBytes, totalBytes: QUOTA_BYTES }, breakdown };
}

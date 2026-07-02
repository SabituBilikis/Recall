import { useCallback, useEffect, useMemo, useState } from "react";

import { USE_BACKEND } from "@/lib/config/backend-flag";
import { listArchivedItems, restoreItem } from "@/services/items.service";
import type { SavedItem } from "@/types/saved-item";

import { mockTrashItems } from "../mock/mock-trash";

// Trash = the existing archive data (soft-deleted items). Backend mode reads the
// archive service; flag-off falls back to mock. Search filters client-side.
// Permanent delete is a local-only stub until a permanentlyDelete service exists.
export function useTrash() {
  const [items, setItems] = useState<SavedItem[]>(() => (USE_BACKEND ? [] : mockTrashItems));
  const [searchTrashQuery, setSearchTrashQuery] = useState("");

  const load = useCallback(async () => {
    if (!USE_BACKEND) {
      return;
    }
    try {
      setItems(await listArchivedItems());
    } catch (error) {
      console.warn("[trash] load failed", error);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  const filteredTrashItems = useMemo(() => {
    const query = searchTrashQuery.trim().toLowerCase();
    return query.length === 0 ? items : items.filter((item) => item.title.toLowerCase().includes(query));
  }, [items, searchTrashQuery]);

  const restore = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
    if (USE_BACKEND) {
      void restoreItem(id).catch((error: unknown) => console.warn("[trash] restore failed", error));
    }
  }, []);

  // Stub: removes locally only. A future permanentlyDelete service wires here.
  const permanentlyDelete = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  return {
    trashItems: items,
    filteredTrashItems,
    searchTrashQuery,
    setSearchTrashQuery,
    restore,
    permanentlyDelete,
    refresh: load,
    isEmpty: items.length === 0
  };
}

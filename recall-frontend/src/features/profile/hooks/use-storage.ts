import { useCallback, useEffect, useState } from "react";

import { useSavedItemsStore } from "@/store/use-saved-items-store";

import { loadStorage, type StorageData } from "../data/storage-source";

// Loads real storage usage (item counts + file bytes). Re-fetches whenever the
// saved-items count changes — covers new saves, deletes, and realtime updates
// (realtime reloads the items store, which bumps the count). Exposes
// loading/error/reload so callers can show every state.
export function useStorage() {
  const [data, setData] = useState<StorageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const itemCount = useSavedItemsStore((state) => state.items.length);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      setData(await loadStorage());
    } catch (err) {
      console.warn("[storage] load failed", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload, itemCount]);

  return { data, loading, error, reload };
}

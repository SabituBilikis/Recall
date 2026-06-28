import { useEffect, useMemo, useState } from "react";

import { useCollectionsStore } from "@/store/use-collections-store";

export function useCollectionsList() {
  const collections = useCollectionsStore((state) => state.collections);
  const collectionsError = useCollectionsStore((state) => state.error);
  const loadCollections = useCollectionsStore((state) => state.loadCollections);
  const [query, setQuery] = useState("");

  // Hydrate from the backend on mount (no-op on mock).
  useEffect(() => {
    void loadCollections();
  }, [loadCollections]);

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (trimmed.length === 0) {
      return collections;
    }
    return collections.filter(
      (collection) =>
        collection.name.toLowerCase().includes(trimmed) || collection.description.toLowerCase().includes(trimmed)
    );
  }, [collections, query]);

  return {
    collections: filtered,
    query,
    setQuery,
    hasCollections: collections.length > 0,
    loadCollections,
    loadError: collectionsError && collections.length === 0
  };
}

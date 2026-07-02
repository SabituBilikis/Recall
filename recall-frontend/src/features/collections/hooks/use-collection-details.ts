import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { USE_BACKEND } from "@/lib/config/backend-flag";
import { listItemsByCollectionPage } from "@/services/items.service";
import { useCollectionsStore } from "@/store/use-collections-store";
import type { SavedItem } from "@/types/saved-item";

import type { CollectionFilter } from "../constants/collections-content";
import { getMockCollectionItems } from "../mock/mock-collection-items";

const PAGE_SIZE = 20;

export function useCollectionDetails(collectionId: string) {
  const collection = useCollectionsStore((state) => state.collections.find((item) => item.id === collectionId));
  const deleteCollection = useCollectionsStore((state) => state.deleteCollection);
  const [filter, setFilter] = useState<CollectionFilter>("all");
  const [query, setQuery] = useState("");
  const [baseItems, setBaseItems] = useState<SavedItem[]>(() =>
    USE_BACKEND ? [] : getMockCollectionItems(collectionId)
  );
  const [loadingMore, setLoadingMore] = useState(false);
  const cursor = useRef<string | null>(null);

  const load = useCallback(async () => {
    if (!USE_BACKEND) {
      return;
    }
    try {
      const page = await listItemsByCollectionPage(collectionId, PAGE_SIZE);
      setBaseItems(page.items);
      cursor.current = page.nextCursor;
    } catch (error) {
      console.warn("[collection-details] load failed", error);
    }
  }, [collectionId]);

  const loadMore = useCallback(async () => {
    if (!USE_BACKEND || loadingMore || !cursor.current) {
      return;
    }
    setLoadingMore(true);
    try {
      const page = await listItemsByCollectionPage(collectionId, PAGE_SIZE, cursor.current);
      setBaseItems((current) => {
        const seen = new Set(current.map((item) => item.id));
        return [...current, ...page.items.filter((item) => !seen.has(item.id))];
      });
      cursor.current = page.nextCursor;
    } catch (error) {
      console.warn("[collection-details] load more failed", error);
    } finally {
      setLoadingMore(false);
    }
  }, [collectionId, loadingMore]);

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  const items = useMemo(() => {
    const byType = filter === "all" ? baseItems : baseItems.filter((item) => item.type === filter);
    const trimmed = query.trim().toLowerCase();
    return trimmed.length === 0 ? byType : byType.filter((item) => item.title.toLowerCase().includes(trimmed));
  }, [baseItems, filter, query]);

  return {
    collection,
    items,
    filter,
    setFilter,
    query,
    setQuery,
    deleteCollection,
    refresh: load,
    loadMore,
    loadingMore
  };
}

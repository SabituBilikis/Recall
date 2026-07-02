import { create } from "zustand";

import { track } from "@/lib/analytics/analytics";
import { USE_BACKEND } from "@/lib/config/backend-flag";
import { cacheGet, cacheSet } from "@/services/cache/local-cache";
import * as itemsService from "@/services/items.service";
import { runOrQueue } from "@/services/sync/mutation-queue";
import type { SavedItem } from "@/types/saved-item";

const CACHE_KEY = "saved-items";
const PAGE_SIZE = 20;

// Saved items. Mock (flag off): seeded by capture, mutated locally. Backend (flag
// on): hydrated from the service first page; `loadMore` keyset-paginates older
// items; delete soft-deletes (archive) server-side.
type SavedItemsState = {
  items: SavedItem[];
  nextCursor: string | null;
  loadingMore: boolean;
  // True when the last network load failed — lets the UI show an error/retry
  // (vs a misleading empty state) when there's no cached data to fall back on.
  error: boolean;
  loadItems: () => Promise<void>;
  loadMore: () => Promise<void>;
  addItem: (item: SavedItem) => void;
  deleteItem: (id: string) => void;
};

export const useSavedItemsStore = create<SavedItemsState>()((set, get) => ({
  items: [],
  nextCursor: null,
  loadingMore: false,
  error: false,

  loadItems: async () => {
    if (!USE_BACKEND) {
      return;
    }
    // Hydrate from cache first (instant + offline), then refresh from network.
    if (get().items.length === 0) {
      const cached = await cacheGet<SavedItem[]>(CACHE_KEY);
      if (cached && get().items.length === 0) {
        set({ items: cached });
      }
    }
    try {
      const { items, nextCursor } = await itemsService.listRecentItemsPage(PAGE_SIZE);
      set({ items, nextCursor, error: false });
      void cacheSet(CACHE_KEY, items);
    } catch (error) {
      console.warn("[items] load failed (serving cache)", error);
      set({ error: true });
    }
  },

  loadMore: async () => {
    const { nextCursor, loadingMore } = get();
    if (!USE_BACKEND || loadingMore || !nextCursor) {
      return;
    }
    set({ loadingMore: true });
    try {
      const page = await itemsService.listRecentItemsPage(PAGE_SIZE, nextCursor);
      // Guard against duplicates if a new item landed at the head meanwhile.
      const seen = new Set(get().items.map((item) => item.id));
      const fresh = page.items.filter((item) => !seen.has(item.id));
      set((state) => ({ items: [...state.items, ...fresh], nextCursor: page.nextCursor }));
    } catch (error) {
      console.warn("[items] load more failed", error);
    } finally {
      set({ loadingMore: false });
    }
  },

  addItem: (item) => set((state) => ({ items: [item, ...state.items] })),

  deleteItem: (id) => {
    const previous = get().items;
    set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
    track("item_archived");
    if (!USE_BACKEND) {
      return;
    }
    void runOrQueue({ kind: "item.archive", payload: { id } }, () => itemsService.archiveItem(id)).catch(
      (error: unknown) => {
        console.warn("[items] delete failed", error);
        set({ items: previous });
      }
    );
  }
}));

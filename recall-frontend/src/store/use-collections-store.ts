import { create } from "zustand";

import { mockCollections } from "@/features/collections/mock/mock-collections";
import { USE_BACKEND } from "@/lib/config/backend-flag";
import { cacheGet, cacheSet } from "@/services/cache/local-cache";
import * as collectionsService from "@/services/collections.service";
import { runOrQueue } from "@/services/sync/mutation-queue";
import type { Collection } from "@/types/collection";

const CACHE_KEY = "collections";

// Single source for collections. On mock (flag off) it's seeded + mutated
// locally. On backend (flag on) it hydrates from the service and mutations
// write through optimistically. Screens read it unchanged either way.
type CollectionsState = {
  collections: Collection[];
  // True when the last network load failed (see saved-items store).
  error: boolean;
  loadCollections: () => Promise<void>;
  addCollection: (collection: Collection) => void;
  updateCollection: (id: string, patch: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
};

export const useCollectionsStore = create<CollectionsState>()((set, get) => ({
  collections: USE_BACKEND ? [] : mockCollections,
  error: false,

  loadCollections: async () => {
    if (!USE_BACKEND) {
      return;
    }
    // Hydrate from cache first (instant + offline), then refresh from network.
    if (get().collections.length === 0) {
      const cached = await cacheGet<Collection[]>(CACHE_KEY);
      if (cached && get().collections.length === 0) {
        set({ collections: cached });
      }
    }
    try {
      const collections = await collectionsService.listCollections();
      set({ collections, error: false });
      void cacheSet(CACHE_KEY, collections);
    } catch (error) {
      console.warn("[collections] load failed (serving cache)", error);
      set({ error: true });
    }
  },

  addCollection: (collection) => {
    set((state) => ({ collections: [collection, ...state.collections] })); // optimistic
    if (!USE_BACKEND) {
      return;
    }
    const newCollection = {
      name: collection.name,
      description: collection.description,
      color: collection.color,
      icon: collection.icon
    };
    void runOrQueue(
      { kind: "collection.create", payload: { id: collection.id, ...newCollection } },
      () =>
        collectionsService.createCollection(newCollection, collection.id).then((saved) =>
          set((state) => ({ collections: state.collections.map((item) => (item.id === collection.id ? saved : item)) }))
        )
    ).catch((error: unknown) => {
      console.warn("[collections] create failed", error);
      set((state) => ({ collections: state.collections.filter((item) => item.id !== collection.id) }));
    });
  },

  updateCollection: (id, patch) => {
    set((state) => ({ collections: state.collections.map((item) => (item.id === id ? { ...item, ...patch } : item)) }));
    if (!USE_BACKEND) {
      return;
    }
    const servicePatch = { name: patch.name, description: patch.description, color: patch.color, icon: patch.icon };
    void runOrQueue({ kind: "collection.update", payload: { id, patch: servicePatch } }, () =>
      collectionsService.updateCollection(id, servicePatch)
    ).catch((error: unknown) => {
      console.warn("[collections] update failed", error);
      void get().loadCollections();
    });
  },

  deleteCollection: (id) => {
    const previous = get().collections;
    set((state) => ({ collections: state.collections.filter((item) => item.id !== id) }));
    if (!USE_BACKEND) {
      return;
    }
    void runOrQueue({ kind: "collection.delete", payload: { id } }, () =>
      collectionsService.deleteCollection(id)
    ).catch((error: unknown) => {
      console.warn("[collections] delete failed", error);
      set({ collections: previous });
    });
  }
}));

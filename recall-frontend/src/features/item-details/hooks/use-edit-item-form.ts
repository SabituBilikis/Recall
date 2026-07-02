import { useState } from "react";

import { USE_BACKEND } from "@/lib/config/backend-flag";
import { isValidUrl } from "@/lib/validation";
import { updateItem } from "@/services/items.service";
import type { ItemPatch } from "@/services/items.service";
import { runOrQueue } from "@/services/sync/mutation-queue";
import { useCollectionsStore } from "@/store/use-collections-store";
import { useSavedItemsStore } from "@/store/use-saved-items-store";
import type { SavedItem } from "@/types/saved-item";

import type { DetailItem } from "../types/item.types";

function resolveCollectionId(name: string): string | null {
  if (name.length === 0) {
    return null;
  }
  return useCollectionsStore.getState().collections.find((collection) => collection.name === name)?.id ?? null;
}

// Edit form for an existing item. Per-type fields, writes through to the backend
// (or the local store on mock), then refreshes the saved-items entry.
export function useEditItemForm({ item, onDone }: { item: DetailItem; onDone: () => void }) {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description ?? "");
  const [content, setContent] = useState(item.content ?? "");
  const [url, setUrl] = useState(item.url ?? "");
  const [collection, setCollection] = useState(item.collection);
  const [isSaving, setIsSaving] = useState(false);

  const urlError = item.type === "link" && url.length > 0 && !isValidUrl(url) ? "Please enter a valid URL." : null;
  const isValid =
    title.trim().length > 0 &&
    (item.type !== "link" || isValidUrl(url)) &&
    (item.type !== "note" || content.trim().length > 0);

  function patchStore(patch: Partial<SavedItem>) {
    useSavedItemsStore.setState((state) => ({
      items: state.items.map((entry) => (entry.id === item.id ? { ...entry, ...patch } : entry))
    }));
  }

  function handleSave() {
    if (!isValid || isSaving) {
      return;
    }
    setIsSaving(true);

    const display: Partial<SavedItem> = {
      title: title.trim(),
      collectionName: collection || "Unsorted",
      description: item.type === "link" ? description.trim() || undefined : undefined,
      content: item.type === "note" ? content.trim() || undefined : undefined,
      url: item.type === "link" ? url.trim() || undefined : undefined
    };

    if (!USE_BACKEND) {
      patchStore(display);
      setIsSaving(false);
      onDone();
      return;
    }

    const patch: ItemPatch = {
      title: title.trim(),
      description: item.type === "link" ? description.trim() : undefined,
      content: item.type === "note" ? content.trim() : undefined,
      url: item.type === "link" ? url.trim() || null : undefined,
      collectionId: resolveCollectionId(collection)
    };

    void runOrQueue({ kind: "item.update", payload: { id: item.id, patch } }, () => updateItem(item.id, patch))
      .then(() => {
        patchStore(display);
        onDone();
      })
      .catch((error: unknown) => console.warn("[item] update failed", error))
      .finally(() => setIsSaving(false));
  }

  return {
    title,
    setTitle,
    description,
    setDescription,
    content,
    setContent,
    url,
    setUrl,
    collection,
    setCollection,
    urlError,
    isValid,
    isSaving,
    handleSave
  };
}

export type EditItemFormApi = ReturnType<typeof useEditItemForm>;

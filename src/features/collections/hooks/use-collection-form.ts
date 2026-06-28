import { useState } from "react";

import { newId } from "@/lib/id";
import { useCollectionsStore } from "@/store/use-collections-store";
import type { Collection, CollectionColor, CollectionIcon } from "@/types/collection";

export type CollectionFormMode = { type: "create" } | { collection: Collection; type: "edit" };

type UseCollectionFormParams = {
  mode: CollectionFormMode;
  onDone: () => void;
};

// Create/edit form state + validation (name ≥ 2; color + icon always set via
// defaults, satisfying "required"). Writes to the collections store.
export function useCollectionForm({ mode, onDone }: UseCollectionFormParams) {
  const addCollection = useCollectionsStore((state) => state.addCollection);
  const updateCollection = useCollectionsStore((state) => state.updateCollection);
  const initial = mode.type === "edit" ? mode.collection : null;

  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [color, setColor] = useState<CollectionColor>(initial?.color ?? "purple");
  const [icon, setIcon] = useState<CollectionIcon>(initial?.icon ?? "folder");

  const isValid = name.trim().length >= 2;

  function handleSubmit() {
    if (!isValid) {
      return;
    }
    if (mode.type === "edit") {
      updateCollection(mode.collection.id, {
        name: name.trim(),
        description: description.trim(),
        color,
        icon,
        lastUpdatedLabel: "today"
      });
    } else {
      const collection: Collection = {
        id: newId(),
        name: name.trim(),
        description: description.trim(),
        color,
        icon,
        itemCount: 0,
        lastUpdatedLabel: "today",
        createdAt: "today"
      };
      addCollection(collection);
    }
    onDone();
  }

  return { name, setName, description, setDescription, color, setColor, icon, setIcon, isValid, handleSubmit };
}

export type CollectionFormApi = ReturnType<typeof useCollectionForm>;

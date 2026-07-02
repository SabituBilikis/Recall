import { useEffect, useMemo, useState } from "react";

import { USE_BACKEND } from "@/lib/config/backend-flag";
import { getItemFile } from "@/services/files.service";
import { getItem } from "@/services/items.service";
import { fetchLinkPreview } from "@/services/link-preview.service";
import { useSavedItemsStore } from "@/store/use-saved-items-store";
import type { SavedItem } from "@/types/saved-item";

import { detailItemsById } from "../mock/all-details";
import type { DetailItem } from "../types/item.types";

function toDetail(saved: SavedItem): DetailItem {
  return {
    id: saved.id,
    type: saved.type,
    title: saved.title,
    collection: saved.collectionName,
    dateSavedLabel: saved.savedAtLabel,
    createdAt: saved.savedAtLabel,
    updatedAt: saved.savedAtLabel,
    description: saved.description,
    content: saved.content,
    fileType: saved.fileType,
    url: saved.url,
    fileName: saved.fileName,
    thumbnailUri: saved.thumbnailUri
  };
}

// Resolves the item: rich mock → derived from the saved store (instant fallback)
// → backend getItem (refines when the flag is on). Logic stays out of the screen.
export function useItemDetail(itemId: string) {
  const savedItems = useSavedItemsStore((state) => state.items);
  const deleteFromStore = useSavedItemsStore((state) => state.deleteItem);
  const [isDeleting, setIsDeleting] = useState(false);
  const [remoteItem, setRemoteItem] = useState<DetailItem | null>(null);
  const [extras, setExtras] = useState<Partial<DetailItem>>({});

  const localItem = useMemo<DetailItem | null>(() => {
    const fromMock = detailItemsById[itemId];
    if (fromMock) {
      return fromMock;
    }
    const saved = savedItems.find((entry) => entry.id === itemId);
    return saved ? toDetail(saved) : null;
  }, [itemId, savedItems]);

  useEffect(() => {
    if (!USE_BACKEND) {
      return;
    }
    let active = true;
    void getItem(itemId)
      .then((saved) => {
        if (active) {
          setRemoteItem(saved ? toDetail(saved) : null);
        }
      })
      .catch((error: unknown) => console.warn("[item] load failed", error));
    return () => {
      active = false;
    };
  }, [itemId]);

  const baseItem = USE_BACKEND ? (remoteItem ?? localItem) : localItem;

  // Reset enrichment when the viewed item changes.
  useEffect(() => {
    setExtras({});
  }, [itemId]);

  // Enrich async: resolve the stored file into a viewable signed URL (screenshot /
  // document), or fetch a link's OG preview. Failures keep the placeholder.
  const baseType = baseItem?.type;
  const baseUrl = baseItem?.url;
  useEffect(() => {
    if (!USE_BACKEND || !baseType) {
      return;
    }
    let active = true;
    if (baseType === "screenshot" || baseType === "file") {
      void getItemFile(itemId)
        .then((file) => {
          if (!active || !file) {
            return;
          }
          const isImage = file.mimeType?.startsWith("image/") ?? baseType === "screenshot";
          setExtras({
            fileUrl: file.url,
            mimeType: file.mimeType ?? undefined,
            ...(isImage ? { thumbnailUri: file.url } : {})
          });
        })
        .catch((error: unknown) => console.warn("[item] file url failed", error));
    } else if (baseType === "link" && baseUrl) {
      void fetchLinkPreview(baseUrl)
        .then((preview) => {
          if (!active || !preview) {
            return;
          }
          setExtras({
            previewImageUrl: preview.imageUrl,
            previewTitle: preview.title,
            previewSubtitle: preview.description
          });
        })
        .catch((error: unknown) => console.warn("[item] link preview failed", error));
    }
    return () => {
      active = false;
    };
  }, [itemId, baseType, baseUrl]);

  const item = baseItem ? { ...baseItem, ...extras } : null;

  function deleteItem(onDeleted: () => void) {
    setIsDeleting(true);
    deleteFromStore(itemId);
    setIsDeleting(false);
    onDeleted();
  }

  return { item, isDeleting, deleteItem };
}

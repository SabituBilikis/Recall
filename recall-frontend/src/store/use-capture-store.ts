import { create } from "zustand";

import type {
  CaptureDraft,
  CaptureItemType,
  CaptureUploadKind,
  SaveStatus,
  UploadedAsset
} from "@/features/capture/types/capture.types";
import type { SavedItem } from "@/types/saved-item";

import { deriveFileType } from "@/features/capture/utils/file-type";
import { USE_BACKEND } from "@/lib/config/backend-flag";
import { newId } from "@/lib/id";
import { createItem } from "@/services/items.service";
import { uploadAndSaveFile } from "@/services/files.service";
import { runOrQueue } from "@/services/sync/mutation-queue";

import { useCollectionsStore } from "./use-collections-store";
import { useSavedItemsStore } from "./use-saved-items-store";

const MOCK_SAVE_DELAY = 1200;

function emptyDraft(type: CaptureItemType): CaptureDraft {
  return {
    selectedItemType: type,
    itemTitle: "",
    itemDescription: "",
    itemUrl: "",
    itemCollection: "",
    itemContent: "",
    uploadedImage: null,
    uploadedFile: null,
    uploadProgress: 0
  };
}

function buildLocalItem(draft: CaptureDraft): SavedItem {
  const type = draft.selectedItemType;
  return {
    id: newId(),
    type,
    title: draft.itemTitle.trim() || draft.uploadedFile?.name || "Untitled",
    collectionName: draft.itemCollection || "Unsorted",
    savedAtLabel: "Just now",
    thumbnailUri: draft.uploadedImage?.uri,
    fileName: draft.uploadedFile?.name,
    fileType:
      type === "screenshot"
        ? deriveFileType(draft.uploadedImage)
        : type === "file"
          ? deriveFileType(draft.uploadedFile)
          : undefined,
    url: draft.itemUrl.trim() || undefined,
    content: draft.itemContent.trim() || undefined,
    description: draft.itemDescription.trim() || undefined
  };
}

function resolveCollectionId(name: string): string | null {
  if (name.length === 0) {
    return null;
  }
  return useCollectionsStore.getState().collections.find((collection) => collection.name === name)?.id ?? null;
}

// Persist to the backend, then merge the server row with the local draft extras
// (thumbnail uri, url, content…) so the success card + details keep the preview.
async function persistDraft(draft: CaptureDraft): Promise<SavedItem> {
  const title = draft.itemTitle.trim() || draft.uploadedFile?.name || "Untitled";
  const collectionId = resolveCollectionId(draft.itemCollection);
  const local = buildLocalItem(draft);

  // Uploads need the file bytes → online-only (excluded from the offline outbox).
  if (draft.selectedItemType === "screenshot" || draft.selectedItemType === "file") {
    const asset = draft.selectedItemType === "screenshot" ? draft.uploadedImage : draft.uploadedFile;
    if (!asset) {
      throw new Error("No file selected");
    }
    const saved = await uploadAndSaveFile({
      localUri: asset.uri,
      fileName: asset.name,
      mimeType: asset.mimeType,
      type: draft.selectedItemType,
      title,
      collectionId,
      fileType: deriveFileType(asset)
    });
    return { ...local, id: saved.id, savedAtLabel: saved.savedAtLabel, collectionName: draft.itemCollection || saved.collectionName };
  }

  // Notes & links are pure data → queue them when offline, replay on reconnect.
  // `local.id` is a client UUID, reused as the server id so replay is idempotent.
  const create =
    draft.selectedItemType === "link"
      ? {
          type: "link" as const,
          title,
          url: draft.itemUrl.trim() || null,
          content: "",
          description: draft.itemDescription.trim(),
          collectionId
        }
      : { type: "note" as const, title, url: null, content: draft.itemContent.trim(), description: "", collectionId };

  await runOrQueue({ kind: "item.create", payload: { id: local.id, ...create } }, () =>
    createItem(create, local.id)
  );
  return local;
}

type CaptureState = {
  draft: CaptureDraft;
  saveStatus: SaveStatus;
  savedItem: SavedItem | null;
  // Initialise a fresh draft for a type (only resets when the type changes).
  startDraft: (type: CaptureItemType) => void;
  setField: <K extends keyof CaptureDraft>(field: K, value: CaptureDraft[K]) => void;
  setUpload: (kind: CaptureUploadKind, asset: UploadedAsset | null) => void;
  setProgress: (progress: number) => void;
  reset: () => void;
  // Mock save — no backend. Builds the savedItem then calls onSuccess.
  save: (onSuccess?: () => void) => void;
};

export const useCaptureStore = create<CaptureState>()((set, get) => ({
  draft: emptyDraft("screenshot"),
  saveStatus: "idle",
  savedItem: null,

  startDraft: (type) =>
    set((state) => (state.draft.selectedItemType === type ? state : { draft: emptyDraft(type), saveStatus: "idle" })),

  setField: (field, value) => set((state) => ({ draft: { ...state.draft, [field]: value } })),

  setUpload: (kind, asset) =>
    set((state) => ({
      draft: {
        ...state.draft,
        ...(kind === "image" ? { uploadedImage: asset } : { uploadedFile: asset }),
        uploadProgress: asset ? state.draft.uploadProgress : 0
      }
    })),

  setProgress: (uploadProgress) => set((state) => ({ draft: { ...state.draft, uploadProgress } })),

  reset: () => set((state) => ({ draft: emptyDraft(state.draft.selectedItemType), saveStatus: "idle", savedItem: null })),

  save: (onSuccess) => {
    if (get().saveStatus === "saving") {
      return;
    }
    set({ saveStatus: "saving" });

    if (!USE_BACKEND) {
      setTimeout(() => {
        const savedItem = buildLocalItem(get().draft);
        set({ saveStatus: "success", savedItem });
        useSavedItemsStore.getState().addItem(savedItem);
        onSuccess?.();
      }, MOCK_SAVE_DELAY);
      return;
    }

    void persistDraft(get().draft)
      .then((savedItem) => {
        set({ saveStatus: "success", savedItem });
        useSavedItemsStore.getState().addItem(savedItem);
        onSuccess?.();
      })
      .catch((error: unknown) => {
        console.warn("[capture] save failed", error);
        set({ saveStatus: "error" });
      });
  }
}));

import type { SavedItemType } from "@/types/saved-item";

// Rich item used by the details screen. Superset of the minimal SavedItem.
export type DetailItem = {
  id: string;
  type: SavedItemType;
  title: string;
  collection: string;
  dateSavedLabel: string;
  description?: string; // link metadata description
  content?: string; // note body
  fileType?: string; // "PNG" | "PDF" …
  url?: string;
  fileName?: string;
  thumbnailUri?: string; // real captured image
  fileUrl?: string; // signed URL to the stored file (screenshot / document)
  mimeType?: string; // stored file mime (drives image-vs-document rendering)
  previewImageUrl?: string; // link OG image
  previewTitle?: string; // link preview heading
  previewSubtitle?: string; // link preview subtitle
  createdAt: string;
  updatedAt: string;
};

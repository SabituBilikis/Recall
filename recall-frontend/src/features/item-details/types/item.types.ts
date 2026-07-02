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
  previewTitle?: string; // link preview heading
  previewSubtitle?: string; // link preview subtitle
  createdAt: string;
  updatedAt: string;
};

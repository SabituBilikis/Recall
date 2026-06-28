import type { SavedItemType } from "@/types/saved-item";

export type QuickCaptureAction = {
  id: string;
  type: SavedItemType;
  label: string;
};

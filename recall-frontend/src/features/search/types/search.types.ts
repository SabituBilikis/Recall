import type { SavedItemType } from "@/types/saved-item";

// A searchable item. Includes the RecentItemCard display fields plus the
// search-only fields the util matches against.
export type SearchItem = {
  id: string;
  type: SavedItemType;
  title: string;
  collectionName: string;
  savedAtLabel: string;
  description: string;
  fileName?: string;
  url?: string;
  createdAt: string;
  updatedAt: string;
};

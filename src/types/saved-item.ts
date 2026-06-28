export type SavedItemType = "screenshot" | "link" | "note" | "file";

export type SavedItem = {
  id: string;
  type: SavedItemType;
  title: string;
  // Human-readable collection label shown in the card meta row.
  collectionName: string;
  // Pre-formatted relative date for display (e.g. "Today", "Jun 12") — mock only.
  savedAtLabel: string;
  // Optional captured content — populated by the Add Item flow, used by Item
  // Details + the Save Success preview. Absent on minimal/mock items.
  thumbnailUri?: string;
  fileName?: string;
  fileType?: string;
  url?: string;
  content?: string;
  description?: string;
};

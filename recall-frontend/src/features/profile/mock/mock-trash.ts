import type { SavedItem } from "@/types/saved-item";

// Mock trashed items for the offline / flag-off path (backend mode reads the
// real archive service). Lets the populated + empty states be demoed.
export const mockTrashItems: SavedItem[] = [
  { id: "trash-1", type: "note", title: "Old meeting notes", collectionName: "Unsorted", savedAtLabel: "Deleted Jun 18" },
  { id: "trash-2", type: "link", title: "Outdated pricing page", collectionName: "Research", savedAtLabel: "Deleted Jun 15" },
  { id: "trash-3", type: "screenshot", title: "Draft landing concept", collectionName: "Design Inspiration", savedAtLabel: "Deleted Jun 11" }
];

import type { SavedItemType } from "@/types/saved-item";

export type CollectionFilter = "all" | SavedItemType;

export const collectionFilters: { id: CollectionFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "screenshot", label: "Screenshots" },
  { id: "link", label: "Links" },
  { id: "note", label: "Notes" },
  { id: "file", label: "Files" }
];

// Static copy for the Collections feature (mirrors the Figma content).
export const collectionsContent = {
  listTitle: "Collections",
  listHeading: "Organize saved items into calm, searchable groups.",
  searchPlaceholder: "Search collections",
  createButton: "Create",
  createTitle: "Create Collections",
  editTitle: "Edit Collections",
  fields: {
    name: { label: "Collection name", placeholder: "Give your collections a name" },
    description: { label: "Description", placeholder: "Add a description for it" },
    color: "Color selector",
    icon: "Icon selector"
  },
  createCta: "Create Collection",
  saveCta: "Save Changes",
  detailsTitle: "Collections",
  detailsSearchPlaceholder: "Search within collections",
  savedItemsLabel: "Saved items",
  itemsSuffix: "items",
  empty: {
    title: "No Collections Yet",
    description: "Create collections to organize your saved items.",
    cta: "Create Your First Collection"
  },
  emptyCollection: {
    title: "Nothing here yet",
    description: "Items you add to this collection will show up here."
  },
  menu: { edit: "Edit", delete: "Delete" },
  deleteModal: {
    title: "Delete Collection",
    description: "This collection will be removed. Your saved items won't be deleted.",
    confirm: "Delete",
    cancel: "Cancel"
  }
} as const;

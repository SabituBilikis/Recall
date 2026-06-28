import type { SavedItem } from "@/types/saved-item";

// Dev flag — Home starts empty for every user. Flip to true to preview the
// populated dashboard (recent items + collections) until real saving exists.
export const SHOW_POPULATED = false;

export const populatedRecentItems: SavedItem[] = [
  {
    id: "item-1",
    type: "screenshot",
    title: "Mobile Onboarding References",
    collectionName: "Design Inspiration",
    savedAtLabel: "Today"
  },
  {
    id: "item-2",
    type: "link",
    title: "Pricing Research Links",
    collectionName: "Research",
    savedAtLabel: "Yesterday"
  },
  {
    id: "item-3",
    type: "note",
    title: "Product Ideas",
    collectionName: "Startup Ideas",
    savedAtLabel: "Jun 12"
  },
  {
    id: "item-4",
    type: "file",
    title: "Brand Guidelines",
    collectionName: "Guidelines",
    savedAtLabel: "Jun 14"
  }
];

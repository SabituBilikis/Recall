import type { SearchItem } from "../types/search.types";

export const mockNotes: SearchItem[] = [
  {
    id: "n-1",
    type: "note",
    title: "Pricing Notes",
    collectionName: "Startup Ideas",
    savedAtLabel: "Jun 12",
    description: "Ideas around pricing tiers and packaging.",
    createdAt: "Jun 12",
    updatedAt: "Jun 12"
  },
  {
    id: "n-2",
    type: "note",
    title: "Product Ideas",
    collectionName: "Startup Ideas",
    savedAtLabel: "Jun 05",
    description: "Raw concepts worth revisiting later.",
    createdAt: "Jun 05",
    updatedAt: "Jun 05"
  }
];

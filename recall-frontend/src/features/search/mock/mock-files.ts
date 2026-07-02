import type { SearchItem } from "../types/search.types";

export const mockFiles: SearchItem[] = [
  {
    id: "f-1",
    type: "file",
    title: "Pricing file",
    collectionName: "Guidelines",
    savedAtLabel: "Jun 14",
    description: "Internal pricing model spreadsheet.",
    fileName: "pricing-model.pdf",
    createdAt: "Jun 14",
    updatedAt: "Jun 14"
  },
  {
    id: "f-2",
    type: "file",
    title: "Brand Guidelines",
    collectionName: "Guidelines",
    savedAtLabel: "Jun 02",
    description: "Logo usage, colors, and typography.",
    fileName: "brand-guidelines.pdf",
    createdAt: "Jun 02",
    updatedAt: "Jun 02"
  }
];

import type { DetailItem } from "../types/item.types";

const noteBody =
  "A few product ideas worth revisiting. Capture screenshots, links, notes, and files in one place, " +
  "then resurface them with fast search. Keep the capture flow under two taps, make collections feel " +
  "calm, and let retrieval feel instant. Revisit this list weekly and prune what no longer matters.";

export const mockNoteDetails: DetailItem[] = [
  {
    id: "ci-3",
    type: "note",
    title: "Product Ideas",
    collection: "Startup Ideas",
    dateSavedLabel: "Yesterday",
    content: noteBody,
    createdAt: "Jun 12",
    updatedAt: "Jun 12"
  },
  {
    id: "n-1",
    type: "note",
    title: "Pricing Notes",
    collection: "Startup Ideas",
    dateSavedLabel: "Jun 12",
    content: noteBody,
    createdAt: "Jun 12",
    updatedAt: "Jun 12"
  }
];

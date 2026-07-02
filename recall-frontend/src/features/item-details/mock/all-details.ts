import type { DetailItem } from "../types/item.types";
import { mockFileDetails } from "./mock-file-details";
import { mockLinkDetails } from "./mock-link-details";
import { mockNoteDetails } from "./mock-note-details";
import { mockScreenshotDetails } from "./mock-screenshot-details";

const allDetails: DetailItem[] = [
  ...mockScreenshotDetails,
  ...mockLinkDetails,
  ...mockNoteDetails,
  ...mockFileDetails
];

export const detailItemsById: Record<string, DetailItem> = Object.fromEntries(
  allDetails.map((item) => [item.id, item])
);

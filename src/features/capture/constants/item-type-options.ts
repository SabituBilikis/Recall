import type { CaptureItemType } from "../types/capture.types";

export type ItemTypeOption = {
  type: CaptureItemType;
  title: string;
  description: string;
};

// Order + copy mirror the Figma "Save new item" screen.
export const itemTypeOptions: ItemTypeOption[] = [
  { type: "screenshot", title: "Screenshot", description: "Save a screenshot or an image" },
  { type: "link", title: "Link", description: "Paste a URL and keep the useful context" },
  { type: "note", title: "Note", description: "Write a thought, checklist, or idea" },
  { type: "file", title: "File", description: "Save PDFs, Docs" }
];

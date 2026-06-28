import type { QuickCaptureAction } from "../types/quick-capture.types";

export const mockQuickCaptureActions: QuickCaptureAction[] = [
  { id: "capture-screenshot", type: "screenshot", label: "Screenshot" },
  { id: "capture-link", type: "link", label: "Link" },
  { id: "capture-note", type: "note", label: "Note" },
  { id: "capture-file", type: "file", label: "File" }
];

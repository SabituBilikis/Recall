import type { CaptureItemType } from "./capture.types";

const CAPTURE_ITEM_TYPES: CaptureItemType[] = ["screenshot", "link", "note", "file"];

export function isCaptureItemType(value: string): value is CaptureItemType {
  return (CAPTURE_ITEM_TYPES as string[]).includes(value);
}

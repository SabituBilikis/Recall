import type { UploadedAsset } from "../types/capture.types";

// Best-effort file/image type label from a picked asset: extension first, then
// the mime subtype. e.g. "report.pdf" → "PDF", { mimeType: "image/png" } → "PNG".
export function deriveFileType(asset: UploadedAsset | null | undefined): string | undefined {
  if (!asset) {
    return undefined;
  }
  const ext = asset.name.includes(".") ? asset.name.split(".").pop() : undefined;
  if (ext && ext.length > 0) {
    return ext.toUpperCase();
  }
  const subtype = asset.mimeType?.split("/").pop();
  return subtype ? subtype.toUpperCase() : undefined;
}

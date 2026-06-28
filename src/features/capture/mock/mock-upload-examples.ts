import type { UploadedAsset } from "../types/capture.types";

// Fallback sample asset used if a native picker returns no usable metadata.
export const mockFileExample: UploadedAsset = {
  uri: "mock://brand-guidelines.pdf",
  name: "Brand_guidelines.pdf",
  size: 4.2 * 1024 * 1024,
  mimeType: "application/pdf"
};

// Format bytes as the Figma "4.2 MB PDF" style label.
export function formatFileMeta(asset: UploadedAsset): string {
  const mb = asset.size ? asset.size / (1024 * 1024) : 0;
  const sizeLabel = mb >= 0.1 ? `${mb.toFixed(1)} MB` : "";
  const ext = asset.name.split(".").pop()?.toUpperCase() ?? "FILE";
  return [sizeLabel, ext].filter(Boolean).join(" ");
}

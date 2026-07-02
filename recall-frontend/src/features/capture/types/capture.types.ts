import type { SavedItemType } from "@/types/saved-item";

export type CaptureItemType = SavedItemType; // "screenshot" | "link" | "note" | "file"

export type SaveStatus = "idle" | "saving" | "success" | "error";

export type UploadStatus = "idle" | "uploading" | "done";

export type UploadedAsset = {
  uri: string;
  name: string;
  size?: number; // bytes
  mimeType?: string;
};

export type CaptureDraft = {
  selectedItemType: CaptureItemType;
  itemTitle: string;
  itemDescription: string;
  itemUrl: string;
  itemCollection: string; // collection name ("" = none)
  itemContent: string; // note body
  uploadedImage: UploadedAsset | null;
  uploadedFile: UploadedAsset | null;
  uploadProgress: number; // 0–100
};

export type CaptureUploadKind = "image" | "file";

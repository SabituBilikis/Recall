import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";

import type { SavedItem, SavedItemType } from "@/types/saved-item";

import { getCurrentUserId } from "./auth.service";
import { toSavedItem } from "./mappers";
import { supabase } from "./supabase-client";

const BUCKET = "item-files";

export type UploadFileParams = {
  localUri: string;
  fileName: string;
  mimeType?: string | null;
  type: SavedItemType; // "screenshot" | "file"
  title: string;
  collectionId?: string | null;
  fileType?: string | null;
};

function objectPath(userId: string, fileName: string): string {
  const ext = fileName.includes(".") ? fileName.split(".").pop() : undefined;
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${userId}/${unique}.${ext ?? "bin"}`;
}

// Reads the picked file as base64 (Hermes-safe), decodes to an ArrayBuffer,
// uploads to Storage, then records item + file metadata atomically.
export async function uploadAndSaveFile(params: UploadFileParams): Promise<SavedItem> {
  const userId = await getCurrentUserId();
  const path = objectPath(userId, params.fileName);

  const base64 = await FileSystem.readAsStringAsync(params.localUri, {
    encoding: FileSystem.EncodingType.Base64
  });
  const bytes = decode(base64);

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, bytes, {
    contentType: params.mimeType ?? undefined,
    upsert: false
  });
  if (uploadError) {
    throw uploadError;
  }

  const { data, error } = await supabase.rpc("save_item_with_file", {
    p_type: params.type,
    p_title: params.title,
    p_collection_id: params.collectionId ?? undefined,
    p_storage_path: path,
    p_file_name: params.fileName,
    p_mime_type: params.mimeType ?? undefined,
    p_size_bytes: bytes.byteLength,
    p_file_type: params.fileType ?? undefined
  });
  if (error) {
    throw error;
  }
  return toSavedItem(data);
}

export async function getSignedUrl(storagePath: string, expiresInSeconds = 3600): Promise<string> {
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(storagePath, expiresInSeconds);
  if (error) {
    throw error;
  }
  return data.signedUrl;
}

export type ItemFile = { url: string; mimeType: string | null; fileName: string };

// Resolves the stored file for an item into a viewable signed URL (item-files is
// private). Returns null when the item has no file row. RLS owner-scopes `files`.
export async function getItemFile(itemId: string): Promise<ItemFile | null> {
  const { data, error } = await supabase
    .from("files")
    .select("storage_path,mime_type,file_name")
    .eq("saved_item_id", itemId)
    .maybeSingle();
  if (error) {
    throw error;
  }
  if (!data) {
    return null;
  }
  const url = await getSignedUrl(data.storage_path);
  return { url, mimeType: data.mime_type, fileName: data.file_name };
}

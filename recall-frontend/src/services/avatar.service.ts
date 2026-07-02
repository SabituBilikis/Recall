import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";

import { getCurrentUserId } from "./auth.service";
import { supabase } from "./supabase-client";

const BUCKET = "avatars";

// Normalize to a mime the avatars bucket accepts (png/jpeg/webp); anything else
// (incl. "image/jpg" or missing) falls back to jpeg, matching the re-encode.
function contentTypeFor(mimeType?: string | null): string {
  const normalized = mimeType === "image/jpg" ? "image/jpeg" : mimeType;
  return normalized && ["image/png", "image/jpeg", "image/webp"].includes(normalized) ? normalized : "image/jpeg";
}

// Uploads a picked image to the public avatars bucket (one object per user,
// upserted) and returns its public URL. Mirrors files.service's base64 path.
export async function uploadAvatar(localUri: string, mimeType?: string | null): Promise<string> {
  const userId = await getCurrentUserId();
  const contentType = contentTypeFor(mimeType);
  const ext = contentType === "image/png" ? "png" : contentType === "image/webp" ? "webp" : "jpg";
  const path = `${userId}/avatar.${ext}`;

  const base64 = await FileSystem.readAsStringAsync(localUri, { encoding: FileSystem.EncodingType.Base64 });
  const bytes = decode(base64);

  const { error } = await supabase.storage.from(BUCKET).upload(path, bytes, {
    contentType,
    upsert: true
  });
  if (error) {
    throw error;
  }

  // Cache-bust so the <Image> refreshes after re-upload to the same path.
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return `${data.publicUrl}?v=${Date.now()}`;
}

import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system/legacy";

import { getCurrentUserId } from "./auth.service";
import { supabase } from "./supabase-client";

const BUCKET = "avatars";

function extFor(mimeType?: string | null, uri?: string): string {
  if (mimeType?.includes("png")) {
    return "png";
  }
  if (mimeType?.includes("webp")) {
    return "webp";
  }
  if (uri && /\.(png|webp|jpe?g)$/i.test(uri)) {
    return uri.split(".").pop()!.toLowerCase();
  }
  return "jpg";
}

// Uploads a picked image to the public avatars bucket (one object per user,
// upserted) and returns its public URL. Mirrors files.service's base64 path.
export async function uploadAvatar(localUri: string, mimeType?: string | null): Promise<string> {
  const userId = await getCurrentUserId();
  const path = `${userId}/avatar.${extFor(mimeType, localUri)}`;

  const base64 = await FileSystem.readAsStringAsync(localUri, { encoding: FileSystem.EncodingType.Base64 });
  const bytes = decode(base64);

  const { error } = await supabase.storage.from(BUCKET).upload(path, bytes, {
    contentType: mimeType ?? "image/jpeg",
    upsert: true
  });
  if (error) {
    throw error;
  }

  // Cache-bust so the <Image> refreshes after re-upload to the same path.
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return `${data.publicUrl}?v=${Date.now()}`;
}

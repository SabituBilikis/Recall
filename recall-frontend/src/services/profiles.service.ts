import type { User } from "@/types/user";

import { getCurrentUserId } from "./auth.service";
import { supabase } from "./supabase-client";

export async function getProfile(): Promise<User | null> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  if (error) {
    throw error;
  }
  if (!data) {
    return null;
  }
  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    avatarUrl: data.avatar_url ?? undefined
  };
}

export type ProfilePatch = { firstName?: string; lastName?: string; avatarUrl?: string };

// Avatars must come from our own avatars bucket — reject arbitrary client-set
// URLs (defense-in-depth for a future web client rendering the URL).
function assertAvatarUrl(url: string): void {
  const base = process.env.EXPO_PUBLIC_SUPABASE_URL ?? "";
  const allowedPrefix = `${base}/storage/v1/object/public/avatars/`;
  if (!url.startsWith(allowedPrefix)) {
    throw new Error("Invalid avatar URL");
  }
}

// Owner-only update (RLS: profiles_update_own). Returns the refreshed profile.
export async function updateProfile(patch: ProfilePatch): Promise<User> {
  if (patch.avatarUrl) {
    assertAvatarUrl(patch.avatarUrl);
  }
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("profiles")
    .update({ first_name: patch.firstName, last_name: patch.lastName, avatar_url: patch.avatarUrl })
    .eq("id", userId)
    .select()
    .single();
  if (error) {
    throw error;
  }
  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    avatarUrl: data.avatar_url ?? undefined
  };
}

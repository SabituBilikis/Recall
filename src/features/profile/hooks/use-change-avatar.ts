import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

import { USE_BACKEND } from "@/lib/config/backend-flag";
import { uploadAvatar } from "@/services/avatar.service";
import { updateProfile } from "@/services/profiles.service";
import { useProfileStore } from "@/store/use-profile-store";

import { profileContent } from "../constants/profile-content";

// Pick a square image → upload to the avatars bucket → persist avatar_url on the
// profile → refresh the store. Surfaces a message on failure so it never silently
// no-ops. Backend only (no-op on mock).
export function useChangeAvatar() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pickAvatar() {
    if (!USE_BACKEND || uploading) {
      return;
    }
    setError(null);

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setError(profileContent.avatar.permission);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8
    });
    if (result.canceled || result.assets.length === 0) {
      return;
    }
    const picked = result.assets[0];

    setUploading(true);
    try {
      const avatarUrl = await uploadAvatar(picked.uri, picked.mimeType);
      const profile = await updateProfile({ avatarUrl });
      useProfileStore.getState().setProfile(profile);
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      console.warn("[avatar] change failed", detail);
      setError(__DEV__ ? `${profileContent.avatar.failed} (${detail})` : profileContent.avatar.failed);
    } finally {
      setUploading(false);
    }
  }

  return { pickAvatar, uploading, error };
}

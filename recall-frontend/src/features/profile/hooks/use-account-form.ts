import { useState } from "react";

import { USE_BACKEND } from "@/lib/config/backend-flag";
import { isValidEmail } from "@/lib/validation";
import { updateProfile } from "@/services/profiles.service";
import { useProfileStore } from "@/store/use-profile-store";

import { useProfileData } from "./use-profile-data";

// Account edit form: holds the editable profile fields + validation. Backend
// (flag on): persists name via updateProfile. Mock (flag off): local patch.
export function useAccountForm(onDone: () => void) {
  const { user, email } = useProfileData();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [emailValue, setEmailValue] = useState(email);
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [isSaving, setIsSaving] = useState(false);

  const emailError = emailValue.trim().length > 0 && !isValidEmail(emailValue) ? "Please enter a valid email." : null;
  const isValid = firstName.trim().length > 0 && !emailError;

  function handleSave() {
    if (!isValid || isSaving) {
      return;
    }
    setIsSaving(true);
    const name = { firstName: firstName.trim(), lastName: lastName.trim() };

    if (!USE_BACKEND) {
      // Mock: patch the local profile only.
      useProfileStore.setState((state) =>
        state.profile ? { profile: { ...state.profile, ...name, avatarUrl } } : state
      );
      setIsSaving(false);
      onDone();
      return;
    }

    // Backend: persist the name (email/password are auth-level, out of scope).
    void updateProfile(name)
      .then((profile) => {
        useProfileStore.getState().setProfile(profile);
        onDone();
      })
      .catch((error: unknown) => console.warn("[account] save failed", error))
      .finally(() => setIsSaving(false));
  }

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email: emailValue,
    setEmail: setEmailValue,
    password,
    setPassword,
    avatarUrl,
    setAvatarUrl,
    emailError,
    isValid,
    isSaving,
    handleSave
  };
}

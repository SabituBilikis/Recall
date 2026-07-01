import { useState } from "react";

import { USE_BACKEND } from "@/lib/config/backend-flag";
import { deleteAccount as serviceDeleteAccount } from "@/services/auth.service";
import { cacheClear } from "@/services/cache/local-cache";
import { clearOutbox } from "@/services/cache/outbox";
import { useCollectionsStore } from "@/store/use-collections-store";
import { useNotificationsStore } from "@/store/use-notifications-store";
import { useProfileStore } from "@/store/use-profile-store";
import { useSavedItemsStore } from "@/store/use-saved-items-store";
import { useSessionStore } from "@/store/use-session-store";

// Permanently deletes the account, then clears all local per-user state (same
// teardown as sign-out). Surfaces an error so a failed deletion never silently
// leaves the user thinking their data is gone. Backend only.
export function useDeleteAccount(onDone: () => void) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function clearLocalState() {
    useSessionStore.getState().setSession(null);
    useProfileStore.getState().clear();
    useSavedItemsStore.setState({ items: [] });
    useCollectionsStore.setState({ collections: [] });
    useNotificationsStore.setState({ notifications: [] });
    void cacheClear();
    void clearOutbox();
  }

  async function deleteAccount() {
    if (!USE_BACKEND) {
      clearLocalState();
      onDone();
      return;
    }
    if (deleting) {
      return;
    }
    setError(null);
    setDeleting(true);
    try {
      await serviceDeleteAccount();
      clearLocalState();
      onDone();
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      console.warn("[auth] delete account failed", detail);
      setError("Couldn't delete your account. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return { deleteAccount, deleting, error };
}

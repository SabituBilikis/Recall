import { USE_BACKEND } from "@/lib/config/backend-flag";
import { signOut as serviceSignOut } from "@/services/auth.service";
import { cacheClear } from "@/services/cache/local-cache";
import { clearOutbox } from "@/services/cache/outbox";
import { useCollectionsStore } from "@/store/use-collections-store";
import { useNotificationsStore } from "@/store/use-notifications-store";
import { useProfileStore } from "@/store/use-profile-store";
import { useSavedItemsStore } from "@/store/use-saved-items-store";
import { useSessionStore } from "@/store/use-session-store";

// Signs out + clears per-user state so the next sign-in starts clean.
export function useSignOut(onDone: () => void) {
  function signOut() {
    if (!USE_BACKEND) {
      onDone();
      return;
    }
    void serviceSignOut()
      .catch((error: unknown) => console.warn("[auth] sign out failed", error))
      .finally(() => {
        useSessionStore.getState().setSession(null);
        useProfileStore.getState().clear();
        useSavedItemsStore.setState({ items: [] });
        useCollectionsStore.setState({ collections: [] });
        useNotificationsStore.setState({ notifications: [] });
        void cacheClear();
        void clearOutbox();
        onDone();
      });
  }

  return { signOut };
}

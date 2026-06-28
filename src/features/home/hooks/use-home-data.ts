import { useCallback, useEffect } from "react";

import { useCollectionsStore } from "@/store/use-collections-store";
import { selectUnreadCount, useNotificationsStore } from "@/store/use-notifications-store";
import { useProfileStore } from "@/store/use-profile-store";
import { useSavedItemsStore } from "@/store/use-saved-items-store";

import { mockQuickCaptureActions } from "../mock/mock-quick-capture";
import { mockUser } from "../mock/mock-user";

// Single data seam for Home. Recent items + collections + profile come from their
// stores (backend-hydrated on mount when the flag is on, no-op on mock).
export function useHomeData() {
  const recentItems = useSavedItemsStore((state) => state.items);
  const itemsError = useSavedItemsStore((state) => state.error);
  const loadItems = useSavedItemsStore((state) => state.loadItems);
  const loadMore = useSavedItemsStore((state) => state.loadMore);
  const loadingMore = useSavedItemsStore((state) => state.loadingMore);
  const collections = useCollectionsStore((state) => state.collections);
  const loadCollections = useCollectionsStore((state) => state.loadCollections);
  const profile = useProfileStore((state) => state.profile);
  const loadProfile = useProfileStore((state) => state.loadProfile);
  const unreadCount = useNotificationsStore(selectUnreadCount);
  const loadNotifications = useNotificationsStore((state) => state.loadNotifications);
  const hasItems = recentItems.length > 0;

  useEffect(() => {
    void loadItems();
    void loadCollections();
    void loadProfile();
    void loadNotifications();
  }, [loadItems, loadCollections, loadProfile, loadNotifications]);

  const refresh = useCallback(
    () => Promise.all([loadItems(), loadCollections(), loadProfile()]),
    [loadItems, loadCollections, loadProfile]
  );

  return {
    currentUser: profile ?? mockUser,
    recentItems,
    collections: hasItems ? collections : [],
    quickCaptureActions: mockQuickCaptureActions,
    hasItems,
    unreadCount,
    refresh,
    loadMore,
    loadingMore,
    // Error only matters when there's nothing cached to show.
    loadError: itemsError && !hasItems
  };
}

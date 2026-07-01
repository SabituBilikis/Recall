import { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, FlatList, RefreshControl, type ListRenderItem } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { StateMessage } from "@/components/ui/state-message";
import { Typography } from "@/components/ui/typography";
import { RecentItemCard } from "@/features/home/components/recent-item-card";
import { LibraryHeader } from "@/features/library/components/library-header";
import { useRefresh } from "@/hooks/use-refresh";
import { useSavedItemsStore } from "@/store/use-saved-items-store";
import { colorValues } from "@/theme/tokens/color";
import type { SavedItem } from "@/types/saved-item";

export type SavedItemsScreenProps = {
  onBack: () => void;
  onItemPress: (item: SavedItem) => void;
};

const listContentStyle = { gap: 8, paddingBottom: 40, paddingHorizontal: 16, paddingTop: 8 } as const;

const keyExtractor = (item: SavedItem) => item.id;

// Dedicated full list of all saved items. Reuses the same store Home hydrates, so
// it opens with data already present; refreshes on mount and paginates on scroll.
export function SavedItemsScreen({ onBack, onItemPress }: SavedItemsScreenProps) {
  const insets = useSafeAreaInsets();
  const items = useSavedItemsStore((state) => state.items);
  const error = useSavedItemsStore((state) => state.error);
  const loadItems = useSavedItemsStore((state) => state.loadItems);
  const loadMore = useSavedItemsStore((state) => state.loadMore);
  const loadingMore = useSavedItemsStore((state) => state.loadingMore);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    void Promise.resolve(loadItems()).finally(() => setHasLoadedOnce(true));
  }, [loadItems]);

  const { refreshing, onRefresh } = useRefresh(loadItems);

  const renderItem = useCallback<ListRenderItem<SavedItem>>(
    ({ item }) => <RecentItemCard item={item} onPress={onItemPress} />,
    [onItemPress]
  );

  const showInitialSpinner = !hasLoadedOnce && items.length === 0 && !error;

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <LibraryHeader onBack={onBack} title="Saved Items" />
      </YStack>

      {showInitialSpinner ? (
        <YStack flex={1} items="center" justify="center">
          <ActivityIndicator color={colorValues.primary500} />
        </YStack>
      ) : (
        <FlatList
          contentContainerStyle={listContentStyle}
          data={items}
          keyExtractor={keyExtractor}
          onEndReached={() => void loadMore()}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colorValues.primary500}
              colors={[colorValues.primary500]}
            />
          }
          ListEmptyComponent={
            error && items.length === 0 ? (
              <YStack pt="$10">
                <StateMessage
                  actionLabel="Try again"
                  description="We couldn't load your items. Check your connection and try again."
                  title="Something went wrong"
                  onAction={() => void loadItems()}
                />
              </YStack>
            ) : (
              <YStack gap="$2" items="center" py="$10">
                <Typography color="$onboardingTextPrimary" text="center" variant="subtitle1">
                  No saved items yet
                </Typography>
                <Typography color="$onboardingTextSecondary" text="center" variant="body3">
                  Items you capture will appear here.
                </Typography>
              </YStack>
            )
          }
          ListFooterComponent={
            loadingMore ? (
              <YStack py="$4">
                <ActivityIndicator color={colorValues.primary500} />
              </YStack>
            ) : null
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </YStack>
  );
}

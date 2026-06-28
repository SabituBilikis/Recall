import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { StateMessage } from "@/components/ui/state-message";
import { useRefresh } from "@/hooks/use-refresh";
import { colorValues } from "@/theme/tokens/color";
import type { Collection } from "@/types/collection";
import type { SavedItem } from "@/types/saved-item";

import { homeContent } from "../constants/home-content";
import { useHomeData } from "../hooks/use-home-data";
import type { QuickCaptureAction } from "../types/quick-capture.types";
import { CollectionsSection } from "./collections-section";
import { EmptyStateCard } from "./empty-state-card";
import { HomeHeader } from "./home-header";
import { QuickCaptureSection } from "./quick-capture-section";
import { RecentItemCard } from "./recent-item-card";
import { SearchBar } from "./search-bar";
import { SectionHeader } from "./section-header";

export type HomeScreenProps = {
  onBrowseCollections: () => void;
  onCollectionPress: (collection: Collection) => void;
  onNotificationsPress: () => void;
  onQuickCapture: (action: QuickCaptureAction) => void;
  onRecentItemPress: (item: SavedItem) => void;
  onProfilePress: () => void;
  onSaveFirstItem: () => void;
  onSearch: () => void;
  onSeeAllRecent: () => void;
};

const listContentStyle = { paddingBottom: 24, paddingHorizontal: 16 } as const;

export function HomeScreen({
  onBrowseCollections,
  onCollectionPress,
  onNotificationsPress,
  onQuickCapture,
  onRecentItemPress,
  onProfilePress,
  onSaveFirstItem,
  onSearch,
  onSeeAllRecent
}: HomeScreenProps) {
  const insets = useSafeAreaInsets();
  const { collections, currentUser, hasItems, quickCaptureActions, recentItems, refresh, loadMore, loadingMore, unreadCount, loadError } =
    useHomeData();
  const { refreshing, onRefresh } = useRefresh(refresh);

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <HomeHeader
          unreadCount={unreadCount}
          user={currentUser}
          onNotificationsPress={onNotificationsPress}
          onProfilePress={onProfilePress}
        />
      </YStack>

      <FlatList
        contentContainerStyle={listContentStyle}
        data={recentItems}
        ItemSeparatorComponent={() => <YStack height={8} />}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colorValues.primary500} colors={[colorValues.primary500]} />
        }
        ListEmptyComponent={
          loadError ? (
            <StateMessage
              actionLabel="Retry"
              description="We couldn't load your items. Check your connection and try again."
              title="Something went wrong"
              onAction={onRefresh}
            />
          ) : (
            <EmptyStateCard onSaveFirst={onSaveFirstItem} />
          )
        }
        onEndReached={() => void loadMore()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          hasItems ? (
            <YStack pt="$6">
              {loadingMore ? (
                <YStack pb="$6" items="center">
                  <ActivityIndicator color={colorValues.primary500} />
                </YStack>
              ) : null}
              <CollectionsSection
                collections={collections}
                onBrowse={onBrowseCollections}
                onCollectionPress={onCollectionPress}
              />
            </YStack>
          ) : null
        }
        ListHeaderComponent={
          <YStack gap="$6" pb="$4">
            <SearchBar onPress={onSearch} />
            <QuickCaptureSection actions={quickCaptureActions} onActionPress={onQuickCapture} />
            <SectionHeader
              actionLabel={hasItems ? homeContent.recentlySavedAction : undefined}
              title={homeContent.recentlySavedTitle}
              onActionPress={onSeeAllRecent}
            />
          </YStack>
        }
        renderItem={({ item }) => <RecentItemCard item={item} onPress={onRecentItemPress} />}
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  );
}

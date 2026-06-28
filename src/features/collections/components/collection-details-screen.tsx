import { useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { MoreIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { RecentItemCard } from "@/features/home/components/recent-item-card";
import { useRefresh } from "@/hooks/use-refresh";
import { colorValues } from "@/theme/tokens/color";
import type { SavedItem } from "@/types/saved-item";

import { collectionsContent } from "../constants/collections-content";
import { useCollectionDetails } from "../hooks/use-collection-details";
import { CollectionFilterChips } from "./collection-filter-chips";
import { CollectionHeader } from "./collection-header";
import { CollectionSearchBar } from "./collection-search-bar";
import { DeleteCollectionModal } from "./delete-collection-modal";
import { MoreActionsMenu } from "./more-actions-menu";

export type CollectionDetailsScreenProps = {
  collectionId: string;
  onBack: () => void;
  onEdit: () => void;
  onItemPress: (item: SavedItem) => void;
};

const listContentStyle = { gap: 8, paddingBottom: 40, paddingHorizontal: 16 } as const;

export function CollectionDetailsScreen({ collectionId, onBack, onEdit, onItemPress }: CollectionDetailsScreenProps) {
  const insets = useSafeAreaInsets();
  const { collection, deleteCollection, filter, items, loadMore, loadingMore, query, refresh, setFilter, setQuery } =
    useCollectionDetails(collectionId);
  const { refreshing, onRefresh } = useRefresh(refresh);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (!collection) {
    return <YStack backgroundColor="$surfaceSubtle" flex={1} />;
  }

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <CollectionHeader
          title={collectionsContent.detailsTitle}
          onBack={onBack}
          right={
            <YStack
              backgroundColor="$surfacePrimary"
              height={32}
              items="center"
              justify="center"
              pressStyle={{ opacity: 0.6 }}
              rounded="$xxl"
              width={32}
              onPress={() => setMenuOpen(true)}
            >
              <MoreIcon color={colorValues.grey900} size={16} />
            </YStack>
          }
        />
      </YStack>

      <FlatList
        contentContainerStyle={listContentStyle}
        data={items}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colorValues.primary500} colors={[colorValues.primary500]} />
        }
        ListEmptyComponent={
          <YStack gap="$2" items="center" py="$10">
            <Typography color="$onboardingTextPrimary" text="center" variant="subtitle1">
              {collectionsContent.emptyCollection.title}
            </Typography>
            <Typography color="$onboardingTextSecondary" text="center" variant="body3">
              {collectionsContent.emptyCollection.description}
            </Typography>
          </YStack>
        }
        ListHeaderComponent={
          <YStack gap="$5" pb="$2" width="100%">
            <YStack gap="$2">
              <Typography color="$onboardingTextPrimary" variant="h5">
                {collection.name}
              </Typography>
              {collection.description ? (
                <Typography color="$onboardingTextSecondary" variant="body1">
                  {collection.description}
                </Typography>
              ) : null}
              <Typography color="$onboardingTextPrimary" variant="body3">
                {collection.itemCount} {collectionsContent.itemsSuffix}
              </Typography>
            </YStack>

            <CollectionSearchBar
              placeholder={collectionsContent.detailsSearchPlaceholder}
              value={query}
              onChange={setQuery}
            />
            <CollectionFilterChips value={filter} onChange={setFilter} />

            <Typography color="$onboardingTextPrimary" variant="subtitle2">
              {collectionsContent.savedItemsLabel}
            </Typography>
          </YStack>
        }
        onEndReached={() => void loadMore()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <YStack py="$4" items="center">
              <ActivityIndicator color={colorValues.primary500} />
            </YStack>
          ) : null
        }
        renderItem={({ item }) => <RecentItemCard item={item} onPress={onItemPress} />}
        showsVerticalScrollIndicator={false}
      />

      <MoreActionsMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onDelete={() => {
          setMenuOpen(false);
          setDeleteOpen(true);
        }}
        onEdit={() => {
          setMenuOpen(false);
          onEdit();
        }}
      />

      <DeleteCollectionModal
        visible={deleteOpen}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => {
          deleteCollection(collection.id);
          setDeleteOpen(false);
          onBack();
        }}
      />
    </YStack>
  );
}

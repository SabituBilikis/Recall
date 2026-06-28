import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import { StateMessage } from "@/components/ui/state-message";
import { Typography } from "@/components/ui/typography";
import type { Collection } from "@/types/collection";

import { collectionsContent } from "../constants/collections-content";
import { useCollectionsList } from "../hooks/use-collections-list";
import { CollectionCard } from "./collection-card";
import { CollectionHeader } from "./collection-header";
import { CollectionSearchBar } from "./collection-search-bar";
import { EmptyCollectionsState } from "./empty-collections-state";

export type CollectionsListScreenProps = {
  onBack: () => void;
  onCreate: () => void;
  onOpen: (collection: Collection) => void;
};

const listContentStyle = { gap: 16, paddingBottom: 140, paddingHorizontal: 16 } as const;
const columnStyle = { gap: 16 } as const;

export function CollectionsListScreen({ onBack, onCreate, onOpen }: CollectionsListScreenProps) {
  const insets = useSafeAreaInsets();
  const { collections, hasCollections, query, setQuery, loadCollections, loadError } = useCollectionsList();

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <CollectionHeader
          title={collectionsContent.listTitle}
          onBack={onBack}
          right={
            <Button appearance="filled" rounded="$xxl" size="small" onPress={onCreate}>
              {collectionsContent.createButton}
            </Button>
          }
        />
      </YStack>

      <FlatList
        columnWrapperStyle={hasCollections ? columnStyle : undefined}
        contentContainerStyle={listContentStyle}
        data={collections}
        key={hasCollections ? "collections-grid-2" : "collections-grid-1"}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          hasCollections ? null : loadError ? (
            <StateMessage
              actionLabel="Retry"
              description="We couldn't load your collections. Check your connection and try again."
              title="Something went wrong"
              onAction={() => void loadCollections()}
            />
          ) : (
            <EmptyCollectionsState onCreate={onCreate} />
          )
        }
        ListHeaderComponent={
          <YStack gap="$6" pb="$2" width="100%">
            <Typography color="$onboardingTextPrimary" variant="h5">
              {collectionsContent.listHeading}
            </Typography>
            <CollectionSearchBar
              placeholder={collectionsContent.searchPlaceholder}
              value={query}
              onChange={setQuery}
            />
          </YStack>
        }
        numColumns={hasCollections ? 2 : 1}
        renderItem={({ item }) => <CollectionCard collection={item} onPress={() => onOpen(item)} />}
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  );
}

import { useCallback } from "react";
import { FlatList, type ListRenderItem } from "react-native";
import { YStack } from "tamagui";

import type { SavedItem } from "@/types/saved-item";
import { SearchResultCard } from "./search-result-card";
import { SearchSummary } from "./search-summary";

const listContentStyle = { paddingBottom: 40, paddingHorizontal: 16 } as const;

// Hoisted so FlatList sees a stable component identity (no separator remount per render).
const ItemSeparator = () => <YStack height={8} />;
const keyExtractor = (item: SavedItem) => item.id;

export function SearchResultsList({
  items,
  onItemPress
}: {
  items: SavedItem[];
  onItemPress: (item: SavedItem) => void;
}) {
  const renderItem = useCallback<ListRenderItem<SavedItem>>(
    ({ index, item }) => <SearchResultCard index={index} item={item} onPress={onItemPress} />,
    [onItemPress]
  );

  return (
    <FlatList
      contentContainerStyle={listContentStyle}
      data={items}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={keyExtractor}
      ListHeaderComponent={
        <YStack pb="$8">
          <SearchSummary count={items.length} />
        </YStack>
      }
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
}

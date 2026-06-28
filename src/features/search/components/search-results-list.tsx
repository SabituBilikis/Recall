import { FlatList } from "react-native";
import { YStack } from "tamagui";

import type { SavedItem } from "@/types/saved-item";
import { SearchResultCard } from "./search-result-card";
import { SearchSummary } from "./search-summary";

const listContentStyle = { paddingBottom: 40, paddingHorizontal: 16 } as const;

export function SearchResultsList({
  items,
  onItemPress
}: {
  items: SavedItem[];
  onItemPress: (item: SavedItem) => void;
}) {
  return (
    <FlatList
      contentContainerStyle={listContentStyle}
      data={items}
      ItemSeparatorComponent={() => <YStack height={8} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <YStack pb="$8">
          <SearchSummary count={items.length} />
        </YStack>
      }
      renderItem={({ index, item }) => (
        <SearchResultCard index={index} item={item} onPress={() => onItemPress(item)} />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

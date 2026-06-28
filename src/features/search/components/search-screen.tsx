import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import type { SavedItem } from "@/types/saved-item";

import { searchContent } from "../constants/search-content";
import { useSearch } from "../hooks/use-search";
import { EmptySearchState } from "./empty-search-state";
import { SearchHeader } from "./search-header";
import { SearchInput } from "./search-input";
import { SearchResultsList } from "./search-results-list";

export type SearchScreenProps = {
  onBack: () => void;
  onItemPress: (item: SavedItem) => void;
};

export function SearchScreen({ onBack, onItemPress }: SearchScreenProps) {
  const insets = useSafeAreaInsets();
  const { hasQuery, hasResults, searchQuery, searchResults, setSearchQuery } = useSearch();

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <SearchHeader onBack={onBack} />
      </YStack>

      <YStack pb="$6" px="$4">
        <SearchInput placeholder={searchContent.placeholder} value={searchQuery} onChange={setSearchQuery} />
      </YStack>

      <YStack flex={1}>
        {hasQuery && hasResults ? <SearchResultsList items={searchResults} onItemPress={onItemPress} /> : null}
        {hasQuery && !hasResults ? (
          <YStack pt="$8">
            <EmptySearchState />
          </YStack>
        ) : null}
      </YStack>
    </YStack>
  );
}

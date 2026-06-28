import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { RecentItemCard } from "@/features/home/components/recent-item-card";
import { useRefresh } from "@/hooks/use-refresh";
import { USE_BACKEND } from "@/lib/config/backend-flag";
import { listArchivedItems, restoreItem } from "@/services/items.service";
import { colorValues } from "@/theme/tokens/color";
import type { SavedItem } from "@/types/saved-item";

import { LibraryHeader } from "./library-header";

export type ArchiveScreenProps = {
  onBack: () => void;
  onItemPress: (item: SavedItem) => void;
};

const listContentStyle = { gap: 12, paddingBottom: 40, paddingHorizontal: 16, paddingTop: 8 } as const;

export function ArchiveScreen({ onBack, onItemPress }: ArchiveScreenProps) {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<SavedItem[]>([]);

  const load = useCallback(async () => {
    if (!USE_BACKEND) {
      return;
    }
    try {
      setItems(await listArchivedItems());
    } catch (error) {
      console.warn("[archive] load failed", error);
    }
  }, []);

  const { refreshing, onRefresh } = useRefresh(load);

  useEffect(() => {
    void Promise.resolve().then(load);
  }, [load]);

  function handleRestore(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
    if (!USE_BACKEND) {
      return;
    }
    void restoreItem(id).catch((error: unknown) => console.warn("[archive] restore failed", error));
  }

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <LibraryHeader onBack={onBack} title="Archive" />
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
              Nothing archived
            </Typography>
            <Typography color="$onboardingTextSecondary" text="center" variant="body3">
              Deleted items land here and can be restored.
            </Typography>
          </YStack>
        }
        renderItem={({ item }) => (
          <YStack gap="$2">
            <RecentItemCard item={item} onPress={onItemPress} />
            <XStack justify="flex-end">
              <Button appearance="outline" rounded="$xxl" size="small" onPress={() => handleRestore(item.id)}>
                Restore
              </Button>
            </XStack>
          </YStack>
        )}
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  );
}

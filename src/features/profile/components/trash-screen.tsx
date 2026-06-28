import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import { AlertCircleIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { LibraryHeader } from "@/features/library/components/library-header";
import { tileBorderWidths } from "@/theme/tokens";
import { colorValues } from "@/theme/tokens/color";

import { profileContent } from "../constants/profile-content";
import { useTrash } from "../hooks/use-trash";
import { TrashItemCard } from "./trash-item-card";
import { TrashSearchBar } from "./trash-search-bar";

const listContentStyle = { gap: 12, paddingBottom: 40, paddingHorizontal: 16, paddingTop: 8 } as const;

export function TrashScreen({ onBack }: { onBack: () => void }) {
  const insets = useSafeAreaInsets();
  const { filteredTrashItems, searchTrashQuery, setSearchTrashQuery, restore, permanentlyDelete, isEmpty } = useTrash();

  const empty = isEmpty ? profileContent.trash.empty : profileContent.trash.noResults;

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <LibraryHeader onBack={onBack} title={profileContent.titles.trash} />
      </YStack>

      <FlatList
        contentContainerStyle={listContentStyle}
        data={filteredTrashItems}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <YStack gap="$4" pb="$1" width="100%">
            <TrashSearchBar
              placeholder={profileContent.trash.searchPlaceholder}
              value={searchTrashQuery}
              onChange={setSearchTrashQuery}
            />
            <XStack
              backgroundColor="$dangerSoft"
              borderColor="$danger"
              borderWidth={tileBorderWidths.card}
              gap="$2"
              items="center"
              p="$3"
              rounded="$sm"
            >
              <AlertCircleIcon color={colorValues.red500} size={20} />
              <Typography color="$onboardingTextSecondary" flex={1} variant="caption1">
                {profileContent.trash.retentionNotice}
              </Typography>
            </XStack>
            <XStack items="center" justify="space-between">
              <Typography color="$onboardingTextPrimary" variant="subtitle1">
                {profileContent.trash.listHeading}
              </Typography>
              <Typography color="$textAccent" variant="buttonSmall">
                {profileContent.trash.filterAll}
              </Typography>
            </XStack>
          </YStack>
        }
        ListEmptyComponent={
          <YStack gap="$2" items="center" py="$10">
            <Typography color="$onboardingTextPrimary" text="center" variant="subtitle1">
              {empty.title}
            </Typography>
            <Typography color="$onboardingTextSecondary" text="center" variant="body3">
              {empty.description}
            </Typography>
          </YStack>
        }
        renderItem={({ item }) => (
          <TrashItemCard item={item} onDelete={() => permanentlyDelete(item.id)} onRestore={() => restore(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  );
}

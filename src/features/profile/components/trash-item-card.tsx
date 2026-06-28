import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import { SavedTypeIcon } from "@/features/home/components/saved-type-icon";
import { tileBorderWidths } from "@/theme/tokens";
import type { SavedItem } from "@/types/saved-item";

import { profileContent } from "../constants/profile-content";

const TYPE_LABEL: Record<SavedItem["type"], string> = {
  screenshot: "Screenshot",
  link: "Link",
  note: "Note",
  file: "File"
};

// A deleted item: type icon, title + meta + date, Restore / Delete actions.
export function TrashItemCard({
  item,
  onRestore,
  onDelete
}: {
  item: SavedItem;
  onRestore: () => void;
  onDelete: () => void;
}) {
  return (
    <YStack
      backgroundColor="$surfacePrimary"
      borderColor="$borderSubtle"
      borderWidth={tileBorderWidths.card}
      gap="$3"
      p="$3"
      rounded="$sm"
      width="100%"
    >
      <XStack gap="$3" items="center">
        <SavedTypeIcon size={40} type={item.type} />
        <YStack flex={1} gap="$1">
          <Typography color="$onboardingTextPrimary" numberOfLines={1} variant="body2">
            {item.title}
          </Typography>
          <Typography color="$onboardingTextSecondary" variant="caption1">
            {TYPE_LABEL[item.type]} · {item.collectionName}
          </Typography>
        </YStack>
        <Typography color="$onboardingTextSecondary" variant="caption1">
          {item.savedAtLabel}
        </Typography>
      </XStack>

      <XStack gap="$3" items="center">
        <XStack
          borderColor="$primary900"
          borderWidth={1}
          items="center"
          justify="center"
          pressStyle={{ opacity: 0.6 }}
          px="$4"
          py="$2"
          rounded="$sm"
          onPress={onRestore}
        >
          <Typography color="$grey900" variant="buttonTiny">
            {profileContent.trash.restore}
          </Typography>
        </XStack>
        <XStack
          backgroundColor="$primary900"
          flex={1}
          items="center"
          justify="center"
          pressStyle={{ opacity: 0.85 }}
          px="$4"
          py="$2"
          rounded="$sm"
          onPress={onDelete}
        >
          <Typography color="$textInverse" variant="buttonTiny">
            {profileContent.trash.deletePermanently}
          </Typography>
        </XStack>
      </XStack>
    </YStack>
  );
}

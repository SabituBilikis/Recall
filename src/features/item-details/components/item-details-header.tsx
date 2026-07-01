import { XStack, YStack } from "tamagui";

import { ChevronLeftIcon, MoreIcon, StarIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { colorValues } from "@/theme/tokens/color";

import { itemDetailsContent } from "../constants/item-details-content";

type ItemDetailsHeaderProps = {
  favorite: boolean;
  onBack: () => void;
  onMore: () => void;
  onToggleFavorite: () => void;
};

export function ItemDetailsHeader({ favorite, onBack, onMore, onToggleFavorite }: ItemDetailsHeaderProps) {
  return (
    <XStack gap="$2" items="center" width="100%">
      <YStack
        accessibilityRole="button"
        accessibilityLabel="Go back"
        backgroundColor="$surfacePrimary"
        height={32}
        items="center"
        justify="center"
        pressStyle={{ opacity: 0.6 }}
        rounded="$md"
        width={32}
        onPress={onBack}
      >
        <ChevronLeftIcon color={colorValues.grey900} size={16} />
      </YStack>

      <Typography color="$onboardingTextPrimary" flex={1} text="center" variant="subtitle2">
        {itemDetailsContent.title}
      </Typography>

      <XStack gap="$2" items="center">
        <YStack
          accessibilityRole="button"
          accessibilityState={{ selected: favorite }}
          accessibilityLabel={favorite ? "Remove from favorites" : "Add to favorites"}
          backgroundColor="$surfacePrimary"
          height={32}
          items="center"
          justify="center"
          pressStyle={{ opacity: 0.6 }}
          rounded="$xxl"
          width={32}
          onPress={onToggleFavorite}
        >
          <StarIcon color={favorite ? colorValues.yellow500 : colorValues.grey300} size={18} />
        </YStack>
        <YStack
          accessibilityRole="button"
          accessibilityLabel="More options"
          backgroundColor="$surfacePrimary"
          height={32}
          items="center"
          justify="center"
          pressStyle={{ opacity: 0.6 }}
          rounded="$xxl"
          width={32}
          onPress={onMore}
        >
          <MoreIcon color={colorValues.grey900} size={16} />
        </YStack>
      </XStack>
    </XStack>
  );
}

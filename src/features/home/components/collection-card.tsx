import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import type { Collection } from "@/types/collection";

const accentTokens = {
  purple: { bg: "$primary50", text: "$primary600" },
  blue: { bg: "$blue50", text: "$blue600" },
  grey: { bg: "$grey100", text: "$grey600" },
  green: { bg: "$green50", text: "$green600" },
  yellow: { bg: "$yellow50", text: "$yellow600" },
  red: { bg: "$red50", text: "$red600" }
} as const;

type CollectionCardProps = {
  collection: Collection;
  onPress: () => void;
};

export function CollectionCard({ collection, onPress }: CollectionCardProps) {
  const accent = accentTokens[collection.color];

  return (
    <YStack
      backgroundColor="$surfacePrimary"
      flex={1}
      gap="$3"
      height={105}
      justify="center"
      pressStyle={{ opacity: 0.7 }}
      px="$3"
      py="$2"
      rounded="$sm"
      onPress={onPress}
    >
      <XStack backgroundColor={accent.bg} height={32} items="center" justify="center" rounded="$xxl" width={32}>
        <Typography color={accent.text} variant="body2">
          {collection.itemCount}
        </Typography>
      </XStack>
      <Typography color="$onboardingTextPrimary" numberOfLines={1} variant="body2">
        {collection.name}
      </Typography>
    </YStack>
  );
}

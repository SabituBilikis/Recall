import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import { SavedTypeIcon } from "@/features/home/components/saved-type-icon";

import type { ItemTypeOption } from "../constants/item-type-options";

type ItemTypeCardProps = {
  onPress: () => void;
  option: ItemTypeOption;
  selected: boolean;
};

export function ItemTypeCard({ onPress, option, selected }: ItemTypeCardProps) {
  return (
    <YStack
      backgroundColor={selected ? "$primary100" : "$surfacePrimary"}
      p="$3"
      pressStyle={{ opacity: 0.8 }}
      rounded="$sm"
      width="100%"
      onPress={onPress}
    >
      <XStack gap="$3" items="center" width="100%">
        <SavedTypeIcon size={48} type={option.type} />
        <YStack flex={1} gap="$3">
          <Typography color="$onboardingTextPrimary" variant="body2">
            {option.title}
          </Typography>
          <Typography color="$onboardingTextSecondary" variant="caption2">
            {option.description}
          </Typography>
        </YStack>
      </XStack>
    </YStack>
  );
}

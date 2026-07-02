import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import type { CollectionColor } from "@/types/collection";

import { collectionColorOptions } from "../constants/collection-colors";
import { collectionsContent } from "../constants/collections-content";

type CollectionColorPickerProps = {
  onChange: (color: CollectionColor) => void;
  value: CollectionColor;
};

export function CollectionColorPicker({ onChange, value }: CollectionColorPickerProps) {
  return (
    <YStack gap="$4" items="center" width="100%">
      <Typography color="$onboardingTextPrimary" variant="body2" width="100%">
        {collectionsContent.fields.color}
      </Typography>

      <XStack gap="$8" items="center" justify="center" width="100%">
        {collectionColorOptions.map((option) => (
          <YStack
            accessibilityRole="button"
            accessibilityState={{ selected: value === option.id }}
            accessibilityLabel={`${option.id} color`}
            backgroundColor={option.swatchToken}
            borderColor={option.accentToken}
            borderWidth={value === option.id ? 2 : 0}
            height={32}
            key={option.id}
            pressStyle={{ opacity: 0.7 }}
            rounded="$xxl"
            width={32}
            onPress={() => onChange(option.id)}
          />
        ))}
      </XStack>
    </YStack>
  );
}

import { ScrollView, XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import { tileBorderWidths } from "@/theme/tokens";

import { collectionFilters, type CollectionFilter } from "../constants/collections-content";

type CollectionFilterChipsProps = {
  onChange: (filter: CollectionFilter) => void;
  value: CollectionFilter;
};

export function CollectionFilterChips({ onChange, value }: CollectionFilterChipsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <XStack gap="$2.5" items="center">
        {collectionFilters.map((chip) => {
          const isActive = value === chip.id;
          return (
            <YStack
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`Filter: ${chip.label}`}
              backgroundColor={isActive ? "$primary500" : "$transparent"}
              borderColor="$borderSubtle"
              borderWidth={isActive ? 0 : tileBorderWidths.card}
              height={40}
              items="center"
              justify="center"
              key={chip.id}
              pressStyle={{ opacity: 0.7 }}
              px="$3"
              rounded={20}
              onPress={() => onChange(chip.id)}
            >
              <Typography color={isActive ? "$textInverse" : "$textTertiary"} variant="buttonMedium">
                {chip.label}
              </Typography>
            </YStack>
          );
        })}
      </XStack>
    </ScrollView>
  );
}

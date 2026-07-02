import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";

import { captureContent } from "../constants/capture-content";
import { itemTypeOptions } from "../constants/item-type-options";
import type { CaptureItemType } from "../types/capture.types";
import { AddItemHeader } from "./add-item-header";
import { ItemTypeCard } from "./item-type-card";

export type SelectItemTypeScreenProps = {
  onBack: () => void;
  onClose: () => void;
  onSelectType: (type: CaptureItemType) => void;
};

export function SelectItemTypeScreen({ onBack, onClose, onSelectType }: SelectItemTypeScreenProps) {
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<CaptureItemType | null>(null);

  function handleSelect(type: CaptureItemType) {
    setSelected(type);
    onSelectType(type);
  }

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <AddItemHeader title={captureContent.selectTitle} onBack={onBack} onClose={onClose} />
      </YStack>

      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack gap="$10" pb="$8" pt="$6" px="$4">
          <Typography color="$onboardingTextPrimary" variant="h5">
            {captureContent.selectHeading}
          </Typography>

          <YStack gap="$2" width="100%">
            {itemTypeOptions.map((option) => (
              <ItemTypeCard
                key={option.type}
                option={option}
                selected={selected === option.type}
                onPress={() => handleSelect(option.type)}
              />
            ))}
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}

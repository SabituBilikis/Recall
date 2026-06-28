import { useState } from "react";
import { XStack, YStack } from "tamagui";

import { ChevronDownIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { useCollectionsStore } from "@/store/use-collections-store";
import { colorValues } from "@/theme/tokens/color";
import { inputBorderTokens } from "@/theme/tokens";

import { captureContent } from "../constants/capture-content";

type CollectionSelectorProps = {
  onChange: (collectionName: string) => void;
  value: string;
};

// Pressable field styled like the form inputs, with an inline dropdown of mock
// collections. Collection is optional, so no validation here.
export function CollectionSelector({ onChange, value }: CollectionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const collections = useCollectionsStore((state) => state.collections);

  return (
    <YStack gap="$2" width="100%">
      <Typography color="$inputLabel" variant="body2">
        {captureContent.fields.collection.label}
      </Typography>

      <YStack
        backgroundColor="$inputBgOutline"
        borderColor={isOpen ? "$inputBorderFocus" : "$inputBorderDefault"}
        borderWidth={inputBorderTokens.default}
        pressStyle={{ opacity: 0.7 }}
        rounded="$xs"
        width="100%"
        onPress={() => setIsOpen((previous) => !previous)}
      >
        <XStack height={48} items="center" justify="space-between" px="$3">
          <Typography color={value ? "$inputText" : "$inputPlaceholder"} variant="body1">
            {value || captureContent.fields.collection.placeholder}
          </Typography>
          <YStack rotate={isOpen ? "180deg" : "0deg"}>
            <ChevronDownIcon color={colorValues.grey400} size={24} />
          </YStack>
        </XStack>
      </YStack>

      {isOpen ? (
        <YStack
          backgroundColor="$surfacePrimary"
          borderColor="$borderSubtle"
          borderWidth={inputBorderTokens.default}
          overflow="hidden"
          rounded="$xs"
        >
          {collections.map((collection) => (
            <XStack
              key={collection.id}
              pressStyle={{ backgroundColor: "$backgroundHover" }}
              px="$3"
              py="$3"
              onPress={() => {
                onChange(collection.name);
                setIsOpen(false);
              }}
            >
              <Typography variant="body1">{collection.name}</Typography>
            </XStack>
          ))}
        </YStack>
      ) : null}
    </YStack>
  );
}

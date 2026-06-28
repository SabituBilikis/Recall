import { XStack } from "tamagui";

import { SearchIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { colorValues } from "@/theme/tokens/color";
import { inputBorderTokens } from "@/theme/tokens";

import { homeContent } from "../constants/home-content";

// Pressable entry to the dedicated Search screen (tap anywhere on the bar).
export function SearchBar({ onPress }: { onPress: () => void }) {
  return (
    <XStack
      backgroundColor="$surfacePrimary"
      borderColor="$borderSubtle"
      borderWidth={inputBorderTokens.default}
      gap="$3"
      height={48}
      items="center"
      pressStyle={{ opacity: 0.7 }}
      px="$3"
      rounded="$xxl"
      width="100%"
      onPress={onPress}
    >
      <SearchIcon color={colorValues.grey400} size={24} />
      <Typography color="$inputPlaceholder" flex={1} numberOfLines={1} variant="body1">
        {homeContent.searchPlaceholder}
      </Typography>
    </XStack>
  );
}

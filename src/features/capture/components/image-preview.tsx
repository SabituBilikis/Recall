import { Image } from "react-native";
import { YStack } from "tamagui";

import { tileBorderWidths } from "@/theme/tokens";

const previewImageStyle = { height: 200, width: "100%" } as const;

// Uploaded image preview — tap to replace.
export function ImagePreview({ onPress, uri }: { onPress: () => void; uri: string }) {
  return (
    <YStack
      backgroundColor="$surfacePrimary"
      borderColor="$borderSubtle"
      borderWidth={tileBorderWidths.card}
      overflow="hidden"
      pressStyle={{ opacity: 0.85 }}
      rounded="$sm"
      width="100%"
      onPress={onPress}
    >
      <Image resizeMode="cover" source={{ uri }} style={previewImageStyle} />
    </YStack>
  );
}

import { YStack } from "tamagui";

import { PlusIcon } from "@/components/ui/icons";
import { colorValues } from "@/theme/tokens/color";
import { nativeShadowTokens } from "@/theme/tokens";

export function FloatingActionButton({ onPress }: { onPress: () => void }) {
  return (
    <YStack
      {...nativeShadowTokens[600]}
      accessibilityRole="button"
      accessibilityLabel="Capture new item"
      backgroundColor="$buttonFilledBg"
      height={56}
      items="center"
      justify="center"
      pressStyle={{ opacity: 0.85 }}
      rounded={28}
      width={56}
      onPress={onPress}
    >
      <PlusIcon color={colorValues.white100} size={24} />
    </YStack>
  );
}

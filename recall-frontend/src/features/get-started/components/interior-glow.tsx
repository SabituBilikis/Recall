import { Circle, YStack } from "tamagui";

import { SoftGlow } from "@/components/ui/soft-glow";
import { colorValues } from "@/theme/tokens/color";

import { getStartedIllustrationTokens } from "../constants/get-started-tokens";

export function InteriorGlow() {
  return (
    <YStack
      height={getStartedIllustrationTokens.centerGlowHeight}
      left={getStartedIllustrationTokens.centerGlowLeft}
      position="absolute"
      top={getStartedIllustrationTokens.centerGlowTop}
      width={getStartedIllustrationTokens.centerGlowWidth}
    >
      <SoftGlow color={colorValues.primary100} opacity={0.2} size={getStartedIllustrationTokens.centerGlowWidth} />
      <Circle backgroundColor="$surfacePrimary" height="72%" left="14%" opacity={0.56} position="absolute" top="14%" width="72%" />
    </YStack>
  );
}

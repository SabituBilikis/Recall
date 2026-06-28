import { YStack } from "tamagui";

import { SoftGlow } from "@/components/ui/soft-glow";
import { colorValues } from "@/theme/tokens/color";

import { getStartedLayoutTokens } from "../constants/get-started-tokens";

export function TopGlow() {
  return (
    <YStack
      height={getStartedLayoutTokens.topGlowSize}
      left={-84}
      position="absolute"
      top={-42}
      width={getStartedLayoutTokens.topGlowSize}
    >
      <SoftGlow color={colorValues.primary100} opacity={0.42} size={getStartedLayoutTokens.topGlowSize} />
    </YStack>
  );
}

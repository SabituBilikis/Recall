import { YStack } from "tamagui";

import { nativeShadowTokens } from "@/theme/tokens";

import { getStartedLayoutTokens } from "../constants/get-started-tokens";
import { InteriorGlow } from "./interior-glow";
import { MemoryRail } from "./memory-rail";
import { MiniTile } from "./mini-tile";
import { ReadyGlow } from "./ready-glow";

export function HeroIllustration() {
  return (
    <YStack
      {...nativeShadowTokens[800]}
      backgroundColor="$getStartedHeroSurface"
      height={getStartedLayoutTokens.heroHeight}
      overflow="hidden"
      position="relative"
      rounded={getStartedLayoutTokens.heroRadius}
      width={getStartedLayoutTokens.heroWidth}
    >
      <InteriorGlow />
      <MemoryRail />
      <MiniTile accent="$getStartedAccentPrimary" index={0} label="screenshot" top={39} />
      <MiniTile accent="$getStartedAccentInfo" index={1} label="Link" top={129} />
      <ReadyGlow />
    </YStack>
  );
}

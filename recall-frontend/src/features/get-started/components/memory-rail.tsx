import { MotiView } from "moti";
import { Circle, YStack } from "tamagui";

import { getStartedIllustrationTokens } from "../constants/get-started-tokens";

const dotColors = ["$getStartedAccentPrimary", "$surfacePrimary", "$surfacePrimary", "$surfacePrimary"] as const;

export function MemoryRail() {
  return (
    <YStack
      backgroundColor="$getStartedCapsule"
      height={getStartedIllustrationTokens.capsuleHeight}
      items="center"
      justify="center"
      left={getStartedIllustrationTokens.capsuleLeft}
      position="absolute"
      rounded="$md"
      top={getStartedIllustrationTokens.capsuleTop}
      width={getStartedIllustrationTokens.capsuleWidth}
    >
      <YStack gap={getStartedIllustrationTokens.dotGap}>
        {dotColors.map((backgroundColor, index) => (
          <MotiView
            key={`memory-dot-${index}`}
            animate={{ opacity: [0.72, 1, 0.72], scale: [1, 1.16, 1], translateY: [0, -1, 0] }}
            from={{ opacity: 0.72, scale: 1, translateY: 0 }}
            transition={{
              delay: index * getStartedIllustrationTokens.railDotAnimationStagger,
              duration: getStartedIllustrationTokens.railDotAnimationDuration,
              loop: true,
              repeatReverse: false,
              type: "timing"
            }}
          >
            <Circle
              backgroundColor={backgroundColor}
              height={getStartedIllustrationTokens.dotSize}
              width={getStartedIllustrationTokens.dotSize}
            />
          </MotiView>
        ))}
      </YStack>
    </YStack>
  );
}

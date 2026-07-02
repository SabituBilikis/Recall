import { MotiView } from "moti";
import { Circle, XStack, YStack } from "tamagui";

import { FloatingLayer } from "@/components/ui/motion";
import { Typography } from "@/components/ui/typography";
import { useReducedMotionFlag } from "@/hooks/use-reduced-motion-flag";
import { nativeShadowTokens, tileBorderWidths } from "@/theme/tokens";

import { getStartedIllustrationTokens, getStartedLoopTokens } from "../constants/get-started-tokens";

export type MiniTileProps = {
  accent: "$getStartedAccentInfo" | "$getStartedAccentPrimary";
  index: number;
  label: string;
  top: number;
};

export function MiniTile({ accent, index, label, top }: MiniTileProps) {
  const reduceMotion = useReducedMotionFlag();
  const rotate = index % 2 === 0 ? getStartedLoopTokens.floatRotate : -getStartedLoopTokens.floatRotate;

  return (
    <YStack left={getStartedIllustrationTokens.miniTileLeft} position="absolute" top={top}>
      <FloatingLayer
        amplitude={getStartedLoopTokens.floatAmplitude}
        delay={index * getStartedLoopTokens.layerStagger}
        disabled={reduceMotion}
        duration={getStartedLoopTokens.floatDuration}
        easing={getStartedLoopTokens.easingInOut}
        rotate={rotate}
      >
        <MotiView
          animate={{ opacity: 1 }}
          from={{ opacity: 0 }}
          transition={{
            opacity: {
              delay: index * getStartedIllustrationTokens.miniTileEnterStagger,
              duration: getStartedIllustrationTokens.miniTileOpacityEnterDuration,
              type: "timing"
            }
          }}
        >
          <YStack
            {...nativeShadowTokens[600]}
            backgroundColor="$getStartedTileBg"
            borderColor="$getStartedTileBorder"
            borderWidth={tileBorderWidths.card}
            gap={getStartedIllustrationTokens.miniTileGap}
            height={getStartedIllustrationTokens.miniTileHeight}
            p={getStartedIllustrationTokens.miniTilePadding}
            rounded={getStartedIllustrationTokens.miniTileRadius}
            width={getStartedIllustrationTokens.miniTileWidth}
          >
            <XStack gap="$3" items="center">
              <Circle
                backgroundColor={accent}
                height={getStartedIllustrationTokens.miniTileIconSize}
                width={getStartedIllustrationTokens.miniTileIconSize}
              />
              <XStack
                backgroundColor="$getStartedTileLine"
                height={getStartedIllustrationTokens.miniTileLineHeight}
                rounded="$xl"
                width={getStartedIllustrationTokens.miniTileTextLineWidth}
              />
            </XStack>
            <Typography color="$getStartedTileText" variant="splashMiniLabel">
              {label}
            </Typography>
            <XStack
              backgroundColor="$getStartedTileMetaLine"
              height={getStartedIllustrationTokens.miniTileMetaLineHeight}
              rounded="$xl"
              width={getStartedIllustrationTokens.miniTileMetaLineWidth}
            />
          </YStack>
        </MotiView>
      </FloatingLayer>
    </YStack>
  );
}

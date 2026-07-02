import type { ColorTokens } from "tamagui";
import { Circle, XStack, YStack } from "tamagui";

import { BreathingLayer, PulseRing } from "@/components/ui/motion";
import { Typography } from "@/components/ui/typography";
import { useReducedMotionFlag } from "@/hooks/use-reduced-motion-flag";
import { nativeShadowTokens, tileBorderWidths } from "@/theme/tokens";

import { onboardingLoopTokens, searchIllustrationTokens } from "../constants/onboarding-tokens";

import { AnimatedIllustration } from "./animated-illustration";

const NO_SCALE = 1;

function ShimmerLine({
  backgroundColor,
  delay,
  disabled,
  height,
  width
}: {
  backgroundColor: ColorTokens;
  delay: number;
  disabled: boolean;
  height: number;
  width: number;
}) {
  return (
    <BreathingLayer
      delay={delay}
      disabled={disabled}
      duration={onboardingLoopTokens.shimmerDuration}
      easing={onboardingLoopTokens.easingInOut}
      opacityHigh={onboardingLoopTokens.shimmerOpacityHigh}
      opacityLow={onboardingLoopTokens.shimmerOpacityLow}
      scaleTo={NO_SCALE}
    >
      <XStack backgroundColor={backgroundColor} height={height} rounded="$xl" width={width} />
    </BreathingLayer>
  );
}

function SearchTile({ disabled, emphasized }: { disabled: boolean; emphasized?: boolean }) {
  return (
    <YStack
      {...nativeShadowTokens[emphasized ? 700 : 800]}
      backgroundColor={emphasized ? "$onboardingTileSoftSurface" : "$onboardingTileSurface"}
      borderColor={emphasized ? "$onboardingTileStrongBorder" : "$onboardingTileBorder"}
      borderWidth={tileBorderWidths.card}
      gap="$2"
      height={emphasized ? searchIllustrationTokens.primaryTileHeight : searchIllustrationTokens.resultTileHeight}
      left={emphasized ? searchIllustrationTokens.primaryTileLeft : searchIllustrationTokens.resultTileLeft}
      p={emphasized ? searchIllustrationTokens.primaryTilePadding : searchIllustrationTokens.resultTilePadding}
      position="absolute"
      rounded={emphasized ? searchIllustrationTokens.primaryTileRadius : searchIllustrationTokens.resultTileRadius}
      top={emphasized ? searchIllustrationTokens.primaryTileTop : searchIllustrationTokens.resultTileTop}
      width={emphasized ? searchIllustrationTokens.primaryTileWidth : searchIllustrationTokens.resultTileWidth}
    >
      <XStack gap="$3" items="center">
        <Circle
          backgroundColor="$onboardingAccentPrimary"
          height={searchIllustrationTokens.headerIconSize}
          width={searchIllustrationTokens.headerIconSize}
        />
        {emphasized ? (
          <ShimmerLine
            backgroundColor="$onboardingLine"
            delay={0}
            disabled={disabled}
            height={searchIllustrationTokens.headerLineHeight}
            width={searchIllustrationTokens.primaryLineWidth}
          />
        ) : (
          <XStack
            backgroundColor="$onboardingLine"
            height={searchIllustrationTokens.headerLineHeight}
            rounded="$xl"
            width={searchIllustrationTokens.resultTitleLineWidth}
          />
        )}
      </XStack>
      {emphasized ? null : (
        <>
          <Typography color="$onboardingTextSecondary" variant="splashMiniLabel">
            screenshot
          </Typography>
          <ShimmerLine
            backgroundColor="$onboardingMetaLine"
            delay={onboardingLoopTokens.shimmerDuration / 2}
            disabled={disabled}
            height={searchIllustrationTokens.resultMetaLineHeight}
            width={searchIllustrationTokens.resultMetaLineWidth}
          />
        </>
      )}
    </YStack>
  );
}

export function SearchIllustration() {
  const reduceMotion = useReducedMotionFlag();

  return (
    <AnimatedIllustration>
      <YStack
        {...nativeShadowTokens[800]}
        backgroundColor="$onboardingCardSurface"
        height={searchIllustrationTokens.cardHeight}
        overflow="hidden"
        position="relative"
        rounded={searchIllustrationTokens.cardRadius}
        width={searchIllustrationTokens.cardWidth}
      >
        <SearchTile disabled={reduceMotion} emphasized />
        <SearchTile disabled={reduceMotion} />
        <YStack
          height={searchIllustrationTokens.focusRingSize}
          left={searchIllustrationTokens.focusRingLeft}
          items="center"
          justify="center"
          position="absolute"
          top={searchIllustrationTokens.focusRingTop}
          width={searchIllustrationTokens.focusRingSize}
        >
          <YStack height={searchIllustrationTokens.focusRingSize} position="absolute" width={searchIllustrationTokens.focusRingSize}>
            <PulseRing
              disabled={reduceMotion}
              duration={onboardingLoopTokens.pulseDuration}
              opacityHigh={searchIllustrationTokens.focusRingOpacity}
              opacityLow={onboardingLoopTokens.pulseOpacityLow}
              scaleTo={onboardingLoopTokens.pulseScaleTo}
            >
              <Circle
                borderColor="$onboardingTileStrongBorder"
                borderWidth={tileBorderWidths.card}
                height={searchIllustrationTokens.focusRingSize}
                width={searchIllustrationTokens.focusRingSize}
              />
            </PulseRing>
          </YStack>
          <BreathingLayer
            disabled={reduceMotion}
            duration={onboardingLoopTokens.breatheDuration}
            easing={onboardingLoopTokens.easingInOut}
            scaleTo={onboardingLoopTokens.breatheScaleTo}
          >
            <Circle
              backgroundColor="$onboardingAccentPrimary"
              height={searchIllustrationTokens.focusDotSize}
              width={searchIllustrationTokens.focusDotSize}
            />
          </BreathingLayer>
        </YStack>
      </YStack>
    </AnimatedIllustration>
  );
}

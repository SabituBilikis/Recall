import type { ColorTokens } from "tamagui";
import { Circle, XStack, YStack } from "tamagui";

import { BreathingLayer, FloatingLayer } from "@/components/ui/motion";
import { SoftGlow } from "@/components/ui/soft-glow";
import { Typography } from "@/components/ui/typography";
import { useReducedMotionFlag } from "@/hooks/use-reduced-motion-flag";
import { nativeShadowTokens, tileBorderWidths } from "@/theme/tokens";
import { colorValues } from "@/theme/tokens/color";

import {
  onboardingLoopTokens,
  saveEverythingIllustrationTokens,
  saveEverythingTilePositions,
  saveItemTileTokens
} from "../constants/onboarding-tokens";

import { AnimatedIllustration } from "./animated-illustration";

const tokens = saveEverythingIllustrationTokens;

type TileSize = "large" | "small";

type SavedTile = {
  accentColor: ColorTokens;
  label: string;
  left: number;
  size: TileSize;
  top: number;
};

// Order, dot colors and labels mirror the Figma "Save" illustration (node 6507:165).
const savedTiles: SavedTile[] = [
  {
    accentColor: "$onboardingAccentDot",
    label: "screenshot",
    left: saveEverythingTilePositions.screenshot.left,
    size: "large",
    top: saveEverythingTilePositions.screenshot.top
  },
  {
    accentColor: "$onboardingDotSoft",
    label: "Link",
    left: saveEverythingTilePositions.link.left,
    size: "small",
    top: saveEverythingTilePositions.link.top
  },
  {
    accentColor: "$onboardingDotStrong",
    label: "Note",
    left: saveEverythingTilePositions.note.left,
    size: "small",
    top: saveEverythingTilePositions.note.top
  },
  {
    accentColor: "$onboardingDotMuted",
    label: "File",
    left: saveEverythingTilePositions.file.left,
    size: "small",
    top: saveEverythingTilePositions.file.top
  }
];

function SavedItemTile({ accentColor, label, size }: { accentColor: ColorTokens; label: string; size: TileSize }) {
  const tile = saveItemTileTokens[size];

  return (
    <YStack
      {...nativeShadowTokens[700]}
      backgroundColor="$onboardingTileSurface"
      borderColor="$onboardingTileBorder"
      borderWidth={tileBorderWidths.card}
      gap={tokens.tileRowGap}
      height={tile.height}
      p={tile.padding}
      rounded={tile.radius}
      width={tile.width}
    >
      <XStack gap={tokens.tileHeaderGap} items="center">
        <Circle backgroundColor={accentColor} height={tile.iconSize} width={tile.iconSize} />
        <XStack backgroundColor="$onboardingLine" height={tile.lineHeight} rounded="$xl" width={tile.titleWidth} />
      </XStack>
      <Typography color="$onboardingTextSecondary" variant="buttonSmall">
        {label}
      </Typography>
      <XStack backgroundColor="$onboardingMetaLine" height={tile.lineHeight} rounded="$xl" width={tile.metaWidth} />
    </YStack>
  );
}

function CenterHub({ disabled }: { disabled: boolean }) {
  return (
    <YStack
      height={tokens.centerIconSize}
      items="center"
      justify="center"
      left={tokens.centerIconLeft}
      position="absolute"
      top={tokens.centerIconTop}
      width={tokens.centerIconSize}
    >
      <BreathingLayer
        disabled={disabled}
        duration={onboardingLoopTokens.breatheDuration}
        easing={onboardingLoopTokens.easingInOut}
        scaleTo={onboardingLoopTokens.breatheScaleTo}
      >
        <YStack items="center" justify="center">
          <YStack position="absolute">
            <SoftGlow color={colorValues.primary200} opacity={tokens.centerHaloOpacity} size={tokens.centerHaloSize} />
          </YStack>
          <Circle backgroundColor="$onboardingAccentDot" height={tokens.centerDotSize} width={tokens.centerDotSize} />
        </YStack>
      </BreathingLayer>
    </YStack>
  );
}

export function SaveEverythingIllustration() {
  const reduceMotion = useReducedMotionFlag();
  const stagger = onboardingLoopTokens.layerStagger;

  return (
    <AnimatedIllustration>
      <YStack height={tokens.height} position="relative" width={tokens.width}>
        <YStack height={tokens.glowSize} left={tokens.glowLeft} position="absolute" top={tokens.glowTop}>
          <BreathingLayer
            disabled={reduceMotion}
            duration={onboardingLoopTokens.breatheDuration}
            easing={onboardingLoopTokens.easingInOut}
            scaleTo={onboardingLoopTokens.breatheScaleTo}
          >
            <SoftGlow color={colorValues.primary100} opacity={tokens.glowOpacity} size={tokens.glowSize} />
          </BreathingLayer>
        </YStack>

        {savedTiles.map((tile, index) => (
          <YStack key={tile.label} left={tile.left} position="absolute" top={tile.top}>
            <FloatingLayer
              amplitude={onboardingLoopTokens.floatAmplitude}
              delay={index * stagger}
              disabled={reduceMotion}
              duration={onboardingLoopTokens.floatDuration}
              easing={onboardingLoopTokens.easingInOut}
              rotate={index % 2 === 0 ? onboardingLoopTokens.floatRotate : -onboardingLoopTokens.floatRotate}
            >
              <SavedItemTile accentColor={tile.accentColor} label={tile.label} size={tile.size} />
            </FloatingLayer>
          </YStack>
        ))}

        <CenterHub disabled={reduceMotion} />
      </YStack>
    </AnimatedIllustration>
  );
}

import type { ReactNode } from "react";
import { Circle, XStack, YStack } from "tamagui";

import { nativeShadowTokens, tileBorderWidths } from "@/theme/tokens";

import { splashMotionTokens } from "../constants/splash-tokens";

import { splashFrame } from "../constants/splash-frame";

export type StackLayerKey = "back" | "front" | "middle";

export type StackLayerSpec = {
  delay: number;
  duration: number;
  key: StackLayerKey;
  shadowLevel: keyof typeof nativeShadowTokens;
};

export const stackLayerSpecs = [
  {
    delay: splashMotionTokens.stackBackStart,
    duration: splashMotionTokens.stackBackDuration,
    key: "back",
    shadowLevel: 600
  },
  {
    delay: splashMotionTokens.stackMiddleStart,
    duration: splashMotionTokens.stackMiddleDuration,
    key: "middle",
    shadowLevel: 600
  },
  {
    delay: splashMotionTokens.stackFrontStart,
    duration: splashMotionTokens.stackFrontDuration,
    key: "front",
    shadowLevel: 600
  }
] as const satisfies readonly StackLayerSpec[];

export const cardLineSpecs = [
  {
    backgroundColor: "$splashCardLinePrimary" as const,
    delay: splashMotionTokens.lineOneStart,
    height: splashFrame.card.line.primaryHeight,
    left: splashFrame.card.content.lineOneLeft,
    opacity: 0.92,
    top: splashFrame.card.content.lineOneTop,
    width: splashFrame.card.line.primaryWidth
  },
  {
    backgroundColor: "$splashCardLineMuted" as const,
    delay: splashMotionTokens.lineTwoStart,
    height: splashFrame.card.line.secondaryHeight,
    left: splashFrame.card.content.lineTwoLeft,
    opacity: 0.7,
    top: splashFrame.card.content.lineTwoTop,
    width: splashFrame.card.line.secondaryWidth
  },
  {
    backgroundColor: "$splashCardLineMuted" as const,
    delay: splashMotionTokens.lineThreeStart,
    height: splashFrame.card.line.tertiaryHeight,
    left: splashFrame.card.content.lineThreeLeft,
    opacity: 0.72,
    top: splashFrame.card.content.lineThreeTop,
    width: splashFrame.card.line.tertiaryWidth
  }
] as const;

export function CardStackLayer({ layerKey, shadowLevel }: { layerKey: StackLayerKey; shadowLevel?: keyof typeof nativeShadowTokens }) {
  const layer = splashFrame.card[layerKey];
  const backgroundColor = {
    back: "$splashCardBack",
    front: "$splashCardFront",
    middle: "$splashCardMiddle"
  } as const;

  return (
    <YStack
      {...(shadowLevel ? nativeShadowTokens[shadowLevel] : undefined)}
      backgroundColor={backgroundColor[layerKey]}
      borderColor={layerKey === "front" ? undefined : "$splashTileBorder"}
      borderWidth={layerKey === "front" ? 0 : tileBorderWidths.card}
      borderRadius={splashFrame.card.radius}
      height={layer.height}
      left={layer.left}
      position="absolute"
      top={layer.top}
      width={layer.width}
    />
  );
}

export function CardFrontContentLayer({ children }: { children: ReactNode }) {
  return (
    <YStack
      borderRadius={splashFrame.card.radius}
      height={splashFrame.card.front.height}
      left={splashFrame.card.front.left}
      overflow="hidden"
      pointerEvents="none"
      position="absolute"
      top={splashFrame.card.front.top}
      width={splashFrame.card.front.width}
    >
      {children}
    </YStack>
  );
}

export function CardLine({
  backgroundColor,
  height,
  left,
  opacity,
  top,
  width
}: {
  backgroundColor: "$splashCardLineMuted" | "$splashCardLinePrimary" | "$splashSearchDot";
  height: number;
  left: number;
  opacity: number;
  top: number;
  width: number;
}) {
  return (
    <XStack
      backgroundColor={backgroundColor}
      height={height}
      left={left}
      opacity={opacity}
      position="absolute"
      rounded="$xl"
      top={top}
      width={width}
    />
  );
}

export function SearchDot() {
  return (
    <Circle
      backgroundColor="$splashSearchDot"
      height={splashFrame.card.searchDot.outerSize}
      left={splashFrame.card.searchDot.x}
      opacity={splashFrame.card.searchDot.outerOpacity}
      position="absolute"
      top={splashFrame.card.searchDot.y}
      width={splashFrame.card.searchDot.outerSize}
    >
      <Circle
        backgroundColor="$splashSearchDotSoft"
        height={splashFrame.card.searchDot.innerSize}
        opacity={splashFrame.card.searchDot.innerOpacity}
        width={splashFrame.card.searchDot.innerSize}
      />
    </Circle>
  );
}

export function SearchPulse() {
  return (
    <Circle
      borderColor="$splashSearchDot"
      borderWidth={splashFrame.card.pulse.borderWidth}
      height={splashFrame.card.pulse.size}
      left={splashFrame.card.front.left + splashFrame.card.searchDot.x + splashFrame.card.pulse.offset}
      opacity={0}
      position="absolute"
      top={splashFrame.card.front.top + splashFrame.card.searchDot.y + splashFrame.card.pulse.offset}
      width={splashFrame.card.pulse.size}
    />
  );
}

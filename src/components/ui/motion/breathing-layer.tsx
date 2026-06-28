import type { ReactNode } from "react";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";

type BreathingLayerProps = {
  children: ReactNode;
  delay?: number;
  disabled?: boolean;
  duration: number;
  easing?: readonly [number, number, number, number];
  opacityHigh?: number;
  opacityLow?: number;
  scaleTo: number;
};

const defaultEasing: readonly [number, number, number, number] = [0.42, 0, 0.58, 1];

/**
 * Seamless "breathing" loop: gently scales (and optionally fades) between a
 * resting state and a peak, returning to rest each cycle. Used for hub icons,
 * glows, and chips. Renders children statically when `disabled`.
 */
export function BreathingLayer({
  children,
  delay = 0,
  disabled = false,
  duration,
  easing = defaultEasing,
  opacityHigh,
  opacityLow,
  scaleTo
}: BreathingLayerProps) {
  if (disabled) {
    return <>{children}</>;
  }

  const animatesOpacity = opacityLow !== undefined && opacityHigh !== undefined;

  return (
    <MotiView
      animate={{
        scale: [1, scaleTo, 1],
        ...(animatesOpacity ? { opacity: [opacityLow, opacityHigh, opacityLow] } : {})
      }}
      from={{ scale: 1, ...(animatesOpacity ? { opacity: opacityLow } : {}) }}
      transition={{
        delay,
        duration,
        easing: Easing.bezier(...easing),
        loop: true,
        repeatReverse: false,
        type: "timing"
      }}
    >
      {children}
    </MotiView>
  );
}

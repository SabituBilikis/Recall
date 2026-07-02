import type { ReactNode } from "react";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";

type FloatingLayerProps = {
  amplitude: number;
  children: ReactNode;
  delay?: number;
  disabled?: boolean;
  duration: number;
  easing?: readonly [number, number, number, number];
  rotate?: number;
};

const defaultEasing: readonly [number, number, number, number] = [0.42, 0, 0.58, 1];

/**
 * Wraps children in a calm, seamless vertical float loop (translateY returns to
 * its start each cycle). Renders children statically when `disabled` (e.g.
 * reduced motion) so no animation runs.
 */
export function FloatingLayer({
  amplitude,
  children,
  delay = 0,
  disabled = false,
  duration,
  easing = defaultEasing,
  rotate = 0
}: FloatingLayerProps) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <MotiView
      animate={{
        translateY: [0, -amplitude, 0],
        ...(rotate ? { rotate: ["0deg", `${rotate}deg`, "0deg"] } : {})
      }}
      from={{ translateY: 0, ...(rotate ? { rotate: "0deg" } : {}) }}
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

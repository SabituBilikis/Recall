import type { ReactNode } from "react";

import { BreathingLayer } from "./breathing-layer";

type PulseRingProps = {
  children: ReactNode;
  delay?: number;
  disabled?: boolean;
  duration: number;
  opacityHigh: number;
  opacityLow: number;
  scaleTo: number;
};

/**
 * Focus-ring pulse: expands and fades back on a closed cycle. A thin, named
 * wrapper over BreathingLayer (opacity always animated) for call-site clarity.
 */
export function PulseRing({ children, delay, disabled, duration, opacityHigh, opacityLow, scaleTo }: PulseRingProps) {
  return (
    <BreathingLayer
      delay={delay}
      disabled={disabled}
      duration={duration}
      opacityHigh={opacityHigh}
      opacityLow={opacityLow}
      scaleTo={scaleTo}
    >
      {children}
    </BreathingLayer>
  );
}

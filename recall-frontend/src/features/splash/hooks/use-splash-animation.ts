import { useEffect, useState } from "react";
import { Easing, useReducedMotion } from "react-native-reanimated";

import { splashMotionTokens } from "../constants/splash-tokens";

type MotionState = {
  opacity?: number;
  rotate?: string;
  scale?: number;
  scaleX?: number;
  translateX?: number;
  translateY?: number;
};

type MotionConfig = {
  animate: MotionState;
  delay?: number;
  duration?: number;
  easing?: ReturnType<typeof Easing.bezier>;
  from: MotionState;
};

export type SplashMotionFactory = (config: MotionConfig) => {
  animate: MotionState;
  from: MotionState;
  transition: {
    delay?: number;
    duration: number;
    easing?: ReturnType<typeof Easing.bezier>;
    type: "timing";
  };
};

export type SplashAnimationOptions = {
  autoPlay?: boolean;
  onComplete?: () => void;
  reduceMotion?: boolean;
};

const phaseStartTokens = {
  brandPhaseReady: splashMotionTokens.brandStart,
  dotPhaseReady: splashMotionTokens.dotStart,
  flashPhaseReady: splashMotionTokens.foundFlashStart,
  linePhaseReady: splashMotionTokens.lineOneStart,
  logoPhaseReady: splashMotionTokens.logoStaticStart
} as const;

type PhaseReadiness = Record<keyof typeof phaseStartTokens, boolean>;

function createPhaseReadiness(isReady: boolean): PhaseReadiness {
  return {
    brandPhaseReady: isReady,
    dotPhaseReady: isReady,
    flashPhaseReady: isReady,
    linePhaseReady: isReady,
    logoPhaseReady: isReady
  };
}

export function useSplashAnimation({
  autoPlay = true,
  onComplete,
  reduceMotion
}: SplashAnimationOptions = {}) {
  const systemReduceMotion = useReducedMotion();
  const shouldReduceMotion = reduceMotion ?? systemReduceMotion;
  const shouldAnimate = autoPlay && !shouldReduceMotion;
  const [phaseReadiness, setPhaseReadiness] = useState<PhaseReadiness>(() => createPhaseReadiness(false));

  useEffect(() => {
    if (!autoPlay) {
      return;
    }

    if (shouldReduceMotion) {
      onComplete?.();
      return;
    }

    const complete = setTimeout(() => {
      onComplete?.();
    }, splashMotionTokens.total);

    return () => {
      clearTimeout(complete);
    };
  }, [autoPlay, onComplete, shouldReduceMotion]);

  useEffect(() => {
    if (!autoPlay || shouldReduceMotion) {
      return;
    }

    const timers = Object.entries(phaseStartTokens).map(([phaseKey, delay]) =>
      setTimeout(() => {
        setPhaseReadiness((current) => ({
          ...current,
          [phaseKey]: true
        }));
      }, delay)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [autoPlay, shouldReduceMotion]);

  function motion({
    animate,
    delay = 0,
    duration = splashMotionTokens.tileEnterDuration,
    easing = Easing.bezier(0.16, 1, 0.3, 1),
    from
  }: MotionConfig) {
    if (!shouldAnimate) {
      return {
        animate,
        from: animate,
        transition: {
          duration: 0,
          type: "timing" as const
        }
      };
    }

    return {
      animate,
      from,
      transition: {
        delay,
        duration,
        easing,
        type: "timing" as const
      }
    };
  }

  return {
    brandPhaseReady: shouldReduceMotion || (autoPlay && phaseReadiness.brandPhaseReady),
    dotPhaseReady: shouldReduceMotion || (autoPlay && phaseReadiness.dotPhaseReady),
    flashPhaseReady: shouldReduceMotion || (autoPlay && phaseReadiness.flashPhaseReady),
    linePhaseReady: shouldReduceMotion || (autoPlay && phaseReadiness.linePhaseReady),
    logoPhaseReady: shouldReduceMotion || (autoPlay && phaseReadiness.logoPhaseReady),
    motion,
    shouldReduceMotion
  };
}

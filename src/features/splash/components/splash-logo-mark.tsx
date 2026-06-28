import { MotiView } from "moti";
import type { Easing } from "react-native-reanimated";

import { splashMotionTokens } from "../constants/splash-tokens";

import { splashFrame } from "../constants/splash-frame";
import type { SplashMotionFactory } from "../hooks/use-splash-animation";
import {
  CardFrontContentLayer,
  CardLine,
  CardStackLayer,
  SearchDot,
  SearchPulse,
  cardLineSpecs,
  stackLayerSpecs
} from "./splash-logo-primitives";

export function FinalLogoMark() {
  return (
    <>
      {stackLayerSpecs.map((layerSpec) => (
        <CardStackLayer key={`final-${layerSpec.key}`} layerKey={layerSpec.key} />
      ))}
      <CardFrontContentLayer>
        {cardLineSpecs.map((line, index) => (
          <CardLine key={`final-card-line-${index}`} {...line} />
        ))}
        <SearchDot />
      </CardFrontContentLayer>
    </>
  );
}

function AnimatedStackLayers({
  easeSettle,
  shouldReduceMotion
}: {
  easeSettle: ReturnType<typeof Easing.bezier>;
  shouldReduceMotion: boolean;
}) {
  return (
    <>
      {stackLayerSpecs.map((layerSpec) => (
        <MotiView
          key={layerSpec.key}
          animate={{ opacity: 1, translateY: 0 }}
          from={
            shouldReduceMotion
              ? { opacity: 1, translateY: 0 }
              : {
                  opacity: 0,
                  translateY: splashFrame.card.stackFrom[layerSpec.key].translateY
                }
          }
          transition={
            shouldReduceMotion
              ? { duration: 0, type: "timing" }
              : {
                  opacity: {
                    delay: layerSpec.delay,
                    duration: splashMotionTokens.stackOpacityDuration,
                    type: "timing"
                  },
                  translateY: {
                    delay: layerSpec.delay,
                    duration: layerSpec.duration,
                    easing: easeSettle,
                    type: "timing"
                  }
                }
          }
        >
          <CardStackLayer layerKey={layerSpec.key} shadowLevel={layerSpec.shadowLevel} />
        </MotiView>
      ))}
    </>
  );
}

function AnimatedCardLines({
  easeSoft,
  motion,
  shouldReduceMotion
}: {
  easeSoft: ReturnType<typeof Easing.bezier>;
  motion: SplashMotionFactory;
  shouldReduceMotion: boolean;
}) {
  return (
    <>
      {cardLineSpecs.map((line, index) => (
        <CardFrontContentLayer key={`card-line-${index}`}>
          <MotiView
            {...motion({
              animate: { opacity: 1, scaleX: 1 },
              delay: shouldReduceMotion ? 0 : Math.max(0, line.delay - splashMotionTokens.lineOneStart),
              duration: splashMotionTokens.lineDuration,
              easing: easeSoft,
              from: { opacity: 0, scaleX: 0.25 }
            })}
          >
            <CardLine {...line} />
          </MotiView>
        </CardFrontContentLayer>
      ))}
    </>
  );
}

function AnimatedSearchDot({
  easeSettle,
  motion,
  shouldReduceMotion
}: {
  easeSettle: ReturnType<typeof Easing.bezier>;
  motion: SplashMotionFactory;
  shouldReduceMotion: boolean;
}) {
  if (shouldReduceMotion) {
    return (
      <CardFrontContentLayer>
        <SearchDot />
      </CardFrontContentLayer>
    );
  }

  return (
    <CardFrontContentLayer>
      <MotiView
        {...motion({
          animate: { opacity: 1, scale: 1, translateX: 0, translateY: 0 },
          delay: 0,
          duration: splashMotionTokens.dotDuration,
          easing: easeSettle,
          from: { opacity: 0, scale: 0.4, translateX: -62, translateY: 44 }
        })}
      >
        <SearchDot />
      </MotiView>
    </CardFrontContentLayer>
  );
}

function FoundFlash({ easeSearch }: { easeSearch: ReturnType<typeof Easing.bezier> }) {
  return (
    <CardFrontContentLayer>
      <MotiView
        animate={{ opacity: [0, 0.7, 0] }}
        from={{ opacity: 0 }}
        transition={{ duration: splashMotionTokens.foundFlashDuration, easing: easeSearch, type: "timing" }}
      >
        <CardLine
          backgroundColor="$splashSearchDot"
          height={splashFrame.card.line.primaryHeight}
          left={splashFrame.card.content.lineOneLeft}
          opacity={1}
          top={splashFrame.card.content.lineOneTop}
          width={splashFrame.card.line.primaryWidth}
        />
      </MotiView>
    </CardFrontContentLayer>
  );
}

function AnimatedPulse({ easeSearch, motion }: { easeSearch: ReturnType<typeof Easing.bezier>; motion: SplashMotionFactory }) {
  return (
    <MotiView
      {...motion({
        animate: { opacity: 0, scale: 1.85 },
        delay: splashMotionTokens.pulseStart,
        duration: splashMotionTokens.pulseDuration,
        easing: easeSearch,
        from: { opacity: 0.38, scale: 0.58 }
      })}
    >
      <SearchPulse />
    </MotiView>
  );
}

export function AnimatedLogoMark({
  dotPhaseReady,
  easeSearch,
  easeSettle,
  easeSoft,
  flashPhaseReady,
  linePhaseReady,
  motion,
  shouldReduceMotion
}: {
  dotPhaseReady: boolean;
  easeSearch: ReturnType<typeof Easing.bezier>;
  easeSettle: ReturnType<typeof Easing.bezier>;
  easeSoft: ReturnType<typeof Easing.bezier>;
  flashPhaseReady: boolean;
  linePhaseReady: boolean;
  motion: SplashMotionFactory;
  shouldReduceMotion: boolean;
}) {
  return (
    <>
      <AnimatedStackLayers easeSettle={easeSettle} shouldReduceMotion={shouldReduceMotion} />
      {linePhaseReady ? <AnimatedCardLines easeSoft={easeSoft} motion={motion} shouldReduceMotion={shouldReduceMotion} /> : null}
      {dotPhaseReady ? <AnimatedSearchDot easeSettle={easeSettle} motion={motion} shouldReduceMotion={shouldReduceMotion} /> : null}
      {flashPhaseReady && !shouldReduceMotion ? <FoundFlash easeSearch={easeSearch} /> : null}
      {!shouldReduceMotion ? <AnimatedPulse easeSearch={easeSearch} motion={motion} /> : null}
    </>
  );
}

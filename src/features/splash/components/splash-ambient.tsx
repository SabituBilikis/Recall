import { Image as ReactNativeImage } from "react-native";
import { MotiView } from "moti";
import type { Easing } from "react-native-reanimated";
import { Circle, XStack, YStack, styled } from "tamagui";

import { Typography } from "@/components/ui/typography";
import { tileBorderWidths } from "@/theme/tokens";

import { splashLayoutTokens, splashMotionTokens } from "../constants/splash-tokens";

import { splashFrame } from "../constants/splash-frame";
import type { SplashMotionFactory } from "../hooks/use-splash-animation";

const SplashImage = styled(ReactNativeImage, {
  name: "SplashImage"
});

const splashAssets = {
  glow: require("../../../../assets/splash-glow-contents.png")
} as const;

type SavedTile = (typeof splashFrame.tiles)[number];

function GlowField() {
  return (
    <XStack left={splashFrame.glow.left} position="absolute" top={splashFrame.glow.top}>
      <SplashImage
        accessibilityIgnoresInvertColors
        accessible={false}
        height={splashLayoutTokens.glowSize}
        resizeMode="contain"
        source={splashAssets.glow}
        width={splashLayoutTokens.glowSize}
      />
    </XStack>
  );
}

function SavedItemTile({
  accent,
  height,
  label,
  metaLine,
  textLine,
  width,
  x,
  y
}: Omit<SavedTile, "enterX" | "enterY" | "gatherRotation" | "gatherX" | "gatherY">) {
  return (
    <YStack
      backgroundColor="$splashTileBg"
      borderColor="$splashTileBorder"
      borderWidth={tileBorderWidths.card}
      gap="$2"
      height={height}
      left={x}
      overflow="hidden"
      p="$4"
      position="absolute"
      rounded="$md"
      top={y}
      width={width}
    >
      <XStack gap="$3" items="center">
        <Circle backgroundColor={accent} height={splashFrame.scatteredTile.icon} width={splashFrame.scatteredTile.icon} />
        <XStack backgroundColor="$splashTileLine" height={splashFrame.scatteredTile.lineHeight} rounded="$xl" width={textLine} />
      </XStack>
      <Typography color="$splashTileText" variant="buttonSmall">
        {label}
      </Typography>
      <XStack backgroundColor="$splashTileMetaLine" height={splashFrame.scatteredTile.metaHeight} rounded="$xl" width={metaLine} />
    </YStack>
  );
}

export function AmbientGlow({
  easeSoft,
  motion
}: {
  easeSoft: ReturnType<typeof Easing.bezier>;
  motion: SplashMotionFactory;
}) {
  return (
    <MotiView
      {...motion({
        animate: { opacity: 0.3, scale: 1.02 },
        duration: splashMotionTokens.glowDuration,
        easing: easeSoft,
        from: { opacity: 0, scale: 0.94 }
      })}
    >
      <GlowField />
    </MotiView>
  );
}

export function FloatingParticles({
  easeSoft,
  motion
}: {
  easeSoft: ReturnType<typeof Easing.bezier>;
  motion: SplashMotionFactory;
}) {
  return (
    <>
      {splashFrame.particles.map((particle) => (
        <MotiView
          key={`${particle.x}-${particle.y}`}
          {...motion({
            animate: { opacity: 0, scale: 1, translateY: -18 },
            delay: particle.delay,
            duration: 1100,
            easing: easeSoft,
            from: { opacity: 0, scale: 0.5, translateY: 14 }
          })}
        >
          <Circle
            backgroundColor={particle.color}
            height={particle.size}
            left={particle.x}
            opacity={0.8}
            position="absolute"
            top={particle.y}
            width={particle.size}
          />
        </MotiView>
      ))}
    </>
  );
}

export function SavedTiles({
  easeSoft,
  motion
}: {
  easeSoft: ReturnType<typeof Easing.bezier>;
  motion: SplashMotionFactory;
}) {
  return (
    <>
      {splashFrame.tiles.map((tile, index) => (
        <MotiView
          key={tile.label}
          {...motion({
            animate: {
              rotate: `${tile.gatherRotation}deg`,
              scale: 0.6,
              translateX: tile.gatherX,
              translateY: tile.gatherY
            },
            delay: splashMotionTokens.tileGatherStart + index * 20,
            duration: splashMotionTokens.tileGatherDuration,
            easing: easeSoft,
            from: {
              rotate: "0deg",
              scale: 1,
              translateX: 0,
              translateY: 0
            }
          })}
        >
          <MotiView
            {...motion({
              animate: { opacity: 0 },
              delay: splashMotionTokens.tileGatherStart + index * 20 + splashMotionTokens.tileFadeDelay,
              duration: splashMotionTokens.tileFadeDuration,
              easing: easeSoft,
              from: { opacity: 1 }
            })}
          >
            <MotiView
              {...motion({
                animate: { opacity: 1, scale: 1, translateX: 0, translateY: 0 },
                delay: splashMotionTokens.tileEnterStart + index * 80,
                duration: splashMotionTokens.tileEnterDuration,
                easing: easeSoft,
                from: { opacity: 0, scale: 0.82, translateX: tile.enterX, translateY: tile.enterY }
              })}
            >
              <SavedItemTile {...tile} />
            </MotiView>
          </MotiView>
        </MotiView>
      ))}
    </>
  );
}

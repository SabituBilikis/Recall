import type { ColorTokens } from "tamagui";
import { Circle, XStack, YStack } from "tamagui";

import { BreathingLayer, FloatingLayer } from "@/components/ui/motion";
import { Typography } from "@/components/ui/typography";
import { useReducedMotionFlag } from "@/hooks/use-reduced-motion-flag";
import { nativeShadowTokens, tileBorderWidths } from "@/theme/tokens";

import { onboardingLoopTokens, organizeCollections, organizeIllustrationTokens } from "../constants/onboarding-tokens";

import { AnimatedIllustration } from "./animated-illustration";

const tokens = organizeIllustrationTokens;

type Collection = {
  folderHeight: number;
  folderLabel: string;
  folderWidth: number;
  left: number;
  pillDot: ColorTokens;
  pillLabel: string;
  surface: ColorTokens;
  tabLeft: number;
  tabWidth: number;
  top: number;
};

// Mirrors the Figma "Organize" illustration (node 6521:288): a tag pill stacked
// above a folder (tab + body + label) for each collection.
const collections: Collection[] = [
  {
    ...organizeCollections.research,
    folderLabel: "Research",
    pillDot: "$onboardingAccentDot",
    pillLabel: "screenshots",
    surface: "$onboardingCollectionLavender"
  },
  {
    ...organizeCollections.ideas,
    folderLabel: "Ideas",
    pillDot: "$onboardingTagInfoDot",
    pillLabel: "Links",
    surface: "$onboardingCollectionBlue"
  },
  {
    ...organizeCollections.references,
    folderLabel: "Design references",
    pillDot: "$onboardingTagWarningDot",
    pillLabel: "notes",
    surface: "$onboardingCollectionWhite"
  }
];

function TagPill({ disabled, dot, label }: { disabled: boolean; dot: ColorTokens; label: string }) {
  return (
    <YStack left={0} position="absolute" top={0}>
      <BreathingLayer
        disabled={disabled}
        duration={onboardingLoopTokens.breatheDuration}
        easing={onboardingLoopTokens.easingInOut}
        opacityHigh={onboardingLoopTokens.breatheOpacityHigh}
        opacityLow={onboardingLoopTokens.breatheOpacityLow}
        scaleTo={onboardingLoopTokens.breatheScaleTo}
      >
        <XStack
          {...nativeShadowTokens[800]}
          backgroundColor="$onboardingCardSurface"
          gap={tokens.pillGap}
          height={tokens.pillHeight}
          items="center"
          px={tokens.pillPaddingX}
          rounded={tokens.pillRadius}
        >
          <Circle backgroundColor={dot} height={tokens.pillDotSize} width={tokens.pillDotSize} />
          <Typography color="$onboardingTextSecondary" variant="caption3">
            {label}
          </Typography>
        </XStack>
      </BreathingLayer>
    </YStack>
  );
}

function CollectionGroup({ collection, disabled }: { collection: Collection; disabled: boolean }) {
  const groupHeight = tokens.folderTopOffset + tokens.bodyTopOffset + collection.folderHeight;

  return (
    <YStack height={groupHeight} position="relative" width={collection.folderWidth}>
      <TagPill disabled={disabled} dot={collection.pillDot} label={collection.pillLabel} />
      <YStack left={0} position="absolute" top={tokens.folderTopOffset}>
        <YStack
          backgroundColor={collection.surface}
          height={tokens.tabHeight}
          left={collection.tabLeft}
          position="absolute"
          rounded={tokens.tabRadius}
          top={0}
          width={collection.tabWidth}
        />
        <YStack
          {...nativeShadowTokens[700]}
          backgroundColor={collection.surface}
          borderColor="$onboardingTileSoftSurface"
          borderWidth={tileBorderWidths.card}
          height={collection.folderHeight}
          position="relative"
          rounded={tokens.bodyRadius}
          top={tokens.bodyTopOffset}
          width={collection.folderWidth}
        >
          <Typography
            color="$onboardingTextPrimary"
            left={tokens.labelLeft}
            position="absolute"
            top={tokens.labelTop}
            variant="body4"
          >
            {collection.folderLabel}
          </Typography>
        </YStack>
      </YStack>
    </YStack>
  );
}

export function OrganizeIllustration() {
  const reduceMotion = useReducedMotionFlag();
  const stagger = onboardingLoopTokens.layerStagger;

  return (
    <AnimatedIllustration>
      <YStack height={tokens.height} position="relative" width={tokens.width}>
        {collections.map((collection, index) => (
          <YStack key={collection.folderLabel} left={collection.left} position="absolute" top={collection.top}>
            <FloatingLayer
              amplitude={onboardingLoopTokens.floatAmplitude}
              delay={index * stagger}
              disabled={reduceMotion}
              duration={onboardingLoopTokens.floatDuration}
              easing={onboardingLoopTokens.easingInOut}
              rotate={index % 2 === 0 ? onboardingLoopTokens.floatRotate : -onboardingLoopTokens.floatRotate}
            >
              <CollectionGroup collection={collection} disabled={reduceMotion} />
            </FloatingLayer>
          </YStack>
        ))}
      </YStack>
    </AnimatedIllustration>
  );
}

import { styled, XStack, YStack } from "tamagui";

export const AppStack = styled(YStack, {
  name: "AppStack",
  variants: {
    tone: {
      inverse: { bg: "$surfaceInverse" },
      muted: { bg: "$surfaceMuted" },
      primary: { bg: "$surfacePrimary" },
      subtle: { bg: "$surfaceSubtle" },
      transparent: { bg: "transparent" }
    }
  } as const,
  defaultVariants: {
    tone: "transparent"
  }
});

export const AppRow = styled(XStack, {
  items: "center",
  name: "AppRow",
  variants: {
    tone: {
      inverse: { bg: "$surfaceInverse" },
      muted: { bg: "$surfaceMuted" },
      primary: { bg: "$surfacePrimary" },
      subtle: { bg: "$surfaceSubtle" },
      transparent: { bg: "transparent" }
    }
  } as const,
  defaultVariants: {
    tone: "transparent"
  }
});

export const Surface = styled(YStack, {
  bg: "$surfacePrimary",
  name: "Surface",
  rounded: "$sm",
  variants: {
    emphasis: {
      muted: {
        bg: "$surfaceMuted"
      },
      primary: {
        bg: "$surfacePrimary"
      },
      subtle: {
        bg: "$surfaceSubtle"
      }
    }
  } as const,
  defaultVariants: {
    emphasis: "primary"
  }
});

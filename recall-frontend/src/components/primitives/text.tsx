import { styled, Text } from "tamagui";

import { typography, type TextVariant } from "@/theme/tokens";

export const typographyVariantStyles = {
  body1: typography.body1,
  body2: typography.body2,
  body3: typography.body3,
  body4: typography.body4,
  buttonGiant: typography.buttonGiant,
  buttonLarge: typography.buttonLarge,
  buttonMedium: typography.buttonMedium,
  buttonSmall: typography.buttonSmall,
  buttonTiny: typography.buttonTiny,
  caption1: typography.caption1,
  caption2: typography.caption2,
  caption3: typography.caption3,
  splashMiniLabel: typography.splashMiniLabel,
  h1: typography.h1,
  h2: typography.h2,
  h3: typography.h3,
  h4: typography.h4,
  h5: typography.h5,
  label: typography.label,
  subtitle1: typography.subtitle1,
  subtitle2: typography.subtitle2
} as const;

export type TypographyVariant = TextVariant;

export const Typography = styled(Text, {
  color: "$textPrimary",
  fontFamily: "$body",
  name: "Typography",
  selectable: true,
  variants: {
    tone: {
      accent: { color: "$textAccent" },
      danger: { color: "$danger" },
      inverse: { color: "$textInverse" },
      primary: { color: "$textPrimary" },
      secondary: { color: "$textSecondary" },
      tertiary: { color: "$textTertiary" }
    },
    variant: typographyVariantStyles
  } as const,
  defaultVariants: {
    tone: "primary",
    variant: "body1"
  }
});

export const AppText = Typography;

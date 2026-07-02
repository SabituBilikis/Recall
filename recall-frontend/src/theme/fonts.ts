import { createFont } from "tamagui";

import { typography } from "./tokens/typography";

const fontSizes = {
  1: typography.caption3.fontSize,
  2: typography.caption1.fontSize,
  3: typography.body3.fontSize,
  4: typography.body1.fontSize,
  5: typography.subtitle1.fontSize,
  6: typography.h5.fontSize,
  7: typography.h4.fontSize,
  8: typography.h3.fontSize,
  9: typography.h2.fontSize,
  10: typography.h1.fontSize,
  true: typography.body1.fontSize
} as const;

const lineHeights = {
  1: typography.caption3.lineHeight,
  2: typography.caption1.lineHeight,
  3: typography.body3.lineHeight,
  4: typography.body1.lineHeight,
  5: typography.subtitle1.lineHeight,
  6: typography.h5.lineHeight,
  7: typography.h4.lineHeight,
  8: typography.h3.lineHeight,
  9: typography.h2.lineHeight,
  10: typography.h1.lineHeight,
  true: typography.body1.lineHeight
} as const;

const letterSpacing = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  true: 0
} as const;

const fontFace = {
  400: { normal: "PlusJakartaSans_400Regular" },
  500: { normal: "PlusJakartaSans_500Medium" },
  600: { normal: "PlusJakartaSans_600SemiBold" },
  700: { normal: "PlusJakartaSans_700Bold" }
} as const;

export const bodyFont = createFont({
  family: "PlusJakartaSans_400Regular",
  face: fontFace,
  letterSpacing,
  lineHeight: lineHeights,
  size: fontSizes,
  weight: {
    1: "400",
    2: "400",
    3: "400",
    4: "400",
    5: "600",
    6: "600",
    7: "600",
    8: "600",
    9: "600",
    10: "700",
    true: "400"
  }
});

export const headingFont = createFont({
  ...bodyFont,
  family: "PlusJakartaSans_400Regular",
  weight: {
    ...bodyFont.weight,
    true: "600"
  }
});

export const fonts = {
  body: bodyFont,
  heading: headingFont
};

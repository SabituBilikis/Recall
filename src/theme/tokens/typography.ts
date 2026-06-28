export const typography = {
  h1: { fontSize: 48, fontWeight: "700", lineHeight: 58, letterSpacing: 0 },
  h2: { fontSize: 40, fontWeight: "600", lineHeight: 48, letterSpacing: 0 },
  h3: { fontSize: 32, fontWeight: "600", lineHeight: 38, letterSpacing: 0 },
  h4: { fontSize: 28, fontWeight: "600", lineHeight: 34, letterSpacing: 0 },
  h5: { fontSize: 24, fontWeight: "600", lineHeight: 28, letterSpacing: 0 },
  subtitle1: { fontSize: 18, fontWeight: "600", lineHeight: 28, letterSpacing: 0 },
  subtitle2: { fontSize: 16, fontWeight: "600", lineHeight: 24, letterSpacing: 0 },
  body1: { fontSize: 16, fontWeight: "400", lineHeight: 24, letterSpacing: 0 },
  body2: { fontSize: 16, fontWeight: "500", lineHeight: 24, letterSpacing: 0 },
  body3: { fontSize: 14, fontWeight: "400", lineHeight: 20, letterSpacing: 0 },
  body4: { fontSize: 14, fontWeight: "500", lineHeight: 20, letterSpacing: 0 },
  caption1: { fontSize: 12, fontWeight: "400", lineHeight: 16, letterSpacing: 0 },
  caption2: { fontSize: 12, fontWeight: "500", lineHeight: 16, letterSpacing: 0 },
  caption3: { fontSize: 10, fontWeight: "500", lineHeight: 14, letterSpacing: 0 },
  splashMiniLabel: { fontSize: 9, fontWeight: "600", lineHeight: 12, letterSpacing: 0 },
  label: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0,
    textTransform: "uppercase"
  },
  buttonGiant: { fontSize: 18, fontWeight: "600", lineHeight: 24, letterSpacing: 0 },
  buttonLarge: { fontSize: 16, fontWeight: "600", lineHeight: 20, letterSpacing: 0 },
  buttonMedium: { fontSize: 14, fontWeight: "600", lineHeight: 16, letterSpacing: 0 },
  buttonSmall: { fontSize: 12, fontWeight: "600", lineHeight: 16, letterSpacing: 0 },
  buttonTiny: { fontSize: 10, fontWeight: "600", lineHeight: 12, letterSpacing: 0 }
} as const;

export type TextVariant = keyof typeof typography;

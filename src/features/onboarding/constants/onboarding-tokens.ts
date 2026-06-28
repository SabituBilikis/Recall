export const onboardingLayoutTokens = {
  actionWidth: 360,
  canvasHeight: 852,
  canvasWidth: 393,
  contentLeft: 17,
  contentWidth: 360,
  progressDotGap: 8,
  progressDotSize: 8,
  progressPillWidth: 24,
  progressRadius: 24,
  scrollEventThrottle: 16,
  skipRight: 48,
  skipTop: 48,
  skipZIndex: 1,
  subtitleWidth: 349,
  textGap: 8,
  textToProgressGap: 32,
  topGlowLeft: -84,
  topGlowOpacity: 0.42,
  topGlowSize: 280,
  topGlowTop: -42
} as const;

export const onboardingSlideLayoutTokens = {
  organizeContentTop: 158,
  saveContentTop: 128,
  searchContentTop: 240,
  illustrationToTextGap: 72,
  textBlockToButtonGap: 56
} as const;

export const onboardingMotionTokens = {
  carouselSnapDuration: 520,
  dotDuration: 220,
  enterDuration: 620,
  enterStagger: 90,
  enterTranslateY: 10,
  easingNatural: [0.16, 1, 0.3, 1],
  hiddenOpacity: 0,
  inactiveDotOpacity: 1,
  pressScale: 0.98
} as const;

// Looping ambient motion shared by the onboarding illustrations. Closed-cycle
// keyframes (value returns to its start) so loops repeat seamlessly. Tiny
// amplitudes + slow durations keep the motion calm and premium (no bounce).
export const onboardingLoopTokens = {
  breatheScaleFrom: 1,
  breatheScaleTo: 1.06,
  breatheOpacityLow: 0.7,
  breatheOpacityHigh: 1,
  breatheDuration: 2800,
  floatAmplitude: 10,
  floatDuration: 2600,
  floatRotate: 2,
  pulseScaleFrom: 1,
  pulseScaleTo: 1.3,
  pulseOpacityLow: 0.25,
  pulseOpacityHigh: 0.72,
  pulseDuration: 2200,
  shimmerOpacityLow: 0.4,
  shimmerOpacityHigh: 1,
  shimmerDuration: 2000,
  layerStagger: 280,
  easingInOut: [0.42, 0, 0.58, 1]
} as const;

export const saveEverythingIllustrationTokens = {
  assetHeight: 382,
  assetLeft: -57,
  assetTop: -52,
  assetWidth: 390,
  cardDotLeft: 55,
  cardDotSize: 24,
  cardDotTop: 15,
  cardLineHeight: 7,
  cardLineLeft: 14,
  cardLinePrimaryTop: 19,
  cardLinePrimaryWidth: 48,
  cardLineSecondaryTop: 42,
  cardLineSecondaryWidth: 34,
  cardLineTertiaryTop: 58,
  cardLineTertiaryWidth: 44,
  centerIconLeft: 91,
  centerIconSize: 96,
  centerIconTop: 90,
  centerDotSize: 32,
  centerHaloSize: 110,
  centerHaloOpacity: 0.55,
  tileContentPadding: 16,
  tileHeaderGap: 12,
  tileRowGap: 9,
  glowLeft: 19,
  glowOpacity: 0.26,
  glowSize: 238,
  glowTop: 54,
  height: 292,
  memoryBackOpacity: 0.72,
  memoryMutedLineOpacity: 0.72,
  width: 276
} as const;

export const saveItemTileTokens = {
  large: {
    height: 96,
    iconSize: 20,
    labelWidth: 84,
    lineHeight: 7,
    metaWidth: 84,
    padding: 16,
    radius: 16,
    titleWidth: 64,
    width: 127
  },
  small: {
    height: 86,
    iconSize: 18,
    labelWidth: 76,
    lineHeight: 6,
    metaWidth: 76,
    padding: 14,
    radius: 14,
    titleWidth: 58,
    width: 114
  }
} as const;

export const saveEverythingTilePositions = {
  file: { left: 152, top: 183 },
  link: { left: 162, top: 28 },
  note: { left: 9, top: 183 },
  screenshot: { left: 0, top: 0 }
} as const;

// Geometry mirrors the Figma "Organize" illustration (node 6521:288): each
// collection is a tag pill stacked above a folder (tab + body + label).
export const organizeIllustrationTokens = {
  width: 230,
  height: 286,
  pillHeight: 26,
  pillDotSize: 10,
  pillGap: 6,
  pillPaddingX: 10,
  pillRadius: 24,
  pillTextWidth: 60,
  folderTopOffset: 34,
  bodyTopOffset: 13,
  tabHeight: 21,
  tabRadius: 10,
  bodyRadius: 19,
  labelLeft: 11,
  labelTop: 18
} as const;

export const organizeCollections = {
  research: { left: 1, top: 0, folderWidth: 106, folderHeight: 94, tabWidth: 58, tabLeft: 10 },
  ideas: { left: 124, top: 55, folderWidth: 106, folderHeight: 94, tabWidth: 58, tabLeft: 10 },
  references: { left: 0, top: 168, folderWidth: 225, folderHeight: 70, tabWidth: 58, tabLeft: 6 }
} as const;

export const searchIllustrationTokens = {
  cardHeight: 242,
  cardRadius: 32,
  cardWidth: 282,
  focusDotSize: 24,
  focusRingLeft: 198,
  focusRingOpacity: 0.56,
  focusRingSize: 72,
  focusRingTop: 103,
  headerIconSize: 16,
  headerLineHeight: 8,
  primaryLineWidth: 128,
  primaryTileHeight: 48,
  primaryTileLeft: 27,
  primaryTilePadding: 16,
  primaryTileRadius: 32,
  primaryTileTop: 26,
  primaryTileWidth: 228,
  resultTileHeight: 78,
  resultTileLeft: 27,
  resultMetaLineHeight: 7,
  resultMetaLineWidth: 181,
  resultTitleLineWidth: 148,
  resultTilePadding: 16,
  resultTileRadius: 16,
  resultTileTop: 121,
  resultTileWidth: 220
} as const;

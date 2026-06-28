export const getStartedLayoutTokens = {
  actionGap: 32,
  actionWidth: 360,
  actionsTopGap: 56,
  canvasHeight: 852,
  canvasWidth: 393,
  contentTop: 172,
  contentWidth: 360,
  heroHeight: 248,
  heroRadius: 32,
  heroWidth: 282,
  illustrationGap: 72,
  screenHorizontalInset: 17,
  subtitleWidth: 349,
  titleGap: 8,
  topGlowSize: 280
} as const;

export const getStartedIllustrationTokens = {
  capsuleHeight: 165,
  capsuleLeft: 27,
  capsuleTop: 39,
  capsuleWidth: 54,
  centerGlowHeight: 205,
  centerGlowLeft: 62,
  centerGlowTop: 22,
  centerGlowWidth: 205,
  dotGap: 24,
  dotSize: 12,
  railDotAnimationDuration: 1800,
  railDotAnimationStagger: 170,
  miniTileGap: 7,
  miniTileHeight: 56,
  miniTileIconSize: 16,
  miniTileLineHeight: 6,
  miniTileMetaLineHeight: 6,
  miniTileMetaLineWidth: 68,
  miniTilePadding: 13,
  miniTileRadius: 13,
  miniTileLeft: 120,
  miniTileTextLineWidth: 52,
  miniTileEnterDuration: 720,
  miniTileEntranceBezier: [0.16, 1, 0.3, 1],
  miniTileOpacityEnterDuration: 180,
  miniTileEnterStagger: 140,
  miniTileWidth: 103,
  readyGlowCoreSize: 38,
  readyGlowSize: 88,
  readyGlowVisibleSize: 52
} as const;

// Looping ambient motion for the Get Started illustration. Mirrors the tuned
// onboarding values — closed-cycle keyframes, calm amplitudes, no bounce.
export const getStartedLoopTokens = {
  floatAmplitude: 8,
  floatRotate: 2,
  floatDuration: 2600,
  breatheScaleTo: 1.06,
  breatheOpacityLow: 0.7,
  breatheOpacityHigh: 1,
  breatheDuration: 2800,
  layerStagger: 280,
  easingInOut: [0.42, 0, 0.58, 1]
} as const;

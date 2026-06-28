import { splashLayoutTokens } from "./splash-tokens";

export const splashFrame = {
  brand: {
    height: 102,
    left: 97,
    subtitleMarginTop: 8,
    top: splashLayoutTokens.finalTextTop,
    width: 199
  },
  loadingDots: {
    bottom: 108,
    gap: 10,
    size: 8,
    width: 44
  },
  card: {
    back: {
      height: 104,
      left: 153,
      top: 290,
      width: 144
    },
    content: {
      lineOneLeft: 17.25,
      lineOneTop: 16.5,
      lineTwoLeft: 17.25,
      lineTwoTop: 39,
      lineThreeLeft: 17.25,
      lineThreeTop: 69.75
    },
    front: {
      height: splashLayoutTokens.finalCardHeight,
      left: 126,
      top: 322,
      width: splashLayoutTokens.finalCardWidth
    },
    line: {
      primaryHeight: 7.5,
      primaryWidth: 88.5,
      secondaryHeight: 7.5,
      secondaryWidth: 48,
      tertiaryHeight: 7.5,
      tertiaryWidth: 63
    },
    middle: {
      height: 104,
      left: 139,
      top: 302,
      width: 144
    },
    pulse: {
      offset: -8,
      borderWidth: 2,
      size: splashLayoutTokens.pulseSize
    },
    radius: 18,
    searchDot: {
      innerOpacity: 0.42,
      innerSize: 14,
      outerOpacity: 0.9,
      outerSize: 24,
      x: 115.5,
      y: 8.25
    },
    stackFrom: {
      back: {
        scale: 0.94,
        translateY: 18
      },
      front: {
        scale: 0.88,
        translateY: 26
      },
      middle: {
        scale: 0.91,
        translateY: 22
      }
    }
  },
  glow: {
    left: 53,
    top: 352
  },
  particles: [
    { color: "$splashSearchDot", delay: 60, size: 6, x: 176, y: 348 },
    { color: "$splashGlowCore", delay: 180, size: 5, x: 215, y: 390 },
    { color: "$splashSearchDot", delay: 280, size: 4, x: 195, y: 420 }
  ],
  scatteredTile: {
    icon: 20,
    lineHeight: 7,
    metaHeight: 7,
    textLine: 56
  },
  tiles: [
    {
      accent: "$splashSearchDot",
      enterX: -34,
      enterY: 44,
      gatherRotation: -6,
      gatherX: 54,
      gatherY: 98,
      height: 84,
      label: "screenshot",
      metaLine: 74,
      textLine: 56,
      width: 128,
      x: 53,
      y: 206
    },
    {
      accent: "$splashGlowCore",
      enterX: 30,
      enterY: 22,
      gatherRotation: 5,
      gatherX: -48,
      gatherY: 88,
      height: 80,
      label: "Link",
      metaLine: 62,
      textLine: 48,
      width: 116,
      x: 223,
      y: 226
    },
    {
      accent: "$splashGlow",
      enterX: -20,
      enterY: -34,
      gatherRotation: 1,
      gatherX: 18,
      gatherY: -10,
      height: 86,
      label: "File",
      metaLine: 72,
      textLine: 56,
      width: 132,
      x: 132,
      y: 344
    },
    {
      accent: "$splashCardFront",
      enterX: 34,
      enterY: -22,
      gatherRotation: -4,
      gatherX: -44,
      gatherY: -80,
      height: 82,
      label: "Note",
      metaLine: 68,
      textLine: 48,
      width: 122,
      x: 74,
      y: 458
    },
    {
      accent: "$splashSearchDot",
      enterX: 0,
      enterY: 48,
      gatherRotation: 6,
      gatherX: 42,
      gatherY: -92,
      height: 78,
      label: "PDF",
      metaLine: 58,
      textLine: 42,
      width: 108,
      x: 228,
      y: 486
    }
  ]
} as const;

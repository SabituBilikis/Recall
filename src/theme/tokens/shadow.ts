import { colorValues } from "./color";

type ShadowLayer = {
  color: string;
  offset: { height: number; width: number };
  opacity: number;
  radius: number;
  spread: number;
};

export const shadowTokens = {
  100: [
    { color: colorValues.grey900, offset: { height: 4, width: 0 }, opacity: 0.08, radius: 4, spread: -2 },
    { color: colorValues.grey900, offset: { height: 2, width: 0 }, opacity: 0.12, radius: 4, spread: -2 }
  ],
  200: [
    { color: colorValues.grey900, offset: { height: 8, width: 0 }, opacity: 0.08, radius: 8, spread: -4 },
    { color: colorValues.grey900, offset: { height: 4, width: 0 }, opacity: 0.12, radius: 6, spread: -4 }
  ],
  300: [
    { color: colorValues.grey900, offset: { height: 8, width: 0 }, opacity: 0.08, radius: 16, spread: -6 },
    { color: colorValues.grey900, offset: { height: 6, width: 0 }, opacity: 0.12, radius: 8, spread: -6 }
  ],
  400: [
    { color: colorValues.grey900, offset: { height: 8, width: 0 }, opacity: 0.08, radius: 24, spread: -4 },
    { color: colorValues.grey900, offset: { height: 6, width: 0 }, opacity: 0.12, radius: 12, spread: -6 }
  ],
  500: [
    { color: colorValues.grey900, offset: { height: 10, width: 0 }, opacity: 0.1, radius: 32, spread: -4 },
    { color: colorValues.grey900, offset: { height: 6, width: 0 }, opacity: 0.12, radius: 14, spread: -6 }
  ],
  600: [
    { color: colorValues.grey900, offset: { height: 12, width: 0 }, opacity: 0.12, radius: 42, spread: -4 },
    { color: colorValues.grey900, offset: { height: 8, width: 0 }, opacity: 0.12, radius: 18, spread: -6 }
  ],
  700: [
    { color: colorValues.grey900, offset: { height: 14, width: 0 }, opacity: 0.12, radius: 64, spread: -4 },
    { color: colorValues.grey900, offset: { height: 8, width: 0 }, opacity: 0.12, radius: 22, spread: -6 }
  ],
  800: [
    { color: colorValues.grey900, offset: { height: 18, width: 0 }, opacity: 0.14, radius: 88, spread: -4 },
    { color: colorValues.grey900, offset: { height: 8, width: 0 }, opacity: 0.12, radius: 28, spread: -6 }
  ]
} as const satisfies Record<number, readonly ShadowLayer[]>;

export const nativeShadowTokens = {
  100: { elevation: 2, shadowColor: colorValues.grey900, shadowOffset: { height: 2, width: 0 }, shadowOpacity: 0.12, shadowRadius: 4 },
  200: { elevation: 3, shadowColor: colorValues.grey900, shadowOffset: { height: 4, width: 0 }, shadowOpacity: 0.12, shadowRadius: 6 },
  300: { elevation: 4, shadowColor: colorValues.grey900, shadowOffset: { height: 6, width: 0 }, shadowOpacity: 0.12, shadowRadius: 8 },
  400: { elevation: 5, shadowColor: colorValues.grey900, shadowOffset: { height: 6, width: 0 }, shadowOpacity: 0.12, shadowRadius: 12 },
  500: { elevation: 6, shadowColor: colorValues.grey900, shadowOffset: { height: 6, width: 0 }, shadowOpacity: 0.12, shadowRadius: 14 },
  600: { elevation: 8, shadowColor: colorValues.grey900, shadowOffset: { height: 8, width: 0 }, shadowOpacity: 0.12, shadowRadius: 18 },
  700: { elevation: 10, shadowColor: colorValues.grey900, shadowOffset: { height: 8, width: 0 }, shadowOpacity: 0.12, shadowRadius: 22 },
  800: { elevation: 12, shadowColor: colorValues.grey900, shadowOffset: { height: 8, width: 0 }, shadowOpacity: 0.12, shadowRadius: 28 }
} as const;

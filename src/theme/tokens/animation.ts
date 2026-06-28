export const animationTokens = {
  durationFast: 120,
  durationBase: 180,
  durationSlow: 240,
  easingStandard: "cubic-bezier(0.2, 0, 0, 1)",
  easingEmphasized: "cubic-bezier(0.2, 0, 0, 1.08)",
  springGentle: {
    damping: 18,
    mass: 1,
    stiffness: 180
  }
} as const;

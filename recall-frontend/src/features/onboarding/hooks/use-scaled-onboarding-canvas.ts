import { useScaledCanvas } from "@/hooks/use-scaled-canvas";

import { onboardingLayoutTokens } from "../constants/onboarding-tokens";

export function useScaledOnboardingCanvas() {
  return useScaledCanvas(onboardingLayoutTokens.canvasWidth, onboardingLayoutTokens.canvasHeight);
}

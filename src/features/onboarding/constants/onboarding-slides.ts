import type { ReactNode } from "react";

export type OnboardingSlideId = "save" | "organize" | "search";

export type OnboardingSlide = {
  body: string;
  cta: "Next" | "Sign Up";
  id: OnboardingSlideId;
  title: string;
};

export const onboardingSlides = [
  {
    body: "Capture screenshots, links, notes, files, and ideas without scattering them across different apps.",
    cta: "Next",
    id: "save",
    title: "Save everything in one place"
  },
  {
    body: "Group saved items into collections and tags so everything stays easy to manage.",
    cta: "Next",
    id: "organize",
    title: "Organize your digital memory"
  },
  {
    body: "Search by title, tag, collection, file name, or saved type.",
    cta: "Sign Up",
    id: "search",
    title: "Find anything instantly"
  }
] as const satisfies readonly OnboardingSlide[];

export type OnboardingIllustrationMap = Record<OnboardingSlideId, ReactNode>;

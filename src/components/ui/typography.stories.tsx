import type { Meta, StoryObj } from "@storybook/react-native";

import { AppStack } from "@/components/primitives";

import { Typography, type TypographyVariant } from "./typography";

const textFontVariants: readonly TypographyVariant[] = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "subtitle1",
  "subtitle2",
  "body1",
  "body2",
  "body3",
  "body4",
  "caption1",
  "caption2",
  "caption3",
  "splashMiniLabel",
  "label"
];

const buttonFontVariants: readonly TypographyVariant[] = [
  "buttonGiant",
  "buttonLarge",
  "buttonMedium",
  "buttonSmall",
  "buttonTiny"
];

const variantLabels: Record<TypographyVariant, string> = {
  body1: "B1. Body",
  body2: "B2. Body",
  body3: "B3. Body",
  body4: "B4. Body",
  buttonGiant: "Giant",
  buttonLarge: "Large",
  buttonMedium: "Medium",
  buttonSmall: "Small",
  buttonTiny: "Tiny",
  caption1: "C1. Caption",
  caption2: "C2. Caption",
  caption3: "C3. Caption",
  splashMiniLabel: "Splash Mini Label",
  h1: "H1. Headline",
  h2: "H2. Headline",
  h3: "H3. Headline",
  h4: "H4. Headline",
  h5: "H5. Headline",
  label: "Label",
  subtitle1: "S1. Subtitle",
  subtitle2: "S2. Subtitle"
};

const meta = {
  title: "UI/Typography",
  component: Typography,
  args: {
    children: "Recall typography",
    tone: "primary",
    variant: "body1"
  }
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const TextFontRamp: Story = {
  render: () => (
    <AppStack gap="$6">
      <Typography variant="h5">Text Font</Typography>
      <AppStack gap="$4">
        {textFontVariants.map((variant) => (
          <Typography key={variant} variant={variant}>
            {variantLabels[variant]}
          </Typography>
        ))}
      </AppStack>
    </AppStack>
  )
};

export const ButtonFontRamp: Story = {
  render: () => (
    <AppStack gap="$6">
      <Typography variant="h5">Button Font</Typography>
      <AppStack gap="$4">
        {buttonFontVariants.map((variant) => (
          <Typography key={variant} variant={variant}>
            {variantLabels[variant]}
          </Typography>
        ))}
      </AppStack>
    </AppStack>
  )
};

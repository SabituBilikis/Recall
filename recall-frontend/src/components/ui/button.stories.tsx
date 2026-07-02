import type { Meta, StoryObj } from "@storybook/react-native";

import { AppRow, AppStack } from "@/components/primitives";
import type { ButtonAppearance, ButtonSize } from "@/theme/tokens";

import { Button } from "./button";
import { Typography } from "./typography";

const appearances: readonly ButtonAppearance[] = ["filled", "outline", "clear"];
const sizes: readonly ButtonSize[] = ["giant", "large", "medium", "small", "tiny"];

const meta = {
  title: "UI/Button",
  component: Button,
  args: {
    appearance: "filled",
    children: "Button",
    size: "medium"
  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <AppStack gap="$4">
      {sizes.map((size) => (
        <AppRow gap="$4" key={size}>
          <Typography tone="secondary" variant="caption2">
            {size}
          </Typography>
          <Button size={size}>Button</Button>
        </AppRow>
      ))}
    </AppStack>
  )
};

export const Appearances: Story = {
  render: () => (
    <AppStack gap="$4">
      {appearances.map((appearance) => (
        <AppRow gap="$4" key={appearance}>
          <Typography tone="secondary" variant="caption2">
            {appearance}
          </Typography>
          <Button appearance={appearance}>Button</Button>
        </AppRow>
      ))}
    </AppStack>
  )
};

export const Disabled: Story = {
  render: () => (
    <AppRow gap="$4">
      {appearances.map((appearance) => (
        <Button appearance={appearance} disabled key={appearance}>
          Button
        </Button>
      ))}
    </AppRow>
  )
};

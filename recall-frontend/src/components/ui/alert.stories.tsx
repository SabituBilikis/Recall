import type { Meta, StoryObj } from "@storybook/react-native";
import { XStack, YStack } from "tamagui";

import type { AlertIconRenderProps } from "./alert";
import { Alert } from "./alert";
import type { TypographyVariant } from "./typography";
import { Typography } from "./typography";

const states = ["default", "success", "info", "warning", "error"] as const;

function StarIcon({ color }: AlertIconRenderProps) {
  const variant: TypographyVariant = "buttonLarge";

  return (
    <Typography color={color} text="center" variant={variant}>
      *
    </Typography>
  );
}

const meta = {
  args: {
    icon: StarIcon,
    primaryAction: { children: "Button" },
    secondaryAction: { children: "Button" }
  },
  component: Alert,
  title: "UI/Alert"
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const Outline: Story = {
  args: {
    appearance: "outline"
  }
};

export const WithoutActions: Story = {
  args: {
    primaryAction: undefined,
    secondaryAction: undefined
  }
};

export const StateMatrix: Story = {
  render: () => (
    <XStack flexWrap="wrap" gap="$6">
      <YStack gap="$4">
        {states.map((status) => (
          <Alert icon={StarIcon} key={`filled-${status}`} primaryAction={{ children: "Button" }} secondaryAction={{ children: "Button" }} status={status} />
        ))}
      </YStack>
      <YStack gap="$4">
        {states.map((status) => (
          <Alert
            appearance="outline"
            icon={StarIcon}
            key={`outline-${status}`}
            primaryAction={{ children: "Button" }}
            secondaryAction={{ children: "Button" }}
            status={status}
          />
        ))}
      </YStack>
    </XStack>
  )
};

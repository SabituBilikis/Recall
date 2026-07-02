import type { Meta, StoryObj } from "@storybook/react-native";
import { fn } from "storybook/test";

import { StateMessage } from "./state-message";

const meta = {
  title: "UI/StateMessage",
  component: StateMessage,
  args: {
    actionLabel: "Retry",
    description:
      "Use this reusable state component for loading, empty, error, success, and offline states.",
    onAction: fn(),
    title: "Reusable app state"
  }
} satisfies Meta<typeof StateMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutAction: Story = {
  args: {
    actionLabel: undefined,
    onAction: undefined
  }
};

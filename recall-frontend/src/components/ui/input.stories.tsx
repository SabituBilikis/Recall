import type { Meta, StoryObj } from "@storybook/react-native";
import { YStack } from "tamagui";

import { Input } from "./input";

const meta = {
  args: {
    helperText: "Helper Text",
    label: "Label",
    placeholder: "Placeholder Text"
  },
  component: Input,
  title: "UI/Input"
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Outline: Story = {};

export const Filled: Story = {
  args: {
    appearance: "filled"
  }
};

export const Medium: Story = {
  args: {
    size: "medium"
  }
};

export const WithValue: Story = {
  args: {
    defaultValue: "Input Text"
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};

export const ValidationStates: Story = {
  render: () => (
    <YStack gap="$4">
      <Input helperText="Success Text" label="Success" placeholder="Placeholder Text" status="success" />
      <Input helperText="Info Text" label="Info" placeholder="Placeholder Text" status="info" />
      <Input helperText="Warning Text" label="Warning" placeholder="Placeholder Text" status="warning" />
      <Input helperText="Error Text" label="Error" placeholder="Placeholder Text" status="error" />
    </YStack>
  )
};

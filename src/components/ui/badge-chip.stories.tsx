import type { Meta, StoryObj } from "@storybook/react-native";
import { XStack, YStack } from "tamagui";

import type { BadgeChipIconRenderProps } from "./badge-chip";
import { Typography } from "./typography";
import { BadgeChip } from "./badge-chip";

const states = ["default", "success", "info", "warning", "error"] as const;
const sizes = ["medium", "small", "tiny"] as const;

function SymbolIcon({ color, size }: BadgeChipIconRenderProps) {
  return (
    <Typography color={color} text="center" variant={size === "$4" ? "buttonTiny" : "buttonSmall"}>
      *
    </Typography>
  );
}

function CloseIcon({ color, size }: BadgeChipIconRenderProps) {
  return (
    <Typography color={color} text="center" variant={size === "$4" ? "buttonTiny" : "buttonSmall"}>
      x
    </Typography>
  );
}

const meta = {
  args: {
    children: "Badge",
    icon: SymbolIcon,
    iconAfter: CloseIcon
  },
  component: BadgeChip,
  title: "UI/Badge & Chip"
} satisfies Meta<typeof BadgeChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const Outline: Story = {
  args: {
    appearance: "outline"
  }
};

export const IconOnly: Story = {
  args: {
    iconAfter: undefined,
    iconOnly: true
  }
};

export const VariantMatrix: Story = {
  render: () => (
    <YStack gap="$6">
      {states.map((status) => (
        <YStack gap="$3" key={status}>
          <Typography variant="body2">{status}</Typography>
          <XStack flexWrap="wrap" gap="$3">
            {sizes.map((size) => (
              <BadgeChip icon={SymbolIcon} iconAfter={CloseIcon} key={`filled-${status}-${size}`} size={size} status={status}>
                Badge
              </BadgeChip>
            ))}
            {sizes.map((size) => (
              <BadgeChip
                appearance="outline"
                icon={SymbolIcon}
                iconAfter={CloseIcon}
                key={`outline-${status}-${size}`}
                size={size}
                status={status}
              >
                Badge
              </BadgeChip>
            ))}
          </XStack>
        </YStack>
      ))}
    </YStack>
  )
};

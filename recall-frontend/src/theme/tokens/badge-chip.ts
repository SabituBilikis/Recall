import type { TextVariant } from "./typography";

export type BadgeChipAppearance = "filled" | "outline";
export type BadgeChipSize = "medium" | "small" | "tiny";
export type BadgeChipStatus = "default" | "success" | "info" | "warning" | "error";

export const badgeChipSizeTokens = {
  medium: {
    frame: "$10",
    icon: "$6",
    iconOnlyPadding: "$2",
    px: "$3",
    py: "$3",
    radius: "$sm",
    text: "buttonMedium",
    textPx: "$2"
  },
  small: {
    frame: "$8",
    icon: "$6",
    iconOnlyPadding: "$1",
    px: "$3",
    py: "$2",
    radius: "$xs",
    text: "buttonSmall",
    textPx: "$2"
  },
  tiny: {
    frame: "$6",
    icon: "$4",
    iconOnlyPadding: "$1",
    px: "$2",
    py: "$1.5",
    radius: "$xs",
    text: "buttonTiny",
    textPx: "$2"
  }
} as const satisfies Record<
  BadgeChipSize,
  {
    frame: string;
    icon: string;
    iconOnlyPadding: string;
    px: string;
    py: string;
    radius: string;
    text: TextVariant;
    textPx: string;
  }
>;

export const badgeChipBorderTokens = {
  filled: 0,
  outline: 1.5
} as const;

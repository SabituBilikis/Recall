import type { TextVariant } from "./typography";

export type InputAppearance = "filled" | "outline";
export type InputSize = "large" | "medium";
export type InputStatus = "default" | "success" | "info" | "warning" | "error";

export const inputSizeTokens = {
  large: {
    icon: "$6",
    px: "$3",
    py: "$3",
    radius: "$sm",
    text: "body1",
    width: "$input"
  },
  medium: {
    icon: "$6",
    px: "$3",
    py: "$2",
    radius: "$xs",
    text: "body3",
    width: "$input"
  }
} as const satisfies Record<
  InputSize,
  {
    icon: string;
    px: string;
    py: string;
    radius: string;
    text: TextVariant;
    width: string;
  }
>;

export const inputBorderTokens = {
  default: 1.5,
  none: 0
} as const;

export const inputLayoutTokens = {
  contentGap: "$3",
  stackGap: "$2"
} as const;

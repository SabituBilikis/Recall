import type { TextVariant } from "./typography";

export type ButtonAppearance = "clear" | "filled" | "outline";
export type ButtonSize = "giant" | "large" | "medium" | "small" | "tiny";

export const buttonSizeTokens = {
  giant: {
    frame: "$14",
    icon: "$6",
    px: "$6",
    py: "$4",
    radius: "$xxl",
    text: "buttonGiant"
  },
  large: {
    frame: "$12",
    icon: "$6",
    px: "$5",
    py: "$3.5",
    radius: "$sm",
    text: "buttonLarge"
  },
  medium: {
    frame: "$10",
    icon: "$6",
    px: "$4",
    py: "$3",
    radius: "$sm",
    text: "buttonMedium"
  },
  small: {
    frame: "$8",
    icon: "$6",
    px: "$3",
    py: "$2",
    radius: "$xs",
    text: "buttonSmall"
  },
  tiny: {
    frame: "$6",
    icon: "$4",
    px: "$2",
    py: "$1.5",
    radius: "$xs",
    text: "buttonTiny"
  }
} as const satisfies Record<
  ButtonSize,
  {
    frame: string;
    icon: string;
    px: string;
    py: string;
    radius: string;
    text: TextVariant;
  }
>;

export const buttonBorderTokens = {
  focus: 3,
  none: 0,
  outline: 1.5
} as const;

export const buttonFocusRingShadow = "0px 0px 0px 3px #AEB6FB";

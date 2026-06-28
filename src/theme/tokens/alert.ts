export type AlertAppearance = "filled" | "outline";
export type AlertStatus = "default" | "success" | "info" | "warning" | "error";

export const alertLayoutTokens = {
  actionGap: "$4",
  contentGap: "$4",
  icon: "$6",
  padding: "$4",
  radius: "$sm",
  textGap: "$1",
  width: "$alert"
} as const;

export const alertBorderTokens = {
  filled: 0,
  outline: 1.5
} as const;

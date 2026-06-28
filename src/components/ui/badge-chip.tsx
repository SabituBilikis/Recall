import type { ComponentProps, ReactNode } from "react";
import { XStack } from "tamagui";

import {
  badgeChipBorderTokens,
  badgeChipSizeTokens,
  type BadgeChipAppearance,
  type BadgeChipSize,
  type BadgeChipStatus
} from "@/theme/tokens";

import type { IconRenderProps, IconSlot } from "./icon-slot";
import { renderIconSlot } from "./icon-slot";
import { Typography } from "./typography";

type TypographyColor = ComponentProps<typeof Typography>["color"];

export type BadgeChipIconRenderProps = IconRenderProps<TypographyColor>;
export type BadgeChipIcon = IconSlot<TypographyColor>;

type BadgeChipFrameProps = ComponentProps<typeof XStack>;

export type BadgeChipProps = Omit<BadgeChipFrameProps, "children" | "size"> & {
  appearance?: BadgeChipAppearance;
  children?: ReactNode;
  icon?: BadgeChipIcon;
  iconAfter?: BadgeChipIcon;
  iconOnly?: boolean;
  size?: BadgeChipSize;
  status?: BadgeChipStatus;
};

const badgeChipStatusStyles = {
  default: {
    border: "$badgeChipDefaultBorder",
    outlineBg: "$badgeChipDefaultSoftBg",
    solidBg: "$badgeChipDefaultSolidBg",
    text: "$badgeChipDefaultText"
  },
  error: {
    border: "$badgeChipErrorBorder",
    outlineBg: "$badgeChipErrorSoftBg",
    solidBg: "$badgeChipErrorSolidBg",
    text: "$badgeChipErrorText"
  },
  info: {
    border: "$badgeChipInfoBorder",
    outlineBg: "$badgeChipInfoSoftBg",
    solidBg: "$badgeChipInfoSolidBg",
    text: "$badgeChipInfoText"
  },
  success: {
    border: "$badgeChipSuccessBorder",
    outlineBg: "$badgeChipSuccessSoftBg",
    solidBg: "$badgeChipSuccessSolidBg",
    text: "$badgeChipSuccessText"
  },
  warning: {
    border: "$badgeChipWarningBorder",
    outlineBg: "$badgeChipWarningSoftBg",
    solidBg: "$badgeChipWarningSolidBg",
    text: "$badgeChipWarningText"
  }
} as const;

export function BadgeChip({
  appearance = "filled",
  children = "Badge",
  icon,
  iconAfter,
  iconOnly = false,
  size = "medium",
  status = "default",
  ...frameProps
}: BadgeChipProps) {
  const sizeStyle = badgeChipSizeTokens[size];
  const statusStyle = badgeChipStatusStyles[status];
  const isFilled = appearance === "filled";
  const contentColor = isFilled ? "$badgeChipFilledText" : statusStyle.text;
  const iconColor = isFilled ? "$badgeChipFilledIcon" : statusStyle.text;
  const hasText = !iconOnly && children;
  const onlyIcon = icon ?? iconAfter;

  return (
    <XStack
      {...frameProps}
      backgroundColor={isFilled ? statusStyle.solidBg : statusStyle.outlineBg}
      borderColor={isFilled ? "$transparent" : statusStyle.border}
      borderWidth={isFilled ? badgeChipBorderTokens.filled : badgeChipBorderTokens.outline}
      height={sizeStyle.frame}
      items="center"
      justify="center"
      opacity={1}
      overflow="hidden"
      px={iconOnly ? sizeStyle.iconOnlyPadding : sizeStyle.px}
      py={iconOnly ? sizeStyle.iconOnlyPadding : sizeStyle.py}
      rounded={sizeStyle.radius}
    >
      {iconOnly ? renderIconSlot(onlyIcon, iconColor, sizeStyle.icon) : renderIconSlot(icon, iconColor, sizeStyle.icon)}
      {hasText ? (
        <Typography color={contentColor} px={sizeStyle.textPx} text="center" variant={sizeStyle.text}>
          {children}
        </Typography>
      ) : null}
      {!iconOnly ? renderIconSlot(iconAfter, iconColor, sizeStyle.icon) : null}
    </XStack>
  );
}

export const Badge = BadgeChip;
export const Chip = BadgeChip;

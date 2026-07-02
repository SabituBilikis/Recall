import type { ComponentProps, ReactNode } from "react";
import { Button as TamaguiButton, XStack, YStack } from "tamagui";

import {
  alertBorderTokens,
  alertLayoutTokens,
  type AlertAppearance,
  type AlertStatus
} from "@/theme/tokens";

import type { IconRenderProps, IconSlot } from "./icon-slot";
import { renderIconSlot } from "./icon-slot";
import { Typography } from "./typography";

type TypographyColor = ComponentProps<typeof Typography>["color"];

export type AlertIconRenderProps = IconRenderProps<TypographyColor>;
export type AlertIcon = IconSlot<TypographyColor>;
type AlertFrameProps = ComponentProps<typeof XStack>;
type AlertActionProps = ComponentProps<typeof TamaguiButton>;

export type AlertAction = Omit<AlertActionProps, "children" | "size"> & {
  children: ReactNode;
};

export type AlertProps = Omit<AlertFrameProps, "children"> & {
  appearance?: AlertAppearance;
  description?: ReactNode;
  icon?: AlertIcon;
  primaryAction?: AlertAction;
  secondaryAction?: AlertAction;
  status?: AlertStatus;
  title?: ReactNode;
};

const alertStatusStyles = {
  default: {
    action: "$alertDefaultAction",
    border: "$alertDefaultBorder",
    icon: "$alertDefaultAction",
    outlineBg: "$alertDefaultSoftBg",
    solidBg: "$alertDefaultSolidBg"
  },
  error: {
    action: "$alertErrorAction",
    border: "$alertErrorBorder",
    icon: "$alertErrorAction",
    outlineBg: "$alertErrorSoftBg",
    solidBg: "$alertErrorSolidBg"
  },
  info: {
    action: "$alertInfoAction",
    border: "$alertInfoBorder",
    icon: "$alertInfoAction",
    outlineBg: "$alertInfoSoftBg",
    solidBg: "$alertInfoSolidBg"
  },
  success: {
    action: "$alertSuccessAction",
    border: "$alertSuccessBorder",
    icon: "$alertSuccessAction",
    outlineBg: "$alertSuccessSoftBg",
    solidBg: "$alertSuccessSolidBg"
  },
  warning: {
    action: "$alertWarningAction",
    border: "$alertWarningBorder",
    icon: "$alertWarningAction",
    outlineBg: "$alertWarningSoftBg",
    solidBg: "$alertWarningSolidBg"
  }
} as const;

function AlertActionButton({
  action,
  color
}: {
  action: AlertAction;
  color: TypographyColor;
}) {
  const { children, ...buttonProps } = action;

  return (
    <TamaguiButton {...buttonProps} backgroundColor="$transparent" borderWidth={alertBorderTokens.filled} p="$0" unstyled>
      <Typography color={color} text="center" variant="buttonLarge">
        {children}
      </Typography>
    </TamaguiButton>
  );
}

export function Alert({
  appearance = "filled",
  description = "Get immediate alerts and a notification badge.",
  icon,
  primaryAction,
  secondaryAction,
  status = "default",
  title = "Title",
  ...frameProps
}: AlertProps) {
  const statusStyle = alertStatusStyles[status];
  const isFilled = appearance === "filled";
  const iconColor = isFilled ? "$alertFilledIcon" : statusStyle.icon;
  const titleColor = isFilled ? "$alertFilledTitle" : "$alertOutlineTitle";
  const descriptionColor = isFilled ? "$alertFilledDescription" : "$alertOutlineDescription";
  const primaryActionColor = isFilled ? "$alertFilledPrimaryAction" : statusStyle.action;
  const secondaryActionColor = isFilled ? "$alertFilledSecondaryAction" : "$alertOutlineSecondaryAction";
  const hasActions = primaryAction || secondaryAction;

  return (
    <XStack
      {...frameProps}
      backgroundColor={isFilled ? statusStyle.solidBg : statusStyle.outlineBg}
      borderColor={isFilled ? "$transparent" : statusStyle.border}
      borderWidth={isFilled ? alertBorderTokens.filled : alertBorderTokens.outline}
      gap={alertLayoutTokens.contentGap}
      items="flex-start"
      overflow="hidden"
      p={alertLayoutTokens.padding}
      rounded={alertLayoutTokens.radius}
      width={alertLayoutTokens.width}
    >
      {renderIconSlot(icon, iconColor, alertLayoutTokens.icon)}

      <YStack flex={1} gap={alertLayoutTokens.contentGap} minW="$0">
        <YStack gap={alertLayoutTokens.textGap} width="100%">
          {title ? (
            <Typography color={titleColor} variant="subtitle2" width="100%">
              {title}
            </Typography>
          ) : null}
          {description ? (
            <Typography color={descriptionColor} variant="body3" width="100%">
              {description}
            </Typography>
          ) : null}
        </YStack>

        {hasActions ? (
          <XStack gap={alertLayoutTokens.actionGap} items="center">
            {primaryAction ? <AlertActionButton action={primaryAction} color={primaryActionColor} /> : null}
            {secondaryAction ? <AlertActionButton action={secondaryAction} color={secondaryActionColor} /> : null}
          </XStack>
        ) : null}
      </YStack>
    </XStack>
  );
}

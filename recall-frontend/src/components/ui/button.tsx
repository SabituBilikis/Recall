import type { ComponentProps, ReactNode } from "react";
import { ActivityIndicator } from "react-native";
import { Button as TamaguiButton, XStack } from "tamagui";

import { buttonBorderTokens, buttonFocusRingShadow, buttonSizeTokens, type ButtonAppearance, type ButtonSize } from "@/theme/tokens";
import { colorValues } from "@/theme/tokens/color";

import type { IconRenderProps, IconSlot } from "./icon-slot";
import { renderIconSlot } from "./icon-slot";
import { Typography } from "./typography";

type TypographyColor = ComponentProps<typeof Typography>["color"];

export type ButtonIconRenderProps = IconRenderProps<TypographyColor>;
export type ButtonIcon = IconSlot<TypographyColor>;

type TamaguiButtonProps = ComponentProps<typeof TamaguiButton>;

export type ButtonProps = Omit<
  TamaguiButtonProps,
  "children" | "icon" | "iconAfter" | "size" | "variant"
> & {
  appearance?: ButtonAppearance;
  children?: ReactNode;
  icon?: ButtonIcon;
  iconAfter?: ButtonIcon;
  iconOnly?: boolean;
  loading?: boolean;
  size?: ButtonSize;
};

const spinnerColorByAppearance: Record<ButtonAppearance, string> = {
  clear: colorValues.primary900,
  filled: colorValues.white100,
  outline: colorValues.primary900
};

const buttonAppearanceStyles = {
  clear: {
    bg: "$buttonClearBg",
    bgDisabled: "$buttonClearBgDisabled",
    bgHover: "$buttonClearBgHover",
    bgPress: "$buttonClearBgPress",
    border: "$buttonClearBg",
    borderDisabled: "$buttonClearBgDisabled",
    borderWidth: buttonBorderTokens.none,
    color: "$buttonTextAccent",
    colorDisabled: "$buttonTextDisabled",
    focusBorder: "$buttonFocusRing",
    focusBorderWidth: buttonBorderTokens.none,
    focusShadow: buttonFocusRingShadow,
    icon: "$buttonIconAccent",
    iconDisabled: "$buttonIconDisabled"
  },
  filled: {
    bg: "$buttonFilledBg",
    bgDisabled: "$buttonFilledBgDisabled",
    bgHover: "$buttonFilledBgHover",
    bgPress: "$buttonFilledBgPress",
    border: "$buttonFilledBg",
    borderDisabled: "$buttonFilledBgDisabled",
    borderWidth: buttonBorderTokens.none,
    color: "$buttonFilledText",
    colorDisabled: "$buttonTextDisabled",
    focusBorder: "$buttonFilledBg",
    focusBorderWidth: buttonBorderTokens.none,
    focusShadow: undefined,
    icon: "$buttonIconInverse",
    iconDisabled: "$buttonIconDisabled"
  },
  outline: {
    bg: "$buttonOutlineBg",
    bgDisabled: "$buttonOutlineBgDisabled",
    bgHover: "$buttonOutlineBgHover",
    bgPress: "$buttonOutlineBgPress",
    border: "$buttonBorderAccent",
    borderDisabled: "$buttonBorderDisabled",
    borderWidth: buttonBorderTokens.outline,
    color: "$buttonTextAccent",
    colorDisabled: "$buttonTextDisabled",
    focusBorder: "$buttonBorderAccent",
    focusBorderWidth: buttonBorderTokens.outline,
    focusShadow: buttonFocusRingShadow,
    icon: "$buttonIconAccent",
    iconDisabled: "$buttonIconDisabled"
  }
} as const;

export function Button({
  appearance = "filled",
  children,
  disabled,
  icon,
  iconAfter,
  iconOnly = false,
  loading = false,
  onPress,
  size = "medium",
  width,
  ...buttonProps
}: ButtonProps) {
  const sizeStyle = buttonSizeTokens[size];
  const appearanceStyle = buttonAppearanceStyles[appearance];
  const contentColor = disabled ? appearanceStyle.colorDisabled : appearanceStyle.color;
  const iconColor = disabled ? appearanceStyle.iconDisabled : appearanceStyle.icon;
  const hasText = !iconOnly && children;

  return (
    <TamaguiButton
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled, busy: loading }}
      rounded={sizeStyle.radius}
      {...buttonProps}
      backgroundColor={appearanceStyle.bg}
      borderColor={appearanceStyle.border}
      borderWidth={appearanceStyle.borderWidth}
      boxShadow="none"
      disabled={disabled}
      onPress={loading ? undefined : onPress}
      disabledStyle={{
        backgroundColor: appearanceStyle.bgDisabled,
        borderColor: appearanceStyle.borderDisabled,
        opacity: 1
      }}
      focusStyle={{
        borderColor: appearanceStyle.focusBorder,
        borderWidth: appearanceStyle.focusBorderWidth,
        boxShadow: appearanceStyle.focusShadow
      }}
      height={sizeStyle.frame}
      hoverStyle={{
        backgroundColor: appearanceStyle.bgHover
      }}
      opacity={1}
      overflow="hidden"
      pressStyle={{
        backgroundColor: appearanceStyle.bgPress
      }}
      px={iconOnly ? "$0" : sizeStyle.px}
      py={iconOnly ? "$0" : sizeStyle.py}
      unstyled
      width={iconOnly ? sizeStyle.frame : width}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColorByAppearance[appearance]} />
      ) : (
        <XStack items="center" justify="center">
          {renderIconSlot(icon, iconColor, sizeStyle.icon)}
          {hasText ? (
            <Typography color={contentColor} px="$2" text="center" variant={sizeStyle.text}>
              {children}
            </Typography>
          ) : null}
          {renderIconSlot(iconAfter, iconColor, sizeStyle.icon)}
        </XStack>
      )}
    </TamaguiButton>
  );
}

import type { ComponentProps } from "react";
import { useState } from "react";
import { Input as TamaguiInput, styled, XStack, YStack } from "tamagui";

import {
  inputBorderTokens,
  inputLayoutTokens,
  inputSizeTokens,
  typography,
  type InputAppearance,
  type InputSize,
  type InputStatus
} from "@/theme/tokens";

import type { IconRenderProps, IconSlot } from "./icon-slot";
import { renderIconSlot } from "./icon-slot";
import { Typography } from "./typography";

type TypographyColor = ComponentProps<typeof Typography>["color"];

export type InputIconRenderProps = IconRenderProps<TypographyColor>;
export type InputIcon = IconSlot<TypographyColor>;

type StackWidth = ComponentProps<typeof YStack>["width"];
type InputThemeToken = `$${string}`;

const inputStatusStyles = {
  default: {
    bgFilled: "$inputBgFilled",
    bgOutline: "$inputBgOutline",
    border: "$inputBorderDefault",
    helper: "$inputHelperDefault",
    icon: "$inputIcon"
  },
  error: {
    bgFilled: "$inputBgFilledError",
    bgOutline: "$inputBgOutline",
    border: "$inputBorderError",
    helper: "$inputHelperError",
    icon: "$inputHelperError"
  },
  info: {
    bgFilled: "$inputBgFilledInfo",
    bgOutline: "$inputBgOutline",
    border: "$inputBorderInfo",
    helper: "$inputHelperInfo",
    icon: "$inputHelperInfo"
  },
  success: {
    bgFilled: "$inputBgFilledSuccess",
    bgOutline: "$inputBgOutline",
    border: "$inputBorderSuccess",
    helper: "$inputHelperSuccess",
    icon: "$inputHelperSuccess"
  },
  warning: {
    bgFilled: "$inputBgFilledWarning",
    bgOutline: "$inputBgOutline",
    border: "$inputBorderWarning",
    helper: "$inputHelperWarning",
    icon: "$inputHelperWarning"
  }
} as const;

const StyledInput = styled(TamaguiInput, {
  backgroundColor: "$transparent",
  borderWidth: inputBorderTokens.none,
  flex: 1,
  fontFamily: "$body",
  name: "RecallInputText",
  p: "$0",
  unstyled: true,
  variants: {
    fieldSize: {
      large: typography.body1,
      medium: typography.body3
    }
  } as const,
  defaultVariants: {
    fieldSize: "large"
  }
});

type StyledInputProps = ComponentProps<typeof StyledInput>;

export type InputProps = Omit<StyledInputProps, "fieldSize" | "size"> & {
  appearance?: InputAppearance;
  containerWidth?: StackWidth;
  helperText?: string;
  label?: string;
  leftIcon?: InputIcon;
  rightIcon?: InputIcon;
  size?: InputSize;
  status?: InputStatus;
};

function getInputSurface<TFilled extends InputThemeToken, TOutline extends InputThemeToken>(
  appearance: InputAppearance,
  bgFilled: TFilled,
  bgOutline: TOutline
) {
  return appearance === "filled" ? bgFilled : bgOutline;
}

export function Input({
  appearance = "outline",
  containerWidth,
  defaultValue,
  disabled,
  helperText,
  label,
  leftIcon,
  minHeight,
  multiline,
  onBlur,
  onFocus,
  rightIcon,
  rounded,
  size = "large",
  status = "default",
  value,
  ...inputProps
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const sizeStyle = inputSizeTokens[size];
  const statusStyle = inputStatusStyles[status];
  const isInteractiveDefault = status === "default" && !disabled;
  const borderColor = disabled
    ? "$inputBorderDisabled"
    : isFocused && status === "default"
      ? "$inputBorderFocus"
      : statusStyle.border;
  const backgroundColor = disabled
    ? getInputSurface(appearance, "$inputBgFilledDisabled", "$inputBgOutline")
    : isFocused && status === "default"
      ? getInputSurface(appearance, "$inputBgFilledFocus", "$inputBgOutline")
      : getInputSurface(appearance, statusStyle.bgFilled, statusStyle.bgOutline);
  const helperColor = disabled
    ? "$inputHelperDisabled"
    : isFocused && status === "default"
      ? "$inputHelperFocus"
      : statusStyle.helper;
  const iconColor = disabled ? "$inputIconDisabled" : statusStyle.icon;
  const inputColor = disabled ? "$inputTextDisabled" : "$inputText";

  return (
    <YStack gap={inputLayoutTokens.stackGap} width={containerWidth ?? sizeStyle.width}>
      {label ? (
        <Typography color="$inputLabel" variant="body2">
          {label}
        </Typography>
      ) : null}

      <XStack
        backgroundColor={backgroundColor}
        borderColor={borderColor}
        borderWidth={inputBorderTokens.default}
        gap={inputLayoutTokens.contentGap}
        items={multiline ? "flex-start" : "center"}
        minHeight={minHeight}
        opacity={1}
        overflow="hidden"
        px={sizeStyle.px}
        py={sizeStyle.py}
        rounded={rounded ?? sizeStyle.radius}
        {...(isInteractiveDefault
          ? {
              hoverStyle: {
                backgroundColor: getInputSurface(appearance, "$inputBgFilledHover", "$inputBgOutline"),
                borderColor: "$inputBorderHover"
              }
            }
          : {})}
      >
        {renderIconSlot(leftIcon, iconColor, sizeStyle.icon)}

        <StyledInput
          {...inputProps}
          color={inputColor}
          defaultValue={defaultValue}
          disabled={disabled}
          fieldSize={size}
          focusStyle={{ borderWidth: "$0" }}
          height={multiline ? "100%" : undefined}
          multiline={multiline}
          textAlignVertical={multiline ? "top" : "center"}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          placeholderTextColor="$inputPlaceholder"
          value={value}
        />

        {renderIconSlot(rightIcon, iconColor, sizeStyle.icon)}
      </XStack>

      {helperText ? (
        <Typography color={helperColor} variant="body3">
          {helperText}
        </Typography>
      ) : null}
    </YStack>
  );
}

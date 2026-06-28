import { YStack } from "tamagui";

import { EyeIcon, EyeOffIcon } from "@/components/ui/icons";
import { Input, type InputProps } from "@/components/ui/input";
import { colorValues } from "@/theme/tokens/color";

type PasswordInputProps = Omit<InputProps, "rightIcon" | "secureTextEntry"> & {
  showPassword: boolean;
  onToggleShowPassword: () => void;
};

export function PasswordInput({ showPassword, onToggleShowPassword, ...inputProps }: PasswordInputProps) {
  return (
    <Input
      {...inputProps}
      autoCapitalize="none"
      secureTextEntry={!showPassword}
      rightIcon={() => (
        <YStack pressStyle={{ opacity: 0.6 }} onPress={onToggleShowPassword}>
          {showPassword ? (
            <EyeOffIcon color={colorValues.grey400} size={20} />
          ) : (
            <EyeIcon color={colorValues.grey400} size={20} />
          )}
        </YStack>
      )}
    />
  );
}

import { Image } from "react-native";
import { YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";

type AvatarProps = {
  initials: string;
  size?: number;
  uri?: string;
};

// Circular avatar — renders the photo when available, initials fallback otherwise.
export function Avatar({ initials, size = 24, uri }: AvatarProps) {
  if (uri) {
    return (
      <Image
        accessibilityIgnoresInvertColors
        source={{ uri }}
        style={{ borderRadius: size / 2, height: size, width: size }}
      />
    );
  }

  return (
    <YStack
      backgroundColor="$accentPrimarySoft"
      height={size}
      items="center"
      justify="center"
      rounded={size / 2}
      width={size}
    >
      <Typography color="$textAccent" variant="caption2">
        {initials}
      </Typography>
    </YStack>
  );
}

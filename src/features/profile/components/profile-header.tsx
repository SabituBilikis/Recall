import { ActivityIndicator } from "react-native";
import { YStack } from "tamagui";

import { Avatar } from "@/features/home/components/avatar";
import { Typography } from "@/components/ui/typography";
import { colorValues } from "@/theme/tokens/color";

const AVATAR_SIZE = 96;

type ProfileHeaderProps = {
  fullName: string;
  email: string;
  avatarUrl?: string;
  onAvatarPress?: () => void;
  uploading?: boolean;
};

// Identity block: avatar (tap to change), full name, email.
export function ProfileHeader({ fullName, email, avatarUrl, onAvatarPress, uploading }: ProfileHeaderProps) {
  const initials = fullName.charAt(0).toUpperCase();

  return (
    <YStack gap="$3" items="center" width="100%">
      <YStack
        accessibilityRole={onAvatarPress ? "button" : undefined}
        accessibilityLabel={onAvatarPress ? "Change profile photo" : undefined}
        accessibilityState={{ busy: !!uploading }}
        borderColor="$primary200"
        borderWidth={2}
        height={AVATAR_SIZE + 8}
        items="center"
        justify="center"
        pressStyle={onAvatarPress ? { opacity: 0.7 } : undefined}
        rounded={(AVATAR_SIZE + 8) / 2}
        width={AVATAR_SIZE + 8}
        onPress={onAvatarPress}
      >
        {uploading ? <ActivityIndicator color={colorValues.primary500} /> : <Avatar initials={initials} size={AVATAR_SIZE} uri={avatarUrl} />}
      </YStack>
      <YStack gap="$1" items="center">
        <Typography color="$onboardingTextPrimary" variant="h5">
          {fullName}
        </Typography>
        {email ? (
          <Typography color="$onboardingTextSecondary" variant="body3">
            {email}
          </Typography>
        ) : null}
      </YStack>
    </YStack>
  );
}

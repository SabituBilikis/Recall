import { XStack, YStack } from "tamagui";

import { BellIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { colorValues } from "@/theme/tokens/color";
import type { User } from "@/types/user";

import { homeContent } from "../constants/home-content";
import { Avatar } from "./avatar";

type HomeHeaderProps = {
  onNotificationsPress: () => void;
  onProfilePress: () => void;
  user: User;
  unreadCount?: number;
};

export function HomeHeader({ onNotificationsPress, onProfilePress, user, unreadCount = 0 }: HomeHeaderProps) {
  return (
    <XStack items="center" justify="space-between" width="100%">
      <XStack
        accessibilityRole="button"
        accessibilityLabel="Open profile"
        gap="$4"
        items="center"
        pressStyle={{ opacity: 0.6 }}
        onPress={onProfilePress}
      >
        <Avatar initials={user.firstName.charAt(0)} size={24} uri={user.avatarUrl} />
        <Typography color="$onboardingTextPrimary" variant="subtitle1">
          {homeContent.greetingPrefix}
          {user.firstName}
        </Typography>
      </XStack>

      <YStack
        accessibilityRole="button"
        accessibilityLabel={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : "Notifications"}
        backgroundColor="$surfacePrimary"
        items="center"
        justify="center"
        p="$1"
        pressStyle={{ opacity: 0.6 }}
        rounded="$xxl"
        onPress={onNotificationsPress}
      >
        <BellIcon color={colorValues.grey900} size={20} />
        {unreadCount > 0 ? (
          <XStack
            backgroundColor="$danger"
            borderColor="$surfacePrimary"
            borderWidth={2}
            height={18}
            items="center"
            justify="center"
            minW={18}
            position="absolute"
            px="$1"
            rounded="$xxl"
            t={-4}
            r={-4}
          >
            <Typography color="$textInverse" variant="buttonTiny">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Typography>
          </XStack>
        ) : null}
      </YStack>
    </XStack>
  );
}

import { XStack, YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import { tileBorderWidths } from "@/theme/tokens";
import type { Notification } from "@/types/notification";

import { notificationVisuals } from "../constants/notification-visuals";

// One notification: type icon, title + body + time, unread dot. Tapping marks read.
export function NotificationCard({ notification, onPress }: { notification: Notification; onPress: () => void }) {
  const visual = notificationVisuals[notification.type];
  const { Icon, iconColor, tileBg } = visual;

  return (
    <XStack
      backgroundColor={notification.read ? "$surfacePrimary" : "$primary50"}
      borderColor="$borderSubtle"
      borderWidth={tileBorderWidths.card}
      gap="$3"
      items="center"
      p="$3"
      pressStyle={{ opacity: 0.7 }}
      rounded="$sm"
      width="100%"
      onPress={onPress}
    >
      <YStack backgroundColor={tileBg} height={40} items="center" justify="center" rounded="$xs" width={40}>
        <Icon color={iconColor} size={20} />
      </YStack>

      <YStack flex={1} gap="$1">
        <Typography color="$onboardingTextPrimary" numberOfLines={1} variant="body2">
          {notification.title}
        </Typography>
        <Typography color="$onboardingTextSecondary" numberOfLines={2} variant="caption1">
          {notification.body}
        </Typography>
      </YStack>

      <YStack gap="$2" items="flex-end">
        <Typography color="$onboardingTextSecondary" variant="caption1">
          {notification.createdAtLabel}
        </Typography>
        {notification.read ? null : <YStack backgroundColor="$primary500" height={8} rounded="$xxl" width={8} />}
      </YStack>
    </XStack>
  );
}

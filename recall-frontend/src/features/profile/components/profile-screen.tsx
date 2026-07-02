import { useState } from "react";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";

import { SignOutIcon } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";
import { LibraryHeader } from "@/features/library/components/library-header";
import { useDeleteAccount } from "@/features/settings/hooks/use-delete-account";
import { useSignOut } from "@/features/settings/hooks/use-sign-out";
import { tileBorderWidths } from "@/theme/tokens";
import { colorValues } from "@/theme/tokens/color";

import { profileContent } from "../constants/profile-content";
import { useAppPreferences } from "../hooks/use-app-preferences";
import { useChangeAvatar } from "../hooks/use-change-avatar";
import { useProfileData } from "../hooks/use-profile-data";
import { ProfileHeader } from "./profile-header";
import { ProfileStatsCard } from "./profile-stats-card";
import { SettingsListItem } from "./settings-list-item";
import { SettingsToggle } from "./settings-toggle";
import { DeleteAccountModal } from "./delete-account-modal";
import { SignOutModal } from "./sign-out-modal";

export type ProfileScreenProps = {
  onBack: () => void;
  onAccount: () => void;
  onStorage: () => void;
  onTrash: () => void;
  onPrivacy: () => void;
  onSignedOut: () => void;
};

const scrollContentStyle = { paddingBottom: 32 } as const;

export function ProfileScreen({ onBack, onAccount, onStorage, onTrash, onPrivacy, onSignedOut }: ProfileScreenProps) {
  const insets = useSafeAreaInsets();
  const { fullName, email, user, stats, storagePercent } = useProfileData();
  const { offlineModeEnabled, notificationsEnabled, toggleOfflineMode, toggleNotifications } = useAppPreferences();
  const { pickAvatar, uploading, error: avatarError } = useChangeAvatar();
  const { signOut } = useSignOut(onSignedOut);
  const { deleteAccount, deleting, error: deleteError } = useDeleteAccount(onSignedOut);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const settings = profileContent.settings;

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <LibraryHeader onBack={onBack} title={profileContent.titles.profile} />
      </YStack>

      <ScrollView contentContainerStyle={scrollContentStyle} showsVerticalScrollIndicator={false}>
        <YStack gap="$6" px="$4" pt="$4">
          <ProfileHeader
            avatarUrl={user.avatarUrl}
            email={email}
            fullName={fullName}
            uploading={uploading}
            onAvatarPress={pickAvatar}
          />

          {avatarError ? (
            <Typography color="$danger" text="center" variant="body3">
              {avatarError}
            </Typography>
          ) : null}

          <ProfileStatsCard collections={stats.collections} savedItems={stats.savedItems} storagePercent={storagePercent} />

          <YStack
            backgroundColor="$surfacePrimary"
            borderColor="$borderSubtle"
            borderWidth={tileBorderWidths.card}
            gap="$1"
            p="$4"
            rounded="$xl"
          >
            <Typography color="$onboardingTextPrimary" pb="$1" variant="subtitle1">
              {settings.heading}
            </Typography>
            <SettingsListItem description={settings.account.description} label={settings.account.label} onPress={onAccount} />
            <SettingsListItem description={settings.storage.description} label={settings.storage.label} onPress={onStorage} />
            <SettingsListItem description={settings.trash.description} label={settings.trash.label} onPress={onTrash} />
            <SettingsListItem description={settings.privacy.description} label={settings.privacy.label} onPress={onPrivacy} />
            <SettingsListItem
              description={settings.offline.description}
              label={settings.offline.label}
              right={<SettingsToggle value={offlineModeEnabled} onToggle={toggleOfflineMode} />}
            />
            <SettingsListItem
              description={settings.notifications.description}
              label={settings.notifications.label}
              right={<SettingsToggle value={notificationsEnabled} onToggle={toggleNotifications} />}
            />
          </YStack>

          <XStack justify="center" width="100%">
            <XStack
              borderColor="$danger"
              borderWidth={1}
              gap="$2"
              items="center"
              justify="center"
              pressStyle={{ opacity: 0.7 }}
              px="$6"
              py="$3"
              rounded="$xxl"
              onPress={() => setSignOutOpen(true)}
            >
              <SignOutIcon color={colorValues.red500} size={20} />
              <Typography color="$danger" variant="buttonLarge">
                {profileContent.signOut.cta}
              </Typography>
            </XStack>
          </XStack>

          <XStack justify="center" width="100%">
            <XStack
              accessibilityRole="button"
              accessibilityLabel={profileContent.deleteAccount.cta}
              items="center"
              justify="center"
              pressStyle={{ opacity: 0.6 }}
              px="$6"
              py="$2"
              onPress={() => setDeleteOpen(true)}
            >
              <Typography color="$textTertiary" variant="buttonMedium">
                {profileContent.deleteAccount.cta}
              </Typography>
            </XStack>
          </XStack>
        </YStack>
      </ScrollView>

      <SignOutModal
        visible={signOutOpen}
        onCancel={() => setSignOutOpen(false)}
        onConfirm={() => {
          setSignOutOpen(false);
          signOut();
        }}
      />

      <DeleteAccountModal
        deleting={deleting}
        error={deleteError}
        visible={deleteOpen}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => void deleteAccount()}
      />
    </YStack>
  );
}

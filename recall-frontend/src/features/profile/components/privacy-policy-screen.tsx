import * as Linking from "expo-linking";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { Typography } from "@/components/ui/typography";
import { LibraryHeader } from "@/features/library/components/library-header";

import { privacyContent } from "../constants/privacy-content";

const scrollContentStyle = { paddingBottom: 40 } as const;

export function PrivacyPolicyScreen({ onBack }: { onBack: () => void }) {
  const insets = useSafeAreaInsets();

  return (
    <YStack backgroundColor="$surfaceSubtle" flex={1}>
      <YStack pb="$3" pt={insets.top + 8} px="$4">
        <LibraryHeader onBack={onBack} title={privacyContent.title} />
      </YStack>

      <ScrollView contentContainerStyle={scrollContentStyle} showsVerticalScrollIndicator={false}>
        <YStack gap="$5" pt="$4" px="$4">
          <YStack gap="$2">
            <Typography color="$onboardingTextPrimary" variant="h5">
              {privacyContent.heading}
            </Typography>
            <Typography color="$onboardingTextSecondary" variant="caption1">
              {privacyContent.updated}
            </Typography>
            <Typography color="$onboardingTextSecondary" variant="body1">
              {privacyContent.intro}
            </Typography>
          </YStack>

          {privacyContent.sections.map((section) => (
            <YStack gap="$2" key={section.heading}>
              <Typography color="$onboardingTextPrimary" variant="subtitle1">
                {section.heading}
              </Typography>
              {section.body.map((paragraph, index) => (
                <Typography color="$onboardingTextSecondary" key={index} variant="body1">
                  {paragraph}
                </Typography>
              ))}
            </YStack>
          ))}

          <Typography
            color="$primary500"
            pressStyle={{ opacity: 0.6 }}
            variant="body1"
            onPress={() => void Linking.openURL(`mailto:${privacyContent.contactEmail}`)}
          >
            {privacyContent.contactEmail}
          </Typography>
        </YStack>
      </ScrollView>
    </YStack>
  );
}

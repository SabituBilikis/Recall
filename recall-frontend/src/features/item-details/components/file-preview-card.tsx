import { useState } from "react";
import { Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { XStack, YStack } from "tamagui";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { tileBorderWidths } from "@/theme/tokens";

import type { DetailItem } from "../types/item.types";
import { DetailCard } from "./detail-card";
import { ImageViewerModal } from "./image-viewer-modal";

const thumbStyle = { height: 180, width: 160 } as const;

// Document/file preview. Image files render the real thumbnail (tap → full-screen);
// other files (PDF, etc.) show a document tile + "Open" that launches a viewer.
export function FilePreviewCard({ item }: { item: DetailItem }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const isImage = item.mimeType?.startsWith("image/") ?? false;
  const canOpen = !!item.fileUrl;

  if (isImage && item.fileUrl) {
    return (
      <DetailCard gap="$3" items="center" px="$4" py="$6" rounded={20}>
        <YStack
          accessibilityRole="imagebutton"
          accessibilityLabel={`View ${item.fileName ?? item.title}`}
          height={180}
          overflow="hidden"
          pressStyle={{ opacity: 0.85 }}
          rounded="$md"
          width={160}
          onPress={() => setViewerOpen(true)}
        >
          <Image resizeMode="cover" source={{ uri: item.fileUrl }} style={thumbStyle} />
        </YStack>
        <Typography color="$textDisabled" text="center" variant="body1">
          {item.fileName ?? item.title}
        </Typography>
        <ImageViewerModal uri={item.fileUrl} visible={viewerOpen} onClose={() => setViewerOpen(false)} />
      </DetailCard>
    );
  }

  return (
    <DetailCard gap="$4" items="center" px="$4" py="$6" rounded={20}>
      <YStack
        backgroundColor="$surfacePrimary"
        borderColor="$borderSubtle"
        borderWidth={tileBorderWidths.card}
        height={180}
        opacity={0.9}
        overflow="hidden"
        rounded="$md"
        width={160}
      >
        <YStack gap="$4" pl={18} pt={20} width={89}>
          <XStack
            borderColor="$borderSubtle"
            borderWidth={tileBorderWidths.card}
            items="center"
            justify="center"
            px="$3"
            py="$0.5"
            rounded="$sm"
            self="flex-start"
          >
            <Typography color="$onboardingTextSecondary" variant="buttonTiny">
              {item.fileType ?? "FILE"}
            </Typography>
          </XStack>
          <YStack gap="$2" width="100%">
            <YStack backgroundColor="$textTertiary" height={8} rounded="$sm" width="100%" />
            <YStack borderColor="$borderSubtle" borderWidth={tileBorderWidths.card} height={8} rounded="$sm" width={71} />
            <YStack borderColor="$borderSubtle" borderWidth={tileBorderWidths.card} height={8} rounded="$sm" width="100%" />
          </YStack>
        </YStack>
      </YStack>

      <Typography color="$textDisabled" text="center" variant="body1">
        {item.fileName ?? item.title}
      </Typography>

      <Button
        appearance="outline"
        disabled={!canOpen}
        rounded="$xxl"
        size="medium"
        onPress={canOpen ? () => void WebBrowser.openBrowserAsync(item.fileUrl as string) : undefined}
      >
        Open
      </Button>
    </DetailCard>
  );
}

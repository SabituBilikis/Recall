import { useState } from "react";
import { Image } from "react-native";
import { YStack } from "tamagui";

import { RecallMark } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";

import { itemDetailsContent } from "../constants/item-details-content";
import type { DetailItem } from "../types/item.types";
import { DetailCard } from "./detail-card";
import { ImageViewerModal } from "./image-viewer-modal";

const previewImageStyle = { height: 244, width: "100%" } as const;

// Shows the real captured image when present (tap → full-screen); placeholder otherwise.
export function ScreenshotPreview({ item }: { item: DetailItem }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const hasImage = !!item.thumbnailUri;

  return (
    <DetailCard gap="$2" px="$4" py="$6" rounded={20}>
      <YStack
        accessibilityRole={hasImage ? "imagebutton" : undefined}
        accessibilityLabel={hasImage ? `View ${item.title}` : undefined}
        backgroundColor="$surfaceMuted"
        height={244}
        items="center"
        justify="center"
        overflow="hidden"
        pressStyle={hasImage ? { opacity: 0.85 } : undefined}
        rounded="$md"
        width="100%"
        onPress={hasImage ? () => setViewerOpen(true) : undefined}
      >
        {item.thumbnailUri ? (
          <Image resizeMode="cover" source={{ uri: item.thumbnailUri }} style={previewImageStyle} />
        ) : (
          <RecallMark size={56} />
        )}
      </YStack>
      <Typography color="$textDisabled" variant="body1">
        {itemDetailsContent.previewLabel}
      </Typography>

      {item.thumbnailUri ? (
        <ImageViewerModal uri={item.thumbnailUri} visible={viewerOpen} onClose={() => setViewerOpen(false)} />
      ) : null}
    </DetailCard>
  );
}

import { Image } from "react-native";
import { YStack } from "tamagui";

import { RecallMark } from "@/components/ui/icons";
import { Typography } from "@/components/ui/typography";

import { itemDetailsContent } from "../constants/item-details-content";
import type { DetailItem } from "../types/item.types";
import { DetailCard } from "./detail-card";

const previewImageStyle = { height: 244, width: "100%" } as const;

// Shows the real captured image when present; placeholder surface otherwise.
export function ScreenshotPreview({ item }: { item: DetailItem }) {
  return (
    <DetailCard gap="$2" px="$4" py="$6" rounded={20}>
      <YStack
        backgroundColor="$surfaceMuted"
        height={244}
        items="center"
        justify="center"
        overflow="hidden"
        rounded="$md"
        width="100%"
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
    </DetailCard>
  );
}

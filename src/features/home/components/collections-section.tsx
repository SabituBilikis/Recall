import { XStack, YStack } from "tamagui";

import type { Collection } from "@/types/collection";

import { homeContent } from "../constants/home-content";
import { chunkPairs } from "../utils/chunk-pairs";
import { CollectionCard } from "./collection-card";
import { SectionHeader } from "./section-header";

type CollectionsSectionProps = {
  collections: Collection[];
  onBrowse: () => void;
  onCollectionPress: (collection: Collection) => void;
};

export function CollectionsSection({ collections, onBrowse, onCollectionPress }: CollectionsSectionProps) {
  return (
    <YStack gap="$4" width="100%">
      <SectionHeader actionLabel={homeContent.collectionsAction} title={homeContent.collectionsTitle} onActionPress={onBrowse} />

      <YStack gap="$4" width="100%">
        {chunkPairs(collections).map((row) => (
          <XStack gap="$4" key={row[0].id} width="100%">
            {row.map((collection) => (
              <CollectionCard collection={collection} key={collection.id} onPress={() => onCollectionPress(collection)} />
            ))}
          </XStack>
        ))}
      </YStack>
    </YStack>
  );
}

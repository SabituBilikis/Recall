import { router, useLocalSearchParams } from "expo-router";

import { CollectionFormScreen } from "@/features/collections";
import { useCollectionsStore } from "@/store/use-collections-store";

export default function EditCollectionRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const collection = useCollectionsStore((state) => state.collections.find((item) => item.id === id));

  return (
    <CollectionFormScreen
      collection={collection}
      mode="edit"
      onBack={() => router.back()}
      onDone={() => router.back()}
    />
  );
}

import { router } from "expo-router";

import { CollectionFormScreen } from "@/features/collections";

export default function CreateCollectionRoute() {
  return <CollectionFormScreen mode="create" onBack={() => router.back()} onDone={() => router.back()} />;
}

import { router, useLocalSearchParams } from "expo-router";

import { AddItemFormScreen, isCaptureItemType, SelectItemTypeScreen } from "@/features/capture";

export default function CaptureRoute() {
  const { type } = useLocalSearchParams<{ type: string }>();

  if (isCaptureItemType(type)) {
    return (
      <AddItemFormScreen
        type={type}
        onBack={() => router.back()}
        onClose={() => router.replace("/home")}
        onSaved={() => router.replace("/capture/success")}
      />
    );
  }

  // type === "new" (or anything else) → the type-selection screen.
  return (
    <SelectItemTypeScreen
      onBack={() => router.back()}
      onClose={() => router.replace("/home")}
      onSelectType={(selected) => router.push({ pathname: "/capture/[type]", params: { type: selected } })}
    />
  );
}

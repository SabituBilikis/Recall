import { router } from "expo-router";

import { SaveSuccessScreen } from "@/features/capture";
import { useCaptureStore } from "@/store/use-capture-store";

export default function CaptureSuccessRoute() {
  const reset = useCaptureStore((state) => state.reset);
  const savedItem = useCaptureStore((state) => state.savedItem);

  return (
    <SaveSuccessScreen
      onSaveAnother={() => {
        reset();
        router.replace({ pathname: "/capture/[type]", params: { type: "new" } });
      }}
      onViewItem={() => router.replace({ pathname: "/item/[id]", params: { id: savedItem?.id ?? "new" } })}
    />
  );
}

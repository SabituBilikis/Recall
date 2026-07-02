import { useEffect, useMemo } from "react";

import { isValidUrl } from "@/lib/validation";
import { useCaptureStore } from "@/store/use-capture-store";

import type { CaptureItemType } from "../types/capture.types";

type UseCaptureFormParams = {
  onSuccess?: () => void;
  type: CaptureItemType;
};

// Per-type form state + validation. All gating lives here, not in the screens.
export function useCaptureForm({ onSuccess, type }: UseCaptureFormParams) {
  const draft = useCaptureStore((state) => state.draft);
  const startDraft = useCaptureStore((state) => state.startDraft);
  const setField = useCaptureStore((state) => state.setField);
  const save = useCaptureStore((state) => state.save);
  const saveStatus = useCaptureStore((state) => state.saveStatus);

  useEffect(() => {
    startDraft(type);
  }, [type, startDraft]);

  // Live URL error — only surfaces once the user has typed something.
  const urlError = useMemo(() => {
    if (type !== "link" || draft.itemUrl.length === 0) {
      return null;
    }
    return isValidUrl(draft.itemUrl) ? null : "Please enter a valid URL.";
  }, [type, draft.itemUrl]);

  const titleFilled = draft.itemTitle.trim().length > 0;

  const isValid = useMemo(() => {
    switch (type) {
      case "screenshot":
        return draft.uploadedImage !== null && titleFilled;
      case "link":
        return isValidUrl(draft.itemUrl) && titleFilled;
      case "note":
        return titleFilled && draft.itemContent.trim().length > 0;
      case "file":
        return draft.uploadedFile !== null && titleFilled;
      default:
        return false;
    }
  }, [type, draft, titleFilled]);

  const isSaving = saveStatus === "saving";

  function handleSave() {
    if (!isValid || isSaving) {
      return;
    }
    save(onSuccess);
  }

  return { draft, setField, urlError, isValid, isSaving, handleSave };
}

export type CaptureFormApi = ReturnType<typeof useCaptureForm>;

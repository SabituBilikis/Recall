import { useEffect, useRef, useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

import { useCaptureStore } from "@/store/use-capture-store";

import type { CaptureUploadKind, UploadedAsset, UploadStatus } from "../types/capture.types";

const PROGRESS_STEP = 10;
const PROGRESS_INTERVAL_MS = 120;

const DOC_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain"
];

// Upload logic, isolated from the UI. Picks a real local asset (no real upload —
// no backend) then simulates progress into the capture store.
export function useFileUpload(kind: CaptureUploadKind) {
  const setUpload = useCaptureStore((state) => state.setUpload);
  const setProgress = useCaptureStore((state) => state.setProgress);
  const asset = useCaptureStore((state) =>
    kind === "image" ? state.draft.uploadedImage : state.draft.uploadedFile
  );
  const progress = useCaptureStore((state) => state.draft.uploadProgress);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  function simulateProgress() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setStatus("uploading");
    setProgress(0);
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += PROGRESS_STEP;
      if (current >= 100) {
        setProgress(100);
        setStatus("done");
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }
      setProgress(current);
    }, PROGRESS_INTERVAL_MS);
  }

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"], quality: 1 });
    if (result.canceled || result.assets.length === 0) {
      return;
    }
    const picked = result.assets[0];
    const uploaded: UploadedAsset = {
      uri: picked.uri,
      name: picked.fileName ?? "image.jpg",
      size: picked.fileSize,
      mimeType: picked.mimeType
    };
    setUpload("image", uploaded);
    simulateProgress();
  }

  async function pickFile() {
    const result = await DocumentPicker.getDocumentAsync({ type: DOC_TYPES, copyToCacheDirectory: true });
    if (result.canceled || result.assets.length === 0) {
      return;
    }
    const picked = result.assets[0];
    const uploaded: UploadedAsset = {
      uri: picked.uri,
      name: picked.name,
      size: picked.size ?? undefined,
      mimeType: picked.mimeType ?? undefined
    };
    setUpload("file", uploaded);
    simulateProgress();
  }

  function clear() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setUpload(kind, null);
    setProgress(0);
    setStatus("idle");
  }

  return {
    asset,
    progress,
    status,
    pick: kind === "image" ? pickImage : pickFile,
    clear
  };
}

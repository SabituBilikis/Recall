import { useEffect, useMemo, useState } from "react";

import { USE_BACKEND } from "@/lib/config/backend-flag";
import { isValidUrl } from "@/lib/validation";
import { fetchLinkPreview } from "@/services/link-preview.service";

import { getMockLinkPreview, type LinkPreview } from "../mock/mock-link-previews";

const DEBOUNCE_MS = 500;

// Resolves a link preview for the entered URL. Mock (flag off): synchronous stub.
// Backend (flag on): debounced edge-function fetch, with a loading flag.
export function useLinkPreview(url: string) {
  const mockPreview = useMemo(() => (USE_BACKEND ? null : getMockLinkPreview(url)), [url]);
  const [backendPreview, setBackendPreview] = useState<LinkPreview | null>(null);
  const [loading, setLoading] = useState(false);

  // All setState lives inside the timer callback so it never fires synchronously
  // in the effect body (avoids cascading renders).
  useEffect(() => {
    if (!USE_BACKEND) {
      return;
    }
    const trimmed = url.trim();
    let active = true;
    const timer = setTimeout(() => {
      if (!active) {
        return;
      }
      if (!isValidUrl(trimmed)) {
        setBackendPreview(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      void fetchLinkPreview(trimmed)
        .then((result) => {
          if (active) {
            setBackendPreview(result);
          }
        })
        .finally(() => {
          if (active) {
            setLoading(false);
          }
        });
    }, DEBOUNCE_MS);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [url]);

  return { preview: USE_BACKEND ? backendPreview : mockPreview, loading };
}

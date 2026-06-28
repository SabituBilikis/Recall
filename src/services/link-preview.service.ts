import type { LinkPreview } from "@/features/capture/mock/mock-link-previews";

import { supabase } from "./supabase-client";

type PreviewResponse = {
  title?: string;
  description?: string;
  image?: string | null;
  error?: string;
};

// Fetches link metadata via the `link-preview` edge function (server-side OG
// scrape). Returns null on any failure so the caller degrades gracefully.
export async function fetchLinkPreview(url: string): Promise<LinkPreview | null> {
  const { data, error } = await supabase.functions.invoke<PreviewResponse>("link-preview", {
    body: { url }
  });
  if (error || !data || data.error || !data.title) {
    return null;
  }
  return {
    title: data.title,
    description: data.description ?? "",
    imageUrl: data.image ?? undefined
  };
}

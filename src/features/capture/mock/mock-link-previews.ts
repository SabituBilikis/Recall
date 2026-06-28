export type LinkPreview = {
  title: string;
  description: string;
  imageUrl?: string;
};

// Mock metadata — no real URL fetching. Returns a preview once a URL is entered.
const defaultPreview: LinkPreview = {
  title: "Recall | home",
  description: "Save Everything Important. Find It Instantly."
};

export function getMockLinkPreview(url: string): LinkPreview | null {
  if (url.trim().length === 0) {
    return null;
  }
  return defaultPreview;
}

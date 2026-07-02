import type { SavedItem } from "@/types/saved-item";

// Mock items per collection (saved store starts empty). Keyed by collection id.
const itemsByCollection: Record<string, SavedItem[]> = {
  "collection-1": [
    { id: "ci-1", type: "screenshot", title: "Mobile Onboarding References", collectionName: "Design Inspiration", savedAtLabel: "Today" },
    { id: "ci-2", type: "link", title: "Pricing Research Links", collectionName: "Design Inspiration", savedAtLabel: "Yesterday" },
    { id: "ci-3", type: "note", title: "Product Ideas", collectionName: "Design Inspiration", savedAtLabel: "Jun 12" },
    { id: "ci-4", type: "file", title: "Brand Guidelines", collectionName: "Design Inspiration", savedAtLabel: "Jun 14" }
  ],
  "collection-2": [
    { id: "ci-5", type: "link", title: "Competitor Teardown", collectionName: "Research", savedAtLabel: "Yesterday" },
    { id: "ci-6", type: "note", title: "Interview Takeaways", collectionName: "Research", savedAtLabel: "Jun 10" }
  ],
  "collection-3": [
    { id: "ci-7", type: "note", title: "Weekend App Concept", collectionName: "Startup Ideas", savedAtLabel: "Jun 09" },
    { id: "ci-8", type: "screenshot", title: "Landing Page Idea", collectionName: "Startup Ideas", savedAtLabel: "Jun 01" }
  ]
};

export function getMockCollectionItems(collectionId: string): SavedItem[] {
  return itemsByCollection[collectionId] ?? [];
}

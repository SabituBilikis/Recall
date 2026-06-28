import type { Collection } from "@/types/collection";

// Canonical seed for the collections store (mirrors the Figma list).
export const mockCollections: Collection[] = [
  {
    id: "collection-1",
    name: "Design Inspiration",
    description: "Visual references, product ideas, and saved UI patterns.",
    color: "purple",
    icon: "folder",
    itemCount: 24,
    lastUpdatedLabel: "today",
    createdAt: "May 02"
  },
  {
    id: "collection-2",
    name: "Research",
    description: "Market notes, competitor links, and reading.",
    color: "blue",
    icon: "briefcase",
    itemCount: 18,
    lastUpdatedLabel: "yesterday",
    createdAt: "May 04"
  },
  {
    id: "collection-3",
    name: "Startup Ideas",
    description: "Raw ideas and product concepts worth revisiting.",
    color: "yellow",
    icon: "folderOpen",
    itemCount: 12,
    lastUpdatedLabel: "Jun 09",
    createdAt: "May 09"
  },
  {
    id: "collection-4",
    name: "Articles",
    description: "Long reads and useful write-ups.",
    color: "green",
    icon: "tray",
    itemCount: 9,
    lastUpdatedLabel: "May 23",
    createdAt: "May 11"
  },
  {
    id: "collection-5",
    name: "Personal Notes",
    description: "Quick thoughts, checklists, and reminders.",
    color: "red",
    icon: "book",
    itemCount: 6,
    lastUpdatedLabel: "May 20",
    createdAt: "May 12"
  },
  {
    id: "collection-6",
    name: "Saved Inspiro",
    description: "A grab-bag of things to come back to.",
    color: "grey",
    icon: "bookmark",
    itemCount: 4,
    lastUpdatedLabel: "May 14",
    createdAt: "May 14"
  }
];

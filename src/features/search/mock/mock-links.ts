import type { SearchItem } from "../types/search.types";

export const mockLinks: SearchItem[] = [
  {
    id: "l-1",
    type: "link",
    title: "Pricing Research Links",
    collectionName: "Research",
    savedAtLabel: "Yesterday",
    description: "Competitor pricing pages and benchmarks.",
    url: "https://recall.com/pricing-research",
    createdAt: "Jun 17",
    updatedAt: "Jun 17"
  },
  {
    id: "l-2",
    type: "link",
    title: "Competitor Teardown",
    collectionName: "Research",
    savedAtLabel: "Jun 09",
    description: "A deep dive into a competitor product.",
    url: "https://recall.com/teardown",
    createdAt: "Jun 09",
    updatedAt: "Jun 09"
  }
];

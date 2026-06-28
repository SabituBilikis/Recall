import type { DetailItem } from "../types/item.types";

export const mockLinkDetails: DetailItem[] = [
  {
    id: "ci-2",
    type: "link",
    title: "Recall Website",
    collection: "Research",
    dateSavedLabel: "Today",
    description: "A website that helps people to save everything and make it easy to recall",
    url: "https://recall.com",
    previewTitle: "Recall | home",
    previewSubtitle: "Save Everything Important. Find It Instantly.",
    createdAt: "Jun 17",
    updatedAt: "Jun 17"
  },
  {
    id: "l-1",
    type: "link",
    title: "Pricing Research",
    collection: "Research",
    dateSavedLabel: "Yesterday",
    description: "Competitor pricing pages and benchmarks worth revisiting.",
    url: "https://recall.com/pricing-research",
    previewTitle: "Recall | pricing",
    previewSubtitle: "Compare plans and find the right fit.",
    createdAt: "Jun 17",
    updatedAt: "Jun 17"
  }
];

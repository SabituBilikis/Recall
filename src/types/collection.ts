export type CollectionColor = "purple" | "blue" | "grey" | "green" | "yellow" | "red";

export type CollectionIcon = "folder" | "briefcase" | "folderOpen" | "tray" | "book" | "bookmark";

export type Collection = {
  id: string;
  name: string;
  description: string;
  color: CollectionColor;
  icon: CollectionIcon;
  itemCount: number;
  lastUpdatedLabel: string;
  createdAt: string;
};

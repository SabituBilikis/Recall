export type NotificationType = "welcome" | "reminder" | "system" | "item" | "collection";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  // Pre-formatted relative time for display (e.g. "Today", "Jun 12").
  createdAtLabel: string;
  read: boolean;
  data?: Record<string, unknown>;
};

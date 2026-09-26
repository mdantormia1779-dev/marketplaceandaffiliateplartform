export type NotificationCategory =
  | "sales"
  | "commission"
  | "bonus"
  | "referral"
  | "withdrawal"
  | "system";

export type CategoryFilter = NotificationCategory | "all";
export type ReadFilter = "all" | "unread" | "read";

export type Notification = {
  id: string;
  category: NotificationCategory;
  title: string;
  message: string;
  createdAt: string; // ISO
  read: boolean;
};

export const CATEGORY_LABELS: Record<NotificationCategory, string> = {
  sales: "Sales",
  commission: "Commission",
  bonus: "Bonus",
  referral: "Referral",
  withdrawal: "Withdrawal",
  system: "System",
};

export const CATEGORY_ORDER: NotificationCategory[] = [
  "sales",
  "commission",
  "bonus",
  "referral",
  "withdrawal",
  "system",
];

export const READ_FILTER_LABELS: Record<ReadFilter, string> = {
  all: "All Notifications",
  unread: "Unread Only",
  read: "Read Only",
};
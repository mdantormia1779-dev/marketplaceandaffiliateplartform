import { CategoryFilter, Notification, ReadFilter } from "./types";

export function getCategoryCounts(notifications: Notification[]) {
  return {
    all: notifications.length,
    sales: notifications.filter((n) => n.category === "sales").length,
    commission: notifications.filter((n) => n.category === "commission").length,
    bonus: notifications.filter((n) => n.category === "bonus").length,
    referral: notifications.filter((n) => n.category === "referral").length,
    withdrawal: notifications.filter((n) => n.category === "withdrawal").length,
    system: notifications.filter((n) => n.category === "system").length,
  };
}

export function getUnreadCount(notifications: Notification[]): number {
  return notifications.filter((n) => !n.read).length;
}

export function filterAndSortNotifications(
  notifications: Notification[],
  category: CategoryFilter,
  readFilter: ReadFilter
): Notification[] {
  let list = [...notifications];

  if (category !== "all") {
    list = list.filter((n) => n.category === category);
  }

  if (readFilter === "unread") {
    list = list.filter((n) => !n.read);
  } else if (readFilter === "read") {
    list = list.filter((n) => n.read);
  }

  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return list;
}

export function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}
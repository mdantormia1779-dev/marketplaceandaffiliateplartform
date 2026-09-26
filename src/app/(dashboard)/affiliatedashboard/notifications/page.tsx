"use client";

import { useMemo, useState } from "react";
import { CategoryFilter, Notification, ReadFilter } from "./types";
import { NOTIFICATIONS } from "./notificationsData";
import {
  filterAndSortNotifications,
  getCategoryCounts,
  getUnreadCount,
} from "./notificationsUtils";

import { NotificationsHeader } from "./components/NotificationsHeader";
import { CategoryTabs } from "./components/CategoryTabs";
import { ReadFilterDropdown } from "./components/ReadFilterDropdown";
import { NotificationList } from "./components/NotificationList";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [readFilter, setReadFilter] = useState<ReadFilter>("all");

  const counts = useMemo(() => getCategoryCounts(notifications), [notifications]);
  const unreadCount = useMemo(() => getUnreadCount(notifications), [notifications]);

  const filtered = useMemo(
    () => filterAndSortNotifications(notifications, activeCategory, readFilter),
    [notifications, activeCategory, readFilter]
  );

  const handleMarkAllRead = () => {
    // TODO: wire to your server action to persist read status
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <NotificationsHeader onMarkAllRead={handleMarkAllRead} disabled={unreadCount === 0} />

        <div className="mb-4 flex flex-col gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <CategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} counts={counts} />
          <ReadFilterDropdown value={readFilter} onChange={setReadFilter} />
        </div>

        <NotificationList notifications={filtered} />
      </div>
    </div>
  );
}
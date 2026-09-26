import { Notification } from "../types";
import { NotificationCard } from "./NotificationCard";

export function NotificationList({ notifications }: { notifications: Notification[] }) {
  if (!notifications.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <p className="text-sm text-slate-500">No notifications in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
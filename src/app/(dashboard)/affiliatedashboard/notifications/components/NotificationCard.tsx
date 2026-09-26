import { Clock } from "lucide-react";
import { Notification } from "../types";
import { formatRelativeTime } from "../notificationsUtils";
import { NotificationIcon } from "./NotificationIcon";

export function NotificationCard({ notification }: { notification: Notification }) {
  return (
    <div
      className={`relative flex items-start gap-3 rounded-xl border p-4 shadow-sm sm:p-5 ${
        notification.read
          ? "border-slate-100 bg-white"
          : "border-indigo-100 bg-indigo-50/40"
      }`}
    >
      <NotificationIcon category={notification.category} />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
        <p className="mt-1 text-sm text-slate-600">{notification.message}</p>
        <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
          <Clock size={12} />
          {formatRelativeTime(notification.createdAt)}
        </div>
      </div>

      {!notification.read && (
        <span className="absolute right-4 top-4 h-2.5 w-2.5 shrink-0 rounded-full bg-indigo-600" />
      )}
    </div>
  );
}
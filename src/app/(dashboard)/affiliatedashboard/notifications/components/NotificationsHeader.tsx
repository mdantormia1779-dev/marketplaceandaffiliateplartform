import Link from "next/link";
import { CheckCheck, Settings } from "lucide-react";

export function NotificationsHeader({
  onMarkAllRead,
  disabled,
}: {
  onMarkAllRead: () => void;
  disabled: boolean;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Notifications</h1>
        <p className="text-sm text-slate-500">Stay updated with your affiliate activities.</p>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={onMarkAllRead}
          disabled={disabled}
          className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium shadow-sm transition ${
            disabled
              ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          <CheckCheck size={16} />
          Mark all as read
        </button>

        <Link
          href="/affiliatedashboard/settings"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <Settings size={16} />
          Settings
        </Link>
      </div>
    </div>
  );
}
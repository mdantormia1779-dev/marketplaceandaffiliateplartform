import type { LinkStatus } from "./types";

const STYLES: Record<LinkStatus, { dot: string; pill: string }> = {
  Active: { dot: "bg-emerald-500", pill: "bg-emerald-50 text-emerald-600" },
  Paused: { dot: "bg-amber-500", pill: "bg-amber-50 text-amber-600" },
  Expired: { dot: "bg-gray-400", pill: "bg-gray-100 text-gray-500" },
};

export default function StatusBadge({ status }: { status: LinkStatus }) {
  const style = STYLES[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.pill}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}
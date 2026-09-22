import { Clock } from "lucide-react";
import { TONE_STYLES } from "../pendingConstants";
import { formatWaitingTime, getUrgencyTone, getWaitingHours } from "../pendingUtils";

export function WaitingBadge({ createdAt, now }: { createdAt: string; now: number | null }) {
  // "now" is null on the first render, avoids hydration mismatch
  if (now === null) return null;

  const hours = getWaitingHours(createdAt, now);
  const tone = TONE_STYLES[getUrgencyTone(hours)];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset ${tone.badge}`}
    >
      <Clock size={11} />
      {formatWaitingTime(hours)}
    </span>
  );
}
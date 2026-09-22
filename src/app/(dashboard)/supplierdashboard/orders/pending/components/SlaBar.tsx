import { SLA_HOURS, TONE_STYLES } from "../pendingConstants";
import { getSlaInfo, getUrgencyTone, getWaitingHours } from "../pendingUtils";

export function SlaBar({ createdAt, now }: { createdAt: string; now: number | null }) {
  if (now === null) return null;

  const hours = getWaitingHours(createdAt, now);
  const { pct, remaining, breached } = getSlaInfo(hours);
  const tone = TONE_STYLES[getUrgencyTone(hours)];

  return (
    <div className="mt-4">
      <div className="mb-1.5 flex items-center justify-between text-[11px]">
        <span className="text-slate-400">Respond within {SLA_HOURS}h</span>
        <span className={breached ? "font-medium text-rose-600" : "text-slate-500"}>
          {breached ? "Response time exceeded" : `${remaining}h left`}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
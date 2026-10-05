import { SUMMARY_SUBTITLE } from "./data";
import { money2, refersLabel } from "./format";
import SettingsCard from "./SettingsCard";
import { Settings } from "./types";

// Ei card niche er form er draft theke live update hoy
export default function RewardsSummaryCard({ settings: s }: { settings: Settings }) {
  const off = !s.enabled;

  return (
    <SettingsCard
      title="Active Referral Rewards"
      subtitle={SUMMARY_SUBTITLE[s.rewardType]}
      action={
        off ? (
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">Program off</span>
        ) : undefined
      }
    >
      {s.rewards.map((r) => (
        <div
          key={r.id}
          className={`flex items-center justify-between gap-6 border-t border-gray-100 px-5 py-3 text-sm ${off ? "opacity-50" : ""}`}
        >
          <span className="text-gray-700">{refersLabel(r.from, r.to)}</span>
          <span className="font-semibold tabular-nums text-gray-900">{money2(r.amount)}</span>
        </div>
      ))}
    </SettingsCard>
  );
}
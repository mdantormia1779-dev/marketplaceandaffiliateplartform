import { TIER_MAX_BONUS } from "./data";
import { money2 } from "./format";
import SettingsCard from "./SettingsCard";
import { Settings } from "./types";

// Ei card niche er form er draft theke live update hoy
export default function RulesSummaryCard({ settings: s }: { settings: Settings }) {
  const rules = [
    { id: "tier", label: "Tier milestone reached", value: `Up to ${money2(TIER_MAX_BONUS)}`, on: s.tierEnabled },
    { id: "quarterly", label: "Quarterly performance leader", value: money2(s.quarterlyAmount), on: s.quarterlyEnabled },
    {
      id: "welcome",
      label: `Welcome bonus (first ${Number.isFinite(s.welcomeConversions) ? s.welcomeConversions : 0} conversions)`,
      value: money2(s.welcomeAmount),
      on: s.welcomeEnabled,
    },
    { id: "seasonal", label: "Seasonal campaign top performer", value: money2(s.seasonalAmount), on: s.seasonalEnabled },
  ];

  return (
    <SettingsCard
      title="Active Bonus Rules"
      subtitle="Reward value per qualifying action"
      action={
        !s.enabled ? (
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">Bonuses off</span>
        ) : undefined
      }
    >
      {rules.map((r) => {
        const active = s.enabled && r.on;
        return (
          <div
            key={r.id}
            className={`flex items-center justify-between gap-6 border-t border-gray-100 px-5 py-3.5 text-sm ${active ? "" : "opacity-50"}`}
          >
            <span className="text-gray-700">{r.label}</span>
            <span className="flex items-center gap-3">
              {s.enabled && !r.on && <span className="text-xs text-gray-500">Off</span>}
              <span className="font-semibold tabular-nums text-gray-900">{r.value}</span>
            </span>
          </div>
        );
      })}
    </SettingsCard>
  );
}
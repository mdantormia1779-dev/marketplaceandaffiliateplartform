import { TriangleAlert } from "lucide-react";
import SettingRow from "./SettingRow";
import SettingsCard from "./SettingsCard";
import Toggle from "./Toggle";
import { Settings } from "./types";

interface Props {
  settings: Settings;
  onChange: (patch: Partial<Settings>) => void;
}

export default function OperationsCard({ settings: s, onChange }: Props) {
  return (
    <SettingsCard title="Operations" subtitle="Control registrations, notifications and maintenance.">
      <SettingRow
        label="Allow new registrations"
        description={!s.allowRegistrations ? "New customers, suppliers and affiliates can't sign up." : undefined}
      >
        <Toggle
          label="Allow new registrations"
          checked={s.allowRegistrations}
          onChange={(v) => onChange({ allowRegistrations: v })}
        />
      </SettingRow>

      <SettingRow
        label="Email notifications"
        description={!s.emailNotifications ? "The platform won't send any emails while this is off." : undefined}
      >
        <Toggle
          label="Email notifications"
          checked={s.emailNotifications}
          onChange={(v) => onChange({ emailNotifications: v })}
        />
      </SettingRow>

      <SettingRow label="Maintenance mode" description="Temporarily hide the storefront from visitors">
        <Toggle
          label="Maintenance mode"
          checked={s.maintenanceMode}
          onChange={(v) => onChange({ maintenanceMode: v })}
        />
      </SettingRow>

      {s.maintenanceMode && (
        <div
          role="status"
          className="flex items-start gap-2.5 border-t border-amber-100 bg-amber-50 px-5 py-3 text-sm text-amber-900"
        >
          <TriangleAlert size={16} className="mt-0.5 shrink-0" />
          Visitors will see a maintenance page once you save. Turn this off when you&apos;re done.
        </div>
      )}
    </SettingsCard>
  );
}
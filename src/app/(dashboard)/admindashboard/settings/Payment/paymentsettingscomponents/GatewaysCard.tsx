import GatewayRow from "./GatewayRow";
import SettingsCard from "./SettingsCard";
import { Errors, Gateway } from "./types";

interface Props {
  gateways: Gateway[];
  symbol: string;
  errors: Errors;
  onChange: (id: string, patch: Partial<Gateway>) => void;
}

export default function GatewaysCard({ gateways, symbol, errors, onChange }: Props) {
  const activeCount = gateways.filter((g) => g.active).length;

  return (
    <SettingsCard
      title="Connected Payment Methods"
      subtitle="Gateways available at checkout"
      action={
        <span className="text-xs text-gray-500">
          {activeCount} of {gateways.length} active
        </span>
      }
    >
      {gateways.map((g) => (
        <GatewayRow key={g.id} gateway={g} symbol={symbol} errors={errors} onChange={(patch) => onChange(g.id, patch)} />
      ))}
      {errors.gateways && <p className="border-t border-gray-100 px-5 py-3 text-xs text-red-600">{errors.gateways}</p>}
    </SettingsCard>
  );
}
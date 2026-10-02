import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle: string;
  legendLabel: string;
  legendColor: string; // hex
  children: ReactNode;
}

// Duita chart ei same card er vitor e boshe, tai alada component
export default function ChartCard({ title, subtitle, legendLabel, legendColor, children }: ChartCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        <span className="flex items-center gap-1.5 text-sm text-gray-500">
          <span className="h-2 w-2 rounded-full" style={{ background: legendColor }} />
          {legendLabel}
        </span>
      </div>
      <div className="h-64 px-2 py-4">{children}</div>
    </div>
  );
}
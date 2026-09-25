import { TrafficSourceItem } from "./types";

interface TrafficSourcesDonutProps {
  items: TrafficSourceItem[];
  totalLabel: string;
  totalValue: string;
  delay?: number;
}

export default function TrafficSourcesDonut({
  items,
  totalLabel,
  totalValue,
  delay = 0,
}: TrafficSourcesDonutProps) {
  const total = items.reduce((sum, item) => sum + item.value, 0);

  let cumulativePercent = 0;
  const gradientStops: string[] = items.map((item) => {
    const percent = (item.value / total) * 100;
    const start = cumulativePercent;
    const end = cumulativePercent + percent;
    cumulativePercent = end;
    return item.color + " " + start + "% " + end + "%";
  });

  const conicGradient = "conic-gradient(" + gradientStops.join(", ") + ")";

  return (
    <div
      className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 animate-fade-up"
      style={{ animationDelay: delay + "ms" }}
    >
      <div>
        <h2 className="text-base font-bold text-slate-900">Traffic Sources</h2>
        <p className="text-xs text-slate-500 mt-0.5">Where your affiliate traffic comes from.</p>
      </div>

      <div className="flex justify-center">
        <div
          className="relative w-40 h-40 rounded-full flex items-center justify-center"
          style={{ background: conicGradient }}
        >
          <div className="absolute w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {totalLabel}
            </span>
            <span className="text-base font-bold text-slate-900">{totalValue}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 font-medium text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.dotColor }}></span>
                {item.label}
              </span>
              <span className="font-bold text-slate-900">{item.value.toLocaleString()}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: ((item.value / total) * 100).toFixed(1) + "%",
                  backgroundColor: item.dotColor,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
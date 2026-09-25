import { DeviceStat } from "./types";

const DEVICES: DeviceStat[] = [
  { label: "Mobile", value: "65.4%", width: "65.4%", color: "bg-indigo-600", dot: "bg-indigo-600" },
  { label: "Desktop", value: "27.5%", width: "27.5%", color: "bg-amber-400", dot: "bg-amber-400" },
  { label: "Tablet", value: "7.1%", width: "7.1%", color: "bg-emerald-500", dot: "bg-emerald-500" },
];

export default function TopDevices() {
  return (
    <div
      className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between animate-fade-up"
      style={{ animationDelay: "600ms" }}
    >
      <div>
        <h2 className="text-base font-bold text-slate-900">Top Devices</h2>
        <p className="text-xs text-slate-500 mt-0.5">How visitors browse your links.</p>
      </div>

      <div className="flex flex-col items-center justify-center py-6">
        <div className="relative w-36 h-36 rounded-full border-[14px] border-indigo-600 border-t-emerald-500 border-r-amber-400 flex items-center justify-center shadow-inner transition-transform duration-700 hover:scale-105">
          <div className="text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Total Visits
            </span>
            <span className="text-base font-bold text-slate-900">24,850</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        {DEVICES.map((d: DeviceStat) => (
          <div key={d.label}>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${d.dot}`} /> {d.label}
              </span>
              <span>{d.value}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`${d.color} h-full rounded-full transition-all duration-1000 ease-out`}
                style={{ width: d.width }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
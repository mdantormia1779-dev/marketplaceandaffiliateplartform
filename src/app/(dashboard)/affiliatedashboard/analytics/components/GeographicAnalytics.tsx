import { MapPin } from "lucide-react";
import { CountryPerformance } from "./types";

interface GeographicAnalyticsProps {
  countries: CountryPerformance[];
  delay?: number;
}

export default function GeographicAnalytics({ countries, delay = 0 }: GeographicAnalyticsProps) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden animate-fade-up"
      style={{ animationDelay: delay + "ms" }}
    >
      <div className="p-6 pb-0 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
          <MapPin className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">Geographic Analytics</h2>
          <p className="text-xs text-slate-500 mt-0.5">Performance by country and region.</p>
        </div>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3">Country</th>
              <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3">Visitors</th>
              <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3">Clicks</th>
              <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3">Orders</th>
              <th className="text-right font-semibold text-[11px] uppercase tracking-wider text-slate-400 px-6 py-3">Conversion</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.code} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-600">
                      {country.code}
                    </span>
                    <span className="font-semibold text-slate-800">{country.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-slate-600">{country.visitors}</td>
                <td className="px-6 py-4 text-right text-slate-600">{country.clicks}</td>
                <td className="px-6 py-4 text-right text-slate-600">{country.orders}</td>
                <td className="px-6 py-4 text-right">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                    {country.conversion}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
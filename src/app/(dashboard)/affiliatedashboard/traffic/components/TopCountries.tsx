import { CountryStat } from "./types";

const COUNTRIES: CountryStat[] = [
  { code: "BD", name: "Bangladesh", visitors: "9,420", percentage: "37.9%", width: "75%" },
  { code: "IN", name: "India", visitors: "5,180", percentage: "20.8%", width: "45%" },
  { code: "US", name: "United States", visitors: "3,460", percentage: "13.9%", width: "30%" },
  { code: "PK", name: "Pakistan", visitors: "2,210", percentage: "8.9%", width: "20%" },
  { code: "GB", name: "United Kingdom", visitors: "1,680", percentage: "6.8%", width: "15%" },
  { code: "ID", name: "Indonesia", visitors: "1,240", percentage: "5%", width: "10%" },
];

export default function TopCountries() {
  return (
    <div
      className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 animate-fade-up"
      style={{ animationDelay: "750ms" }}
    >
      <div>
        <h2 className="text-base font-bold text-slate-900">Top Countries</h2>
        <p className="text-xs text-slate-500 mt-0.5">Where your traffic is coming from.</p>
      </div>

      <div className="space-y-5">
        {COUNTRIES.map((country: CountryStat, idx: number) => (
          <div key={country.code} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-600">
                  {country.code}
                </span>
                <span className="font-semibold text-slate-800">{country.name}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900">{country.visitors}</span>
                <span className="text-xs text-slate-400 ml-2">{country.percentage} of traffic</span>
              </div>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: country.width, transitionDelay: `${idx * 60}ms` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
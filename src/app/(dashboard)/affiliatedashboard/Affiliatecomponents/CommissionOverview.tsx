import { Clock } from "lucide-react";

const breakdown = [
  { label: "Product Sales", value: 65, color: "#6366f1" },
  { label: "Referral Bonus", value: 22, color: "#10b981" },
  { label: "Campaign Rewards", value: 13, color: "#f59e0b" },
];

export default function CommissionOverview() {
  let cumulative = 0;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Commission Overview
          </h2>
          <p className="text-sm text-gray-400">Lifetime commission breakdown</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50">
          <Clock className="h-[18px] w-[18px] text-emerald-500" />
        </div>
      </div>

      <div className="mb-5 flex justify-center">
        <svg width={160} height={160} viewBox="0 0 160 160">
          <g transform="translate(80,80) rotate(-90)">
            {breakdown.map((slice) => {
              const dash = (slice.value / 100) * circumference;
              const offset = (cumulative / 100) * circumference;
              cumulative += slice.value;
              return (
                <circle
                  key={slice.label}
                  r={radius}
                  fill="none"
                  stroke={slice.color}
                  strokeWidth={18}
                  strokeDasharray={`${dash} ${circumference - dash}`}
                  strokeDashoffset={-offset}
                  strokeLinecap="round"
                />
              );
            })}
          </g>
          <text
            x="80"
            y="76"
            textAnchor="middle"
            className="fill-gray-900 text-lg font-semibold"
          >
            ৳58,420
          </text>
          <text
            x="80"
            y="94"
            textAnchor="middle"
            className="fill-gray-400 text-[10px]"
          >
            Total earned
          </text>
        </svg>
      </div>

      <div className="space-y-3">
        {breakdown.map((slice) => (
          <div key={slice.label} className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm text-gray-600">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: slice.color }}
              />
              {slice.label}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {slice.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
import ChartCard from "./ChartCard";

const GREEN = "#1fa85a";
const ORANGE = "#f5a524";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
// values in $k
const revenue = [70, 75, 88, 93, 104, 118, 114, 122, 130, 140, 158, 181];
const commission = [4, 6, 8, 9, 10, 11, 12, 12, 13, 14, 16, 18];

const W = 640, H = 260;
const L = 50, R = 12, T = 12, Bt = 28;
const MAX = 180;
const ticks = [0, 45, 90, 135, 180];

const x = (i: number) => L + (i * (W - L - R)) / (months.length - 1);
const y = (v: number) => T + (1 - v / MAX) * (H - T - Bt);

function smooth(data: number[]) {
  let d = `M ${x(0)} ${y(data[0])}`;
  for (let i = 1; i < data.length; i++) {
    const cx = (x(i - 1) + x(i)) / 2;
    d += ` C ${cx} ${y(data[i - 1])}, ${cx} ${y(data[i])}, ${x(i)} ${y(data[i])}`;
  }
  return d;
}

export default function RevenueChart() {
  const area = `${smooth(revenue)} L ${x(11)} ${y(0)} L ${x(0)} ${y(0)} Z`;
  return (
    <ChartCard
      title="Revenue Overview"
      subtitle="Gross merchandise value vs platform commission"
      legend={[
        { label: "Revenue", color: GREEN },
        { label: "Commission", color: ORANGE },
      ]}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Revenue and commission by month">
        <defs>
          <linearGradient id="rev-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={GREEN} stopOpacity="0.22" />
            <stop offset="100%" stopColor={GREEN} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="com-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={ORANGE} stopOpacity="0.18" />
            <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
          </linearGradient>
        </defs>

        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke="#e2e8f0" strokeDasharray="3 4" />
            <text x={L - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#64748b">
              {t === 0 ? "$0k" : `$${t}k`}
            </text>
          </g>
        ))}

        <path d={area} fill="url(#rev-fill)" />
        <path
          d={`${smooth(commission)} L ${x(11)} ${y(0)} L ${x(0)} ${y(0)} Z`}
          fill="url(#com-fill)"
        />
        <path d={smooth(revenue)} fill="none" stroke={GREEN} strokeWidth="2" />
        <path d={smooth(commission)} fill="none" stroke={ORANGE} strokeWidth="2" />

        {months.map((m, i) => (
          <text key={m} x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#64748b">
            {m}
          </text>
        ))}
      </svg>
    </ChartCard>
  );
}
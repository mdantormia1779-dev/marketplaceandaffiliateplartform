import ChartCard from "./ChartCard";

const GREEN = "#1fa85a";
const ORANGE = "#f5a524";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const orders = [960, 1010, 1250, 1330, 1480, 1560, 1480, 1560, 1700, 1760, 1930, 2150];
const delivered = [880, 910, 1130, 1210, 1330, 1450, 1380, 1440, 1580, 1630, 1820, 2050];

const W = 640, H = 260;
const L = 50, R = 12, T = 12, Bt = 28;
const MAX = 2200;
const ticks = [0, 550, 1100, 1650, 2200];

const y = (v: number) => T + (1 - v / MAX) * (H - T - Bt);

export default function OrdersChart() {
  const slot = (W - L - R) / months.length;
  const barW = slot * 0.3;
  return (
    <ChartCard
      title="Orders Overview"
      subtitle="Total orders and delivered orders"
      legend={[
        { label: "Orders", color: GREEN },
        { label: "Delivered", color: ORANGE },
      ]}
    >
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Orders and delivered orders by month">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke="#e2e8f0" strokeDasharray="3 4" />
            <text x={L - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#64748b">
              {t}
            </text>
          </g>
        ))}

        {months.map((m, i) => {
          const cx = L + slot * i + slot / 2;
          return (
            <g key={m}>
              <rect x={cx - barW - 1} y={y(orders[i])} width={barW} height={y(0) - y(orders[i])} rx="2" fill={GREEN} />
              <rect x={cx + 1} y={y(delivered[i])} width={barW} height={y(0) - y(delivered[i])} rx="2" fill={ORANGE} />
              <text x={cx} y={H - 8} textAnchor="middle" fontSize="11" fill="#64748b">
                {m}
              </text>
            </g>
          );
        })}
      </svg>
    </ChartCard>
  );
}
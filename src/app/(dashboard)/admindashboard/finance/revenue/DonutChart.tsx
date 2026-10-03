import { Method } from "./types";

interface Props {
  methods: Method[];
  colors: string[];
  hovered: number | null;
  onHover: (i: number | null) => void;
}

const RADIUS = 70;
const STROKE = 28;
const CIRC = 2 * Math.PI * RADIUS;
const GAP = 2;

export default function DonutChart({ methods, colors, hovered, onHover }: Props) {
  const total = methods.reduce((s, m) => s + m.share, 0);
  const active = hovered !== null ? methods[hovered] : null;
  let offset = 0;

  return (
    <>
      <div className="relative mx-auto h-[190px] w-[190px]" style={{ animation: "donutIn 700ms ease-out" }}>
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          <circle cx="100" cy="100" r={RADIUS} fill="none" stroke="#f3f4f6" strokeWidth={STROKE} />
          {methods.map((m, i) => {
            const len = (m.share / total) * CIRC;
            const dash = Math.max(len - GAP, 0);
            const circle = (
              <circle
                key={m.name}
                cx="100"
                cy="100"
                r={RADIUS}
                fill="none"
                stroke={colors[i % colors.length]}
                strokeWidth={STROKE}
                strokeDasharray={`${dash} ${CIRC - dash}`}
                strokeDashoffset={-offset}
                opacity={hovered === null || hovered === i ? 1 : 0.35}
                style={{ transition: "opacity 150ms ease-out", animation: `donutSliceIn ${700 + i * 120}ms ease-out` }}
                onMouseEnter={() => onHover(i)}
                onMouseLeave={() => onHover(null)}
              />
            );
            offset += len;
            return circle;
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold text-gray-900">{active ? `${active.share}%` : total}</span>
          <span className="text-xs text-gray-500">{active ? active.name : "total"}</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes donutIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes donutSliceIn {
          from { opacity: 0; stroke-dasharray: 0 ${CIRC}; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}

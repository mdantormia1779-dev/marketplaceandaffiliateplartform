import { StatItem } from "../types";
import { StatCard } from "./StatCard";


export function StatsGrid({ stats }: { stats: StatItem[] }) {
  return (
    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
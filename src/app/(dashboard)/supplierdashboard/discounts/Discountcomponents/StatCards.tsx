import { CalendarClock, ShoppingCart, Tag, Zap } from "lucide-react";
import StatCard from "./StatCard";
import { PERIOD_STATS } from "./data";
import { money } from "./lib";

interface StatCardsProps {
  activeCount: number;
  scheduledCount: number;
}

export default function StatCards({ activeCount, scheduledCount }: StatCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Active Rules"
        value={String(activeCount)}
        change={PERIOD_STATS.activeChange}
        caption="Auto-applying right now"
        icon={<Zap className="h-4 w-4 text-blue-600" />}
        tint="bg-blue-50"
      />
      <StatCard
        label="Scheduled"
        value={String(scheduledCount)}
        change={PERIOD_STATS.scheduledChange}
        caption="Queued for a future date"
        icon={<CalendarClock className="h-4 w-4 text-slate-600" />}
        tint="bg-slate-100"
      />
      <StatCard
        label="Discount Uses"
        value={PERIOD_STATS.uses.toLocaleString()}
        change={PERIOD_STATS.usesChange}
        caption="Orders with an auto discount"
        icon={<ShoppingCart className="h-4 w-4 text-emerald-600" />}
        tint="bg-emerald-50"
      />
      <StatCard
        label="Discounts Given"
        value={money(PERIOD_STATS.discountsGiven)}
        change={PERIOD_STATS.discountsChange}
        caption="Total value discounted"
        icon={<Tag className="h-4 w-4 text-emerald-600" />}
        tint="bg-emerald-50"
      />
    </div>
  );
}
import { CalendarClock, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { TRENDS } from "./data";
import FeaturedStatCard from "./FeaturedStatCard";

interface Props {
  stats: { slots: number; active: number; scheduled: number; expired: number };
}

export default function FeaturedStats({ stats }: Props) {
  const cards = [
    { title: "Featured Slots", value: stats.slots, icon: Sparkles, iconClass: "bg-amber-50 text-amber-700", trend: TRENDS.slots },
    { title: "Active", value: stats.active, icon: CheckCircle2, iconClass: "bg-emerald-50 text-emerald-600", trend: TRENDS.active },
    { title: "Scheduled", value: stats.scheduled, icon: CalendarClock, iconClass: "bg-teal-50 text-teal-700", trend: TRENDS.scheduled },
    { title: "Expired", value: stats.expired, icon: Clock, iconClass: "bg-gray-100 text-gray-600", trend: TRENDS.expired },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <FeaturedStatCard key={c.title} {...c} />
      ))}
    </div>
  );
}
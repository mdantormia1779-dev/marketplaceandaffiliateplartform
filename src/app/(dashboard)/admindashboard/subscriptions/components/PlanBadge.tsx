import { Plan } from "../types";

const styles: Record<Plan, string> = {
  Elite: "bg-emerald-100 text-emerald-800",
  Growth: "bg-amber-100 text-amber-800",
  Starter: "bg-teal-100 text-teal-800",
  Trial: "bg-slate-200 text-slate-700",
};

export default function PlanBadge({ plan }: { plan: Plan }) {
  return <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${styles[plan]}`}>{plan}</span>;
}
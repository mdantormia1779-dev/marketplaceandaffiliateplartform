import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Panel from "./Panel";

const badge = {
  green: "bg-emerald-50 text-emerald-700",
  orange: "bg-amber-50 text-amber-700",
  teal: "bg-teal-50 text-teal-800",
  gray: "bg-slate-100 text-slate-700",
};

const actions = [
  { count: 14, title: "Product approvals", desc: "New listings awaiting moderation", cta: "Review products", href: "/admindashboard/products", tone: "green" },
  { count: 6, title: "Supplier applications", desc: "Stores requesting to join", cta: "Review suppliers", href: "/admindashboard/approvals", tone: "orange" },
  { count: 9, title: "Withdrawal requests", desc: "Affiliate payouts to process", cta: "Process payouts", href: "/admindashboard/affiliates", tone: "teal" },
  { count: 8, title: "Flagged reviews", desc: "Reported by customers", cta: "Moderate reviews", href: "/admindashboard/reviews", tone: "gray" },
] as const;

export default function PendingActions() {
  return (
    <Panel title="Pending Actions" subtitle="Items requiring your attention">
      <ul>
        {actions.map((a) => (
          <li
            key={a.title}
            className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${badge[a.tone]}`}>
                {a.count}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-medium text-slate-900">{a.title}</p>
                <p className="mt-0.5 text-xs text-slate-500">{a.desc}</p>
              </div>
            </div>
            <Link
              href={a.href}
              className="flex shrink-0 items-center gap-1 text-xs font-medium text-emerald-700 hover:underline"
            >
              {a.cta}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
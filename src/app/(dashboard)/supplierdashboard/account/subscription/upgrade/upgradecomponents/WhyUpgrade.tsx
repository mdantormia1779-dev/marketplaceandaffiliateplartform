import { BarChart3, Lightbulb, Megaphone, ShoppingBag, LucideIcon } from "lucide-react";
import { perks } from "./data";
import { Perk } from "./types";

const icons: Record<Perk["icon"], LucideIcon> = {
  products: ShoppingBag,
  analytics: BarChart3,
  tools: Megaphone,
};

export default function WhyUpgrade() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><Lightbulb size={18} /></span>
        <div>
          <h2 className="font-semibold text-slate-900">Why upgrade?</h2>
          <p className="mt-1 max-w-xl text-sm text-slate-500">
            Get access to higher product limits, advanced analytics, promotional tools and additional features as your business grows.
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {perks.map((p) => {
          const Icon = icons[p.icon];
          return (
            <div key={p.title} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600"><Icon size={16} /></span>
              <p className="mt-4 text-sm font-semibold text-slate-900">{p.title}</p>
              <p className="mt-1 text-sm text-slate-500">{p.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
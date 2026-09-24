import UsageCard from "./UsageCard";
import { UsageItem } from "./types";

export default function UsageSection({ usage }: { usage: UsageItem[] }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-900">Plan Usage</h2>
      <p className="mb-4 mt-1 text-xs text-slate-500">How much of your plan you have used this cycle.</p>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {usage.map((u) => <UsageCard key={u.key} item={u} />)}
      </div>
    </section>
  );
}
import { ReactNode } from "react";
import Card from "./Card";

interface Props { icon: ReactNode; label: string; value: string; caption: string; highlight?: boolean }

export default function StatCard({ icon, label, value, caption, highlight }: Props) {
  return (
    <Card className={`p-5 ${highlight ? "border-blue-100 bg-blue-50/60" : ""}`}>
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-100 bg-white text-blue-600">{icon}</span>
        {label}
      </div>
      <p className="mt-5 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{caption}</p>
    </Card>
  );
}   
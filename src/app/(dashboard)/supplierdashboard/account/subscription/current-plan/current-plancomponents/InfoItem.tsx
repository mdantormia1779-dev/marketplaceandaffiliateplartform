import { ReactNode } from "react";

interface Props { icon: ReactNode; label: string; children: ReactNode }

export default function InfoItem({ icon, label, children }: Props) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">{icon}</span>
      <div>
        <p className="text-[11px] text-slate-500">{label}</p>
        <div className="text-sm font-semibold text-slate-900">{children}</div>
      </div>
    </div>
  );
}
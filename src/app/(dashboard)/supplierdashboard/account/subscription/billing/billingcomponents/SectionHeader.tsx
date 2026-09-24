import { ReactNode } from "react";

interface Props { title: string; subtitle: string; action?: ReactNode }

export default function SectionHeader({ title, subtitle, action }: Props) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-base font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}
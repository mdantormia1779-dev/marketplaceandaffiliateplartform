import type { ReactNode } from "react";

export default function Panel({
  title, subtitle, action, children, className = "",
}: {
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`overflow-hidden rounded-xl border border-slate-200 bg-white ${className}`}>
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
        <div>
          <h3 className="text-[15px] font-semibold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
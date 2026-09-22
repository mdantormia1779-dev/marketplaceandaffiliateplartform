import type { ReactNode } from "react";

export default function Card({
  title,
  description,
  right,
  children,
}: {
  title: string;
  description?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 lg:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[14px] font-semibold text-slate-900">{title}</h3>
          {description && <p className="mt-1 text-[12px] text-slate-500">{description}</p>}
        </div>
        {right}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
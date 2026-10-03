import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  right?: ReactNode;
  className?: string;
  children: ReactNode;
}

export default function ChartCard({ title, subtitle, right, className = "", children }: Props) {
  return (
    <section className={`rounded-xl border border-gray-200 bg-white ${className}`}>
      <header className="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>
        </div>
        {right}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

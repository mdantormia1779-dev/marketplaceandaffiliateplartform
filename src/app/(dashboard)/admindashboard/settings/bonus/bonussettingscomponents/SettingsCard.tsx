import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function SettingsCard({ title, subtitle, action, children }: Props) {
  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <header className="flex items-start justify-between gap-4 px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}
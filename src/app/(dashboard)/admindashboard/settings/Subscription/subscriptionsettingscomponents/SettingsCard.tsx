import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function SettingsCard({ title, subtitle, children }: Props) {
  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <header className="px-5 py-4">
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>
      </header>
      {children}
    </section>
  );
}
import { ReactNode } from "react";

interface Props {
  label: ReactNode;
  description?: string;
  error?: string;
  children: ReactNode;
}

export default function SettingRow({ label, description, error, children }: Props) {
  return (
    <div className="flex items-center justify-between gap-6 border-t border-gray-100 px-5 py-3.5">
      <div>
        <p className="text-sm text-gray-900">{label}</p>
        {description && <p className="mt-0.5 text-xs text-gray-500">{description}</p>}
      </div>
      <div className="flex flex-col items-end">
        {children}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    </div>
  );
}
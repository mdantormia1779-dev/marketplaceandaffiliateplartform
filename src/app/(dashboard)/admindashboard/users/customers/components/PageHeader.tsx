import { Plus } from "lucide-react";

type Props = {
  onOpenModal: () => void;
};

export default function PageHeader({ onOpenModal }: Props) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Customers</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage marketplace buyers, their activity and account status.
        </p>
      </div>
      <button
        onClick={onOpenModal}
        className="flex items-center gap-2 rounded-lg bg-[#1fa85a] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#189a50] shadow-sm"
      >
        <Plus className="h-4 w-4" />
        Add Customer
      </button>
    </div>
  );
}
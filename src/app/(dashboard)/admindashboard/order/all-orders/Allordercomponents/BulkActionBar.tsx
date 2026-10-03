import { Truck, PackageCheck, RotateCcw, XCircle, Trash2, X } from "lucide-react";

interface Props {
  count: number;
  onShip: () => void;
  onDeliver: () => void;
  onRefund: () => void;
  onCancel: () => void;
  onDelete: () => void;
  onClear: () => void;
}

export default function BulkActionBar({ count, onShip, onDeliver, onRefund, onCancel, onDelete, onClear }: Props) {
  const btn =
    "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40";
  const none = count === 0;

  return (
    <div className="fixed bottom-6 left-1/2 z-40 flex max-w-[95vw] -translate-x-1/2 flex-wrap items-center justify-center gap-1 rounded-xl bg-gray-900 px-3 py-2 text-white shadow-2xl">
      <span className="px-3 text-sm font-medium">{count} selected</span>
      <span className="mx-1 hidden h-5 w-px bg-white/20 sm:block" />
      <button className={btn} disabled={none} onClick={onShip}><Truck size={15} /> Ship</button>
      <button className={btn} disabled={none} onClick={onDeliver}><PackageCheck size={15} /> Deliver</button>
      <button className={btn} disabled={none} onClick={onRefund}><RotateCcw size={15} /> Refund</button>
      <button className={btn} disabled={none} onClick={onCancel}><XCircle size={15} /> Cancel</button>
      <button className={`${btn} text-red-300`} disabled={none} onClick={onDelete}><Trash2 size={15} /> Delete</button>
      <span className="mx-1 hidden h-5 w-px bg-white/20 sm:block" />
      <button className={btn} onClick={onClear}><X size={15} /> Clear</button>
    </div>
  );
}
const styles: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Refunded: "bg-purple-100 text-purple-700",
  Unpaid: "bg-red-100 text-red-700",
  Pending: "bg-orange-100 text-orange-700",
  Processing: "bg-amber-100 text-amber-700",
  Shipped: "bg-slate-100 text-slate-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function StatusBadge({ label }: { label: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${styles[label]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
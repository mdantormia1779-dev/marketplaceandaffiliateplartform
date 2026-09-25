export default function CommissionBadge({ percent }: { percent: number }) {
  return (
    <span className="rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-gray-800 shadow-sm">
      {percent}% commission
    </span>
  );
}
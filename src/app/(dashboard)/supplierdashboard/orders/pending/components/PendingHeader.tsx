export function PendingHeader({
  pendingCount,
  urgentCount,
}: {
  pendingCount: number;
  urgentCount: number;
}) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-6 text-white shadow-lg sm:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-16 right-28 h-40 w-40 rounded-full bg-white/10" />

      <div className="relative flex flex-wrap items-center justify-between gap-5">
        <div className="max-w-xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-indigo-50">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live · updates every minute
          </div>

          <h1 className="text-2xl font-semibold sm:text-3xl">Pending orders</h1>
          <p className="mt-2 text-sm text-indigo-100">
            {urgentCount > 0
              ? `${urgentCount} order(s) waiting over 24 hours. Respond soon to protect your supplier performance score.`
              : "Everything is on track. New orders waiting for you to accept or reject."}
          </p>
        </div>

        <div className="rounded-2xl bg-white/15 px-6 py-4 text-center backdrop-blur">
          <p className="text-4xl font-semibold">{pendingCount}</p>
          <p className="mt-1 text-xs text-indigo-100">to review</p>
        </div>
      </div>
    </div>
  );
}
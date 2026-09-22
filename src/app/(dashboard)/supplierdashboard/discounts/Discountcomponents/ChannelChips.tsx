export default function ChannelChips({ channels }: { channels: string[] }) {
  const shown = channels.slice(0, 2);
  const rest = channels.length - shown.length;
  return (
    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
      {shown.map((ch) => (
        <span
          key={ch}
          className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
        >
          {ch}
        </span>
      ))}
      {rest > 0 && (
        <span
          className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-500"
          title={channels.slice(2).join(", ")}
        >
          +{rest}
        </span>
      )}
    </div>
  );
}
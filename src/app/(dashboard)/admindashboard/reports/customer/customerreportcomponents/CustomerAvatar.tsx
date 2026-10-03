import { initials } from "./format";

const COLORS = ["bg-emerald-100 text-emerald-700", "bg-slate-100 text-slate-600"];

function pick(name: string) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % COLORS.length;
  return COLORS[h];
}

export default function CustomerAvatar({ name }: { name: string }) {
  return (
    <span className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-semibold ${pick(name)}`}>
      {initials(name)}
    </span>
  );
}

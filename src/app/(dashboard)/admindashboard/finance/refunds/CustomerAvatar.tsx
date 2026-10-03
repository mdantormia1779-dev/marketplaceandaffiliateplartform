import { initials } from "./format";

export default function CustomerAvatar({ name }: { name: string }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">
      {initials(name)}
    </span>
  );
}

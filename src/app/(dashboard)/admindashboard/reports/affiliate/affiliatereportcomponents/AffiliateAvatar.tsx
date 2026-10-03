import { initials } from "./format";

export default function AffiliateAvatar({ name }: { name: string }) {
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-[11px] font-semibold text-amber-700">
      {initials(name)}
    </span>
  );
}

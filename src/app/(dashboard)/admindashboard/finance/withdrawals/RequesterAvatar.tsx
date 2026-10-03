import { initials } from "./format";

interface Props {
  name: string;
  type: "Affiliate" | "Supplier";
}

export default function RequesterAvatar({ name, type }: Props) {
  const palette = type === "Affiliate" ? "bg-emerald-100 text-emerald-700" : "bg-violet-100 text-violet-700";
  return (
    <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${palette}`}>
      {initials(name)}
    </div>
  );
}

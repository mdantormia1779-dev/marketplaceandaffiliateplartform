import { initials } from "../data";

interface AvatarProps {
  name: string;
  tone: "green" | "teal"; // referrer = green, referred = teal
}

export default function Avatar({ name, tone }: AvatarProps) {
  const color = tone === "green" ? "bg-emerald-100 text-emerald-800" : "bg-teal-50 text-teal-800";
  return (
    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${color}`}>
      {initials(name)}
    </span>
  );
}
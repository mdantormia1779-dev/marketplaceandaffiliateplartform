const COLORS = [
  "bg-gray-100 text-gray-700",
  "bg-orange-100 text-orange-700",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-teal-100 text-teal-700",
];

// same naam e shobsomoy same rong pabe
function pick(name: string) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % COLORS.length;
  return COLORS[h];
}

export default function BrandAvatar({ name }: { name: string }) {
  return (
    <span className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium ${pick(name)}`}>
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
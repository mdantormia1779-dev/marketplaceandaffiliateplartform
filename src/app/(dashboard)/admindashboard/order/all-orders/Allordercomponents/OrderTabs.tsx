"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tab, TABS, TAB_SLUGS } from "./types";

export default function OrderTabs({ active }: { active: Tab }) {
  const pathname = usePathname();
  // /admindashboard/order/processing-orders  ->  /admindashboard/order
  const base = pathname.slice(0, pathname.lastIndexOf("/"));

  return (
    <div className="flex flex-wrap gap-1 rounded-xl border border-gray-200 bg-white p-1.5">
      {TABS.map((t) => (
        <Link
          key={t}
          href={`${base}/${TAB_SLUGS[t]}`}
          className={`rounded-full px-5 py-2 text-[15px] font-medium transition ${
            active === t
              ? "bg-green-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {t}
        </Link>
      ))}
    </div>
  );
}
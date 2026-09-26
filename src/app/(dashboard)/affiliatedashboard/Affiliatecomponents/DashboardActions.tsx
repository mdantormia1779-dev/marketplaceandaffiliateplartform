"use client";

import { useRouter } from "next/navigation";
import { Plus, Store } from "lucide-react";

export default function DashboardActions() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-3">
     

      <button
        onClick={() => router.push("/affiliatedashboard/browseproducts")}
        className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
      >
        <Store className="h-4 w-4" />
        Browse Products
      </button>
    </div>
  );
}
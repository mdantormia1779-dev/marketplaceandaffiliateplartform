import type { ReactNode } from "react";
import Sidebar from "./admincomponents/Sidebar";
import Topbar from "./admincomponents/Topbar";

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-6 py-7 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
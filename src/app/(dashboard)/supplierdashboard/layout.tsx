// src/app/(dashboard)/supplierdashboard/layout.tsx
import React from "react";
import Sidebar from "./components/Sidebar";

export default function SupplierDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      <Sidebar />
      <main className="flex-1 pl-64 min-w-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
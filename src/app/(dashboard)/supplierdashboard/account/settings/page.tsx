"use client";

import Navbar from "../../components/Navbar";
import SettingsPanel from "../../components/SettingsPanel";


export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Top Navbar */}
      <div className="sticky top-0 z-50 border-b border-slate-100 bg-white">
        <Navbar />
      </div>

      {/* Main */}
      <main className="flex-1 w-full max-w-300 mx-auto px-5 py-7 md:px-8">
        {/* Page Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your supplier profile and account security.
          </p>
        </div>

        {/* Settings */}
        <SettingsPanel/>
      </main>
    </div>
  );
}
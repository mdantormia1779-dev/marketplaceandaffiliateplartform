"use client";

import StoreBanner from "./components/StoreBanner";
import AnalyticsOverview from "./components/AnalyticsOverview";
import Navbar from "./components/Navbar";

const DashBoard = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <main className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Store Banner */}
        <StoreBanner />

        {/* Analytics Overview */}
        <AnalyticsOverview />
      </main>
    </div>
  );
};

export default DashBoard;
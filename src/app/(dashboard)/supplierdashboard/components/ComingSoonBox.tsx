// src/app/(dashboard)/supplierdashboard/components/ComingSoonBox.tsx
"use client";

import { Bell, ArrowLeft, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ComingSoonBoxProps {
  title?: string;
  subtitle?: string;
}

export default function ComingSoonBox({
  title = "This section is on the way",
  subtitle = "We are building this part of the supplier workspace step by step. It will be ready in an upcoming phase.",
}: ComingSoonBoxProps) {
  const router = useRouter();
  const [notified, setNotified] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] p-4">
      <div className="bg-white border border-slate-100 rounded-3xl p-8 max-w-lg w-full text-center shadow-xs space-y-6">
        
        {/* Top Icon Badge */}
        <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl mx-auto flex items-center justify-center shadow-xs">
          <Bell className="w-7 h-7" />
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          {/* Next phase pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100 mb-1">
            <Clock className="w-3.5 h-3.5" /> Next phase
          </div>

          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Go back
          </button>
          /
          <button
            onClick={() => setNotified(true)}
            disabled={notified}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer ${
              notified
                ? "bg-emerald-600 text-white cursor-default"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            <Bell className="w-4 h-4" />
            {notified ? "You'll be notified!" : "Notify me"}
          </button>
        </div>

      </div>
    </div>
  );
}
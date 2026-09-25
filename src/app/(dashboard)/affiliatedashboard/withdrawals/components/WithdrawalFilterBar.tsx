"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { WithdrawalStatusFilter } from "./types";

interface WithdrawalFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus: WithdrawalStatusFilter;
  onStatusChange: (status: WithdrawalStatusFilter) => void;
}

const STATUS_OPTIONS: WithdrawalStatusFilter[] = [
  "All Statuses",
  "Pending",
  "Processing",
  "Completed",
  "Rejected",
];

export default function WithdrawalFilterBar({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
}: WithdrawalFilterBarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by request ID or method..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
        />
      </div>

      <div className="relative w-full sm:w-52" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-slate-300 transition-colors"
        >
          {selectedStatus}
          <ChevronDown className={"w-4 h-4 text-slate-400 transition-transform " + (isOpen ? "rotate-180" : "")} />
        </button>

        {isOpen ? (
          <div className="absolute z-20 mt-1.5 w-full rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onStatusChange(option);
                  setIsOpen(false);
                }}
                className={
                  "w-full text-left px-4 py-2.5 text-sm font-medium transition-colors " +
                  (option === selectedStatus ? "bg-indigo-600 text-white" : "text-slate-700 hover:bg-slate-50")
                }
              >
                {option}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
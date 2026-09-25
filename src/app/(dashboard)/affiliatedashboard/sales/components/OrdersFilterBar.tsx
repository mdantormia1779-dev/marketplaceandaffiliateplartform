"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import { StatusFilter } from "./types";

interface OrdersFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedStatus: StatusFilter;
  onStatusChange: (status: StatusFilter) => void;
}

const STATUS_OPTIONS: StatusFilter[] = [
  "All Statuses",
  "Pending",
  "Approved",
  "Completed",
  "Cancelled",
  "Refunded",
];

export default function OrdersFilterBar({
  searchTerm,
  onSearchChange,
  selectedStatus,
  onStatusChange,
}: OrdersFilterBarProps) {
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

  const handleSelect = (status: StatusFilter) => {
    onStatusChange(status);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 animate-fade-up" style={{ animationDelay: "350ms" }}>
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by order ID, product, or customer..."
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
          <ChevronDown
            className={"w-4 h-4 text-slate-400 transition-transform " + (isOpen ? "rotate-180" : "")}
          />
        </button>

        {isOpen ? (
          <div className="absolute z-20 mt-1.5 w-full rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden animate-fade-up" style={{ animationDelay: "0ms" }}>
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSelect(option)}
                className={
                  "w-full text-left px-4 py-2.5 text-sm font-medium transition-colors " +
                  (option === selectedStatus
                    ? "bg-indigo-600 text-white"
                    : "text-slate-700 hover:bg-slate-50")
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
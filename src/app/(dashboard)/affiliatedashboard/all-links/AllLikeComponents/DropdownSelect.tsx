"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type DropdownOption<T extends string> = {
  label: string;
  value: T;
};

type DropdownSelectProps<T extends string> = {
  options: DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export default function DropdownSelect<T extends string>({
  options,
  value,
  onChange,
  className = "",
}: DropdownSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
      >
        {selectedLabel}
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                option.value === value
                  ? "font-semibold text-indigo-600"
                  : "text-gray-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
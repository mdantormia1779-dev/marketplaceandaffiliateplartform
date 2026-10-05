"use client";

import { useEffect, useState } from "react";

interface Props {
  value: number;
  onChange: (n: number) => void;
  label: string;
  prefix?: string;
  suffix?: string;
  integer?: boolean;
  variant?: "box" | "ghost";
  invalid?: boolean;
  valueClass?: string;
}

const toText = (n: number) => (Number.isFinite(n) ? String(n) : "");
const pretty = (n: number) => (Number.isFinite(n) ? n.toLocaleString("en-US", { maximumFractionDigits: 2 }) : "");

export default function NumberField({
  value,
  onChange,
  label,
  prefix,
  suffix,
  integer = false,
  variant = "box",
  invalid = false,
  valueClass = "text-gray-900",
}: Props) {
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState(toText(value));

  useEffect(() => {
    if (!focused) setText(toText(value));
  }, [value, focused]);

  const handle = (next: string) => {
    const ok = integer ? /^\d*$/.test(next) : /^\d*\.?\d*$/.test(next);
    if (!ok) return;
    setText(next);
    onChange(next === "" || next === "." ? NaN : Number(next));
  };

  const base =
    variant === "box"
      ? "flex w-44 items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm"
      : "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm";
  const border = invalid
    ? "border-red-400"
    : variant === "box"
      ? "border-gray-200 focus-within:border-emerald-500"
      : "border-transparent hover:border-gray-200 focus-within:border-emerald-500";

  return (
    <label className={`${base} ${border}`}>
      {prefix && <span className="text-gray-500">{prefix}</span>}
      <input
        type="text"
        inputMode={integer ? "numeric" : "decimal"}
        aria-label={label}
        aria-invalid={invalid}
        value={focused ? text : pretty(value)}
        onFocus={() => {
          setText(toText(value));
          setFocused(true);
        }}
        onBlur={() => setFocused(false)}
        onChange={(e) => handle(e.target.value)}
        className={`min-w-0 bg-transparent tabular-nums outline-none ${variant === "box" ? "flex-1" : "w-20"} ${valueClass}`}
      />
      {suffix && <span className="text-xs text-gray-500">{suffix}</span>}
    </label>
  );
}

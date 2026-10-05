"use client";
import { useEffect, useState } from "react";

interface Props {
  value: number; // NaN mane khali
  onChange: (n: number) => void;
  label: string;
  suffix?: string;
  integer?: boolean;
  invalid?: boolean;
  disabled?: boolean;
}

const toText = (n: number) => (Number.isFinite(n) ? String(n) : "");
const pretty = (n: number) => (Number.isFinite(n) ? n.toLocaleString("en-US", { maximumFractionDigits: 2 }) : "");

export default function NumberField({ value, onChange, label, suffix, integer = false, invalid = false, disabled = false }: Props) {
  const [focused, setFocused] = useState(false);
  const [text, setText] = useState(toText(value));

  // bairer theke value bodlale (jemon Discard) input o bodlay
  useEffect(() => {
    if (!focused) setText(toText(value));
  }, [value, focused]);

  const handle = (next: string) => {
    const ok = integer ? /^\d*$/.test(next) : /^\d*\.?\d*$/.test(next);
    if (!ok) return;
    setText(next);
    onChange(next === "" || next === "." ? NaN : Number(next));
  };

  const border = invalid ? "border-red-400" : "border-gray-200 focus-within:border-emerald-500";

  return (
    <label
      className={`flex w-44 items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm ${border} ${disabled ? "opacity-50" : ""}`}
    >
      <input
        type="text"
        inputMode={integer ? "numeric" : "decimal"}
        aria-label={label}
        aria-invalid={invalid}
        disabled={disabled}
        value={focused ? text : pretty(value)}
        onFocus={() => {
          setText(toText(value));
          setFocused(true);
        }}
        onBlur={() => setFocused(false)}
        onChange={(e) => handle(e.target.value)}
        className="min-w-0 flex-1 bg-transparent tabular-nums text-gray-900 outline-none disabled:cursor-not-allowed"
      />
      {suffix && <span className="text-xs text-gray-500">{suffix}</span>}
    </label>
  );
}
interface Props {
  value: string;
  onChange: (value: string) => void;
  label: string;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  maxLength?: number;
  autoComplete?: string;
  invalid?: boolean;
}

export default function TextField({
  value,
  onChange,
  label,
  type = "text",
  placeholder,
  maxLength,
  autoComplete,
  invalid = false,
}: Props) {
  return (
    <input
      type={type}
      value={value}
      aria-label={label}
      aria-invalid={invalid}
      placeholder={placeholder}
      maxLength={maxLength}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
      className={`w-72 rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 outline-none ${
        invalid ? "border-red-400" : "border-gray-200 focus:border-emerald-500"
      }`}
    />
  );
}
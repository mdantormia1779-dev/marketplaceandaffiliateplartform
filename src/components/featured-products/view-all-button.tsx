import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ViewAllButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

export function ViewAllButton({
  href = "/products",
  label = "View all",
  className = "",
}: ViewAllButtonProps) {
  return (
    <Link
      href={href}
      className={`hidden items-center gap-1 text-sm font-medium text-indigo-600 hover:underline sm:flex ${className}`}
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}
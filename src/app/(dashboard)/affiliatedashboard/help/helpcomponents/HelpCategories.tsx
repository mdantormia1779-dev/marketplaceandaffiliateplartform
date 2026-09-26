"use client";

import {
  Rocket,
  Zap,
  Wallet,
  CreditCard,
  Users,
  ShieldCheck,
  Settings2,
  FileText,
} from "lucide-react";
import type { HelpCategory } from "./types";

const ICON_MAP: Record<string, React.ElementType> = {
  Rocket,
  Zap,
  Wallet,
  CreditCard,
  Users,
  ShieldCheck,
  Settings2,
};

interface HelpCategoriesProps {
  categories: HelpCategory[];
  onSelectCategory: (categoryTitle: string) => void;
}

export default function HelpCategories({ categories, onSelectCategory }: HelpCategoriesProps) {
  return (
    <div>
      <h3 className="mb-4 text-base font-bold text-slate-900">Browse Help Categories</h3>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || FileText;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.title)}
                className="flex flex-col items-start gap-3 rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm transition hover:border-blue-200 hover:shadow-md cursor-pointer"
              >
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${cat.iconBg} ${cat.iconColor}`}>
                  <Icon size={18} />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{cat.title}</h4>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">{cat.description}</p>
                </div>
                <span className="mt-auto flex items-center gap-1.5 pt-1 text-[11px] font-medium text-slate-400">
                  <FileText size={12} /> {cat.articleCount} articles
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center text-sm text-slate-400 shadow-sm">
          No help categories match your search.
        </div>
      )}
    </div>
  );
}
"use client";
import { useState } from "react";
import CategoriesHeader from "./CategoriesHeader";
import CategoriesTable from "./CategoriesTable";
import CategoriesToolbar from "./CategoriesToolbar";
import CategoryStats from "./CategoryStats";
import CreateCategoryModal from "./CreateCategoryModal";
import Pagination from "../components/Pagination";
import { exportCsv } from "./exportCsv";
import { useCategories } from "./useCategories";

export default function CategoriesPage() {
  const c = useCategories();
  const [creating, setCreating] = useState(false);

  return (
    <div className="space-y-6 p-6">
      <CategoriesHeader onCreate={() => setCreating(true)} />
      <CategoryStats stats={c.stats} />
      <section className="rounded-xl border border-gray-200 bg-white">
        <CategoriesToolbar filters={c.filters} onChange={c.updateFilters} onExport={() => exportCsv(c.filtered)} />
        <CategoriesTable rows={c.rows} onToggle={c.toggleStatus} onDelete={c.remove} />
        <Pagination {...c.pagination} />
      </section>
      {creating && <CreateCategoryModal onClose={() => setCreating(false)} onAdd={c.add} />}
    </div>
  );
}
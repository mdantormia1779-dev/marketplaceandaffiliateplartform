import CategoryRow from "./CategoryRow";
import { Category } from "./types";

const HEAD = ["Category", "Products", "Status", "Created", ""];

interface Props {
  rows: Category[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function CategoriesTable({ rows, onToggle, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left">
        <thead>
          <tr className="border-t border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-500">
            {HEAD.map((h, i) => (
              <th key={i} className="px-4 py-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={HEAD.length} className="px-4 py-12 text-center text-sm text-gray-500">
                No categories match your search.
              </td>
            </tr>
          ) : (
            rows.map((c) => (
              <CategoryRow key={c.id} category={c} onToggle={() => onToggle(c.id)} onDelete={() => onDelete(c.id)} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
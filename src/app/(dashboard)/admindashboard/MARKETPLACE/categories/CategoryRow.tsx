import CategoryRowActions from "./CategoryRowActions";
import CategoryStatusBadge from "./CategoryStatusBadge";
import { Category } from "./types";

interface Props {
  category: Category;
  onToggle: () => void;
  onDelete: () => void;
}

export default function CategoryRow({ category: c, onToggle, onDelete }: Props) {
  return (
    <tr className="border-t border-gray-100 text-sm text-gray-700">
      <td className="px-4 py-3">
        <p className="font-medium text-gray-900">{c.name}</p>
        <p className="font-mono text-[11px] text-gray-500">/{c.slug}</p>
      </td>
      <td className="px-4 py-3">{c.products.toLocaleString()}</td>
      <td className="px-4 py-3"><CategoryStatusBadge status={c.status} /></td>
      <td className="px-4 py-3">{c.created}</td>
      <td className="px-4 py-3 text-right">
        <CategoryRowActions status={c.status} onToggle={onToggle} onDelete={onDelete} />
      </td>
    </tr>
  );
}
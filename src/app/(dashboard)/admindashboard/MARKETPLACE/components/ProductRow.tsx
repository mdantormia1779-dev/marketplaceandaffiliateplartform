import { Package } from "lucide-react";
import RowActions from "./RowActions";
import StatusBadge from "./StatusBadge";
import { Product } from "./types";

interface Props {
  product: Product;
  onApprove: () => void;
  onReject: () => void;
  onDelete: () => void;
}

export default function ProductRow({ product: p, onApprove, onReject, onDelete }: Props) {
  return (
    <tr className="border-t border-gray-100 text-sm text-gray-700">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
            <Package size={16} />
          </span>
          <div>
            <p className="font-medium text-gray-900">{p.name}</p>
            <p className="font-mono text-[11px] text-gray-500">{p.sku}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">{p.category}</td>
      <td className="px-4 py-3">{p.supplier}</td>
      <td className="px-4 py-3 font-semibold text-gray-900">${p.price.toFixed(2)}</td>
      <td className="px-4 py-3">{p.stock > 0 ? p.stock : <span className="text-orange-600">Out of stock</span>}</td>
      <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
      <td className="px-4 py-3">{p.submitted}</td>
      <td className="px-4 py-3 text-right">
        <RowActions status={p.status} onApprove={onApprove} onReject={onReject} onDelete={onDelete} />
      </td>
    </tr>
  );
}
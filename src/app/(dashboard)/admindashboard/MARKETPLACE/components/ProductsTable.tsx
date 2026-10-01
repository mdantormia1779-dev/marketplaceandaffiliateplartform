import ProductRow from "./ProductRow";
import { Product, ProductStatus } from "./types";

const HEAD = ["Product", "Category", "Supplier", "Price", "Stock", "Status", "Submitted", ""];

interface Props {
  rows: Product[];
  onStatus: (id: string, status: ProductStatus) => void;
  onDelete: (id: string) => void;
}

export default function ProductsTable({ rows, onStatus, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-left">
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
                No products match your filters.
              </td>
            </tr>
          ) : (
            rows.map((p) => (
              <ProductRow
                key={p.id}
                product={p}
                onApprove={() => onStatus(p.id, "Approved")}
                onReject={() => onStatus(p.id, "Rejected")}
                onDelete={() => onDelete(p.id)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
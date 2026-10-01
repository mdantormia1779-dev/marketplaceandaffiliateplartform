import BrandRow from "./BrandRow";
import { Brand, BrandStatus } from "./types";

const HEAD = ["Brand", "Products", "Status", "Created", ""];

interface Props {
  rows: Brand[];
  onStatus: (id: string, status: BrandStatus) => void;
  onDelete: (id: string) => void;
}

export default function BrandsTable({ rows, onStatus, onDelete }: Props) {
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
                No brands match your search.
              </td>
            </tr>
          ) : (
            rows.map((b) => (
              <BrandRow
                key={b.id}
                brand={b}
                onStatus={(s) => onStatus(b.id, s)}
                onDelete={() => onDelete(b.id)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
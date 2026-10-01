import FeaturedRow from "./FeaturedRow";
import { FeaturedView } from "./types";

const HEAD = ["Product", "Placement", "Start", "End", "Status", ""];

interface Props {
  rows: FeaturedView[];
  onEndNow: (id: string) => void;
  onRenew: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function FeaturedTable({ rows, onEndNow, onRenew, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] text-left">
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
                No featured products match your filters.
              </td>
            </tr>
          ) : (
            rows.map((f) => (
              <FeaturedRow
                key={f.id}
                item={f}
                onEndNow={() => onEndNow(f.id)}
                onRenew={() => onRenew(f.id)}
                onDelete={() => onDelete(f.id)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
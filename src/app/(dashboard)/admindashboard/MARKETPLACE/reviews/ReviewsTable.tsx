import ReviewRow from "./ReviewRow";
import { Review, ReviewStatus } from "./types";

const HEAD = ["Review", "Customer", "Rating", "Status", "Date", ""];

interface Props {
  rows: Review[];
  onStatus: (id: string, status: ReviewStatus) => void;
  onDelete: (id: string) => void;
}

export default function ReviewsTable({ rows, onStatus, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left">
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
                No reviews match your search.
              </td>
            </tr>
          ) : (
            rows.map((r) => (
              <ReviewRow
                key={r.id}
                review={r}
                onStatus={(s) => onStatus(r.id, s)}
                onDelete={() => onDelete(r.id)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
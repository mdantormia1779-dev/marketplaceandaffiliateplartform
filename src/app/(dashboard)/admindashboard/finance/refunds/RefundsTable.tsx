import RefundRow from "./RefundRow";
import { Refund, RefundStatus } from "./types";

const HEAD = ["Refund", "Order", "Customer", "Amount", "Reason", "Method", "Status", ""];

interface Props {
  rows: Refund[];
  onStatus: (id: string, status: RefundStatus) => void;
}

export default function RefundsTable({ rows, onStatus }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-left">
        <thead>
          <tr className="border-t border-gray-100 text-xs font-medium uppercase tracking-wide text-gray-500">
            {HEAD.map((h, i) => (
              <th key={i} className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={HEAD.length} className="px-4 py-12 text-center text-sm text-gray-500">
                No refunds match your filters.
              </td>
            </tr>
          ) : (
            rows.map((r) => <RefundRow key={r.id} item={r} onStatus={(s) => onStatus(r.id, s)} />)
          )}
        </tbody>
      </table>
    </div>
  );
}

import WithdrawalRow from "./WithdrawalRow";
import { Withdrawal, WithdrawalStatus } from "./types";

const HEAD = ["Request", "Requested by", "Amount", "Method", "Requested", "Status", ""];

interface Props {
  rows: Withdrawal[];
  onStatus: (id: string, status: WithdrawalStatus) => void;
}

export default function WithdrawalsTable({ rows, onStatus }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] text-left">
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
                No withdrawal requests match your filters.
              </td>
            </tr>
          ) : (
            rows.map((w) => <WithdrawalRow key={w.id} item={w} onStatus={(s) => onStatus(w.id, s)} />)
          )}
        </tbody>
      </table>
    </div>
  );
}

import TransactionRow from "./TransactionRow";
import { Transaction, TxStatus } from "./types";

const HEAD = ["Transaction", "Date", "Type", "Reference", "Party", "Amount", "Method", "Status", ""];

interface Props {
  rows: Transaction[];
  onStatus: (id: string, status: TxStatus) => void;
}

export default function TransactionsTable({ rows, onStatus }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px] text-left">
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
                No transactions match your filters.
              </td>
            </tr>
          ) : (
            rows.map((t) => <TransactionRow key={t.id} tx={t} onStatus={(s) => onStatus(t.id, s)} />)
          )}
        </tbody>
      </table>
    </div>
  );
}

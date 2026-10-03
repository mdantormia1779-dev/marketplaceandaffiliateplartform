import WalletRow from "./WalletRow";
import { Wallet } from "./types";

const HEAD = ["Wallet Owner", "Type", "Balance", "Pending", "Currency", "Status", ""];

interface Props {
  rows: Wallet[];
  onAdjust: (id: string) => void;
  onToggleFreeze: (id: string) => void;
}

export default function WalletsTable({ rows, onAdjust, onToggleFreeze }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] text-left">
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
                No wallets match your filters.
              </td>
            </tr>
          ) : (
            rows.map((w) => (
              <WalletRow
                key={w.id}
                wallet={w}
                onAdjust={() => onAdjust(w.id)}
                onToggleFreeze={() => onToggleFreeze(w.id)}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

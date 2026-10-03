import { signedMoney } from "./format";
import TransactionRowActions from "./TransactionRowActions";
import TxStatusBadge from "./TxStatusBadge";
import TypeBadge from "./TypeBadge";
import { Transaction, TxStatus } from "./types";

interface Props {
  tx: Transaction;
  onStatus: (status: TxStatus) => void;
}

export default function TransactionRow({ tx: t, onStatus }: Props) {
  return (
    <tr className="border-t border-gray-100 text-sm text-gray-700">
      <td className="px-4 py-3.5 font-medium text-gray-900">{t.id}</td>
      <td className="px-4 py-3.5">{t.date}</td>
      <td className="px-4 py-3.5">
        <TypeBadge type={t.type} />
      </td>
      <td className="px-4 py-3.5">{t.reference}</td>
      <td className="px-4 py-3.5">{t.party}</td>
      <td className={`px-4 py-3.5 font-semibold ${t.amount < 0 ? "text-amber-700" : "text-gray-900"}`}>
        {signedMoney(t.amount)}
      </td>
      <td className="px-4 py-3.5">{t.method}</td>
      <td className="px-4 py-3.5">
        <TxStatusBadge status={t.status} />
      </td>
      <td className="px-4 py-3.5 text-right">
        <TransactionRowActions status={t.status} reference={t.reference} onStatus={onStatus} />
      </td>
    </tr>
  );
}

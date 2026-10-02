import { money2 } from "./format";
import RequesterAvatar from "./RequesterAvatar";
import WithdrawalRowActions from "./WithdrawalRowActions";
import WithdrawalStatusBadge from "./WithdrawalStatusBadge";
import { Withdrawal, WithdrawalStatus } from "./types";

interface Props {
  item: Withdrawal;
  onStatus: (status: WithdrawalStatus) => void;
}

export default function WithdrawalRow({ item: w, onStatus }: Props) {
  return (
    <tr className="border-t border-gray-100 text-sm text-gray-700">
      <td className="px-4 py-3 font-medium text-gray-900">{w.id}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <RequesterAvatar name={w.requester} type={w.type} />
          <div>
            <p className="font-medium text-gray-900">{w.requester}</p>
            <p className="text-xs text-gray-500">{w.type}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 font-semibold text-gray-900">{money2(w.amount)}</td>
      <td className="px-4 py-3">{w.method}</td>
      <td className="px-4 py-3">{w.requested}</td>
      <td className="px-4 py-3">
        <WithdrawalStatusBadge status={w.status} />
      </td>
      <td className="px-4 py-3 text-right">
        <WithdrawalRowActions status={w.status} requestId={w.id} onStatus={onStatus} />
      </td>
    </tr>
  );
}

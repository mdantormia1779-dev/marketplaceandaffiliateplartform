import CustomerAvatar from "./CustomerAvatar";
import { money2 } from "./format";
import RefundRowActions from "./RefundRowActions";
import RefundStatusBadge from "./RefundStatusBadge";
import { Refund, RefundStatus } from "./types";

interface Props {
  item: Refund;
  onStatus: (status: RefundStatus) => void;
}

export default function RefundRow({ item: r, onStatus }: Props) {
  return (
    <tr className="border-t border-gray-100 text-sm text-gray-700">
      <td className="px-4 py-3 font-medium text-gray-900">{r.id}</td>
      <td className="px-4 py-3">{r.order}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <CustomerAvatar name={r.customer} />
          <span>{r.customer}</span>
        </div>
      </td>
      <td className="px-4 py-3 font-semibold text-gray-900">{money2(r.amount)}</td>
      <td className="px-4 py-3">{r.reason}</td>
      <td className="px-4 py-3">{r.method}</td>
      <td className="px-4 py-3">
        <RefundStatusBadge status={r.status} />
      </td>
      <td className="px-4 py-3 text-right">
        <RefundRowActions status={r.status} refundId={r.id} onStatus={onStatus} />
      </td>
    </tr>
  );
}

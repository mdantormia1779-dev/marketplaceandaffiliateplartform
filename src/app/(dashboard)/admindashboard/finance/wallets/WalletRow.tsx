import { money2 } from "./format";
import OwnerAvatar from "./OwnerAvatar";
import WalletRowActions from "./WalletRowActions";
import WalletStatusBadge from "./WalletStatusBadge";
import WalletTypeBadge from "./WalletTypeBadge";
import { Wallet } from "./types";

interface Props {
  wallet: Wallet;
  onAdjust: () => void;
  onToggleFreeze: () => void;
}

export default function WalletRow({ wallet: w, onAdjust, onToggleFreeze }: Props) {
  return (
    <tr className="border-t border-gray-100 text-sm text-gray-700">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <OwnerAvatar name={w.owner} type={w.type} />
          <div>
            <p className="font-medium text-gray-900">{w.owner}</p>
            <p className="text-xs text-gray-500">{w.id}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <WalletTypeBadge type={w.type} />
      </td>
      <td className="px-4 py-3 font-semibold text-gray-900">{money2(w.balance)}</td>
      <td className="px-4 py-3 text-gray-500">{money2(w.pending)}</td>
      <td className="px-4 py-3">{w.currency}</td>
      <td className="px-4 py-3">
        <WalletStatusBadge status={w.status} />
      </td>
      <td className="px-4 py-3 text-right">
        <WalletRowActions status={w.status} walletId={w.id} onAdjust={onAdjust} onToggleFreeze={onToggleFreeze} />
      </td>
    </tr>
  );
}

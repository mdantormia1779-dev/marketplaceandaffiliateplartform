import { Sparkles } from "lucide-react";
import FeaturedRowActions from "./FeaturedRowActions";
import FeaturedStatusBadge from "./FeaturedStatusBadge";
import { FeaturedView } from "./types";

interface Props {
  item: FeaturedView;
  onEndNow: () => void;
  onRenew: () => void;
  onDelete: () => void;
}

export default function FeaturedRow({ item: f, onEndNow, onRenew, onDelete }: Props) {
  return (
    <tr className="border-t border-gray-100 text-sm text-gray-700">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
            <Sparkles size={16} />
          </span>
          <div>
            <p className="font-medium text-gray-900">{f.product}</p>
            <p className="text-xs text-gray-500">{f.supplier}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">{f.placement}</span>
      </td>
      <td className="px-4 py-3">{f.start}</td>
      <td className="px-4 py-3">{f.end}</td>
      <td className="px-4 py-3"><FeaturedStatusBadge status={f.status} /></td>
      <td className="px-4 py-3 text-right">
        <FeaturedRowActions status={f.status} onEndNow={onEndNow} onRenew={onRenew} onDelete={onDelete} />
      </td>
    </tr>
  );
}
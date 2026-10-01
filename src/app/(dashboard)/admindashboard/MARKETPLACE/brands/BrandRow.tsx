import BrandAvatar from "./BrandAvatar";
import BrandRowActions from "./BrandRowActions";
import BrandStatusBadge from "./BrandStatusBadge";
import { Brand, BrandStatus } from "./types";

interface Props {
  brand: Brand;
  onStatus: (status: BrandStatus) => void;
  onDelete: () => void;
}

export default function BrandRow({ brand: b, onStatus, onDelete }: Props) {
  return (
    <tr className="border-t border-gray-100 text-sm text-gray-700">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <BrandAvatar name={b.name} />
          <div>
            <p className="font-medium text-gray-900">{b.name}</p>
            <p className="text-xs text-gray-500">{b.company}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">{b.products.toLocaleString()}</td>
      <td className="px-4 py-3"><BrandStatusBadge status={b.status} /></td>
      <td className="px-4 py-3">{b.created}</td>
      <td className="px-4 py-3 text-right">
        <BrandRowActions status={b.status} onStatus={onStatus} onDelete={onDelete} />
      </td>
    </tr>
  );
}
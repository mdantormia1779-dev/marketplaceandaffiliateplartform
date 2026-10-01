import RatingStars from "./RatingStars";
import ReviewRowActions from "./ReviewRowActions";
import ReviewStatusBadge from "./ReviewStatusBadge";
import { Review, ReviewStatus } from "./types";

interface Props {
  review: Review;
  onStatus: (status: ReviewStatus) => void;
  onDelete: () => void;
}

export default function ReviewRow({ review: r, onStatus, onDelete }: Props) {
  return (
    <tr className="border-t border-gray-100 text-sm text-gray-700">
      <td className="px-4 py-3">
        <p className="font-medium text-gray-900">{r.title}</p>
        <p className="text-xs text-gray-500">{r.product}</p>
      </td>
      <td className="px-4 py-3">{r.customer}</td>
      <td className="px-4 py-3"><RatingStars rating={r.rating} /></td>
      <td className="px-4 py-3"><ReviewStatusBadge status={r.status} /></td>
      <td className="px-4 py-3">{r.date}</td>
      <td className="px-4 py-3 text-right">
        <ReviewRowActions status={r.status} onStatus={onStatus} onDelete={onDelete} />
      </td>
    </tr>
  );
}
import { Review } from "../types";
import { ReviewCard } from "./ReviewCard";

export function ReviewList({
  reviews,
  openFormId,
  formMode,
  onOpenReply,
  onOpenEditReply,
  onCancelForm,
  onSubmitReply,
  onDeleteReply,
  onToggleFlag,
  onToggleHide,
}: {
  reviews: Review[];
  openFormId: string | null;
  formMode: "create" | "edit";
  onOpenReply: (id: string) => void;
  onOpenEditReply: (id: string) => void;
  onCancelForm: () => void;
  onSubmitReply: (id: string, text: string) => void;
  onDeleteReply: (id: string) => void;
  onToggleFlag: (id: string) => void;
  onToggleHide: (id: string) => void;
}) {
  if (!reviews.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white p-10 text-center">
        <p className="text-sm text-slate-500">No reviews match this filter yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          isFormOpen={openFormId === review.id}
          formMode={formMode}
          onOpenReply={() => onOpenReply(review.id)}
          onOpenEditReply={() => onOpenEditReply(review.id)}
          onCancelForm={onCancelForm}
          onSubmitReply={(text) => onSubmitReply(review.id, text)}
          onDeleteReply={() => onDeleteReply(review.id)}
          onToggleFlag={() => onToggleFlag(review.id)}
          onToggleHide={() => onToggleHide(review.id)}
        />
      ))}
    </div>
  );
}
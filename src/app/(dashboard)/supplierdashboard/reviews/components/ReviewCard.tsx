import { CheckCircle2 } from "lucide-react";
import { Review } from "../types";
import { Stars } from "./Stars";
import { ReviewImages } from "./ReviewImages";
import { ReviewReply } from "./ReviewReply";
import { ReplyForm } from "./ReplyForm";
import { ReviewFlagButton } from "./ReviewFlagButton";
import { ReviewVisibilityButton } from "./ReviewVisibilityButton";
import { HiddenReviewBanner } from "./HiddenReviewBanner";

export function ReviewCard({
  review,
  isFormOpen,
  formMode,
  onOpenReply,
  onOpenEditReply,
  onCancelForm,
  onSubmitReply,
  onDeleteReply,
  onToggleFlag,
  onToggleHide,
}: {
  review: Review;
  isFormOpen: boolean;
  formMode: "create" | "edit";
  onOpenReply: () => void;
  onOpenEditReply: () => void;
  onCancelForm: () => void;
  onSubmitReply: (text: string) => void;
  onDeleteReply: () => void;
  onToggleFlag: () => void;
  onToggleHide: () => void;
}) {
  return (
    <div
      className={`rounded-xl border bg-white p-4 shadow-sm sm:p-5 ${
        review.flagged
          ? "border-rose-200"
          : review.hidden
          ? "border-dashed border-amber-300"
          : "border-slate-100"
      }`}
    >
      {review.hidden && <HiddenReviewBanner onUnhide={onToggleHide} />}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
            {review.initials}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-slate-900">{review.customerName}</span>
              {review.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                  <CheckCircle2 size={11} /> Verified purchase
                </span>
              )}
            </div>
            <div className="mt-1 flex items-center gap-2">
              <Stars value={review.rating} />
              <span className="text-xs text-slate-400">
                {new Date(review.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-500">
            {review.productName}
          </span>
          <ReviewVisibilityButton hidden={!!review.hidden} onToggle={onToggleHide} />
          <ReviewFlagButton flagged={!!review.flagged} onToggle={onToggleFlag} />
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-700">{review.comment}</p>

      <ReviewImages images={review.images ?? []} />

      {review.reply && !isFormOpen && (
        <ReviewReply
          text={review.reply.text}
          date={review.reply.date}
          edited={review.reply.edited}
          onEdit={onOpenEditReply}
          onDelete={onDeleteReply}
        />
      )}

      <div className="mt-3">
        <ReplyForm
          mode={formMode}
          defaultValue={formMode === "edit" ? review.reply?.text ?? "" : ""}
          isOpen={isFormOpen}
          onOpen={review.reply ? onOpenEditReply : onOpenReply}
          onCancel={onCancelForm}
          onSubmit={onSubmitReply}
        />
      </div>
    </div>
  );
}
"use client";

import { useForm } from "react-hook-form";
import { MessageSquare, Pencil } from "lucide-react";

type ReplyFormValues = { reply: string };

const QUICK_REPLIES = [
  "Thank you for your feedback!",
  "Sorry to hear that — please reach out so we can help.",
  "We're glad you loved it!",
];

export function ReplyForm({
  mode,
  defaultValue = "",
  isOpen,
  onOpen,
  onCancel,
  onSubmit,
}: {
  mode: "create" | "edit";
  defaultValue?: string;
  isOpen: boolean;
  onOpen: () => void;
  onCancel: () => void;
  onSubmit: (text: string) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReplyFormValues>({ defaultValues: { reply: defaultValue } });

  if (!isOpen) {
    return (
      <button
        onClick={onOpen}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-indigo-200 hover:text-indigo-700"
      >
        {mode === "edit" ? (
          <>
            <Pencil size={13} /> Edit reply
          </>
        ) : (
          <>
            <MessageSquare size={13} /> Reply
          </>
        )}
      </button>
    );
  }

  const submitHandler = handleSubmit((values) => {
    onSubmit(values.reply.trim());
    reset({ reply: "" });
  });

  const currentValue = watch("reply");

  return (
    <form onSubmit={submitHandler} className="space-y-2">
      <textarea
        {...register("reply", {
          required: "Reply can't be empty",
          minLength: { value: 10, message: "Reply should be at least 10 characters" },
          maxLength: { value: 500, message: "Reply is too long (max 500 characters)" },
        })}
        rows={3}
        placeholder="Write a reply to this customer..."
        className={`w-full rounded-lg border p-2.5 text-sm outline-none focus:border-indigo-400 ${
          errors.reply ? "border-rose-300" : "border-slate-200"
        }`}
      />

      <div className="flex items-center justify-between">
        {errors.reply ? (
          <p className="text-xs text-rose-500">{errors.reply.message}</p>
        ) : (
          <span className="text-[11px] text-slate-400">{currentValue?.length ?? 0}/500</span>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {QUICK_REPLIES.map((quick) => (
          <button
            key={quick}
            type="button"
            onClick={() => setValue("reply", quick, { shouldValidate: true })}
            className="rounded-full border border-slate-200 px-2.5 py-1 text-[11px] text-slate-500 hover:border-indigo-200 hover:text-indigo-700"
          >
            {quick}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {mode === "edit" ? "Update reply" : "Post reply"}
        </button>
        <button
          type="button"
          onClick={() => {
            reset({ reply: "" });
            onCancel();
          }}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
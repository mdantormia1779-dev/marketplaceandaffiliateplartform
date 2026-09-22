import { Pencil } from "lucide-react";

export function ReviewReply({
  text,
  date,
  edited,
  onEdit,
}: {
  text: string;
  date: string;
  edited?: boolean;
  onEdit: () => void;
}) {
  return (
    <div className="mt-3 rounded-lg bg-indigo-50 p-3">
      <div className="mb-1 flex items-center justify-between">
        <p className="text-xs font-medium text-indigo-700">
          Your reply
          {edited && <span className="ml-1 font-normal text-indigo-400">(edited)</span>}
        </p>
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800"
        >
          <Pencil size={11} /> Edit
        </button>
      </div>
      <p className="text-sm text-indigo-900">{text}</p>
      <p className="mt-1 text-[11px] text-indigo-400">
        {new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
      </p>
    </div>
  );
}
interface Props {
  planName: string;
  endDate: string;
  onConfirm: () => void;
  onClose: () => void;
}

export default function CancelModal({ planName, endDate, onConfirm, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-slate-900">Cancel subscription?</h3>
        <p className="mt-2 text-sm text-slate-600">
          Your {planName} plan will stay active until <b>{endDate}</b>. After that you will lose access to its features.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Keep plan
          </button>
          <button onClick={onConfirm} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
            Yes, cancel
          </button>
        </div>
      </div>
    </div>
  );
}
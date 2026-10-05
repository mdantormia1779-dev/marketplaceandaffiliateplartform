import { Loader2, Save } from "lucide-react";

interface Props {
  dirty: boolean;
  saving: boolean;
  onSave: () => void;
  onDiscard: () => void;
}

export default function SettingsHeader({ dirty, saving, onSave, onDiscard }: Props) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Payment Settings</h1>
        <p className="mt-1 text-sm text-gray-600">Currency, withdrawal rules and payment gateways.</p>
      </div>
      <div className="flex items-center gap-3">
        {dirty && !saving && <span className="text-xs text-amber-700">Unsaved changes</span>}
        {dirty && (
          <button
            onClick={onDiscard}
            disabled={saving}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Discard
          </button>
        )}
        <button
          onClick={onSave}
          disabled={!dirty || saving}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}
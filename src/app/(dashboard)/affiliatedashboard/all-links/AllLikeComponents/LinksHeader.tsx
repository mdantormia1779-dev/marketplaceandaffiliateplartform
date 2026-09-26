import { Plus } from "lucide-react";

export default function LinksHeader() {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          My Affiliate Links
        </h1>
        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Manage every affiliate link, campaign, and promotion you have
          generated.
        </p>
      </div>

      <button className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700">
        <Plus className="h-4 w-4" />
        Generate New Link
      </button>
    </div>
  );
}
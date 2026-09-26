import { Link, Plus } from "lucide-react";

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
   
    </div>
  );
}
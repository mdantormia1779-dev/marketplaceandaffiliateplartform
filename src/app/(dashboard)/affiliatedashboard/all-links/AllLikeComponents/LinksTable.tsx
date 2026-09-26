import LinkRow from "./LinkRow";
import type { AffiliateLink } from "./types";

const columns = [
  "Product",
  "Affiliate Link",
  "Created",
  "Clicks",
  "Sales",
  "Conv.",
  "Commission",
  "Status",
  "Actions",
];

type LinksTableProps = {
  links: AffiliateLink[];
  onDeleteLink: (id: string) => void;
};

export default function LinksTable({ links, onDeleteLink }: LinksTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
      <table className="w-full min-w-[900px] border-collapse">
        <thead>
          <tr className="border-b border-gray-100">
            {columns.map((col) => (
              <th
                key={col}
                className={`whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-400 ${
                  col === "Actions" ? "text-right" : ""
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <LinkRow key={link.id} link={link} onDelete={onDeleteLink} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
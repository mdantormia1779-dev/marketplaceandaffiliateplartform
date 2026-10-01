import CustomerRow from "./CustomerRow";
import type { Customer } from "../types";

type Props = {
  customers: Customer[];
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onOpenSuspend: (customer: Customer) => void;
  onOpenDelete: (customer: Customer) => void;
};

const headers = [
  "Customer",
  "Phone",
  "Country",
  "Orders",
  "Total Spent",
  "Status",
  "Joined",
  "",
];

export default function CustomersTable({
  customers,
  onView,
  onEdit,
  onOpenSuspend,
  onOpenDelete,
}: Props) {
  return (
    <div className="w-full max-w-full overflow-x-auto min-h-[380px] pb-24">
      <table className="w-full min-w-[850px] text-left">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {customers.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="px-4 py-12 text-center text-sm text-slate-500"
              >
                No customers found.
              </td>
            </tr>
          ) : (
            customers.map((c) => (
              <CustomerRow
                key={c.id}
                customer={c}
                onView={onView}
                onEdit={onEdit}
                onOpenSuspend={onOpenSuspend}
                onOpenDelete={onOpenDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
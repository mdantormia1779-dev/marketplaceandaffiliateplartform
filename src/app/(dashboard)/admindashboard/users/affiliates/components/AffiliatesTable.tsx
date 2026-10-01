import AffiliateRow from "./AffiliateRow";
import type { Affiliate, AffiliateForm } from "../types";

const headers = ["Affiliate", "Referral Code", "Referrals", "Earnings", "Status", "Joined", ""];

type Props = {
  affiliates: Affiliate[];
  onUpdate: (id: number, form: AffiliateForm) => Promise<void>;
  onToggleSuspend: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export default function AffiliatesTable({ affiliates, onUpdate, onToggleSuspend, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] text-left">
        <thead>
          <tr className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {affiliates.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-500">
                No affiliates found.
              </td>
            </tr>
          ) : (
            affiliates.map((a) => (
              <AffiliateRow
                key={a.id}
                affiliate={a}
                onUpdate={onUpdate}
                onToggleSuspend={onToggleSuspend}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
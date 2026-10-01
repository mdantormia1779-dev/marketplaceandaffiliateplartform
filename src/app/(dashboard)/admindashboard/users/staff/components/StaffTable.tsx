import StaffRow from "./StaffRow";
import type { Staff, StaffForm } from "../types";

const headers = ["Staff Member", "Role", "Department", "Last Active", "Status", ""];

type Props = {
  staff: Staff[];
  onUpdate: (id: number, form: StaffForm) => Promise<void>;
  onToggleSuspend: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
};

export default function StaffTable({ staff, onUpdate, onToggleSuspend, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-left">
        <thead>
          <tr className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {staff.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-12 text-center text-sm text-slate-500">
                No staff members found.
              </td>
            </tr>
          ) : (
            staff.map((s) => (
              <StaffRow
                key={s.id}
                member={s}
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
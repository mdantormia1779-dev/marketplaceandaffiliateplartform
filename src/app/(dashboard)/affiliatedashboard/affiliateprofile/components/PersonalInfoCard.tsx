import { Pencil } from "lucide-react";
import { AffiliateProfile } from "../types";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-slate-700">{label}</p>
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
        {value}
      </div>
    </div>
  );
}

export function PersonalInfoCard({
  profile,
  onEditClick,
}: {
  profile: AffiliateProfile;
  onEditClick: () => void;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Personal Information</h3>
          <p className="text-xs text-slate-400">Your basic contact and location details.</p>
        </div>
        <button
          onClick={onEditClick}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <Pencil size={13} />
          Edit
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full Name" value={profile.fullName} />
        <Field label="Email" value={profile.email} />
        <Field label="Phone" value={profile.phone} />
        <Field label="Country" value={profile.country} />
        <Field label="Date of Birth" value={profile.dateOfBirth} />
        <Field label="Address" value={profile.address} />
      </div>
    </div>
  );
}
import type { ElementType } from "react";
import { Music2, Pencil } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { SocialLinks } from "../types";

const PLATFORMS: { key: keyof SocialLinks; label: string; icon: ElementType }[] = [
  { key: "facebook", label: "Facebook", icon: FaFacebook },
  { key: "instagram", label: "Instagram", icon: FaInstagram },
  { key: "youtube", label: "YouTube", icon: FaYoutube },
  { key: "tiktok", label: "TikTok", icon: Music2 },
  { key: "linkedin", label: "LinkedIn", icon: FaLinkedin },
];
export function SocialProfilesCard({
  socialLinks,
  onEditClick,
}: {
  socialLinks: SocialLinks;
  onEditClick: () => void;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Social Profiles</h3>
          <p className="text-xs text-slate-400">Link the channels you promote on.</p>
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
        {PLATFORMS.map(({ key, label, icon: Icon }) => (
          <div key={key}>
            <p className="mb-1.5 text-sm font-medium text-slate-700">{label}</p>
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
              <Icon size={14} className="shrink-0 text-slate-400" />
              <span className="truncate">{socialLinks[key] || "Not linked"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
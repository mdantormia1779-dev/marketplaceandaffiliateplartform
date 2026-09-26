"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { AffiliateProfile, EditProfileFormValues } from "../types";

export function EditProfileModal({
  isOpen,
  profile,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  profile: AffiliateProfile;
  onClose: () => void;
  onSave: (values: EditProfileFormValues) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormValues>({
    defaultValues: {
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      country: profile.country,
      dateOfBirth: profile.dateOfBirth,
      address: profile.address,
      facebook: profile.socialLinks.facebook ?? "",
      instagram: profile.socialLinks.instagram ?? "",
      youtube: profile.socialLinks.youtube ?? "",
      tiktok: profile.socialLinks.tiktok ?? "",
      linkedin: profile.socialLinks.linkedin ?? "",
    },
  });

  // Reset form whenever a fresh profile is passed in (e.g. after a previous save)
  useEffect(() => {
    if (isOpen) {
      reset({
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        country: profile.country,
        dateOfBirth: profile.dateOfBirth,
        address: profile.address,
        facebook: profile.socialLinks.facebook ?? "",
        instagram: profile.socialLinks.instagram ?? "",
        youtube: profile.socialLinks.youtube ?? "",
        tiktok: profile.socialLinks.tiktok ?? "",
        linkedin: profile.socialLinks.linkedin ?? "",
      });
    }
  }, [isOpen, profile, reset]);

  if (!isOpen) return null;

  const submitHandler = handleSubmit((values) => {
    onSave(values);
    toast.success("Profile updated successfully");
    onClose();
  });

  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-indigo-400 ${
      hasError ? "border-rose-300" : "border-slate-200"
    }`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h3 className="text-base font-bold text-slate-900">Edit Profile</h3>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:text-slate-700">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={submitHandler} className="space-y-5 px-5 py-5">
          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">
              Personal Information
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name</label>
                <input
                  {...register("fullName", { required: "Full name is required" })}
                  className={inputClass(!!errors.fullName)}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-rose-500">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                  })}
                  className={inputClass(!!errors.email)}
                />
                {errors.email && <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone</label>
                <input
                  {...register("phone", { required: "Phone number is required" })}
                  className={inputClass(!!errors.phone)}
                />
                {errors.phone && <p className="mt-1 text-xs text-rose-500">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Country</label>
                <input {...register("country")} className={inputClass(false)} />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Date of Birth</label>
                <input {...register("dateOfBirth")} className={inputClass(false)} placeholder="MM/DD/YYYY" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Address</label>
                <input {...register("address")} className={inputClass(false)} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">
              Social Profiles
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Facebook</label>
                <input {...register("facebook")} className={inputClass(false)} placeholder="facebook.com/username" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Instagram</label>
                <input {...register("instagram")} className={inputClass(false)} placeholder="instagram.com/username" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">YouTube</label>
                <input {...register("youtube")} className={inputClass(false)} placeholder="youtube.com/@channel" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">TikTok</label>
                <input {...register("tiktok")} className={inputClass(false)} placeholder="tiktok.com/@username" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">LinkedIn</label>
                <input {...register("linkedin")} className={inputClass(false)} placeholder="linkedin.com/in/username" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
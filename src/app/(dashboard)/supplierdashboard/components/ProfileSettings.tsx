"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Store,
  MoreVertical,
  Pencil,
  X,
  Check,
} from "lucide-react";

export type ProfileData = {
  name: string;
  email: string;
  phone: string;
  storeName: string;
};

const defaultProfile: ProfileData = {
  name: "Ayesha Rahman",
  email: "supplier@example.com",
  phone: "+880 1XXX-XXXXXX",
  storeName: "Store Owner",
};

export default function ProfileSettings() {
  /*
   * IMPORTANT:
   * Always start with the same profile on server and client.
   * This prevents hydration mismatch.
   */
  const [profile, setProfile] =
    useState<ProfileData>(defaultProfile);

  const [editData, setEditData] =
    useState<ProfileData>(defaultProfile);

  const [editOpen, setEditOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /*
   * After hydration, load saved profile from localStorage.
   *
   * We intentionally use setState inside the asynchronous
   * browser event callback instead of directly in the effect body.
   * This keeps the component hydration-safe and avoids the
   * react-hooks/set-state-in-effect warning.
   */
  useEffect(() => {
    const loadSavedProfile = () => {
      try {
        const saved =
          localStorage.getItem("supplier-profile");

        if (!saved) {
          return;
        }

        const savedData = JSON.parse(
          saved
        ) as Partial<ProfileData>;

        const updatedProfile: ProfileData = {
          ...defaultProfile,
          ...savedData,
        };

        setProfile(updatedProfile);
        setEditData(updatedProfile);
      } catch {
        // Ignore invalid localStorage data.
      }
    };

    /*
     * Queue the browser-only state update after the current
     * effect execution. This avoids the synchronous
     * setState-in-effect lint warning.
     */
    const timer = window.setTimeout(
      loadSavedProfile,
      0
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /*
   * Listen for profile updates from other components,
   * such as Navbar.
   */
  useEffect(() => {
    const handleProfileUpdate = (event: Event) => {
      const customEvent =
        event as CustomEvent<ProfileData>;

      if (!customEvent.detail) {
        return;
      }

      const updatedProfile =
        customEvent.detail;

      setProfile(updatedProfile);
      setEditData(updatedProfile);
    };

    window.addEventListener(
      "supplier-profile-updated",
      handleProfileUpdate
    );

    return () => {
      window.removeEventListener(
        "supplier-profile-updated",
        handleProfileUpdate
      );
    };
  }, []);

  const openEdit = () => {
    setEditData(profile);
    setEditOpen(true);
    setMenuOpen(false);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setEditData(profile);
  };

  const saveProfile = () => {
    const updatedProfile: ProfileData = {
      ...editData,
      name: editData.name.trim(),
      email: editData.email.trim(),
      phone: editData.phone.trim(),
      storeName: editData.storeName.trim(),
    };

    /*
     * Update UI
     */
    setProfile(updatedProfile);

    /*
     * Keep edit form synchronized
     */
    setEditData(updatedProfile);

    /*
     * Save to localStorage
     */
    localStorage.setItem(
      "supplier-profile",
      JSON.stringify(updatedProfile)
    );

    /*
     * Notify Navbar and other components
     */
    window.dispatchEvent(
      new CustomEvent<ProfileData>(
        "supplier-profile-updated",
        {
          detail: updatedProfile,
        }
      )
    );

    setEditOpen(false);
  };

  const firstLetter =
    profile.name?.charAt(0).toUpperCase() || "S";

  return (
    <>
      {/* =========================
          PROFILE SECTION
      ========================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              Profile
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Manage your supplier profile information.
            </p>
          </div>

          {/* Three Dot Menu */}

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setMenuOpen((open) => !open)
              }
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
              aria-label="Profile options"
            >
              <MoreVertical size={19} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-11 z-50 w-36 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
                <button
                  type="button"
                  onClick={openEdit}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <Pencil size={15} />

                  Edit profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Body */}

        <div className="p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {/* Avatar */}

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#315be7] text-2xl font-bold text-white">
              {firstLetter}
            </div>

            {/* Name */}

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-semibold text-slate-900">
                  {profile.name}
                </h3>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600">
                  Supplier
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                {profile.storeName}
              </p>
            </div>

            {/* Edit Button */}

            <button
              type="button"
              onClick={openEdit}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Pencil size={15} />

              Edit profile
            </button>
          </div>

          {/* Profile Information */}

          <div className="mt-7 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 md:grid-cols-2">
            {/* Email */}

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Mail size={15} />

                Email
              </div>

              <p className="mt-2 text-sm font-medium text-slate-800">
                {profile.email}
              </p>
            </div>

            {/* Phone */}

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Phone size={15} />

                Phone
              </div>

              <p className="mt-2 text-sm font-medium text-slate-800">
                {profile.phone}
              </p>
            </div>

            {/* Store */}

            <div className="rounded-xl bg-slate-50 p-4 md:col-span-2">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Store size={15} />

                Store name
              </div>

              <p className="mt-2 text-sm font-medium text-slate-800">
                {profile.storeName}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          EDIT PROFILE MODAL
      ========================== */}

      {editOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Edit profile
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Update your supplier information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEdit}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}

            <div className="space-y-4 p-6">
              {/* Name */}

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Full name
                </label>

                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        name: e.target.value,
                      })
                    }
                    className="h-11 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#315be7] focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              {/* Email */}

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        email: e.target.value,
                      })
                    }
                    className="h-11 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#315be7] focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Phone */}

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Phone number
                </label>

                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        phone: e.target.value,
                      })
                    }
                    className="h-11 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#315be7] focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Store */}

              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-600">
                  Store name
                </label>

                <div className="relative">
                  <Store
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={editData.storeName}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        storeName: e.target.value,
                      })
                    }
                    className="h-11 w-full rounded-lg border border-slate-200 pl-9 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-[#315be7] focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter store name"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}

            <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={closeEdit}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveProfile}
                className="flex items-center gap-2 rounded-lg bg-[#315be7] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#264fd5]"
              >
                <Check size={16} />

                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
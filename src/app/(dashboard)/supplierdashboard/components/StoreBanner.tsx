"use client";

import {
  CheckCircle2,
  Star,
  Package,
  Users,
  ExternalLink,
  Plus,
} from "lucide-react";
import { useSyncExternalStore } from "react";

type ProfileData = {
  name: string;
  email: string;
  phone: string;
  storeName: string;
};

const defaultProfile: ProfileData = {
  name: "Ayesha Rahman",
  email: "supplier@example.com",
  phone: "+880 1XXX-XXXXXX",
  storeName: "Aurora Store",
};

/* =========================================================
   PROFILE STORAGE
========================================================= */

const getProfile = (): ProfileData => {
  if (typeof window === "undefined") {
    return defaultProfile;
  }

  try {
    const saved = localStorage.getItem("supplier-profile");

    if (!saved) {
      return defaultProfile;
    }

    const parsed: unknown = JSON.parse(saved);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return defaultProfile;
    }

    const data = parsed as Partial<ProfileData>;

    return {
      name:
        typeof data.name === "string" && data.name.trim()
          ? data.name
          : defaultProfile.name,

      email:
        typeof data.email === "string" && data.email.trim()
          ? data.email
          : defaultProfile.email,

      phone:
        typeof data.phone === "string" && data.phone.trim()
          ? data.phone
          : defaultProfile.phone,

      storeName:
        typeof data.storeName === "string" && data.storeName.trim()
          ? data.storeName
          : defaultProfile.storeName,
    };
  } catch {
    return defaultProfile;
  }
};

/* =========================================================
   EXTERNAL STORE
========================================================= */

const subscribeToProfile = (callback: () => void) => {
  window.addEventListener("supplier-profile-updated", callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("supplier-profile-updated", callback);
    window.removeEventListener("storage", callback);
  };
};

const getClientSnapshot = () => {
  try {
    return localStorage.getItem("supplier-profile") ?? "";
  } catch {
    return "";
  }
};

const getServerSnapshot = () => {
  return "";
};

/* =========================================================
   COMPONENT
========================================================= */

const StoreBanner = () => {
  /*
   * The snapshot changes whenever supplier-profile changes.
   * This keeps Navbar, ProfileSettings and StoreBanner synced.
   */
  const profileSnapshot = useSyncExternalStore(
    subscribeToProfile,
    getClientSnapshot,
    getServerSnapshot
  );

  let profile = defaultProfile;

  /*
   * Convert saved profile JSON into usable profile data.
   */
  if (profileSnapshot) {
    try {
      const parsed: unknown = JSON.parse(profileSnapshot);

      if (
        typeof parsed === "object" &&
        parsed !== null &&
        !Array.isArray(parsed)
      ) {
        const data = parsed as Partial<ProfileData>;

        profile = {
          name:
            typeof data.name === "string" && data.name.trim()
              ? data.name
              : defaultProfile.name,

          email:
            typeof data.email === "string" && data.email.trim()
              ? data.email
              : defaultProfile.email,

          phone:
            typeof data.phone === "string" && data.phone.trim()
              ? data.phone
              : defaultProfile.phone,

          storeName:
            typeof data.storeName === "string" && data.storeName.trim()
              ? data.storeName
              : defaultProfile.storeName,
        };
      }
    } catch {
      profile = defaultProfile;
    }
  }

  const firstLetter =
    profile.name.trim().charAt(0).toUpperCase() || "A";

  return (
    <div className="bg-[#f0f4ff]/80 border border-indigo-100 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
      {/* =====================================================
          STORE INFORMATION
      ====================================================== */}

      <div className="flex items-center gap-4">
        {/* Store Avatar */}
        <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
          {firstLetter}
        </div>

        {/* Store Details */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              {profile.storeName}
            </h2>

            <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />

            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
              Professional
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
            {/* Rating */}
            <span className="flex items-center gap-1 font-medium">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />

              <strong className="text-slate-800">
                4.9
              </strong>

              (1,284 reviews)
            </span>

            {/* Products */}
            <span className="flex items-center gap-1">
              <Package className="w-4 h-4 text-slate-400" />

              248 products
            </span>

            {/* Followers */}
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4 text-slate-400" />

              18.4K followers
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          ACTION BUTTONS
      ====================================================== */}

      <div className="flex items-center gap-3">
        {/* View Store */}
        <button
          type="button"
          onClick={() =>
            window.open("https://example.com", "_blank")
          }
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm active:scale-95"
        >
          <ExternalLink className="w-4 h-4" />

          View Store
        </button>

        {/* Add Product */}
        <button
          type="button"
          onClick={() => alert("Open Add Product Modal")}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" />

          Add Product
        </button>
      </div>
    </div>
  );
};

export default StoreBanner;
"use client";

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AffiliateProfile, EditProfileFormValues } from "./types";
import { PROFILE, STATS, CHECKLIST } from "./profileData";

import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileBanner } from "./components/ProfileBanner";
import { StatsGrid } from "./components/StatsGrid";
import { PersonalInfoCard } from "./components/PersonalInfoCard";
import { ProfileCompletionCard } from "./components/ProfileCompletionCard";
import { AffiliateInfoCard } from "./components/AffiliateInfoCard";
import { SocialProfilesCard } from "./components/SocialProfilesCard";
import { EditProfileModal } from "./components/EditProfileModal";

export default function AffiliateProfilePage() {
  const [profile, setProfile] = useState<AffiliateProfile>(PROFILE);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSave = (values: EditProfileFormValues) => {
    setProfile((prev) => ({
      ...prev,
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      country: values.country,
      dateOfBirth: values.dateOfBirth,
      address: values.address,
      socialLinks: {
        facebook: values.facebook,
        instagram: values.instagram,
        youtube: values.youtube,
        tiktok: values.tiktok,
        linkedin: values.linkedin,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <ProfileHeader onEditClick={() => setModalOpen(true)} />

        <ProfileBanner profile={profile} />

        <StatsGrid stats={STATS} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <PersonalInfoCard profile={profile} onEditClick={() => setModalOpen(true)} />
            <AffiliateInfoCard profile={profile} />
            <SocialProfilesCard socialLinks={profile.socialLinks} onEditClick={() => setModalOpen(true)} />
          </div>

          <div>
            <ProfileCompletionCard
              checklist={CHECKLIST}
              onCompleteClick={() => setModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        profile={profile}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <ToastContainer position="top-right" autoClose={2500} theme="light" />
    </div>
  );
}
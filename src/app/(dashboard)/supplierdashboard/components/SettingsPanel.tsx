"use client";

import ProfileSettings from "./ProfileSettings";
import SecuritySettings from "./SecuritySettings";



export default function SettingsPanel() {
  return (
    <div className="w-full space-y-6">
      <ProfileSettings/>
      <SecuritySettings/>
    </div>
  );
}
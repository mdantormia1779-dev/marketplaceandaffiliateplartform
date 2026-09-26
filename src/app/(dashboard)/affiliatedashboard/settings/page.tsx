"use client";

import { useState } from "react";

import {
  SettingsTabs,
  GeneralSettings,
  NotificationSettings,
  SecuritySettings,
  PaymentSettings,
  PrivacySettings,
  type TabId,
  type GeneralSettingsData,
  type NotificationSettingsData,
  type LoginSession,
  type PaymentAccount,
  type PrivacySettingsData,
} from "./settingscomponents";

export default function SettingsPage() {
  const [tab, setTab] = useState<TabId>("general");

  /* ------------------------------ General ------------------------------ */
  const [general, setGeneral] = useState<GeneralSettingsData>({
    fullName: "Debraz Pul",
    email: "debraz@marketplace.com",
    phone: "01712-345678",
    country: "Bangladesh",
    language: "English",
    timezone: "(GMT+06:00) Dhaka",
  });

  const updateGeneral = <K extends keyof GeneralSettingsData>(key: K, value: GeneralSettingsData[K]) =>
    setGeneral((g) => ({ ...g, [key]: value }));

  const saveGeneral = () => {
    // TODO: wire to your API to persist general settings
    console.log("Saving general settings", general);
  };

  /* --------------------------- Notifications --------------------------- */
  const [notifications, setNotifications] = useState<NotificationSettingsData>({
    email: false,
    commission: false,
    sales: true,
    bonus: true,
    referral: true,
    withdrawal: true,
    marketing: false,
  });

  const toggleNotification = (key: keyof NotificationSettingsData, value: boolean) =>
    setNotifications((n) => ({ ...n, [key]: value }));

  /* ------------------------------ Security ------------------------------ */
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessions, setSessions] = useState<LoginSession[]>([
    {
      id: "s1",
      device: "MacBook Pro",
      detail: "Chrome 128 · macOS",
      location: "Dhaka, Bangladesh · 103.148.22.14",
      current: true,
    },
    {
      id: "s2",
      device: "iPhone 15",
      detail: "Safari · iOS 18",
      location: "Dhaka, Bangladesh · 103.148.22.71",
    },
  ]);

  const signOutSession = (id: string) => setSessions((prev) => prev.filter((s) => s.id !== id));

  /* ------------------------------- Payment ------------------------------- */
  const [accounts, setAccounts] = useState<PaymentAccount[]>([
    { id: "p1", method: "bKash", detail: "01712-345678", ownerName: "Debraz Pul" },
    { id: "p2", method: "Nagad", detail: "01898-765432", ownerName: "Debraz Pul" },
    { id: "p3", method: "Bank Transfer", detail: "City Bank · ****4092", ownerName: "Debraz Pul" },
  ]);
  const [defaultAccountId, setDefaultAccountId] = useState("p1");

  const editAccount = (id: string, detail: string) =>
    setAccounts((prev) => prev.map((a) => (a.id === id ? { ...a, detail } : a)));

  const addAccount = (account: Omit<PaymentAccount, "id">) =>
    setAccounts((prev) => [...prev, { ...account, id: `p-${Date.now()}` }]);

  /* ------------------------------- Privacy ------------------------------- */
  const [privacy, setPrivacy] = useState<PrivacySettingsData>({
    publicProfile: true,
    personalisedMarketing: true,
    partnerDataSharing: false,
  });

  const togglePrivacy = (key: keyof PrivacySettingsData, value: boolean) =>
    setPrivacy((p) => ({ ...p, [key]: value }));

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="mt-0.5 text-sm text-slate-500">Manage your account preferences and dashboard settings.</p>
        </div>

        <SettingsTabs active={tab} onChange={setTab} />

        {tab === "general" && (
          <GeneralSettings data={general} onChange={updateGeneral} onSave={saveGeneral} />
        )}

        {tab === "notifications" && (
          <NotificationSettings data={notifications} onToggle={toggleNotification} />
        )}

        {tab === "security" && (
          <SecuritySettings
            twoFactorEnabled={twoFactorEnabled}
            onToggleTwoFactor={setTwoFactorEnabled}
            sessions={sessions}
            onSignOutSession={signOutSession}
          />
        )}

        {tab === "payment" && (
          <PaymentSettings
            accounts={accounts}
            defaultAccountId={defaultAccountId}
            onSetDefault={setDefaultAccountId}
            onEditAccount={editAccount}
            onAddAccount={addAccount}
          />
        )}

        {tab === "privacy" && <PrivacySettings data={privacy} onToggle={togglePrivacy} />}
      </main>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Laptop, Smartphone, ShieldCheck, Lock } from "lucide-react";
import Toggle from "./Toggle";
import type { LoginSession } from "./types";

const inputCls =
  "h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

export default function SecuritySettings({
  twoFactorEnabled,
  onToggleTwoFactor,
  sessions,
  onSignOutSession,
}: {
  twoFactorEnabled: boolean;
  onToggleTwoFactor: (v: boolean) => void;
  sessions: LoginSession[];
  onSignOutSession: (id: string) => void;
}) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleUpdatePassword = () => {
    if (!current || !next || !confirm) {
      setError("Fill in all three fields.");
      return;
    }
    if (next.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (next !== confirm) {
      setError("New password and confirmation don't match.");
      return;
    }
    setError("");
    setCurrent("");
    setNext("");
    setConfirm("");
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Change password */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <ShieldCheck size={16} />
            </span>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Change Password</h3>
              <p className="mt-0.5 text-sm text-slate-500">Use a strong password to keep your account secure.</p>
            </div>
          </div>
          <button
            onClick={handleUpdatePassword}
            className="shrink-0 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {saved ? "Updated" : "Update Password"}
          </button>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm text-slate-700">Current Password</label>
            <input
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-slate-700">New Password</label>
            <input
              type="password"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-slate-700">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>
        {error && <p className="px-6 pb-5 text-sm text-red-600">{error}</p>}
      </div>

      {/* Two-factor authentication */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Lock size={16} />
          </span>
          <div>
            <h3 className="text-base font-semibold text-slate-900">Two-Factor Authentication</h3>
            <p className="mt-0.5 text-sm text-slate-500">Add an extra layer of security to your account.</p>
          </div>
        </div>
        <div className="flex items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-medium text-slate-800">Enable 2FA</p>
            <p className="mt-0.5 text-sm text-slate-500">Require a verification code from your phone when signing in.</p>
          </div>
          <Toggle checked={twoFactorEnabled} onChange={onToggleTwoFactor} label="Enable 2FA" />
        </div>
      </div>

      {/* Login activity */}
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-6 py-5">
          <h3 className="text-base font-semibold text-slate-900">Login Activity</h3>
          <p className="mt-0.5 text-sm text-slate-500">Recent sessions on your affiliate account.</p>
        </div>
        <div className="divide-y divide-slate-100">
          {sessions.map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  {s.device.toLowerCase().includes("iphone") ? <Smartphone size={16} /> : <Laptop size={16} />}
                </span>
                <div>
                  <p className="flex items-center gap-2 text-sm font-medium text-slate-800">
                    {s.device}
                    {s.current && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        CURRENT
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-500">{s.detail}</p>
                  <p className="text-xs text-slate-400">{s.location}</p>
                </div>
              </div>
              {!s.current && (
                <button
                  onClick={() => onSignOutSession(s.id)}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Sign out
                </button>
              )}
            </div>
          ))}
          {sessions.length === 0 && (
            <p className="px-6 py-5 text-sm text-slate-400">No other active sessions.</p>
          )}
        </div>
      </div>
    </div>
  );
}
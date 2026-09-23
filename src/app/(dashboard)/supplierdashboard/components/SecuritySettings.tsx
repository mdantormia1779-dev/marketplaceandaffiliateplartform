"use client";

import { useEffect, useState } from "react";
import {
  ShieldCheck,
  LockKeyhole,
  KeyRound,
  BellRing,
} from "lucide-react";
import PasswordModal from "./PasswordModal";

export default function SecuritySettings() {
  /*
   * IMPORTANT:
   * These initial values must stay the same on
   * server and first client render.
   *
   * localStorage will be loaded after hydration.
   */
  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [passwordModalOpen, setPasswordModalOpen] =
    useState(false);
  const [passwordChanged, setPasswordChanged] =
    useState(false);

  /*
   * Load saved settings after hydration.
   *
   * setTimeout prevents the synchronous
   * set-state-in-effect warning.
   */
  useEffect(() => {
    const loadSecuritySettings = () => {
      try {
        const savedTwoFactor =
          localStorage.getItem("supplier-two-factor");

        const savedLoginAlerts =
          localStorage.getItem("supplier-login-alerts");

        const savedPassword =
          localStorage.getItem(
            "supplier-password-changed"
          );

        if (savedTwoFactor !== null) {
          setTwoFactor(
            savedTwoFactor === "true"
          );
        }

        if (savedLoginAlerts !== null) {
          setLoginAlerts(
            savedLoginAlerts === "true"
          );
        }

        if (savedPassword === "true") {
          setPasswordChanged(true);
        }
      } catch {
        // Ignore invalid localStorage data.
      }
    };

    const timer = window.setTimeout(
      loadSecuritySettings,
      0
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /*
   * Two-factor toggle
   */
  const toggleTwoFactor = () => {
    const value = !twoFactor;

    setTwoFactor(value);

    localStorage.setItem(
      "supplier-two-factor",
      String(value)
    );
  };

  /*
   * Login alerts toggle
   */
  const toggleLoginAlerts = () => {
    const value = !loginAlerts;

    setLoginAlerts(value);

    localStorage.setItem(
      "supplier-login-alerts",
      String(value)
    );
  };

  return (
    <>
      {/* =========================
          SECURITY SECTION
      ========================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {/* Header */}

        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#315be7]">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Security
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Protect your supplier account.
              </p>
            </div>
          </div>
        </div>

        {/* Security Items */}

        <div className="divide-y divide-slate-100">
          {/* Password */}

          <div className="flex items-center justify-between gap-5 px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                <LockKeyhole size={18} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  Password
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {passwordChanged
                    ? "Last changed recently"
                    : "Last changed recently"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setPasswordModalOpen(true)
              }
              className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <KeyRound size={15} />

              Change
            </button>
          </div>

          {/* Two Factor */}

          <div className="flex items-center justify-between gap-5 px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                <ShieldCheck size={18} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  Two-factor authentication
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {twoFactor
                    ? "Enabled"
                    : "Recommended"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleTwoFactor}
              aria-label="Toggle two-factor authentication"
              aria-pressed={twoFactor}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                twoFactor
                  ? "bg-[#315be7]"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                  twoFactor
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Login Alerts */}

          <div className="flex items-center justify-between gap-5 px-6 py-5">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600">
                <BellRing size={18} />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  Login alerts
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {loginAlerts
                    ? "Enabled"
                    : "Disabled"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleLoginAlerts}
              aria-label="Toggle login alerts"
              aria-pressed={loginAlerts}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                loginAlerts
                  ? "bg-[#315be7]"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                  loginAlerts
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* =========================
          PASSWORD MODAL
      ========================== */}

      <PasswordModal
        open={passwordModalOpen}
        onClose={() =>
          setPasswordModalOpen(false)
        }
        onPasswordChanged={() => {
          setPasswordChanged(true);

          localStorage.setItem(
            "supplier-password-changed",
            "true"
          );
        }}
      />
    </>
  );
}
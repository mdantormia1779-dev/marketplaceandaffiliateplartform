"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";

export interface NewCampaignInput {
  name: string;
  commissionRate: number;
  startDate: string;
  endDate: string;
}

interface NewCampaignModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: NewCampaignInput) => void;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatShort(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

export default function NewCampaignModal({ open, onClose, onSubmit }: NewCampaignModalProps) {
  const [name, setName] = useState("");
  const [rate, setRate] = useState("15");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  function reset() {
    setName("");
    setRate("15");
    setStartDate("");
    setEndDate("");
    setError("");
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const trimmedName = name.trim();
    const rateNum = Number(rate);

    if (!trimmedName) {
      setError("Campaign name is required.");
      return;
    }
    if (!Number.isFinite(rateNum) || rateNum <= 0 || rateNum > 100) {
      setError("Enter a commission rate between 1 and 100.");
      return;
    }
    if (!startDate || !endDate) {
      setError("Pick a start and end date.");
      return;
    }
    if (startDate > endDate) {
      setError("End date must be after the start date.");
      return;
    }

    onSubmit({ name: trimmedName, commissionRate: rateNum, startDate, endDate });
    reset();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">New Campaign</h3>
            <p className="mt-1 text-sm text-slate-500">
              Runs a higher commission rate for a set period. It overrides product and global rates.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="campaign-name" className="mb-1.5 block text-xs font-medium text-slate-700">
              Campaign name
            </label>
            <input
              id="campaign-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Winter Sale Push"
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label htmlFor="campaign-rate" className="mb-1.5 block text-xs font-medium text-slate-700">
              Commission rate (%)
            </label>
            <input
              id="campaign-rate"
              type="number"
              min={1}
              max={100}
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="campaign-start" className="mb-1.5 block text-xs font-medium text-slate-700">
                Start date
              </label>
              <input
                id="campaign-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label htmlFor="campaign-end" className="mb-1.5 block text-xs font-medium text-slate-700">
                End date
              </label>
              <input
                id="campaign-end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {startDate && endDate && startDate <= endDate && (
            <p className="text-xs text-slate-400">
              Window preview: {formatShort(startDate)} – {formatShort(endDate)}
            </p>
          )}

          {error && <p className="text-xs text-rose-600">{error}</p>}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
            >
              Create campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
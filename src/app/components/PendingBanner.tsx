import React from 'react';
import { X } from 'lucide-react';

interface PendingBannerProps {
  onClose: () => void;
}

export const PendingBanner: React.FC<PendingBannerProps> = ({ onClose }) => {
  return (
    <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-3 text-amber-900 text-xs sm:text-sm animate-in slide-in-from-top-2 duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <p className="font-medium">
            <strong className="font-bold">Pending Merchant Review:</strong> Your supplier storefront application is undergoing compliance audit (NID/Trade License). Standard verification takes 12-24 hours.
          </p>
        </div>
        <button 
          onClick={onClose}
          className="text-amber-800 hover:text-amber-950 font-bold p-1 rounded-md"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
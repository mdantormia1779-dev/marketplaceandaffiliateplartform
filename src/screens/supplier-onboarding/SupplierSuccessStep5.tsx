import React from 'react';
import { Check, Clock, ShieldCheck, Store, FileText, ArrowRight, Edit3 } from 'lucide-react';

interface SupplierSuccessStep5Props {
  ownerName: string;
  onEditApplication: () => void;
  onGoToSign: () => void;
}

export const SupplierSuccessStep5: React.FC<SupplierSuccessStep5Props> = ({
  ownerName,
  onEditApplication,
  onGoToSign,
}) => {
  return (
    <div className="p-6 sm:p-10 space-y-8 font-sans">
      
      {/* Top Warning/Info Banner */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-start gap-3.5">
        <div className="p-2 bg-slate-200/70 rounded-xl text-slate-700 shrink-0 mt-0.5">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-900">
            Account pending review
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Your supplier profile is currently under review by admin. You'll receive an email the moment it's approved.
          </p>
        </div>
      </div>

      {/* Main Success Heading Section */}
      <div className="text-center space-y-3 pt-4">
        <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
          <Check className="w-7 h-7 stroke-[2.5]" />
        </div>
        
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Application submitted
        </h2>
        
        <p className="text-xs font-medium text-slate-500 max-w-md mx-auto">
          Thanks, {ownerName || 'there'} — your store is in queue. Typical verification takes <span className="font-bold text-slate-700">24–48 business hours</span>.
        </p>
      </div>

      {/* Timeline Status List */}
      <div className="max-w-md mx-auto py-4 space-y-6 relative before:absolute before:left-7 before:top-6 before:bottom-6 before:w-0.5 before:bg-slate-100">
        
        {/* Step 1: Application submitted */}
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Application submitted</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Your documents are queued for review.</p>
          </div>
        </div>

        {/* Step 2: Compliance check (In Progress) */}
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-slate-900">Compliance check</h4>
              <span className="text-[9px] font-extrabold uppercase bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">
                • IN PROGRESS
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Trust team validates your license & address.</p>
          </div>
        </div>

        {/* Step 3: Store activation */}
        <div className="flex items-start gap-4 relative z-10">
          <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center shrink-0">
            <Store className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400">Store activation</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Products go live and affiliates can promote.</p>
          </div>
        </div>

      </div>

      {/* Bottom Footer Actions */}
      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onEditApplication}
          className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Edit3 className="w-4 h-4 text-slate-500" />
          <span>Edit application</span>
        </button>

        <button
          type="button"
          onClick={onGoToSign}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
        >
          <span>Go to sign in</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
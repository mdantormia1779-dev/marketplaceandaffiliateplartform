import React, { useState, useRef } from 'react';
import { 
  Shield, 
  FileText, 
  UploadCloud, 
  MapPin, 
  Map, 
  Building2, 
  X,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Clock,
  FileCheck
} from 'lucide-react';

interface SupplierVerificationStep2Props {
  onBack?: () => void;
  onNext?: () => void;
  triggerToast?: (msg: string) => void;
}

export const SupplierVerificationStep2: React.FC<SupplierVerificationStep2Props> = ({
  onBack,
  onNext,
  triggerToast,
}) => {
  const [formData, setFormData] = useState({
    registrationNumber: '',
    streetAddress: '',
    district: '',
    cityThana: '',
  });

  const [docFile, setDocFile] = useState<File | null>(null);
  const [docName, setDocName] = useState<string | null>(null);
  const docInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        triggerToast?.('File size must be under 10MB');
        return;
      }
      setDocFile(file);
      setDocName(file.name);
      triggerToast?.('Verification document uploaded!');
    }
  };

  const handleSaveAndContinue = () => {
    // Validation Form (apnar dorkar moto enable/disable korte paren)
    if (!formData.registrationNumber.trim()) {
      triggerToast?.('Trade license or NID number enter করুন');
      return;
    }
    if (!docFile) {
      triggerToast?.('Verification document upload করুন');
      return;
    }
    if (!formData.streetAddress.trim()) {
      triggerToast?.('Warehouse street address enter করুন');
      return;
    }
    if (!formData.district) {
      triggerToast?.('District select করুন');
      return;
    }
    if (!formData.cityThana.trim()) {
      triggerToast?.('City or Thana enter করুন');
      return;
    }

    // Step 3-e niye jabar jonno onNext call hocche
    if (onNext) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Form Content */}
      <div className="p-6 sm:p-10 space-y-8 flex-1">
        {/* Section Heading */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Verification & compliance
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload your business documents and warehouse details.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">Step 2 of 4</span>
        </div>

        {/* Encryption Warning Banner */}
        <div className="flex items-center gap-3.5 bg-[#F8FAFC] border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-600 font-medium">
          <div className="p-2 bg-white rounded-xl shadow-2xs border border-slate-100 shrink-0">
            <Shield className="w-4 h-4 text-slate-500" />
          </div>
          <p>
            Compliance documents are encrypted and reviewed by our trust team. Verification usually completes within 24–48 hours.
          </p>
        </div>

        {/* Trade License / NID Input */}
        <div className="space-y-2">
          <div className="relative">
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              placeholder="Trade license / NID / Business registration number *"
              className="w-full bg-[#F8FAFC]/70 border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
            />
          </div>
          <p className="text-[11px] text-slate-400 pl-1 font-medium">
            Enter the number exactly as printed on your document.
          </p>
        </div>

        {/* Document Upload Area */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            VERIFICATION DOCUMENT *
          </label>

          <input
            type="file"
            ref={docInputRef}
            onChange={handleDocChange}
            accept=".pdf, image/png, image/jpeg"
            className="hidden"
          />

          <div 
            onClick={() => docInputRef.current?.click()}
            className="relative border-2 border-dashed border-slate-200/90 rounded-2xl p-6 bg-[#F8FAFC]/50 hover:bg-slate-50 transition-colors cursor-pointer group min-h-[120px] flex items-center justify-center"
          >
            {docName ? (
              <div className="w-full flex items-center justify-between bg-[#F0FDF4] border border-emerald-100 p-4 rounded-2xl shadow-2xs">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] flex items-center justify-center shrink-0">
                    <FileCheck className="w-6 h-6 text-[#16A34A]" />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {docName}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-[#16A34A]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Pending admin approval</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDocFile(null);
                    setDocName(null);
                  }}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-white/80 rounded-xl transition-all ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform mx-auto">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">
                    Drag & drop or <span className="text-blue-600 hover:underline">browse</span>
                  </p>
                  <p className="text-[11px] font-medium text-slate-400 mt-1">
                    PDF, PNG or JPG · max 10MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Warehouse / Pickup Address */}
        <div className="space-y-4 pt-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Warehouse / pickup address
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Where couriers collect orders. This is also used for return routing.
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                placeholder="Street address, area, postcode *"
                className="w-full bg-[#F8FAFC]/70 border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Map className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full bg-[#F8FAFC]/70 border border-slate-200/90 rounded-2xl pl-11 pr-10 py-3.5 text-xs text-slate-700 outline-none focus:bg-white focus:border-blue-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled>District *</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Mymensingh">Mymensingh</option>
                  <option value="Barisal">Barisal</option>
                  <option value="Rangpur">Rangpur</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="cityThana"
                  value={formData.cityThana}
                  onChange={handleInputChange}
                  placeholder="City / Thana *"
                  className="w-full bg-[#F8FAFC]/70 border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="p-6 sm:px-10 bg-[#FAFCFF] border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous step</span>
        </button>

        <button
          type="button"
          onClick={handleSaveAndContinue}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
        >
          <span>Save & continue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
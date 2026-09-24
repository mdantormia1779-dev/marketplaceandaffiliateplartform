import React, { useState, useRef } from 'react';
import { 
  Store, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  ChevronDown, 
  ArrowLeft, 
  ArrowRight 
} from 'lucide-react';
import { ScreenType } from '../types';
import { saveAuthUser } from '../lib/auth'; // path apnar structure onujayi thik korben

// Imports from supplier-onboarding sub-folder
import { OnboardingStepper } from './supplier-onboarding/OnboardingStepper';
import { OtpVerification } from './supplier-onboarding/OtpVerification';
import { ImageUploader } from './supplier-onboarding/ImageUploader';
import { SupplierVerificationStep2 } from './supplier-onboarding/SupplierVerificationStep2';
import { SupplierPayoutStep3 } from './supplier-onboarding/SupplierPayoutStep3';
import { SupplierReviewStep4 } from './supplier-onboarding/SupplierReviewStep4';
import { SupplierSuccessStep5 } from './supplier-onboarding/SupplierSuccessStep5';

interface ScreenSupplierOnboardingProps {
  onNavigate: (screen: ScreenType) => void;
  triggerToast?: (msg: string) => void;
}

// Supplier dashboard ekhon real Next.js route hisebe toiri hoye gache:
// app/(dashboard)/supplierdashboard/page.tsx
// Route group "(dashboard)" URL-e dekha jay na, tai actual path thakbe /supplierdashboard
const SUPPLIER_DASHBOARD_PATH = '/supplierdashboard';

export const ScreenSupplierOnboarding: React.FC<ScreenSupplierOnboardingProps> = ({
  onNavigate,
  triggerToast,
}) => {
  // Step Navigation State (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    storeName: '',
    storeHandle: '',
    category: '',
  });

  // OTP State
  const [showOtpSection, setShowOtpSection] = useState<boolean>(false);
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [isPhoneVerified, setIsPhoneVerified] = useState<boolean>(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // File & Preview States
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  // Hidden File Input Refs
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const bannerInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'storeName' && !prev.storeHandle ? { storeHandle: value.toLowerCase().replace(/\s+/g, '-') } : {}),
    }));
  };

  // OTP Input Handlers
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpValues];
    newOtp[index] = value.slice(-1);
    setOtpValues(newOtp);

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOTP = () => {
    if (!formData.phone) {
      triggerToast?.('Mobile number likhun prathame');
      return;
    }
    setShowOtpSection(true);
    triggerToast?.('OTP pathano hoyeche ' + formData.phone + ' e');
    setTimeout(() => {
      otpInputRefs.current[0]?.focus();
    }, 100);
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otpValues.join('');
    if (enteredOtp.length < 6) {
      triggerToast?.('Sotik 6-digit OTP din');
      return;
    }
    setIsPhoneVerified(true);
    setShowOtpSection(false);
    triggerToast?.('Mobile number safolobhabe verify hoyeche!');
  };

  // Logo Handler
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        triggerToast?.('Logo size 2MB er kom hote hobe');
        return;
      }
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
      triggerToast?.('Logo upload hoyeche!');
    }
  };

  // Banner Handler
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        triggerToast?.('Banner size 5MB er kom hote hobe');
        return;
      }
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
      triggerToast?.('Banner upload hoyeche!');
    }
  };

  // Save & Continue with Form Validation
  const handleSaveAndContinue = () => {
    if (!formData.ownerName.trim()) {
      triggerToast?.('Owner full name puron korun');
      return;
    }
    if (!formData.email.trim()) {
      triggerToast?.('Business email puron korun');
      return;
    }
    if (!formData.phone.trim()) {
      triggerToast?.('Mobile number puron korun');
      return;
    }
    if (!isPhoneVerified) {
      triggerToast?.('Mobile number verify korun (OTP Verification required)');
      return;
    }
    if (!formData.storeName.trim()) {
      triggerToast?.('Store name puron korun');
      return;
    }
    if (!formData.storeHandle.trim()) {
      triggerToast?.('Store URL handle puron korun');
      return;
    }
    if (!formData.category) {
      triggerToast?.('Business category select korun');
      return;
    }
    if (!logoFile) {
      triggerToast?.('Store Logo upload korun');
      return;
    }
    if (!bannerFile) {
      triggerToast?.('Store Banner upload korun');
      return;
    }

    triggerToast?.('Step 1 complete! Moving to Step 2...');
    setCurrentStep(2);
  };

  // Step 5-e successful submission howar por eta call hoy.
  // Ekhane supplier-er auth info save kora hocche (Navbar-e dekhanor jonno)
  // ar tarpor asol /supplierdashboard route-e pathano hocche.
  const handleGoToDashboard = () => {
    saveAuthUser({
      name: formData.ownerName || 'Supplier',
      email: formData.email,
      role: 'supplier',
    });

    triggerToast?.('Welcome! Redirecting to your Supplier Dashboard...');

    // Notun (dashboard) route group-e asol page thakay,
    // sorasori hard navigation e sob theke nirbhorjogyo.
    // Apnar project e next/navigation-er useRouter thakle
    // eta router.push(SUPPLIER_DASHBOARD_PATH) diye o replace kora jay.
    if (typeof window !== 'undefined') {
      window.location.href = SUPPLIER_DASHBOARD_PATH;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <Store className="w-4 h-4" />
            <span>SUPPLIER / VENDOR ONBOARDING</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Register your store
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Four quick steps to launch a verified storefront on Nexora.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
          
          {/* Stepper Header */}
          <OnboardingStepper currentStep={currentStep} />

          {/* STEP 1: Form & Details */}
          {currentStep === 1 && (
            <>
              <div className="p-6 sm:p-10 space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Account & store information
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tell us who you are and how your storefront should appear.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">Step 1 of 4</span>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        placeholder="Owner full name *"
                        className="w-full bg-[#F8FAFC]/70 border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Business email *"
                        className="w-full bg-[#F8FAFC]/70 border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Mobile Input */}
                  <div className="relative flex items-center bg-[#F8FAFC]/70 border border-slate-200/90 rounded-2xl overflow-hidden focus-within:bg-white focus-within:border-blue-500 transition-all">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      name="phone"
                      disabled={isPhoneVerified}
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Mobile number *"
                      className="w-full bg-transparent pl-11 pr-28 py-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none"
                    />
                    
                    {isPhoneVerified ? (
                      <span className="absolute right-3 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
                        Verified ✓
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        className="absolute right-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                      >
                        Send OTP
                      </button>
                    )}
                  </div>

                  {/* OTP Section */}
                  {showOtpSection && !isPhoneVerified && (
                    <OtpVerification
                      phone={formData.phone}
                      otpValues={otpValues}
                      otpInputRefs={otpInputRefs}
                      handleOtpChange={handleOtpChange}
                      handleOtpKeyDown={handleOtpKeyDown}
                      onCancel={() => setShowOtpSection(false)}
                      onVerify={handleVerifyOtp}
                    />
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="storeName"
                        value={formData.storeName}
                        onChange={handleInputChange}
                        placeholder="Store name *"
                        className="w-full bg-[#F8FAFC]/70 border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="storeHandle"
                        value={formData.storeHandle}
                        onChange={handleInputChange}
                        placeholder="Store URL handle *"
                        className="w-full bg-[#F8FAFC]/70 border border-slate-200/90 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 pl-1">
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span>Your storefront will live at</span>
                    <span className="font-bold text-blue-600">
                      marketplace.com/store/{formData.storeHandle || 'your-store'}
                    </span>
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                      </svg>
                    </div>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-[#F8FAFC]/70 border border-slate-200/90 rounded-2xl pl-11 pr-10 py-3.5 text-xs text-slate-700 outline-none focus:bg-white focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Business category *</option>
                      <option value="electronics">Electronics & Gadgets</option>
                      <option value="fashion">Fashion & Apparel</option>
                      <option value="groceries">Groceries & Supermarket</option>
                      <option value="health">Health & Beauty</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* Store Logo & Banner Uploaders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <ImageUploader
                    label="STORE LOGO *"
                    preview={logoPreview}
                    inputRef={logoInputRef}
                    onFileChange={handleLogoChange}
                    onRemove={() => {
                      setLogoFile(null);
                      setLogoPreview(null);
                    }}
                    recommendedText="PNG or JPG · square · max 2MB"
                  />

                  <ImageUploader
                    label="STORE BANNER *"
                    preview={bannerPreview}
                    inputRef={bannerInputRef}
                    onFileChange={handleBannerChange}
                    onRemove={() => {
                      setBannerFile(null);
                      setBannerPreview(null);
                    }}
                    recommendedText="PNG or JPG · 16:6 · max 5MB"
                    isBanner={true}
                  />
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 sm:px-10 bg-[#FAFCFF] border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('gateway' as any)}
                  className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to role selection</span>
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
            </>
          )}

          {/* STEP 2: Verification View */}
          {currentStep === 2 && (
            <SupplierVerificationStep2
              onBack={() => setCurrentStep(1)}
              onNext={() => {
                triggerToast?.('Step 2 Complete!');
                setCurrentStep(3);
              }}
              triggerToast={triggerToast}
            />
          )}

          {/* STEP 3: Payout Setup View */}
          {currentStep === 3 && (
            <SupplierPayoutStep3
              onBack={() => setCurrentStep(2)}
              onNext={() => {
                triggerToast?.('Step 3 Complete!');
                setCurrentStep(4);
              }}
              triggerToast={triggerToast}
            />
          )}

        </div>

        {/* STEP 4: Subscription Plan & Review */}
        {currentStep === 4 && (
          <SupplierReviewStep4
            onBack={() => setCurrentStep(3)}
            onSubmit={() => {
              setCurrentStep(5); // Submit করার পর Step 5 এ চলে যাবে
            }}
            triggerToast={triggerToast}
          />
        )}

        {/* STEP 5: Success — Ekhon auth save kore asol dashboard-e pathay */}
        {currentStep === 5 && (
          <SupplierSuccessStep5
            ownerName={formData.ownerName}
            onEditApplication={() => setCurrentStep(1)} // আবার প্রথম স্টেপে নিয়ে যাবে
            onGoToSign={handleGoToDashboard}
          />
        )}

        {/* Support Link */}
        <div className="text-center">
          <p className="text-xs text-slate-500 font-medium">
            Need help?{' '}
            <a
              href="mailto:supplier-support@nexora.market"
              className="font-bold text-blue-600 hover:underline"
            >
              supplier-support@nexora.market
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ScreenSupplierOnboarding;

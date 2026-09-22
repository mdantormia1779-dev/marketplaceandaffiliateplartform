import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

import { ScreenType, RoleType } from './types';

import { PendingBanner } from './app/components/PendingBanner';
import { TwoFactorModal } from './app/components/TwoFactorModal';

import { ScreenLogin } from './screens/ScreenLogin';
import { ScreenGateway } from './screens/ScreenGateway';
import { ScreenCustomerRegister } from './screens/ScreenCustomerRegister';
import { ScreenSupplierOnboarding } from './screens/ScreenSupplierOnboarding';
import { ScreenAffiliateRegister } from './screens/ScreenAffiliateRegister';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('login');
  const [selectedRole, setSelectedRole] = useState<RoleType>('customer');
  const [show2FAModal, setShow2FAModal] = useState<boolean>(false);
  const [showPendingBanner, setShowPendingBanner] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* Verification Banner */}
      {showPendingBanner && (
        <PendingBanner onClose={() => setShowPendingBanner(false)} />
      )}

      {/* Screen Router */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12">
        {currentScreen === 'login' && (
          <ScreenLogin 
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            onNavigate={(screen) => setCurrentScreen(screen)}
            triggerToast={triggerToast}
          />
        )}

        {currentScreen === 'gateway' && (
          <ScreenGateway 
            onSelectRole={(role) => {
              setSelectedRole(role);
              if (role === 'customer') setCurrentScreen('customer-register');
              if (role === 'affiliate') setCurrentScreen('affiliate-register');
              if (role === 'supplier') setCurrentScreen('supplier-onboarding');
            }}
          />
        )}

        {currentScreen === 'customer-register' && (
          <ScreenCustomerRegister 
            onNavigate={(screen) => setCurrentScreen(screen)}
            triggerToast={triggerToast}
          />
        )}

        {currentScreen === 'supplier-onboarding' && (
          <ScreenSupplierOnboarding 
            onNavigate={(screen) => setCurrentScreen(screen)}
            triggerToast={triggerToast}
          />
        )}

        {currentScreen === 'affiliate-register' && (
          <ScreenAffiliateRegister 
            onNavigate={(screen) => setCurrentScreen(screen)}
            triggerToast={triggerToast}
          />
        )}
      </main>

      {/* 2FA Modal Overlay */}
      {show2FAModal && (
        <TwoFactorModal 
          onClose={() => setShow2FAModal(false)}
          onSuccess={() => {
            setShow2FAModal(false);
            triggerToast("Two-Factor Code Successfully Verified!");
          }}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
import React from 'react';
import { ShoppingBag, TrendingUp, Building2, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { RoleType } from '../types';

interface ScreenGatewayProps {
  onSelectRole: (role: RoleType) => void;
}

export const ScreenGateway: React.FC<ScreenGatewayProps> = ({ onSelectRole }) => {
  return (
    <div className="w-full max-w-5xl my-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200/80 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Readdy.ai Interactive Gateway
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Join Our Marketplace Ecosystem
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-2">
          Choose how you want to interact with our enterprise platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Shop as a Customer</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Browse thousands of verified products from top suppliers with fast delivery.
            </p>
          </div>

          <div>
            <div className="border-t border-slate-100 pt-4 mb-6 space-y-2 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Instant 1-Step Setup</span>
              </div>
            </div>
            <button
              onClick={() => onSelectRole('customer')}
              className="w-full bg-slate-900 group-hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Register as Customer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Affiliate Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-xs">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Earn as an Affiliate</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Generate trackable links and earn up to 20% commission on every sale.
            </p>
          </div>
          <button
            onClick={() => onSelectRole('affiliate')}
            className="w-full bg-slate-900 group-hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Become an Affiliate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Supplier Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-purple-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-xs">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Sell as a Supplier</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">
              Reach thousands of buyers across the country with automated inventory management.
            </p>
          </div>
          <button
            onClick={() => onSelectRole('supplier')}
            className="w-full bg-slate-900 group-hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Register Your Store</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
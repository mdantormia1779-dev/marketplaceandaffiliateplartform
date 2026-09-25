'use client';
import ReferralHero from './components/ReferralHero';
import ReferralStats from './components/ReferralStats';
import ReferralPerformance from './components/ReferralPerformance';
import ReferralHistoryTable from './components/ReferralHistoryTable';
import { ReferralItem } from './components/types';

const dummyReferrals: ReferralItem[] = [
  { id: '1', name: 'Sabbir Ahmed', joinedDate: '2026-09-18', status: 'Active', salesGenerated: 42, commission: 4200 },
  { id: '2', name: 'Tania Rahman', joinedDate: '2026-09-12', status: 'Active', salesGenerated: 36, commission: 3600 },
  { id: '3', name: 'Mehedi Hasan', joinedDate: '2026-09-05', status: 'Active', salesGenerated: 28, commission: 2800 },
  { id: '4', name: 'Farzana Yesmin', joinedDate: '2026-08-29', status: 'Active', salesGenerated: 21, commission: 2100 },
  { id: '5', name: 'Rakib Hossain', joinedDate: '2026-08-21', status: 'Pending', salesGenerated: 0, commission: 0 },
  { id: '6', name: 'Sumaiya Akter', joinedDate: '2026-08-14', status: 'Active', salesGenerated: 18, commission: 1800 },
];

export default function ReferralsPage() {
  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Referrals</h1>
        <p className="text-sm text-slate-500 mt-1">Invite new affiliates and earn referral rewards.</p>
      </div>

      {/* Hero Banner */}
      <ReferralHero />

      {/* Stats Cards */}
      <ReferralStats />

      {/* Performance Graph */}
      <ReferralPerformance />

      {/* Referral History Table */}
      <ReferralHistoryTable referrals={dummyReferrals} />
    </div>
  );
}
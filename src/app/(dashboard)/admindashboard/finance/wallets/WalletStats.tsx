import { Banknote, Clock, Wallet, XCircle } from "lucide-react";
import { TRENDS } from "./data";
import { money } from "./format";
import WalletStatCard from "./WalletStatCard";

interface Props {
  stats: { balance: number; pending: number; affiliates: number; frozen: number };
}

export default function WalletStats({ stats }: Props) {
  const cards = [
    { title: "Total Balances", value: money(stats.balance), icon: Wallet, iconClass: "bg-emerald-50 text-emerald-600", trend: TRENDS.balance },
    { title: "Pending", value: money(stats.pending), icon: Clock, iconClass: "bg-amber-50 text-amber-600", trend: TRENDS.pending },
    { title: "Affiliate Wallets", value: stats.affiliates.toLocaleString(), icon: Banknote, iconClass: "bg-teal-50 text-teal-700", trend: TRENDS.affiliates },
    { title: "Frozen", value: stats.frozen.toLocaleString(), icon: XCircle, iconClass: "bg-gray-100 text-gray-600", trend: TRENDS.frozen },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((c) => (
        <WalletStatCard key={c.title} {...c} />
      ))}
    </div>
  );
}

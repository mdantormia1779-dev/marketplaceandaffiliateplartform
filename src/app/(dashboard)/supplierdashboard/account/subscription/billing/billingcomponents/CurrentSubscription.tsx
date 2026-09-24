import Link from "next/link";
import { Settings } from "lucide-react";
import Card from "./Card";
import SectionHeader from "./SectionHeader";
import PlanBox from "./PlanBox";
import RenewalBox from "./RenewalBox";
import UsageBar from "./UsageBar";
import { Subscription } from "./types";

interface Props { subscription: Subscription; onToggleAutoRenewal: () => void }

export default function CurrentSubscription({ subscription, onToggleAutoRenewal }: Props) {
  return (
    <Card className="p-6 lg:col-span-2">
      <SectionHeader
        title="Current Subscription"
        subtitle="Your active plan, renewal and usage at a glance."
        action={
          <Link
            href="/supplierdashboard/subscription/upgrade"
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <Settings size={14} /> Manage Plan
          </Link>
        }
      />
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <PlanBox subscription={subscription} />
        <RenewalBox subscription={subscription} onToggle={onToggleAutoRenewal} />
      </div>
      <div className="mt-5"><UsageBar subscription={subscription} /></div>
    </Card>
  );
}
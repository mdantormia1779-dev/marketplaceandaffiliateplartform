import PlanCard from "./PlanCard";
import { plans } from "./data";
import { CurrentSub, Cycle, Plan } from "./types";

interface Props {
  cycle: Cycle;
  current: CurrentSub;
  onSelect: (plan: Plan) => void;
}

export default function PlansGrid({ cycle, current, onSelect }: Props) {
  const currentRank = plans.find((p) => p.id === current.planId)?.rank ?? 0;

  return (
    <section className="grid items-start gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} cycle={cycle} current={current} currentRank={currentRank} onSelect={onSelect} />
      ))}
    </section>
  );
}
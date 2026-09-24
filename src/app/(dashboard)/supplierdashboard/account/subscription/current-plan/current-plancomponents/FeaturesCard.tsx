import { Check } from "lucide-react";
import Card from "./Card";
import { Feature } from "./types";

interface Props { planName: string; features: Feature[] }

export default function FeaturesCard({ planName, features }: Props) {
  return (
    <Card className="p-6 lg:col-span-2">
      <h2 className="text-lg font-semibold text-slate-900">Included Features</h2>
      <p className="mb-5 mt-1 text-xs text-slate-500">Everything you get with the {planName} Plan.</p>
      <ul className="grid gap-x-8 gap-y-5 md:grid-cols-2">
        {features.map((f) => (
          <li key={f.title} className="flex gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <Check size={12} />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-900">{f.title}</p>
              <p className="text-xs text-slate-500">{f.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
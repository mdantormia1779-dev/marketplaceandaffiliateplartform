import {
  ShieldCheck,
  LockKeyhole,
  CircleDollarSign,
  Truck,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified suppliers",
    description:
      "Every store is reviewed before it can sell on Sokoni.",
    iconBg: "bg-[#e6edff]",
    iconColor: "text-[#315be7]",
  },
  {
    icon: LockKeyhole,
    title: "Secure payments",
    description:
      "COD, bKash, Nagad and card checkout you can trust.",
    iconBg: "bg-[#c8f5df]",
    iconColor: "text-[#16865b]",
  },
  {
    icon: CircleDollarSign,
    title: "Easy returns",
    description:
      "7-day return window with transparent refund tracking.",
    iconBg: "bg-[#e7eef6]",
    iconColor: "text-[#315b78]",
  },
  {
    icon: Truck,
    title: "Nationwide delivery",
    description:
      "Fast, tracked delivery to all 64 districts of Bangladesh.",
    iconBg: "bg-[#e6edff]",
    iconColor: "text-[#315be7]",
  },
];

export default function Features() {
  return (
    <section className="w-full border-y border-[#e5eaf0] bg-white">
      <div className="mx-auto grid max-w-360 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className={`
                flex min-h-35.5 items-start gap-4 px-5 py-7
                xl:px-6
                ${
                  index !== 0
                    ? "border-t border-[#e5eaf0] md:border-l md:border-t-0"
                    : ""
                }
              `}
            >
              {/* Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${feature.iconBg}`}
              >
                <Icon
                  size={20}
                  strokeWidth={1.8}
                  className={feature.iconColor}
                />
              </div>

              {/* Text */}
              <div>
                <h3 className="text-[14px] font-medium leading-5 text-[#111827]">
                  {feature.title}
                </h3>

                <p className="mt-1 max-w-[240px] text-[13px] leading-5 text-[#526581]">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
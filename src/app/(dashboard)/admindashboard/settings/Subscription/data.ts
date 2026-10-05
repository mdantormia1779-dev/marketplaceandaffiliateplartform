import { Settings } from "./subscriptionsettingscomponents/types";

export const MAX_PLANS = 6;
export const MAX_FEATURES = 10;
export const MAX_NAME = 30;
export const MAX_TRIAL_DAYS = 90;
export const MAX_GRACE_DAYS = 30;

const f = (id: string, text: string) => ({ id, text });

// Pore ei data API theke load korbi (useSubscriptionSettings e)
export const INITIAL_SETTINGS: Settings = {
  plans: [
    {
      id: "starter",
      name: "Starter",
      price: 29,
      subscribers: 132,
      popular: false,
      features: [
        f("s1", "Up to 50 products"),
        f("s2", "Standard support"),
        f("s3", "5% platform commission"),
        f("s4", "Basic analytics"),
      ],
    },
    {
      id: "growth",
      name: "Growth",
      price: 59,
      subscribers: 96,
      popular: true,
      features: [
        f("g1", "Up to 500 products"),
        f("g2", "Priority support"),
        f("g3", "3% platform commission"),
        f("g4", "Advanced analytics"),
        f("g5", "Featured listings"),
      ],
    },
    {
      id: "elite",
      name: "Elite",
      price: 99,
      subscribers: 42,
      popular: false,
      features: [
        f("e1", "Unlimited products"),
        f("e2", "Dedicated manager"),
        f("e3", "1.5% platform commission"),
        f("e4", "Custom storefront"),
        f("e5", "API access"),
      ],
    },
  ],
  behavior: {
    enabled: true,
    trialDays: 14,
    graceDays: 5,
    autoRenew: true,
    prorate: true,
  },
};
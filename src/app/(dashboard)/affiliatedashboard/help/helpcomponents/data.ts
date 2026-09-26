import type { HelpCategory, FaqItem, SupportTicket } from "./types";

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Set up your affiliate account and learn the basics.",
    articleCount: 12,
    icon: "Rocket",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "affiliate-links",
    title: "Affiliate Links",
    description: "Generate, track and manage your affiliate links.",
    articleCount: 9,
    icon: "Zap",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: "commissions",
    title: "Commissions",
    description: "How commissions are calculated, approved and paid.",
    articleCount: 14,
    icon: "Wallet",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    id: "withdrawals",
    title: "Withdrawals",
    description: "Payout methods, minimums and processing times.",
    articleCount: 8,
    icon: "CreditCard",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "referrals",
    title: "Referrals",
    description: "Grow your network and earn referral bonuses.",
    articleCount: 6,
    icon: "Users",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: "account-security",
    title: "Account & Security",
    description: "Password, 2FA and account protection tips.",
    articleCount: 11,
    icon: "ShieldCheck",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    id: "technical-issues",
    title: "Technical Issues",
    description: "Troubleshoot dashboard, links and tracking.",
    articleCount: 7,
    icon: "Settings2",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "How do I generate an affiliate link?",
    answer:
      "Open the Products page, find the product you want to promote, and click Generate Link. You can add optional Source, Medium and Campaign tracking parameters, then copy or share the link straight from the modal.",
  },
  {
    id: "faq-2",
    question: "When will I receive my commission?",
    answer:
      "Commissions move from Pending to Approved once the return window closes on the order, then they're included in your next scheduled payout run.",
  },
  {
    id: "faq-3",
    question: "How does the referral program work?",
    answer:
      "Share your unique referral code with other creators. When they join and start earning, you receive a percentage of their first-year commissions as a referral bonus.",
  },
  {
    id: "faq-4",
    question: "What is the minimum withdrawal amount?",
    answer:
      "The minimum withdrawal amount is ৳500. Balances below this threshold roll over to your next payout cycle automatically.",
  },
  {
    id: "faq-5",
    question: "How long does withdrawal processing take?",
    answer:
      "Most withdrawals are processed within 1–3 business days, depending on your payout method and your bank or mobile wallet provider.",
  },
  {
    id: "faq-6",
    question: "Why is my commission pending?",
    answer:
      "Commissions stay pending until the order's return/refund window closes, to make sure the sale is final before it becomes payable.",
  },
];

export const SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: "1",
    ticketId: "TK-01",
    subject: "Affiliate link not tracking clicks",
    category: "Technical Issues",
    priority: "High",
    status: "Open",
    createdDate: "2026-09-21",
    lastUpdated: "2026-09-22",
  },
  {
    id: "2",
    ticketId: "TK-02",
    subject: "Payout to Nagad still pending",
    category: "Withdrawals",
    priority: "Medium",
    status: "In Progress",
    createdDate: "2026-09-18",
    lastUpdated: "2026-09-20",
  },
  {
    id: "3",
    ticketId: "TK-03",
    subject: "Commission rate mismatch on order ORD-58271",
    category: "Commissions",
    priority: "Urgent",
    status: "Open",
    createdDate: "2026-09-14",
    lastUpdated: "2026-09-15",
  },
  {
    id: "4",
    ticketId: "TK-04",
    subject: "How to add referral code to my bio?",
    category: "Referrals",
    priority: "Low",
    status: "Resolved",
    createdDate: "2026-09-07",
    lastUpdated: "2026-09-08",
  },
  {
    id: "5",
    ticketId: "TK-05",
    subject: "Enable two-factor authentication for my account",
    category: "Account & Security",
    priority: "Medium",
    status: "Closed",
    createdDate: "2026-08-29",
    lastUpdated: "2026-08-30",
  },
];

export const TICKET_CATEGORIES = HELP_CATEGORIES.map((c) => c.title);
export type HelpCategory = {
  id: string;
  title: string;
  description: string;
  articleCount: number;
  icon: string; // lucide icon key, mapped in HelpCategories.tsx
  iconBg: string;
  iconColor: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type TicketPriority = "Low" | "Medium" | "High" | "Urgent";
export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Closed";

export type SupportTicket = {
  id: string;
  ticketId: string;
  subject: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdDate: string;
  lastUpdated: string;
  description?: string;
};

export type NewTicketInput = {
  subject: string;
  category: string;
  priority: TicketPriority;
  description: string;
};
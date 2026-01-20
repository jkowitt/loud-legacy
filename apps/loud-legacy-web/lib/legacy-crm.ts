// Legacy CRM Types and Configuration

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  relationship: "hot" | "warm" | "cold" | "new";
  importance: "high" | "medium" | "low";
  lastContact?: string;
  nextFollowUp?: string;
  notes: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Interaction {
  id: string;
  contactId: string;
  type: "call" | "email" | "meeting" | "note" | "task";
  title: string;
  description: string;
  date: string;
  outcome?: string;
  nextAction?: string;
  createdAt: string;
}

export interface Opportunity {
  id: string;
  contactId: string;
  title: string;
  value?: number;
  stage: "lead" | "qualified" | "proposal" | "negotiation" | "closed-won" | "closed-lost";
  probability: number;
  expectedCloseDate?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  name: string;
  company?: string;
  role?: string;
  useCase?: string;
  referralSource?: string;
  createdAt: string;
  status: "pending" | "invited" | "active";
}

export interface CRMStats {
  totalContacts: number;
  hotRelationships: number;
  warmRelationships: number;
  coldRelationships: number;
  pendingFollowUps: number;
  overdueFollowUps: number;
  openOpportunities: number;
  pipelineValue: number;
}

// Demo data for showcasing the CRM
export const demoContacts: Contact[] = [
  {
    id: "demo-1",
    firstName: "Sarah",
    lastName: "Chen",
    email: "sarah.chen@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Industries",
    title: "VP of Operations",
    relationship: "hot",
    importance: "high",
    lastContact: "2024-01-15",
    nextFollowUp: "2024-01-22",
    notes: "Met at SaaS Connect conference. Very interested in our consulting services. Decision maker for their ops transformation project.",
    tags: ["enterprise", "decision-maker", "Q1-priority"],
    createdAt: "2023-11-20",
    updatedAt: "2024-01-15",
  },
  {
    id: "demo-2",
    firstName: "Michael",
    lastName: "Roberts",
    email: "m.roberts@venturefund.vc",
    phone: "+1 (555) 234-5678",
    company: "Venture Fund Partners",
    title: "Managing Partner",
    relationship: "warm",
    importance: "high",
    lastContact: "2024-01-10",
    nextFollowUp: "2024-01-25",
    notes: "Potential investor. Interested in our Series A. Wants to see Q4 numbers before next meeting.",
    tags: ["investor", "series-a", "follow-up"],
    createdAt: "2023-09-15",
    updatedAt: "2024-01-10",
  },
  {
    id: "demo-3",
    firstName: "Emily",
    lastName: "Johnson",
    email: "emily.j@startupxyz.io",
    phone: "+1 (555) 345-6789",
    company: "StartupXYZ",
    title: "Founder & CEO",
    relationship: "warm",
    importance: "medium",
    lastContact: "2024-01-08",
    nextFollowUp: "2024-02-01",
    notes: "Referred by Michael Roberts. Looking for operational consulting. Small budget but high growth potential.",
    tags: ["startup", "referral", "consulting"],
    createdAt: "2024-01-05",
    updatedAt: "2024-01-08",
  },
  {
    id: "demo-4",
    firstName: "David",
    lastName: "Park",
    email: "david.park@enterprise.com",
    phone: "+1 (555) 456-7890",
    company: "Enterprise Solutions Inc",
    title: "Director of Strategy",
    relationship: "cold",
    importance: "medium",
    lastContact: "2023-12-01",
    nextFollowUp: "2024-01-30",
    notes: "Had initial call but went quiet. May have budget constraints. Worth re-engaging in Q1.",
    tags: ["enterprise", "re-engage", "strategy"],
    createdAt: "2023-10-15",
    updatedAt: "2023-12-01",
  },
  {
    id: "demo-5",
    firstName: "Amanda",
    lastName: "Foster",
    email: "afoster@consulting.co",
    phone: "+1 (555) 567-8901",
    company: "Foster Consulting Group",
    title: "Principal",
    relationship: "new",
    importance: "medium",
    lastContact: "2024-01-18",
    notes: "LinkedIn connection. Potential partnership opportunity for joint client engagements.",
    tags: ["partnership", "consulting", "new-contact"],
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18",
  },
];

export const demoInteractions: Interaction[] = [
  {
    id: "int-1",
    contactId: "demo-1",
    type: "meeting",
    title: "Initial Discovery Call",
    description: "60-minute discovery call discussing their operational challenges. They're struggling with scaling their fulfillment operations.",
    date: "2024-01-15",
    outcome: "Positive - requested proposal",
    nextAction: "Send proposal by Friday",
    createdAt: "2024-01-15",
  },
  {
    id: "int-2",
    contactId: "demo-2",
    type: "email",
    title: "Q4 Financial Summary",
    description: "Sent Q4 financial summary and growth metrics as requested.",
    date: "2024-01-10",
    outcome: "Acknowledged - reviewing with partners",
    nextAction: "Follow up in 2 weeks",
    createdAt: "2024-01-10",
  },
  {
    id: "int-3",
    contactId: "demo-3",
    type: "call",
    title: "Intro Call",
    description: "Quick intro call after referral from Michael. They need help with ops but budget is tight.",
    date: "2024-01-08",
    outcome: "Interested but budget constrained",
    nextAction: "Send lighter engagement options",
    createdAt: "2024-01-08",
  },
];

export const demoOpportunities: Opportunity[] = [
  {
    id: "opp-1",
    contactId: "demo-1",
    title: "TechCorp Ops Transformation",
    value: 75000,
    stage: "proposal",
    probability: 60,
    expectedCloseDate: "2024-02-15",
    notes: "3-month engagement. Waiting on budget approval from CFO.",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "opp-2",
    contactId: "demo-2",
    title: "Series A Investment",
    value: 500000,
    stage: "qualified",
    probability: 30,
    expectedCloseDate: "2024-03-31",
    notes: "Targeting $500K from this fund as part of larger round.",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
  {
    id: "opp-3",
    contactId: "demo-3",
    title: "StartupXYZ Advisory Retainer",
    value: 5000,
    stage: "negotiation",
    probability: 75,
    expectedCloseDate: "2024-02-01",
    notes: "Monthly advisory retainer. Starting small with room to grow.",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-08",
  },
];

// Helper functions
export function calculateCRMStats(
  contacts: Contact[],
  opportunities: Opportunity[]
): CRMStats {
  const today = new Date().toISOString().split("T")[0];

  return {
    totalContacts: contacts.length,
    hotRelationships: contacts.filter((c) => c.relationship === "hot").length,
    warmRelationships: contacts.filter((c) => c.relationship === "warm").length,
    coldRelationships: contacts.filter((c) => c.relationship === "cold").length,
    pendingFollowUps: contacts.filter(
      (c) => c.nextFollowUp && c.nextFollowUp >= today
    ).length,
    overdueFollowUps: contacts.filter(
      (c) => c.nextFollowUp && c.nextFollowUp < today
    ).length,
    openOpportunities: opportunities.filter(
      (o) => !["closed-won", "closed-lost"].includes(o.stage)
    ).length,
    pipelineValue: opportunities
      .filter((o) => !["closed-won", "closed-lost"].includes(o.stage))
      .reduce((sum, o) => sum + (o.value || 0) * (o.probability / 100), 0),
  };
}

export function getRelationshipColor(relationship: Contact["relationship"]): string {
  switch (relationship) {
    case "hot":
      return "#27AE60";
    case "warm":
      return "#F59E0B";
    case "cold":
      return "#6B7280";
    case "new":
      return "#3B82F6";
    default:
      return "#6B7280";
  }
}

export function getStageColor(stage: Opportunity["stage"]): string {
  switch (stage) {
    case "lead":
      return "#6B7280";
    case "qualified":
      return "#3B82F6";
    case "proposal":
      return "#8B5CF6";
    case "negotiation":
      return "#F59E0B";
    case "closed-won":
      return "#27AE60";
    case "closed-lost":
      return "#EF4444";
    default:
      return "#6B7280";
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getDaysSinceContact(lastContact?: string): number | null {
  if (!lastContact) return null;
  const last = new Date(lastContact);
  const now = new Date();
  const diff = now.getTime() - last.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

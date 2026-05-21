export type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY" | "MXN" | "SGD";

export type Plan = "free" | "pro";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  baseCurrency: CurrencyCode;
  plan: Plan;
  onboarded: boolean;
  reminderThreeDay: boolean;
  reminderSameDay: boolean;
  createdAt: string;
};

export type Envelope = {
  id: string;
  name: string;
  color: string;
  monthlyBudget: number;
  allocated: number;
  archived: boolean;
  carryover: boolean;
  createdAt: string;
};

export type Transaction = {
  id: string;
  amount: number;
  currency: CurrencyCode;
  baseAmount: number;
  rate: number;
  date: string;
  envelopeId: string;
  merchant: string;
  note?: string;
  recurring: boolean;
  createdAt: string;
};

export type Subscription = {
  id: string;
  name: string;
  amount: number;
  currency: CurrencyCode;
  baseAmount: number;
  rate: number;
  frequency: "monthly" | "annual";
  nextDueDate: string;
  envelopeId: string;
  sameDayReminder: boolean;
  createdAt: string;
};

export type RolloverRecord = {
  id: string;
  month: string;
  carriedAmount: number;
  createdAt: string;
};

export type BudgetState = {
  user: UserProfile;
  envelopes: Envelope[];
  transactions: Transaction[];
  subscriptions: Subscription[];
  rollovers: RolloverRecord[];
};

export type SeoPage = {
  slug: string;
  title: string;
  keyword: string;
  description: string;
  sections: string[];
};

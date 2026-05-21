import { addDays, addMonths, addYears, format, isAfter, isBefore, parseISO, startOfMonth } from "date-fns";
import { convertAmount } from "./currency";
import type { BudgetState, CurrencyCode, Envelope, SeoPage, Subscription, Transaction, UserProfile } from "./types";

export const storageKey = "envelopeflow-state-v1";

export const envelopeTemplates = [
  { name: "Groceries", color: "#70a288", monthlyBudget: 520 },
  { name: "Rent", color: "#2f5d50", monthlyBudget: 1600 },
  { name: "Transport", color: "#f2b84b", monthlyBudget: 180 },
  { name: "Fun", color: "#e86f51", monthlyBudget: 220 },
  { name: "Subscriptions", color: "#4e7fbf", monthlyBudget: 90 },
  { name: "Travel", color: "#8b6fc7", monthlyBudget: 300 }
];

export const freeLimits = {
  envelopes: 5,
  transactionsPerMonth: 20,
  subscriptions: 3
};

export function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}_${Date.now().toString(36)}`;
}

export function demoState(): BudgetState {
  const now = new Date();
  const user: UserProfile = {
    id: uid("user"),
    name: "Demo Budgeter",
    email: "demo@envelopeflow.app",
    baseCurrency: "USD",
    plan: "free",
    onboarded: true,
    reminderThreeDay: true,
    reminderSameDay: false,
    createdAt: now.toISOString()
  };
  const envelopes: Envelope[] = envelopeTemplates.slice(0, 5).map((item) => ({
    id: uid("env"),
    name: item.name,
    color: item.color,
    monthlyBudget: item.monthlyBudget,
    allocated: item.monthlyBudget,
    archived: false,
    carryover: item.name !== "Rent",
    createdAt: now.toISOString()
  }));
  const findEnv = (name: string) => envelopes.find((env) => env.name === name)?.id ?? envelopes[0].id;
  const transactions: Transaction[] = [
    makeTransaction(72.18, "USD", user.baseCurrency, -6, findEnv("Groceries"), "Market basket", false),
    makeTransaction(14.5, "USD", user.baseCurrency, -4, findEnv("Transport"), "Metro card", false),
    makeTransaction(24.99, "USD", user.baseCurrency, -2, findEnv("Subscriptions"), "Music family plan", true),
    makeTransaction(46.2, "EUR", user.baseCurrency, -1, findEnv("Fun"), "Dinner with friends", false)
  ];
  const subscriptions: Subscription[] = [
    makeSubscription("Netflix", 15.49, "USD", user.baseCurrency, 5, findEnv("Subscriptions"), "monthly"),
    makeSubscription("Cloud storage", 29.99, "USD", user.baseCurrency, 12, findEnv("Subscriptions"), "annual"),
    makeSubscription("Gym", 44, "USD", user.baseCurrency, 19, findEnv("Fun"), "monthly")
  ];
  return { user, envelopes, transactions, subscriptions, rollovers: [] };
}

export function makeTransaction(amount: number, currency: CurrencyCode, baseCurrency: CurrencyCode, daysAgo: number, envelopeId: string, merchant: string, recurring: boolean): Transaction {
  const { baseAmount, rate } = convertAmount(amount, currency, baseCurrency);
  return {
    id: uid("txn"),
    amount,
    currency,
    baseAmount,
    rate,
    date: addDays(new Date(), daysAgo).toISOString().slice(0, 10),
    envelopeId,
    merchant,
    recurring,
    createdAt: new Date().toISOString()
  };
}

export function makeSubscription(name: string, amount: number, currency: CurrencyCode, baseCurrency: CurrencyCode, daysFromNow: number, envelopeId: string, frequency: "monthly" | "annual"): Subscription {
  const { baseAmount, rate } = convertAmount(amount, currency, baseCurrency);
  return {
    id: uid("sub"),
    name,
    amount,
    currency,
    baseAmount,
    rate,
    frequency,
    nextDueDate: addDays(new Date(), daysFromNow).toISOString().slice(0, 10),
    envelopeId,
    sameDayReminder: false,
    createdAt: new Date().toISOString()
  };
}

export function monthKey(date = new Date()) {
  return format(startOfMonth(date), "yyyy-MM");
}

export function nextDue(subscription: Subscription) {
  const date = parseISO(subscription.nextDueDate);
  return subscription.frequency === "annual" ? addYears(date, 1) : addMonths(date, 1);
}

export function upcomingSubscriptions(subscriptions: Subscription[], days = 30) {
  const now = new Date();
  const end = addDays(now, days);
  return subscriptions
    .filter((item) => {
      const due = parseISO(item.nextDueDate);
      return (isAfter(due, now) || format(due, "yyyy-MM-dd") === format(now, "yyyy-MM-dd")) && isBefore(due, end);
    })
    .sort((a, b) => a.nextDueDate.localeCompare(b.nextDueDate));
}

export function spentForEnvelope(envelopeId: string, transactions: Transaction[], month = monthKey()) {
  return transactions
    .filter((txn) => txn.envelopeId === envelopeId && txn.date.startsWith(month))
    .reduce((sum, txn) => sum + txn.baseAmount, 0);
}

export function monthlyTransactionCount(transactions: Transaction[], month = monthKey()) {
  return transactions.filter((txn) => txn.date.startsWith(month)).length;
}

export const seoPages: SeoPage[] = [
  {
    slug: "envelope-budget-app",
    title: "Envelope Budget App Without Bank Sync",
    keyword: "envelope budget app",
    description: "Plan cash-style envelopes, allocate income, and see remaining balances without connecting a bank.",
    sections: ["Create spending envelopes for real-life categories.", "Track budgeted vs spent in a clean mobile dashboard.", "Carry over remaining balances when the month resets."]
  },
  {
    slug: "subscription-tracker-app",
    title: "Subscription Tracker App",
    keyword: "subscription tracker app",
    description: "Track subscriptions, bills, due dates, and monthly recurring totals alongside your envelopes.",
    sections: ["Put each recurring charge inside a budget category.", "See the next 30 days of upcoming charges.", "Know your recurring total before the month starts."]
  },
  {
    slug: "bill-reminder-app",
    title: "Bill Reminder App",
    keyword: "bill reminder app",
    description: "Get ready for upcoming bills with simple reminder preferences and no bank sync.",
    sections: ["Use 3-day reminders for bills that need planning.", "Turn on same-day reminders for important renewals.", "Email delivery is guarded with a local fallback until credentials are added."]
  },
  {
    slug: "multi-currency-budget-app",
    title: "Multi Currency Budget App",
    keyword: "multi currency budget app",
    description: "Record expenses in their original currency while keeping a base-currency budget.",
    sections: ["Choose a base currency during onboarding.", "Record travel and expat spending in original currency.", "Store a conversion snapshot for reporting."]
  },
  {
    slug: "budget-app-no-bank-sync",
    title: "Budget App No Bank Sync",
    keyword: "budget app no bank sync",
    description: "Manual-first budgeting for people who want privacy and control without connecting accounts.",
    sections: ["No bank login required for the MVP workflow.", "Manual entry keeps the system intentional and clear.", "Works well for cash stuffing and simple personal finance routines."]
  },
  {
    slug: "cash-stuffing-app",
    title: "Digital Cash Stuffing App",
    keyword: "cash stuffing app",
    description: "Turn cash stuffing envelopes into a mobile PWA with category balances and monthly rollover.",
    sections: ["Use templates for groceries, rent, transport, fun, subscriptions, and travel.", "Allocate income manually when paychecks arrive.", "Carry over selected category balances."]
  },
  {
    slug: "expat-finance-app",
    title: "Expat Finance App",
    keyword: "expat finance app",
    description: "A simple budget tracker for people living across currencies.",
    sections: ["Log daily spending in USD, EUR, GBP, CAD, AUD, JPY, MXN, or SGD.", "Review base-currency totals without spreadsheet formulas.", "Keep recurring charges visible across countries."]
  },
  {
    slug: "mint-alternative",
    title: "Mint Alternative for Manual Budgeting",
    keyword: "mint alternative manual budgeting",
    description: "A focused alternative for people who want envelopes and subscriptions, not bank-sync clutter.",
    sections: ["Manual entry instead of account aggregation.", "Envelope balances instead of generic categories.", "Subscription visibility built into the monthly budget."]
  }
];

export const blogPages = [
  "best-budget-app-without-bank-sync",
  "how-to-do-digital-cash-stuffing",
  "how-to-track-subscriptions-without-linking-your-bank",
  "best-budgeting-apps-for-expats-and-travelers",
  "ynab-alternative-simple-manual-budgeting"
];

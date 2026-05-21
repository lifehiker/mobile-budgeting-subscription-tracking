"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { convertAmount } from "@/lib/currency";
import { demoState, freeLimits, monthlyTransactionCount, monthKey, storageKey, uid } from "@/lib/data";
import type { BudgetState, CurrencyCode, Envelope, Plan, Subscription, Transaction } from "@/lib/types";

type Store = {
  state: BudgetState;
  ready: boolean;
  resetDemo: () => void;
  signIn: (email: string) => void;
  signOut: () => void;
  completeOnboarding: (baseCurrency: CurrencyCode, envelopes: Pick<Envelope, "name" | "color" | "monthlyBudget" | "carryover">[]) => void;
  updateUser: (patch: Partial<BudgetState["user"]>) => void;
  addEnvelope: (data: Pick<Envelope, "name" | "color" | "monthlyBudget" | "carryover">) => string | null;
  updateEnvelope: (id: string, patch: Partial<Envelope>) => void;
  archiveEnvelope: (id: string) => void;
  addAllocation: (id: string, amount: number) => void;
  addTransaction: (data: Omit<Transaction, "id" | "baseAmount" | "rate" | "createdAt">) => string | null;
  deleteTransaction: (id: string) => void;
  addSubscription: (data: Omit<Subscription, "id" | "baseAmount" | "rate" | "createdAt" | "sameDayReminder">) => string | null;
  updateSubscription: (id: string, patch: Partial<Subscription>) => void;
  deleteSubscription: (id: string) => void;
  rolloverMonth: () => void;
  upgrade: (plan?: Plan) => void;
};

const StoreContext = createContext<Store | null>(null);

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BudgetState>(() => demoState());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setState(JSON.parse(saved) as BudgetState);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [ready, state]);

  const value = useMemo<Store>(() => ({
    state,
    ready,
    resetDemo: () => setState(demoState()),
    signIn: (email) => setState((current) => ({ ...current, user: { ...current.user, email, name: email.split("@")[0] || "Budgeter" } })),
    signOut: () => setState((current) => ({ ...current, user: { ...current.user, email: "", name: "", onboarded: false } })),
    completeOnboarding: (baseCurrency, envelopes) => setState((current) => ({
      ...current,
      user: { ...current.user, baseCurrency, onboarded: true },
      envelopes: envelopes.map((env) => ({
        ...env,
        id: uid("env"),
        allocated: env.monthlyBudget,
        archived: false,
        createdAt: new Date().toISOString()
      })),
      transactions: [],
      subscriptions: []
    })),
    updateUser: (patch) => setState((current) => ({ ...current, user: { ...current.user, ...patch } })),
    addEnvelope: (data) => {
      let error: string | null = null;
      setState((current) => {
        const active = current.envelopes.filter((env) => !env.archived).length;
        if (current.user.plan === "free" && active >= freeLimits.envelopes) {
          error = "Free plan supports up to 5 active envelopes.";
          return current;
        }
        return {
          ...current,
          envelopes: [...current.envelopes, { ...data, id: uid("env"), allocated: data.monthlyBudget, archived: false, createdAt: new Date().toISOString() }]
        };
      });
      return error;
    },
    updateEnvelope: (id, patch) => setState((current) => ({
      ...current,
      envelopes: current.envelopes.map((env) => (env.id === id ? { ...env, ...patch } : env))
    })),
    archiveEnvelope: (id) => setState((current) => ({
      ...current,
      envelopes: current.envelopes.map((env) => (env.id === id ? { ...env, archived: true } : env))
    })),
    addAllocation: (id, amount) => setState((current) => ({
      ...current,
      envelopes: current.envelopes.map((env) => (env.id === id ? { ...env, allocated: Number((env.allocated + amount).toFixed(2)) } : env))
    })),
    addTransaction: (data) => {
      let error: string | null = null;
      setState((current) => {
        if (current.user.plan === "free" && data.currency !== current.user.baseCurrency) {
          error = "Free plan supports one currency. Upgrade for multi-currency.";
          return current;
        }
        if (current.user.plan === "free" && monthlyTransactionCount(current.transactions, monthKey(new Date(data.date))) >= freeLimits.transactionsPerMonth) {
          error = "Free plan supports 20 transactions per month.";
          return current;
        }
        const converted = convertAmount(data.amount, data.currency, current.user.baseCurrency);
        return {
          ...current,
          transactions: [{ ...data, ...converted, id: uid("txn"), createdAt: new Date().toISOString() }, ...current.transactions]
        };
      });
      return error;
    },
    deleteTransaction: (id) => setState((current) => ({ ...current, transactions: current.transactions.filter((txn) => txn.id !== id) })),
    addSubscription: (data) => {
      let error: string | null = null;
      setState((current) => {
        if (current.user.plan === "free" && current.subscriptions.length >= freeLimits.subscriptions) {
          error = "Free plan supports up to 3 subscriptions.";
          return current;
        }
        if (current.user.plan === "free" && data.currency !== current.user.baseCurrency) {
          error = "Free plan supports one currency. Upgrade for multi-currency.";
          return current;
        }
        const converted = convertAmount(data.amount, data.currency, current.user.baseCurrency);
        return {
          ...current,
          subscriptions: [{ ...data, ...converted, sameDayReminder: false, id: uid("sub"), createdAt: new Date().toISOString() }, ...current.subscriptions]
        };
      });
      return error;
    },
    updateSubscription: (id, patch) => setState((current) => ({
      ...current,
      subscriptions: current.subscriptions.map((sub) => (sub.id === id ? { ...sub, ...patch } : sub))
    })),
    deleteSubscription: (id) => setState((current) => ({ ...current, subscriptions: current.subscriptions.filter((sub) => sub.id !== id) })),
    rolloverMonth: () => setState((current) => {
      const carriedAmount = current.envelopes.reduce((sum, env) => {
        if (!env.carryover) return sum;
        const spent = current.transactions.filter((txn) => txn.envelopeId === env.id && txn.date.startsWith(monthKey())).reduce((txnSum, txn) => txnSum + txn.baseAmount, 0);
        return sum + Math.max(0, env.allocated - spent);
      }, 0);
      return {
        ...current,
        rollovers: [{ id: uid("roll"), month: monthKey(), carriedAmount, createdAt: new Date().toISOString() }, ...current.rollovers],
        envelopes: current.envelopes.map((env) => {
          const spent = current.transactions.filter((txn) => txn.envelopeId === env.id && txn.date.startsWith(monthKey())).reduce((txnSum, txn) => txnSum + txn.baseAmount, 0);
          const carry = env.carryover ? Math.max(0, env.allocated - spent) : 0;
          return { ...env, allocated: Number((env.monthlyBudget + carry).toFixed(2)) };
        })
      };
    }),
    upgrade: (plan = "pro") => setState((current) => ({ ...current, user: { ...current.user, plan } }))
  }), [ready, state]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useAppStore() {
  const store = useContext(StoreContext);
  if (!store) throw new Error("useAppStore must be used inside AppStoreProvider");
  return store;
}

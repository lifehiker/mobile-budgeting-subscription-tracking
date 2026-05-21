"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAppStore } from "@/components/app-store";
import { money } from "@/lib/currency";
import { monthKey, spentForEnvelope } from "@/lib/data";

export default function ReportsPage() {
  const { state } = useAppStore();
  const currentMonth = monthKey();
  const monthTransactions = state.transactions.filter((txn) => txn.date.startsWith(currentMonth));
  const envelopeData = state.envelopes.filter((env) => !env.archived).map((env) => ({
    name: env.name,
    budgeted: env.allocated,
    spent: spentForEnvelope(env.id, monthTransactions, currentMonth)
  }));
  const recurringByMonth = state.subscriptions.reduce<Record<string, number>>((acc, sub) => {
    const key = sub.nextDueDate.slice(0, 7);
    acc[key] = (acc[key] ?? 0) + (sub.frequency === "annual" ? sub.baseAmount / 12 : sub.baseAmount);
    return acc;
  }, {});
  const recurringData = Object.entries(recurringByMonth).map(([month, amount]) => ({ month, amount }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="mt-1 text-ink/65">Budgeted vs spent and recurring charges by month.</p>
      </div>
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <h2 className="font-bold">Budgeted vs spent</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={envelopeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => money(Number(value), state.user.baseCurrency)} />
                <Bar dataKey="budgeted" fill="#70a288" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spent" fill="#e86f51" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-4">
          <h2 className="font-bold">Recurring charges</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={recurringData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => money(Number(value), state.user.baseCurrency)} />
                <Bar dataKey="amount" fill="#2f5d50" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
}

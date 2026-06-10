"use client";

import { useAppStore } from "@/components/app-store";
import { money } from "@/lib/currency";
import { monthKey, spentForEnvelope } from "@/lib/data";

export default function ReportsPage() {
  const { state, ready } = useAppStore();
  if (!ready) return <p className="p-4 text-ink/60">Loading reports…</p>;
  const currentMonth = monthKey();
  const monthTransactions = state.transactions.filter((txn) => txn.date.startsWith(currentMonth));
  const envelopeData = state.envelopes.filter((env) => !env.archived).map((env) => ({
    name: env.name,
    budgeted: env.allocated,
    spent: spentForEnvelope(env.id, monthTransactions, currentMonth)
  }));
  const recurringByMonth = state.subscriptions.reduce<Record<string, number>>((acc, sub) => {
    if (!sub.nextDueDate) return acc;
    const key = sub.nextDueDate.slice(0, 7);
    acc[key] = (acc[key] ?? 0) + (sub.frequency === "annual" ? sub.baseAmount / 12 : sub.baseAmount);
    return acc;
  }, {});
  const recurringData = Object.entries(recurringByMonth).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="mt-1 text-ink/65">Budgeted vs spent and recurring charges by month.</p>
      </div>
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="card p-4">
          <h2 className="font-bold">Budgeted vs spent</h2>
          {envelopeData.length === 0 ? (
            <p className="mt-4 text-sm text-ink/60">No envelopes yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {envelopeData.map((env) => {
                const pct = env.budgeted > 0 ? Math.min(100, (env.spent / env.budgeted) * 100) : 0;
                return (
                  <div key={env.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{env.name}</span>
                      <span className="text-ink/65">{money(env.spent, state.user.baseCurrency)} / {money(env.budgeted, state.user.baseCurrency)}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-ink/10">
                      <div className="h-2 rounded-full bg-leaf" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="card p-4">
          <h2 className="font-bold">Recurring charges</h2>
          {recurringData.length === 0 ? (
            <p className="mt-4 text-sm text-ink/60">No subscriptions yet.</p>
          ) : (
            <div className="mt-4 space-y-2">
              {recurringData.map(([month, amount]) => (
                <div key={month} className="flex justify-between text-sm">
                  <span className="font-medium">{month}</span>
                  <span className="text-ink/65">{money(amount, state.user.baseCurrency)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

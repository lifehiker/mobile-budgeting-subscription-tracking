"use client";

import Link from "next/link";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { ArrowUpRight, Bell, Plus, WalletCards } from "lucide-react";
import { StatCard } from "@/components/ui";
import { useAppStore } from "@/components/app-store";
import { money } from "@/lib/currency";
import { monthKey, spentForEnvelope, upcomingSubscriptions } from "@/lib/data";

export default function DashboardPage() {
  const { state } = useAppStore();
  const activeEnvelopes = state.envelopes.filter((env) => !env.archived);
  const currentMonth = monthKey();
  const monthTransactions = state.transactions.filter((txn) => txn.date.startsWith(currentMonth));
  const spent = monthTransactions.reduce((sum, txn) => sum + txn.baseAmount, 0);
  const budgeted = activeEnvelopes.reduce((sum, env) => sum + env.allocated, 0);
  const remaining = activeEnvelopes.reduce((sum, env) => sum + Math.max(0, env.allocated - spentForEnvelope(env.id, monthTransactions, currentMonth)), 0);
  const upcoming = upcomingSubscriptions(state.subscriptions);
  const top = activeEnvelopes
    .map((env) => ({ ...env, spent: spentForEnvelope(env.id, monthTransactions, currentMonth) }))
    .sort((a, b) => b.spent - a.spent)
    .slice(0, 4);

  return (
    <div className="space-y-5">
      <section className="rounded-lg bg-ink p-5 text-white shadow-soft">
        <p className="text-sm font-semibold text-white/65">This month</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">You have {money(remaining, state.user.baseCurrency)} left</h1>
            <p className="mt-2 text-white/70">{money(spent, state.user.baseCurrency)} spent from {money(budgeted, state.user.baseCurrency)} allocated.</p>
          </div>
          <Link href="/app/add-expense" className="tap inline-flex items-center justify-center gap-2 rounded-lg bg-coral px-4 py-2 text-sm font-bold text-white">
            <Plus size={18} /> Add expense
          </Link>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Spent" value={money(spent, state.user.baseCurrency)} detail="Manual entries this month" />
        <StatCard label="Remaining" value={money(remaining, state.user.baseCurrency)} detail="Across active envelopes" />
        <StatCard label="Upcoming bills" value={String(upcoming.length)} detail="Due in the next 30 days" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Top envelopes by spend</h2>
            <Link href="/app/envelopes" className="text-sm font-semibold text-moss">Manage</Link>
          </div>
          <div className="mt-4 space-y-4">
            {top.map((env) => {
              const percent = Math.min(100, Math.round((env.spent / Math.max(1, env.allocated)) * 100));
              return (
                <div key={env.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold">{env.name}</span>
                    <span className="text-ink/60">{money(env.spent, state.user.baseCurrency)}</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-ink/8">
                    <div className="h-3 rounded-full" style={{ width: `${percent}%`, background: env.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Upcoming bills</h2>
            <Link href="/app/subscriptions" className="text-sm font-semibold text-moss">View all</Link>
          </div>
          <div className="mt-4 space-y-3">
            {upcoming.slice(0, 4).map((sub) => (
              <div key={sub.id} className="flex items-center justify-between rounded-lg bg-mist p-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-moss"><Bell size={17} /></span>
                  <div>
                    <p className="font-semibold">{sub.name}</p>
                    <p className="text-xs text-ink/60">{format(parseISO(sub.nextDueDate), "MMM d")} · {formatDistanceToNow(parseISO(sub.nextDueDate), { addSuffix: true })}</p>
                  </div>
                </div>
                <span className="font-bold">{money(sub.baseAmount, state.user.baseCurrency)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <Link href="/app/envelopes" className="card flex items-center justify-between p-4 font-bold">
          <span className="flex items-center gap-2"><WalletCards size={18} /> Envelopes</span><ArrowUpRight size={18} />
        </Link>
        <Link href="/app/transactions" className="card flex items-center justify-between p-4 font-bold">
          Transactions <ArrowUpRight size={18} />
        </Link>
        <Link href="/app/rollover" className="card flex items-center justify-between p-4 font-bold">
          Monthly rollover <ArrowUpRight size={18} />
        </Link>
      </section>
    </div>
  );
}

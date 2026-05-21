"use client";

import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui";
import { useAppStore } from "@/components/app-store";
import { currencies, money } from "@/lib/currency";

export default function TransactionsPage() {
  const { state, deleteTransaction } = useAppStore();
  const [filters, setFilters] = useState({ month: new Date().toISOString().slice(0, 7), envelope: "all", recurring: "all", currency: "all" });
  const filtered = useMemo(() => state.transactions.filter((txn) => {
    if (filters.month && !txn.date.startsWith(filters.month)) return false;
    if (filters.envelope !== "all" && txn.envelopeId !== filters.envelope) return false;
    if (filters.recurring !== "all" && String(txn.recurring) !== filters.recurring) return false;
    if (filters.currency !== "all" && txn.currency !== filters.currency) return false;
    return true;
  }), [filters, state.transactions]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="mt-1 text-ink/65">Filter spending by month, envelope, type, and currency.</p>
        </div>
        <Button onClick={() => location.href = "/app/add-expense"}>Add expense</Button>
      </div>
      <div className="card grid gap-3 p-4 sm:grid-cols-4">
        <input className="field" type="month" value={filters.month} onChange={(event) => setFilters({ ...filters, month: event.target.value })} />
        <select className="field" value={filters.envelope} onChange={(event) => setFilters({ ...filters, envelope: event.target.value })}>
          <option value="all">All envelopes</option>
          {state.envelopes.map((env) => <option key={env.id} value={env.id}>{env.name}</option>)}
        </select>
        <select className="field" value={filters.recurring} onChange={(event) => setFilters({ ...filters, recurring: event.target.value })}>
          <option value="all">All types</option>
          <option value="false">One-time</option>
          <option value="true">Recurring</option>
        </select>
        <select className="field" value={filters.currency} onChange={(event) => setFilters({ ...filters, currency: event.target.value })}>
          <option value="all">All currencies</option>
          {currencies.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <div className="space-y-3">
        {filtered.map((txn) => {
          const env = state.envelopes.find((item) => item.id === txn.envelopeId);
          return (
            <div key={txn.id} className="card flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="font-bold">{txn.merchant}</p>
                <p className="text-sm text-ink/60">{txn.date} · {env?.name ?? "Envelope"} · {txn.recurring ? "Recurring" : "One-time"}</p>
                {txn.note ? <p className="mt-1 text-sm text-ink/55">{txn.note}</p> : null}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="font-bold">{money(txn.amount, txn.currency)}</p>
                  <p className="text-xs text-ink/55">{money(txn.baseAmount, state.user.baseCurrency)} @ {txn.rate}</p>
                </div>
                <button className="tap rounded-lg text-ink/50 hover:bg-ink/5" onClick={() => deleteTransaction(txn.id)} aria-label="Delete transaction"><Trash2 size={18} /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

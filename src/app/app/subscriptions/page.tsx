"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button, FieldLabel } from "@/components/ui";
import { useAppStore } from "@/components/app-store";
import { currencies, money } from "@/lib/currency";
import type { CurrencyCode } from "@/lib/types";

export default function SubscriptionsPage() {
  const { state, addSubscription, deleteSubscription, updateSubscription } = useAppStore();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    amount: "",
    currency: state.user.baseCurrency,
    frequency: "monthly",
    nextDueDate: new Date().toISOString().slice(0, 10),
    envelopeId: state.envelopes[0]?.id ?? ""
  });
  const monthlyTotal = state.subscriptions.reduce((sum, sub) => sum + (sub.frequency === "annual" ? sub.baseAmount / 12 : sub.baseAmount), 0);

  function submit() {
    const message = addSubscription({
      name: form.name,
      amount: Number(form.amount),
      currency: form.currency as CurrencyCode,
      frequency: form.frequency as "monthly" | "annual",
      nextDueDate: form.nextDueDate,
      envelopeId: form.envelopeId
    });
    setError(message ?? "");
    if (!message) setForm({ ...form, name: "", amount: "" });
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold">Subscriptions and bills</h1>
        <p className="mt-1 text-ink/65">Monthly recurring equivalent: <strong>{money(monthlyTotal, state.user.baseCurrency)}</strong></p>
      </div>
      <section className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card space-y-3 p-4">
          <h2 className="font-bold">New subscription</h2>
          {error ? <p className="rounded-lg bg-coral/10 p-3 text-sm font-semibold text-coral">{error}</p> : null}
          <FieldLabel>Name</FieldLabel>
          <input className="field" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
          <div className="grid grid-cols-[1fr_110px] gap-3">
            <div><FieldLabel>Amount</FieldLabel><input className="field" type="number" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} /></div>
            <div><FieldLabel>Currency</FieldLabel><select className="field" value={form.currency} onChange={(event) => setForm({ ...form, currency: event.target.value as CurrencyCode })}>{currencies.map((item) => <option key={item}>{item}</option>)}</select></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><FieldLabel>Frequency</FieldLabel><select className="field" value={form.frequency} onChange={(event) => setForm({ ...form, frequency: event.target.value })}><option value="monthly">Monthly</option><option value="annual">Annual</option></select></div>
            <div><FieldLabel>Next due</FieldLabel><input className="field" type="date" value={form.nextDueDate} onChange={(event) => setForm({ ...form, nextDueDate: event.target.value })} /></div>
          </div>
          <FieldLabel>Envelope</FieldLabel>
          <select className="field" value={form.envelopeId} onChange={(event) => setForm({ ...form, envelopeId: event.target.value })}>{state.envelopes.filter((env) => !env.archived).map((env) => <option key={env.id} value={env.id}>{env.name}</option>)}</select>
          <Button onClick={submit} className="w-full" disabled={!form.name || !form.amount}>Save bill</Button>
        </div>
        <div className="space-y-3">
          {state.subscriptions.map((sub) => {
            const env = state.envelopes.find((item) => item.id === sub.envelopeId);
            return (
              <div key={sub.id} className="card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-bold">{sub.name}</p>
                    <p className="text-sm text-ink/60">{env?.name} · {sub.frequency} · due {sub.nextDueDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold">{money(sub.baseAmount, state.user.baseCurrency)}</p>
                    <button className="tap rounded-lg text-ink/50 hover:bg-ink/5" onClick={() => deleteSubscription(sub.id)} aria-label="Delete subscription"><Trash2 size={18} /></button>
                  </div>
                </div>
                <label className="mt-3 flex items-center gap-2 text-sm font-semibold">
                  <input type="checkbox" checked={sub.sameDayReminder} onChange={(event) => updateSubscription(sub.id, { sameDayReminder: event.target.checked })} />
                  Same-day reminder
                </label>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

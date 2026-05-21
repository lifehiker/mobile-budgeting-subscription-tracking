"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { Button, FieldLabel } from "@/components/ui";
import { useAppStore } from "@/components/app-store";
import { currencies } from "@/lib/currency";
import type { CurrencyCode } from "@/lib/types";

export default function AddExpensePage() {
  const router = useRouter();
  const { state, addTransaction } = useAppStore();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    amount: "",
    currency: state.user.baseCurrency,
    date: new Date().toISOString().slice(0, 10),
    envelopeId: state.envelopes[0]?.id ?? "",
    merchant: "",
    note: "",
    recurring: false
  });

  function submit() {
    const message = addTransaction({
      amount: Number(form.amount),
      currency: form.currency as CurrencyCode,
      date: form.date,
      envelopeId: form.envelopeId,
      merchant: form.merchant,
      note: form.note,
      recurring: form.recurring
    });
    setError(message ?? "");
    if (!message) router.push("/app/transactions");
  }

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <div>
        <h1 className="text-3xl font-bold">Add expense</h1>
        <p className="mt-1 text-ink/65">Fast manual entry with original-currency tracking.</p>
      </div>
      <div className="card space-y-4 p-4">
        {error ? <p className="rounded-lg bg-coral/10 p-3 text-sm font-semibold text-coral">{error}</p> : null}
        <div className="grid grid-cols-[1fr_110px] gap-3">
          <div className="space-y-2">
            <FieldLabel>Amount</FieldLabel>
            <input className="field text-xl font-bold" type="number" inputMode="decimal" autoFocus value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} />
          </div>
          <div className="space-y-2">
            <FieldLabel>Currency</FieldLabel>
            <select className="field" value={form.currency} onChange={(event) => setForm({ ...form, currency: event.target.value as CurrencyCode })}>
              {currencies.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <FieldLabel>Merchant or label</FieldLabel>
          <input className="field" value={form.merchant} onChange={(event) => setForm({ ...form, merchant: event.target.value })} placeholder="Coffee, grocery run, taxi" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <FieldLabel>Date</FieldLabel>
            <input className="field" type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} />
          </div>
          <div className="space-y-2">
            <FieldLabel>Envelope</FieldLabel>
            <select className="field" value={form.envelopeId} onChange={(event) => setForm({ ...form, envelopeId: event.target.value })}>
              {state.envelopes.filter((env) => !env.archived).map((env) => <option key={env.id} value={env.id}>{env.name}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <FieldLabel>Note</FieldLabel>
          <textarea className="field min-h-24" value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} />
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={form.recurring} onChange={(event) => setForm({ ...form, recurring: event.target.checked })} /> Mark as recurring</label>
        <Button onClick={submit} className="w-full" disabled={!form.amount || !form.merchant || !form.envelopeId}><Save size={18} /> Save expense</Button>
      </div>
    </div>
  );
}

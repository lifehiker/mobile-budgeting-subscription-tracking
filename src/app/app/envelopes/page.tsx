"use client";

import { useState } from "react";
import { Archive, Plus } from "lucide-react";
import { Button, FieldLabel } from "@/components/ui";
import { useAppStore } from "@/components/app-store";
import { money } from "@/lib/currency";
import { spentForEnvelope } from "@/lib/data";

export default function EnvelopesPage() {
  const { state, addEnvelope, archiveEnvelope, updateEnvelope, addAllocation } = useAppStore();
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", monthlyBudget: 100, color: "#70a288", carryover: true });

  function submit() {
    const message = addEnvelope(form);
    setError(message ?? "");
    if (!message) setForm({ name: "", monthlyBudget: 100, color: "#70a288", carryover: true });
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold">Envelopes</h1>
        <p className="mt-1 text-ink/65">Create categories, allocate income, and watch remaining balances.</p>
      </div>
      <section className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="card space-y-3 p-4">
          <h2 className="font-bold">New envelope</h2>
          {error ? <p className="rounded-lg bg-coral/10 p-3 text-sm font-semibold text-coral">{error}</p> : null}
          <FieldLabel>Name</FieldLabel>
          <input className="field" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Pets, gifts, coffee" />
          <FieldLabel>Monthly planned amount</FieldLabel>
          <input className="field" type="number" value={form.monthlyBudget} onChange={(event) => setForm({ ...form, monthlyBudget: Number(event.target.value) })} />
          <FieldLabel>Color</FieldLabel>
          <input className="field h-12" type="color" value={form.color} onChange={(event) => setForm({ ...form, color: event.target.value })} />
          <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={form.carryover} onChange={(event) => setForm({ ...form, carryover: event.target.checked })} /> Carry over remaining balance</label>
          <Button onClick={submit} className="w-full" disabled={!form.name}><Plus size={18} /> Add envelope</Button>
        </div>
        <div className="space-y-3">
          {state.envelopes.filter((env) => !env.archived).map((env) => {
            const spent = spentForEnvelope(env.id, state.transactions);
            const remaining = env.allocated - spent;
            return (
              <div key={env.id} className="card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full" style={{ background: env.color }} />
                      <input className="w-full bg-transparent text-lg font-bold outline-none" value={env.name} onChange={(event) => updateEnvelope(env.id, { name: event.target.value })} />
                    </div>
                    <p className="mt-1 text-sm text-ink/60">{money(spent, state.user.baseCurrency)} spent · {money(remaining, state.user.baseCurrency)} left</p>
                  </div>
                  <button className="tap rounded-lg text-ink/55 hover:bg-ink/5" onClick={() => archiveEnvelope(env.id)} aria-label="Archive envelope"><Archive size={18} /></button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <input className="field" type="number" value={env.monthlyBudget} onChange={(event) => updateEnvelope(env.id, { monthlyBudget: Number(event.target.value) })} />
                  <input className="field" type="number" defaultValue={50} onBlur={(event) => event.currentTarget.value = "50"} onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      addAllocation(env.id, Number((event.target as HTMLInputElement).value));
                      (event.target as HTMLInputElement).value = "50";
                    }
                  }} aria-label="Allocation amount" />
                  <Button variant="secondary" onClick={() => addAllocation(env.id, 50)}>Allocate $50</Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

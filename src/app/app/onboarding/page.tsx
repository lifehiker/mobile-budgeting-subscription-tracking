"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, FieldLabel } from "@/components/ui";
import { useAppStore } from "@/components/app-store";
import { currencies } from "@/lib/currency";
import { envelopeTemplates } from "@/lib/data";
import type { CurrencyCode } from "@/lib/types";

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding, ready } = useAppStore();
  if (!ready) return <p className="p-4 text-ink/60">Loading…</p>;
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [selected, setSelected] = useState(envelopeTemplates.map((item) => ({ ...item, enabled: true, carryover: item.name !== "Rent" })));
  function submit() {
    const envelopes = selected.filter((item) => item.enabled).slice(0, 8);
    if (envelopes.length < 3) return;
    completeOnboarding(currency, envelopes);
    router.push("/app");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <div>
        <p className="text-sm font-semibold text-moss">Setup</p>
        <h1 className="text-3xl font-bold">Build your starter budget</h1>
      </div>
      <div className="card space-y-5 p-4">
        <div className="space-y-2">
          <FieldLabel>Base currency</FieldLabel>
          <select className="field" value={currency} onChange={(event) => setCurrency(event.target.value as CurrencyCode)}>
            {currencies.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
        <div className="space-y-3">
          <FieldLabel>Starter envelopes</FieldLabel>
          {selected.map((item, index) => (
            <div key={item.name} className="grid gap-3 rounded-lg bg-mist p-3 sm:grid-cols-[1fr_140px_110px]">
              <label className="flex items-center gap-3 font-semibold">
                <input type="checkbox" checked={item.enabled} onChange={(event) => setSelected((current) => current.map((env, i) => i === index ? { ...env, enabled: event.target.checked } : env))} />
                <span className="h-3 w-3 rounded-full" style={{ background: item.color }} />
                {item.name}
              </label>
              <input className="field" type="number" value={item.monthlyBudget} onChange={(event) => setSelected((current) => current.map((env, i) => i === index ? { ...env, monthlyBudget: Number(event.target.value) } : env))} />
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" checked={item.carryover} onChange={(event) => setSelected((current) => current.map((env, i) => i === index ? { ...env, carryover: event.target.checked } : env))} />
                Carry over
              </label>
            </div>
          ))}
        </div>
        <Button onClick={submit} className="w-full" disabled={selected.filter((item) => item.enabled).length < 3}>Finish setup</Button>
      </div>
    </div>
  );
}

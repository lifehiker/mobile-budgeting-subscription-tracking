"use client";

import { Download, RotateCcw, Save } from "lucide-react";
import { Button, FieldLabel } from "@/components/ui";
import { useAppStore } from "@/components/app-store";
import { currencies } from "@/lib/currency";
import type { CurrencyCode } from "@/lib/types";

export default function SettingsPage() {
  const { state, updateUser, resetDemo, upgrade } = useAppStore();
  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "envelopeflow-export.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-ink/65">Profile, currency, reminders, billing, and local data controls.</p>
      </div>
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="card space-y-3 p-4">
          <h2 className="font-bold">Profile</h2>
          <FieldLabel>Name</FieldLabel>
          <input className="field" value={state.user.name} onChange={(event) => updateUser({ name: event.target.value })} />
          <FieldLabel>Email</FieldLabel>
          <input className="field" value={state.user.email} onChange={(event) => updateUser({ email: event.target.value })} />
          <FieldLabel>Base currency</FieldLabel>
          <select className="field" value={state.user.baseCurrency} onChange={(event) => updateUser({ baseCurrency: event.target.value as CurrencyCode })}>{currencies.map((item) => <option key={item}>{item}</option>)}</select>
          <Button variant="secondary"><Save size={18} /> Saved locally</Button>
        </div>
        <div className="card space-y-3 p-4">
          <h2 className="font-bold">Reminders and billing</h2>
          <label className="flex items-center justify-between rounded-lg bg-mist p-3 font-semibold">3 days before due date <input type="checkbox" checked={state.user.reminderThreeDay} onChange={(event) => updateUser({ reminderThreeDay: event.target.checked })} /></label>
          <label className="flex items-center justify-between rounded-lg bg-mist p-3 font-semibold">Same-day reminder <input type="checkbox" checked={state.user.reminderSameDay} onChange={(event) => updateUser({ reminderSameDay: event.target.checked })} /></label>
          <div className="rounded-lg bg-mist p-3">
            <p className="text-sm text-ink/60">Current plan</p>
            <p className="text-xl font-bold capitalize">{state.user.plan}</p>
          </div>
          <Button onClick={() => upgrade("pro")} className="w-full">Mock upgrade to Pro</Button>
        </div>
      </section>
      <section className="card flex flex-col gap-3 p-4 sm:flex-row">
        <Button variant="secondary" onClick={exportData}><Download size={18} /> Export JSON</Button>
        <Button variant="danger" onClick={resetDemo}><RotateCcw size={18} /> Reset demo data</Button>
      </section>
    </div>
  );
}

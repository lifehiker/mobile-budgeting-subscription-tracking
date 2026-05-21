"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui";
import { useAppStore } from "@/components/app-store";
import { money } from "@/lib/currency";
import { spentForEnvelope } from "@/lib/data";

export default function RolloverPage() {
  const { state, rolloverMonth, updateEnvelope } = useAppStore();
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold">Monthly rollover</h1>
        <p className="mt-1 text-ink/65">Carry selected remaining balances into the new month.</p>
      </div>
      <div className="card space-y-3 p-4">
        {state.envelopes.filter((env) => !env.archived).map((env) => {
          const remaining = env.allocated - spentForEnvelope(env.id, state.transactions);
          return (
            <label key={env.id} className="flex items-center justify-between gap-3 rounded-lg bg-mist p-3">
              <span>
                <span className="block font-bold">{env.name}</span>
                <span className="text-sm text-ink/60">{money(Math.max(0, remaining), state.user.baseCurrency)} available to carry over</span>
              </span>
              <input type="checkbox" checked={env.carryover} onChange={(event) => updateEnvelope(env.id, { carryover: event.target.checked })} />
            </label>
          );
        })}
        <Button onClick={rolloverMonth} className="w-full"><RefreshCw size={18} /> Start next month</Button>
      </div>
      <div className="space-y-3">
        {state.rollovers.map((roll) => (
          <div key={roll.id} className="card flex items-center justify-between p-4">
            <span className="font-semibold">{roll.month}</span>
            <span>{money(roll.carriedAmount, state.user.baseCurrency)} carried</span>
          </div>
        ))}
      </div>
    </div>
  );
}

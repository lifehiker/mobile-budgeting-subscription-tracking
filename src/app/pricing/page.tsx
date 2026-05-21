import { Check } from "lucide-react";
import { MarketingFooter, MarketingNav } from "@/components/marketing";
import { LinkButton } from "@/components/ui";

const tiers = [
  { name: "Free", price: "$0", cta: "Start free", items: ["5 envelopes", "20 transactions/month", "3 subscriptions", "One currency", "Current month dashboard"] },
  { name: "Pro", price: "$49/year", cta: "Start 7-day trial", highlight: true, items: ["Unlimited envelopes", "Unlimited transactions", "Unlimited subscriptions", "Multi-currency support", "Email bill reminders", "Monthly history and reports", "Carryover controls", "Priority support"] }
];

export default function PricingPage() {
  return (
    <>
      <MarketingNav />
      <main className="bg-mist">
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="text-4xl font-bold">Simple pricing for manual budgeting.</h1>
          <p className="mt-3 max-w-2xl text-ink/70">Default to annual Pro for the best value, or use Free until your budgeting habit needs more room.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {tiers.map((tier) => (
              <div key={tier.name} className={`card p-5 ${tier.highlight ? "border-moss ring-2 ring-leaf/40" : ""}`}>
                <p className="text-lg font-bold">{tier.name}</p>
                <p className="mt-3 text-4xl font-bold">{tier.price}</p>
                <p className="mt-1 text-sm text-ink/60">{tier.name === "Pro" ? "$5.99/month also available" : "No card required"}</p>
                <ul className="mt-5 space-y-3">
                  {tier.items.map((item) => <li className="flex gap-2 text-sm" key={item}><Check size={18} className="text-moss" /> {item}</li>)}
                </ul>
                <LinkButton href="/login" className="mt-6 w-full">{tier.cta}</LinkButton>
              </div>
            ))}
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}

import Link from "next/link";
import { ArrowRight, Bell, Globe2, Shield, WalletCards } from "lucide-react";
import { LinkButton } from "./ui";

export function MarketingNav() {
  return (
    <header className="border-b border-ink/10 bg-white/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-bold text-ink">EnvelopeFlow</Link>
        <nav className="flex items-center gap-2">
          <Link href="/pricing" className="tap rounded-lg px-3 py-2 text-sm font-semibold text-ink/70">Pricing</Link>
          <LinkButton href="/login" className="px-3">Start</LinkButton>
        </nav>
      </div>
    </header>
  );
}

export function MarketingFooter() {
  const links = ["envelope-budget-app", "subscription-tracker-app", "bill-reminder-app", "multi-currency-budget-app", "budget-app-no-bank-sync", "cash-stuffing-app", "expat-finance-app", "mint-alternative"];
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <p className="font-bold">EnvelopeFlow</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          {links.map((link) => <Link key={link} href={`/${link}`} className="text-ink/65 hover:text-moss">{link.replaceAll("-", " ")}</Link>)}
        </div>
      </div>
    </footer>
  );
}

export function ProductMockup() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-[28px] border-8 border-ink bg-mist p-3 shadow-soft">
      <div className="rounded-[18px] bg-white p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">May budget</span>
          <span className="rounded-lg bg-leaf/20 px-2 py-1 text-xs font-bold text-moss">$1,846 left</span>
        </div>
        <div className="mt-4 space-y-3">
          {[
            ["Groceries", "$312 left", "72%", "#70a288"],
            ["Rent", "$0 due", "100%", "#2f5d50"],
            ["Subscriptions", "$41 due soon", "58%", "#e86f51"]
          ].map(([name, value, width, color]) => (
            <div key={name}>
              <div className="flex justify-between text-sm"><span className="font-semibold">{name}</span><span>{value}</span></div>
              <div className="mt-2 h-3 rounded-full bg-ink/8"><div className="h-3 rounded-full" style={{ width, background: color }} /></div>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-lg bg-ink p-3 text-white">
          <p className="text-xs text-white/65">Next bill</p>
          <p className="font-bold">Cloud storage · Friday</p>
        </div>
      </div>
    </div>
  );
}

export const featureCards = [
  { icon: WalletCards, title: "Envelope budgeting", copy: "Plan categories, allocate income, and see remaining balances at a glance." },
  { icon: Bell, title: "Subscription tracking", copy: "Put recurring charges on a calendar and inside the category they affect." },
  { icon: Globe2, title: "Multi-currency", copy: "Record spending in the original currency while reporting in your base currency." },
  { icon: Shield, title: "No bank sync", copy: "Manual-first tracking for people who prefer privacy and intentional entry." }
];

export function CTA() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold">Manual budgeting without the bank-link baggage.</h2>
          <p className="mt-2 text-white/70">Start with envelopes, subscriptions, reminders, and multi-currency tracking.</p>
        </div>
        <Link href="/login" className="tap inline-flex items-center justify-center gap-2 rounded-lg bg-coral px-4 py-2 font-bold text-white">Create budget <ArrowRight size={18} /></Link>
      </div>
    </section>
  );
}

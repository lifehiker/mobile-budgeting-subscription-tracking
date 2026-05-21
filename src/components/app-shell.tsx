"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bell, CreditCard, Home, PlusCircle, Settings, WalletCards } from "lucide-react";
import { AppStoreProvider } from "./app-store";

const nav = [
  { href: "/app", label: "Home", icon: Home },
  { href: "/app/envelopes", label: "Envelopes", icon: WalletCards },
  { href: "/app/add-expense", label: "Add", icon: PlusCircle },
  { href: "/app/subscriptions", label: "Bills", icon: Bell },
  { href: "/app/reports", label: "Reports", icon: BarChart3 },
  { href: "/app/settings", label: "Settings", icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AppStoreProvider>
      <div className="phone-shell bg-mist">
        <header className="sticky top-0 z-30 border-b border-ink/10 bg-mist/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/app" className="flex items-center gap-2 font-bold text-ink">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-moss text-white">
                <CreditCard size={18} />
              </span>
              EnvelopeFlow
            </Link>
            <Link href="/pricing" className="rounded-lg bg-gold px-3 py-2 text-sm font-bold text-ink">
              Pro
            </Link>
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl px-4 py-5 md:py-8">{children}</main>
        <nav className="bottom-nav">
          <div className="mx-auto grid max-w-5xl grid-cols-6 gap-1 px-2 py-2">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`tap flex flex-col items-center justify-center rounded-lg px-1 py-1 text-[11px] font-semibold ${active ? "bg-moss text-white" : "text-ink/65 hover:bg-ink/5"}`}>
                  <Icon size={19} />
                  <span className="mt-1 hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </AppStoreProvider>
  );
}

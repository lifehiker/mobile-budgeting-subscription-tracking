import { ArrowRight } from "lucide-react";
import { CTA, featureCards, MarketingFooter, MarketingNav, ProductMockup } from "@/components/marketing";
import { LinkButton } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      <MarketingNav />
      <main>
        <section className="bg-mist">
          <div className="mx-auto grid min-h-[720px] max-w-6xl items-center gap-8 px-4 py-10 lg:grid-cols-[1fr_420px]">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-moss">Manual envelope budgeting + subscription tracking</p>
              <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-tight text-ink sm:text-6xl">EnvelopeFlow</h1>
              <p className="mt-5 max-w-2xl text-lg text-ink/70">A simple mobile budgeting app for envelopes, bills, subscriptions, and multi-currency expenses. No bank sync required.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <LinkButton href="/login">Start free <ArrowRight size={18} /></LinkButton>
                <LinkButton href="/pricing" variant="secondary">View pricing</LinkButton>
              </div>
            </div>
            <ProductMockup />
          </div>
        </section>
        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((item) => {
              const Icon = item.icon;
              return (
                <div className="card p-4" key={item.title}>
                  <Icon className="text-moss" />
                  <h2 className="mt-3 font-bold">{item.title}</h2>
                  <p className="mt-2 text-sm text-ink/65">{item.copy}</p>
                </div>
              );
            })}
          </div>
        </section>
        <CTA />
      </main>
      <MarketingFooter />
    </>
  );
}

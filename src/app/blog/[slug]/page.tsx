import { notFound } from "next/navigation";
import { MarketingFooter, MarketingNav } from "@/components/marketing";
import { blogPages } from "@/lib/data";

export function generateStaticParams() {
  return blogPages.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: `${slug.replaceAll("-", " ")} | EnvelopeFlow` };
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!blogPages.includes(slug)) notFound();
  const title = slug.replaceAll("-", " ");
  return (
    <>
      <MarketingNav />
      <main className="bg-mist">
        <article className="mx-auto max-w-3xl px-4 py-14">
          <p className="text-sm font-bold uppercase tracking-wide text-moss">Guide</p>
          <h1 className="mt-3 text-4xl font-bold capitalize">{title}</h1>
          <p className="mt-4 text-lg text-ink/70">Manual budgeting works best when the system is fast, private, and tied to real bills. This guide explains how to combine envelopes, recurring charges, and reminders without connecting a bank account.</p>
          <div className="mt-8 space-y-5">
            {["Start with a small set of categories.", "Log expenses in the moment.", "Assign every recurring charge to an envelope.", "Review the next 30 days before spending flexible money."].map((section) => (
              <section className="card p-5" key={section}>
                <h2 className="text-xl font-bold">{section}</h2>
                <p className="mt-2 text-ink/65">EnvelopeFlow keeps this workflow lightweight: choose a base currency, add starter envelopes, enter expenses manually, and keep subscription due dates visible on the dashboard.</p>
              </section>
            ))}
          </div>
        </article>
      </main>
      <MarketingFooter />
    </>
  );
}

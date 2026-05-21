import { notFound } from "next/navigation";
import { CTA, MarketingFooter, MarketingNav, ProductMockup } from "@/components/marketing";
import { seoPages } from "@/lib/data";

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = seoPages.find((item) => item.slug === slug);
  if (!page) return {};
  return {
    title: `${page.title} | EnvelopeFlow`,
    description: page.description
  };
}

export default async function SeoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = seoPages.find((item) => item.slug === slug);
  if (!page) notFound();
  const faq = [
    { q: `Is EnvelopeFlow a ${page.keyword}?`, a: "Yes. It is built around manual envelopes, subscription tracking, reminders, and mobile-first workflows." },
    { q: "Does it require bank sync?", a: "No. The MVP is manual-first and stores data locally in this build unless production storage credentials are added." }
  ];
  return (
    <>
      <MarketingNav />
      <main className="bg-mist">
        <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-moss">{page.keyword}</p>
            <h1 className="mt-3 text-4xl font-bold">{page.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-ink/70">{page.description}</p>
            <div className="mt-8 grid gap-3">
              {page.sections.map((section) => <div key={section} className="card p-4 font-semibold">{section}</div>)}
            </div>
          </div>
          <ProductMockup />
        </section>
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10">
            <h2 className="text-2xl font-bold">FAQ</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {faq.map((item) => <div className="card p-4" key={item.q}><h3 className="font-bold">{item.q}</h3><p className="mt-2 text-sm text-ink/65">{item.a}</p></div>)}
            </div>
          </div>
        </section>
        <CTA />
      </main>
      <MarketingFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) }) }} />
    </>
  );
}

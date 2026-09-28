import { DiscountBadge, PriceTag } from "@/components/site/PriceTag";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Smartphone, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ErrorState, LoadingState } from "@/components/site/Loading";
import { useShopProducts } from "@/lib/shop";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/ebooks/")({
  head: () => ({
    meta: [
      { title: "E-Books & Guides — Doctor-Crafted Meal Planners" },
      {
        name: "description",
        content:
          "Instant-download baby feeding e-books, meal planners and trackers created and reviewed by Dr. Reham Emam.",
      },
      { property: "og:title", content: "Doctor-Crafted Guides & Meal Planners" },
      {
        property: "og:description",
        content: "Instant PDF downloads for stress-free feeding.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EbooksPage,
});

const valueMatrix = [
  { emoji: "📱", title: "Read Anywhere", note: "Mobile-optimised PDFs for the kitchen counter." },
  { emoji: "⏱️", title: "Quick & Easy", note: "Most meals ready in under 20 minutes." },
  { emoji: "🥦", title: "Nutrient-Dense", note: "Iron, zinc and healthy fats planned in." },
  { emoji: "❄️", title: "Batch Cooking", note: "Freezer notes on every single recipe." },
];

const reviews = [
  { name: "Hana M.", text: "The starter kit took all the guesswork out of week one. My daughter took to lumps so easily." },
  { name: "Yasmin A.", text: "Finally an iron plan I understand. Our follow-up bloodwork improved in three months." },
  { name: "Nour K.", text: "Worth it for the freezer notes alone. I batch cook once and we're set." },
];

const faqs = [
  { q: "How do I receive my purchase?", a: "Instantly — a download link appears on screen and lands in your inbox within a minute." },
  { q: "Are the recipes allergen-friendly?", a: "Every recipe lists dairy, egg, gluten and nut swaps so you can adapt without guessing." },
  { q: "Which ages are covered?", a: "From first purees at 4–6 months right through to toddler family plates at 12 months and beyond." },
  { q: "Can I print the planners?", a: "Yes. Every planner and tracker is formatted for clean A4 and US Letter printing." },
];

function EbooksPage() {
  const { products, loading, error, retry } = useShopProducts();
  const { addItem, hasItem } = useCart();

  return (
    <>
      <section className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center">
          <h1 className="mx-auto max-w-3xl text-3xl md:text-4xl">
            Doctor-Crafted Guides & Meal Planners for Stress-Free Feeding
          </h1>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            {[
              { icon: Download, label: "Instant Download" },
              { icon: Smartphone, label: "Optimized for Mobile" },
              { icon: Stethoscope, label: "Doctor-Reviewed" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-4 py-2 font-semibold text-secondary"
              >
                <Icon className="h-4 w-4" /> {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <LoadingState label="Loading the shop…" />
      ) : error ? (
        <div className="py-12">
          <ErrorState message={error} onRetry={retry} />
        </div>
      ) : (
        <section className="mx-auto max-w-7xl px-4 py-10">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <div key={p.id} className="card-soft flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lift">
                  <Link
                    to="/ebooks/$id"
                    params={{ id: String(p.id) }}
                    className="flex flex-1 flex-col"
                  >
                  <span className="block w-full overflow-hidden">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="h-auto w-full transition-transform duration-300 hover:scale-[1.02]"
                      />
                    ) : (
                      <span className="grid aspect-[4/5] place-items-center bg-muted text-5xl">📘</span>
                    )}
                  </span>
                  <span className="flex flex-1 flex-col p-6">
                  <span className="mt-4 text-xs font-semibold text-secondary">{p.category}</span>
                  <h3 className="mt-1 text-lg leading-snug">{p.title}</h3>
                  {p.blurb && <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.blurb}</p>}
                  <p className="mt-4 flex flex-wrap items-center gap-2">
                    <PriceTag product={p} />
                    <DiscountBadge product={p} />
                  </p>
                  </span>
                  </Link>
                  <Button
                    type="button"
                    className="mx-6 mb-6 rounded-full"
                    onClick={() => addItem(p)}
                    disabled={hasItem(p.id)}
                  >
                    {hasItem(p.id) ? "Added to cart" : "Add to cart"}
                  </Button>
                </div>
              ))}
            </div>
          </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valueMatrix.map((v) => (
            <div key={v.title} className="card-soft p-6">
              <span className="text-3xl">{v.emoji}</span>
              <h3 className="mt-3 text-base">{v.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="text-2xl">What parents say</h2>
        <div className="no-scrollbar mt-6 flex gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {reviews.map((r) => (
            <blockquote key={r.name} className="card-soft w-80 shrink-0 p-6 lg:w-auto">
              <p className="text-accent">★★★★★</p>
              <p className="mt-3 text-sm text-muted-foreground">"{r.text}"</p>
              <footer className="mt-4 text-sm font-semibold">{r.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-2xl">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-4">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

    </>
  );
}

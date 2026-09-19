import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Download, Smartphone, Star, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ErrorState, LoadingState } from "@/components/site/Loading";
import { useShopProducts, type ShopProduct } from "@/lib/shop";
import { cn } from "@/lib/utils";

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
  const [cat, setCat] = useState("All");
  const [checkout, setCheckout] = useState<ShopProduct | null>(null);

  const bestseller = products[0] ?? null;
  const catalog = useMemo(
    () => products.filter((p) => p.id !== bestseller?.id),
    [products, bestseller],
  );
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.flatMap((p) => p.categories))).sort()],
    [products],
  );
  const shown = cat === "All" ? catalog : catalog.filter((p) => p.categories.includes(cat));

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
        <>
          {bestseller && (
            <section className="mx-auto max-w-7xl px-4 py-10">
              <div className="grid items-center gap-8 rounded-[2rem] bg-card p-6 shadow-sm md:grid-cols-2 md:p-10">
                <div className="grid place-items-center rounded-3xl bg-rose-soft p-6">
                  {bestseller.image ? (
                    <img
                      src={bestseller.image}
                      alt={bestseller.title}
                      loading="lazy"
                      className="max-h-80 w-auto rounded-2xl object-contain shadow-lift"
                    />
                  ) : (
                    <span className="text-6xl">📗</span>
                  )}
                </div>
                <div>
                  <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-bold">Bestseller</span>
                  <h2 className="mt-4 text-2xl md:text-3xl">{bestseller.title}</h2>
                  {bestseller.rating > 0 && (
                    <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold">
                      <Star className="h-4 w-4 fill-accent text-accent" /> {bestseller.rating}/5 from{" "}
                      {bestseller.reviewCount} parents
                    </p>
                  )}
                  <p className="mt-4 flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-primary">{bestseller.priceLabel}</span>
                    {bestseller.regularPriceLabel && (
                      <span className="text-lg text-muted-foreground line-through">
                        {bestseller.regularPriceLabel}
                      </span>
                    )}
                  </p>
                  {bestseller.blurb && (
                    <p className="mt-4 text-sm text-muted-foreground">{bestseller.blurb}</p>
                  )}
                  <ul className="mt-5 space-y-2 text-sm">
                    {[
                      "Stage-labelled recipes from purees to family plates",
                      "Allergen swap guidance throughout",
                      "Iron and texture progression planner",
                      "Freezer and batch-cooking notes",
                    ].map((f) => (
                      <li key={f} className="flex gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="lg"
                    className="mt-6 w-full rounded-full sm:w-auto"
                    onClick={() => setCheckout(bestseller)}
                  >
                    Buy Now – Instant PDF Access
                  </Button>
                </div>
              </div>
            </section>
          )}

          <section className="mx-auto max-w-7xl px-4 py-8">
            {categories.length > 1 && (
              <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCat(c)}
                    className={cn(
                      "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      cat === c
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-card text-muted-foreground hover:border-primary",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((p) => (
                <div key={p.id} className="card-soft flex flex-col p-6 transition-shadow hover:shadow-lift">
                  <span className="grid h-44 place-items-center overflow-hidden rounded-2xl bg-muted">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    ) : (
                      <span className="text-5xl">📘</span>
                    )}
                  </span>
                  <span className="mt-4 text-xs font-semibold text-secondary">{p.category}</span>
                  <h3 className="mt-1 text-lg leading-snug">{p.title}</h3>
                  {p.blurb && <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.blurb}</p>}
                  <p className="mt-4 flex items-center gap-2 text-xl font-bold text-primary">
                    {p.priceLabel}
                    {p.regularPriceLabel && (
                      <span className="text-sm font-normal text-muted-foreground line-through">
                        {p.regularPriceLabel}
                      </span>
                    )}
                  </p>
                  <Button className="mt-4 rounded-full" onClick={() => setCheckout(p)}>
                    Buy Now
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </>
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

      <Dialog open={!!checkout} onOpenChange={(o) => !o && setCheckout(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete your purchase</DialogTitle>
          </DialogHeader>
          {checkout && (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-muted p-4 text-sm">
                <span className="pr-4 font-semibold">{checkout.title}</span>
                <span className="font-bold text-primary">{checkout.priceLabel}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Checkout is handled securely on babyfoodessentials.com, where your PDF is delivered
                instantly after payment.
              </p>
              <Button asChild className="w-full rounded-full">
                <a href={checkout.permalink} target="_blank" rel="noreferrer">
                  Continue to secure checkout
                </a>
              </Button>
              <Button
                variant="secondary"
                className="w-full rounded-full"
                onClick={() => setCheckout(null)}
              >
                Keep browsing
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

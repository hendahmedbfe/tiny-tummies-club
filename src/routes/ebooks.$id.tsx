import { DiscountBadge, PriceTag } from "@/components/site/PriceTag";
import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Download, ShieldCheck, Smartphone, Star, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ErrorState, LoadingState } from "@/components/site/Loading";
import { wpProse } from "@/components/site/RecipeDialog";
import { useShopProducts } from "@/lib/shop";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/ebooks/$id")({
  head: () => ({
    meta: [
      { title: "E-Book Details — Baby Food Essentials" },
      {
        name: "description",
        content:
          "Full details, contents and pricing for this doctor-crafted baby feeding e-book by Dr. Reham Emam.",
      },
      { property: "og:title", content: "E-Book Details — Baby Food Essentials" },
      {
        property: "og:description",
        content: "Doctor-crafted meal planners and feeding guides, delivered instantly as a PDF.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

const highlights = [
  "Stage-labelled recipes from purees to family plates",
  "Allergen swap guidance throughout",
  "Iron and texture progression planner",
  "Freezer and batch-cooking notes",
];

function ProductPage() {
  const { id } = Route.useParams();
  const { products, loading, error, retry } = useShopProducts();
  const { addItem, hasItem } = useCart();

  const product = useMemo(
    () => products.find((p) => String(p.id) === id || p.slug === id) ?? null,
    [products, id],
  );
  const more = products.filter((p) => p.id !== product?.id).slice(0, 3);

  if (loading) return <LoadingState label="Loading this guide…" />;
  if (error)
    return (
      <div className="py-12">
        <ErrorState message={error} onRetry={retry} />
      </div>
    );
  if (!product)
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl">We couldn't find that guide</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          It may have been renamed or removed from the shop.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link to="/ebooks">Back to all e-books</Link>
        </Button>
      </div>
    );

  return (
    <>
      <article className="mx-auto max-w-7xl px-4 py-10">
        <Link
          to="/ebooks"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to e-books
        </Link>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div className="mx-auto w-full max-w-lg overflow-hidden rounded-[2rem]">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="h-auto w-full"
              />
            ) : (
              <span className="text-7xl">📗</span>
            )}
          </div>

          <div>
            <span className="text-xs font-semibold text-secondary">{product.category}</span>
            <h1 className="mt-2 text-3xl leading-tight md:text-4xl">{product.title}</h1>

            {product.rating > 0 && (
              <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold">
                <Star className="h-4 w-4 fill-accent text-accent" /> {product.rating}/5 from{" "}
                {product.reviewCount} parents
              </p>
            )}

            <p className="mt-4 flex flex-wrap items-center gap-3">
              <PriceTag product={product} size="lg" />
              <DiscountBadge product={product} />
            </p>

            {product.blurb && <p className="mt-4 text-sm text-muted-foreground">{product.blurb}</p>}

            <ul className="mt-5 space-y-2 text-sm">
              {highlights.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              type="button"
              size="lg"
              className="mt-6 w-full rounded-full sm:w-auto"
              onClick={() => addItem(product)}
              disabled={hasItem(product.id)}
            >
              {hasItem(product.id) ? "Added to cart" : "Add to cart"}
            </Button>

            <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
              {[
                { icon: Download, label: "Instant download" },
                { icon: Smartphone, label: "Mobile-friendly PDF" },
                { icon: Stethoscope, label: "Doctor-reviewed" },
                { icon: ShieldCheck, label: "Secure checkout" },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5">
                  <Icon className="h-4 w-4" /> {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {product.fullDescriptionHtml && (
          <section className="mt-12 max-w-3xl">
            <div
              className={wpProse}
              dangerouslySetInnerHTML={{ __html: product.fullDescriptionHtml }}
            />
          </section>
        )}
      </article>

      {more.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16">
          <h2 className="text-2xl">More guides you might like</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((p) => (
              <Link
                key={p.id}
                to="/ebooks/$id"
                params={{ id: String(p.id) }}
                className="card-soft flex flex-col p-6 transition-shadow hover:shadow-lift"
              >
                <span className="block w-full overflow-hidden rounded-t-2xl">
                  {p.image ? (
                    <img src={p.image} alt={p.title} loading="lazy" className="h-auto w-full" />
                  ) : (
                    <span className="grid aspect-[4/5] place-items-center bg-muted text-5xl">📘</span>
                  )}
                </span>
                <h3 className="mt-4 text-lg leading-snug">{p.title}</h3>
                <p className="mt-2 flex flex-wrap items-center gap-2">
                  <PriceTag product={p} />
                  <DiscountBadge product={p} />
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

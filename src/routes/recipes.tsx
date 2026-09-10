import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RecipeCard } from "@/components/site/RecipeCard";
import { RecipeDialog } from "@/components/site/RecipeDialog";
import { ErrorState, LoadingState } from "@/components/site/Loading";
import { useWpPosts, type WpPost } from "@/lib/wp";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recipes")({
  head: () => ({
    meta: [
      { title: "Recipes Hub — Doctor-Backed Baby Recipes for Every Stage" },
      {
        name: "description",
        content:
          "Filter wholesome baby and toddler recipes by category and search live from the Baby Food Essentials kitchen. Reviewed by Dr. Reham Emam.",
      },
      { property: "og:title", content: "Recipes Hub — Baby Food Essentials" },
      {
        property: "og:description",
        content: "Wholesome, doctor-backed recipes for every feeding stage.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecipesPage,
});

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "bg-card text-muted-foreground hover:border-primary hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

function RecipesPage() {
  const { posts, loading, error, retry } = useWpPosts(24);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState<WpPost | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.flatMap((p) => p.categories))).sort()],
    [posts],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (q && !`${p.title} ${p.excerpt}`.toLowerCase().includes(q)) return false;
      if (category !== "All" && !p.categories.includes(category)) return false;
      return true;
    });
  }, [posts, query, category]);

  return (
    <>
      <section className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="max-w-3xl text-3xl md:text-4xl">
            Wholesome, Doctor-Backed Recipes for Every Feeding Stage
          </h1>
          <div className="mt-6 flex max-w-xl items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes..."
                className="rounded-full pl-9"
              />
            </div>
            <span className="shrink-0 text-sm font-semibold text-secondary">
              {loading ? "…" : `${filtered.length} result${filtered.length === 1 ? "" : "s"}`}
            </span>
          </div>
        </div>
      </section>

      {categories.length > 1 && (
        <section className="mx-auto max-w-7xl px-4 py-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Browse by category
          </p>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {categories.map((c) => (
              <Pill key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-4">
        {loading ? (
          <LoadingState label="Fetching the latest recipes…" />
        ) : error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : filtered.length === 0 ? (
          <p className="card-soft p-10 text-center text-muted-foreground">
            No recipes match your search yet — try a different word or category.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.slice(0, 4).map((p) => (
              <RecipeCard key={p.id} post={p} onOpen={setOpen} />
            ))}
            {filtered.length > 4 && (
              <div className="rounded-2xl border-l-4 border-accent bg-gold-soft p-6 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <p className="text-sm">
                  <strong>💡 Dr. Reham's Texture Tip:</strong> Cut foods into adult index finger sizes so
                  your baby can grip them with a fist and still get a bite past the top of the hand.
                </p>
              </div>
            )}
            {filtered.slice(4).map((p) => (
              <RecipeCard key={p.id} post={p} onOpen={setOpen} />
            ))}
          </div>
        )}
      </section>

      <RecipeDialog post={open} onOpenChange={(o) => !o && setOpen(null)} />
    </>
  );
}

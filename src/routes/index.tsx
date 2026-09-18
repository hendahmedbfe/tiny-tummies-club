import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Baby, Check, Salad, Sparkles, Star, Utensils } from "lucide-react";
import { toast } from "sonner";
import heroImg from "@/assets/hero.jpg";
import featureImg from "@/assets/feature.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecipeCard } from "@/components/site/RecipeCard";
import { RecipeDialog } from "@/components/site/RecipeDialog";
import { ErrorState, LoadingState } from "@/components/site/Loading";
import { useWpPosts, type WpPost } from "@/lib/wp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Baby Food Essentials — Doctor-Backed Baby Recipes & Feeding Guides" },
      {
        name: "description",
        content:
          "Evidence-based infant nutrition from Dr. Reham Emam: stage-by-stage baby recipes, texture guidance and parent-tested meal ideas.",
      },
      { property: "og:title", content: "Baby Food Essentials by Dr. Reham Emam" },
      {
        property: "og:description",
        content: "Doctor-backed, wholesome and delicious meals for growing smiles.",
      },
    ],
  }),
  component: Home,
});

const chips = [
  "🌿 4-6m Purees",
  "🥑 Finger Foods",
  "🧠 Brain & Iron Boosters",
  "⚡ 3-Ingredient",
  "🥛 Dairy-Free",
];

const stages = [
  { icon: Baby, title: "First Purees", age: "4–6 months", note: "Smooth, single-ingredient starts" },
  { icon: Salad, title: "Textures & Mashes", age: "6–9 months", note: "Thicker, lumpier progressions" },
  { icon: Utensils, title: "Finger Foods & BLW", age: "9–12 months", note: "Self-feeding shapes" },
  { icon: Sparkles, title: "Toddler Plates", age: "12 months +", note: "Family meals, tiny portions" },
];

function Home() {
  const [open, setOpen] = useState<WpPost | null>(null);
  const { posts, loading, error, retry } = useWpPosts(24);
  const featured = posts.slice(0, 4);

  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-secondary">
            <Check className="h-3.5 w-3.5" /> Paediatrician-reviewed
          </span>
          <h1 className="mt-4 text-4xl leading-tight md:text-5xl">
            Doctor-Backed, Wholesome & Delicious Meals for Growing Smiles
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground">
            Evidence-based infant nutrition, speech-friendly textures, and easy parent-tested recipes for
            every stage of your baby's first years.
          </p>

          <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
            {chips.map((c) => (
              <Link
                key={c}
                to="/recipes"
                className="shrink-0 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-rose-soft"
              >
                {c}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/recipes">
                Browse recipes <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/ebooks">Get the free meal planner</Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <img
            src={heroImg}
            alt="Colourful bowls of homemade baby food"
            width={1024}
            height={1024}
            className="w-full rounded-[2rem] object-cover shadow-lift"
          />
          {featured[0] && (
            <div className="card-soft absolute -bottom-6 left-4 w-56 p-4 shadow-lift md:left-8">
              <p className="text-xs font-semibold text-muted-foreground">Featured today</p>
              <p className="mt-1 line-clamp-2 text-sm font-bold leading-snug">{featured[0].title}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {featured[0].category} ·{" "}
                {featured[0].readTime}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl md:text-3xl">Browse by stage</h2>
        <p className="mt-2 text-muted-foreground">Every recipe is mapped to oral-motor readiness.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map(({ icon: Icon, title, age, note }) => (
            <Link
              key={title}
              to="/recipes"
              className="card-soft group p-6 transition-shadow hover:shadow-lift"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-soft text-primary">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg">{title}</h3>
              <p className="text-sm font-semibold text-secondary">{age}</p>
              <p className="mt-1 text-sm text-muted-foreground">{note}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl">Trending & Doctor's Picks</h2>
            <p className="mt-2 text-muted-foreground">The recipes parents keep coming back to.</p>
          </div>
          <Link to="/recipes" className="hidden text-sm font-semibold text-primary sm:block">
            See all →
          </Link>
        </div>
        {loading ? (
          <LoadingState label="Fetching the latest recipes…" />
        ) : error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : (
          <div className="no-scrollbar mt-8 flex snap-x gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
            {featured.map((p) => (
              <div key={p.id} className="w-72 shrink-0 snap-start lg:w-auto">
                <RecipeCard post={p} onOpen={setOpen} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid items-center gap-8 rounded-[2rem] bg-card p-6 shadow-sm md:grid-cols-2 md:p-10">
          <img
            src={featureImg}
            alt="Parent feeding a baby in a high chair"
            loading="lazy"
            width={1024}
            height={768}
            className="w-full rounded-3xl object-cover"
          />
          <div>
            <span className="rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-secondary">
              Development spotlight
            </span>
            <h2 className="mt-4 text-2xl md:text-3xl">Texture Transition & Chewing Development</h2>
            <p className="mt-3 text-muted-foreground">
              Chewing trains the exact tongue movements your baby will later use for speech. Moving up the
              texture ladder on time protects both feeding skills and early sounds.
            </p>
            <div className="mt-5 rounded-2xl border-l-4 border-accent bg-gold-soft p-4 text-sm">
              <strong>★ Doctor's callout:</strong> Aim to introduce soft lumps by 9 months. Staying on
              smooth purees too long makes lumps much harder to accept later.
            </div>
            <Button asChild variant="outline" className="mt-5 rounded-full">
              <Link to="/journal">Read the full guide</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl md:text-3xl">As seen on Instagram</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {posts.slice(4, 8).map((r) => (
            <a
              key={r.id}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={r.image ?? heroImg}
                alt={r.title}
                loading="lazy"
                width={768}
                height={768}
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-foreground/70 to-transparent p-3 text-xs font-semibold text-background">
                ▶ {r.title}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Checklist on its way! Check your inbox for the download link.");
          }}
          className="rounded-[2rem] border-2 border-secondary bg-card p-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl">Download the Ultimate 100 First Foods Checklist</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            A printable, allergen-aware tracker for your baby's first hundred flavours — free from the
            clinic.
          </p>
          <div className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <Input type="email" required placeholder="Your email address" className="rounded-full" />
            <Button type="submit" className="rounded-full">
              Send it to me
            </Button>
          </div>
        </form>
      </section>

      <RecipeDialog post={open} onOpenChange={(o) => !o && setOpen(null)} />
    </>
  );
}

import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { articles, blogCategories } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "The Feeding & Development Journal — Dr. Reham Emam" },
      {
        name: "description",
        content:
          "Paediatrician-written articles on starting solids, oral motor skills, iron nutrition, allergens and picky eating.",
      },
      { property: "og:title", content: "The Feeding & Development Journal" },
      {
        property: "og:description",
        content: "Evidence-based articles on infant feeding and development.",
      },
    ],
  }),
  component: JournalPage,
});

function Avatar() {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
      <span className="grid h-7 w-7 place-items-center rounded-full bg-rose-soft text-[10px] font-bold text-primary">
        RE
      </span>
      Dr. Reham Emam
    </span>
  );
}

function JournalPage() {
  const [cat, setCat] = useState("All");
  const [featured, ...rest] = articles;
  const list = (cat === "All" ? rest : rest.filter((a) => a.category === cat));

  return (
    <>
      <section className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h1 className="text-3xl md:text-4xl">The Feeding & Development Journal</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Clinic-grade explainers on how babies learn to eat — and what to do when it gets tricky.
          </p>
          <div className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-1">
            {blogCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:border-primary",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <article className="grid gap-6 overflow-hidden rounded-[2rem] bg-card shadow-sm md:grid-cols-2">
          <img
            src={featured.image}
            alt={featured.title}
            loading="lazy"
            width={768}
            height={768}
            className="h-full min-h-64 w-full object-cover"
          />
          <div className="p-6 md:py-10 md:pr-10">
            <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-bold">★ Doctor's Pick</span>
            <h2 className="mt-4 text-2xl leading-snug md:text-3xl">{featured.title}</h2>
            <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
            <p className="mt-4 inline-flex items-center gap-3 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {featured.readTime} · {featured.date}
            </p>
            <div className="mt-6">
              <Button asChild className="rounded-full">
                <Link to="/journal/$slug" params={{ slug: featured.slug }}>
                  Read the article
                </Link>
              </Button>
            </div>
          </div>
        </article>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <article key={a.slug} className="card-soft overflow-hidden transition-shadow hover:shadow-lift">
              <Link to="/journal/$slug" params={{ slug: a.slug }}>
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="aspect-4/3 w-full object-cover"
                />
              </Link>
              <div className="space-y-3 p-5">
                <span className="inline-block rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-secondary">
                  {a.category}
                </span>
                <h3 className="text-lg leading-snug">
                  <Link to="/journal/$slug" params={{ slug: a.slug }} className="hover:text-primary">
                    {a.title}
                  </Link>
                </h3>
                <p className="line-clamp-3 text-sm text-muted-foreground">{a.excerpt}</p>
                <div className="flex items-center justify-between pt-1">
                  <Avatar />
                  <span className="text-xs text-muted-foreground">{a.readTime}</span>
                </div>
              </div>
            </article>
          ))}
          {list.length === 0 && (
            <p className="text-muted-foreground">No articles in this category yet — new ones monthly.</p>
          )}
        </div>
      </section>
    </>
  );
}

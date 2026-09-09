import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { articles, recipes, type Recipe } from "@/lib/data";
import { RecipeCard } from "@/components/site/RecipeCard";
import { RecipeDialog } from "@/components/site/RecipeDialog";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    }
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} — The Feeding Journal` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const [open, setOpen] = useState<Recipe | null>(null);
  const related = recipes.filter((r) => article.relatedRecipes.includes(r.id));

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-12">
        <Link to="/journal" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to the journal
        </Link>

        <span className="mt-6 inline-block rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-secondary">
          {article.category}
        </span>
        <h1 className="mt-4 text-3xl leading-tight md:text-4xl">{article.title}</h1>
        <p className="mt-3 inline-flex items-center gap-3 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" /> {article.readTime} · {article.date} · Dr. Reham Emam
        </p>

        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          width={768}
          height={768}
          className="mt-8 aspect-16/9 w-full rounded-3xl object-cover"
        />

        <div className="mt-8 rounded-2xl bg-sage-soft p-6">
          <h2 className="text-base">Doctor's Key Takeaways</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {article.takeaways.map((t) => (
              <li key={t} className="flex gap-2">
                <span className="text-secondary">●</span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 space-y-8">
          {article.body.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl">{section.heading}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{section.text}</p>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border-l-4 border-accent bg-gold-soft p-5 text-sm">
          <strong>★ Doctor's Tip: </strong>
          {article.tip}
        </div>
      </article>

      <section className="mx-auto max-w-7xl px-4 pb-8">
        <h2 className="text-2xl">Related recipes</h2>
        <div className="no-scrollbar mt-6 flex gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {related.map((r) => (
            <div key={r.id} className="w-72 shrink-0 lg:w-auto">
              <RecipeCard recipe={r} onOpen={setOpen} />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <div className="card-soft flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-rose-soft text-lg font-bold text-primary">
            RE
          </span>
          <div>
            <h3 className="text-lg">Dr. Reham Emam</h3>
            <p className="text-sm text-muted-foreground">
              Physician and paediatric nutrition specialist at Reham Emam Kids Clinic, writing about
              evidence-based feeding, texture readiness and calmer mealtimes.
            </p>
            <Link to="/about" className="mt-2 inline-block text-sm font-semibold text-primary">
              More about the doctor →
            </Link>
          </div>
        </div>
      </section>

      <RecipeDialog recipe={open} onOpenChange={(o) => !o && setOpen(null)} />
    </>
  );
}

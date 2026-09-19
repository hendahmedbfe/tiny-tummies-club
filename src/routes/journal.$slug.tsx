import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import fallbackImg from "@/assets/hero.jpg";
import { RecipeCard } from "@/components/site/RecipeCard";
import { RecipeDialog, wpProse } from "@/components/site/RecipeDialog";
import { ErrorState, LoadingState } from "@/components/site/Loading";
import { useWpPost, useWpPosts, type WpPost } from "@/lib/wp";

export const Route = createFileRoute("/journal/$slug")({
  head: () => ({
    meta: [
      { title: "Article — The Feeding Journal by Dr. Reham Emam" },
      {
        name: "description",
        content:
          "Read the full paediatrician-written article on infant feeding, textures and nutrition from Baby Food Essentials.",
      },
      { property: "og:title", content: "The Feeding Journal — Baby Food Essentials" },
      {
        property: "og:description",
        content: "Evidence-based writing on infant feeding and development.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const { post, loading, error, retry } = useWpPost(slug);
  const { posts } = useWpPosts();
  const [open, setOpen] = useState<WpPost | null>(null);

  const related = post
    ? posts.filter((p) => p.slug !== post.slug && p.categories.some((c) => post.categories.includes(c))).slice(0, 3)
    : [];

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-12">
        <Link
          to="/journal"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the journal
        </Link>

        {loading ? (
          <LoadingState label="Loading this article…" />
        ) : error || !post ? (
          <div className="py-10">
            <ErrorState message={error ?? "This article could not be found."} onRetry={retry} />
          </div>
        ) : (
          <>
            <span className="mt-6 inline-block rounded-full bg-sage-soft px-3 py-1 text-xs font-semibold text-secondary">
              {post.category}
            </span>
            <h1 className="mt-4 text-3xl leading-tight md:text-4xl">{post.title}</h1>
            <p className="mt-3 inline-flex items-center gap-3 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> {post.readTime} · {post.dateLabel} · Dr. Reham Emam
            </p>

            <img
              src={post.image ?? fallbackImg}
              alt={post.title}
              loading="lazy"
              width={768}
              height={432}
              className="mt-8 aspect-16/9 w-full rounded-3xl object-cover"
            />

            <div className="mt-8 rounded-2xl bg-sage-soft p-6">
              <h2 className="text-base">Doctor's Key Takeaway</h2>
              <p className="mt-2 text-sm">{post.excerpt}</p>
            </div>

            <div
              className={`mt-8 ${wpProse}`}
              onClick={handleAnchorClick}
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </>
        )}
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-8">
          <h2 className="text-2xl">Related recipes</h2>
          <div className="no-scrollbar mt-6 flex gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {related.map((r) => (
              <div key={r.id} className="w-72 shrink-0 lg:w-auto">
                <RecipeCard post={r} onOpen={setOpen} />
              </div>
            ))}
          </div>
        </section>
      )}

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

      <RecipeDialog post={open} onOpenChange={(o) => !o && setOpen(null)} />
    </>
  );
}

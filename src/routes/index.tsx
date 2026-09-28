import { DiscountBadge, PriceTag } from "@/components/site/PriceTag";
import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, BookOpen, Check, Download, Smartphone, Star } from "lucide-react";
import { toast } from "sonner";
import heroImg from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecipeCard } from "@/components/site/RecipeCard";
import { RecipeDialog } from "@/components/site/RecipeDialog";
import { ErrorState, LoadingState } from "@/components/site/Loading";
import { useWpPosts, type WpPost } from "@/lib/wp";
import { useShopProducts } from "@/lib/shop";
import { subscribeToChecklist } from "@/lib/subscribers.functions";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const bestsellerIds = [508, 977, 726];

const appUrl = "https://play.google.com/store/apps/details?id=com.babyfoodessentials.app";

const checklistPdf =
  "https://babyfoodessentials.com/wp-content/uploads/woocommerce_uploads/2026/01/100-Foods-Before-1-1_compressed.pdf";

const reviews = [
  { name: "Sarah M.", detail: "Mum of a 7-month-old", rating: 5, text: "The starting solids bundle took all the guesswork out. My daughter now loves her veggie purées!" },
  { name: "Omar K.", detail: "Dad of twins", rating: 5, text: "Clear, doctor-backed advice without the overwhelm. The meal ideas saved our busy weeknights." },
  { name: "Laila A.", detail: "First-time mum", rating: 5, text: "I was so nervous about allergens. The checklist made introducing new foods calm and organised." },
  { name: "Emma R.", detail: "Mum of a 10-month-old", rating: 4, text: "Great recipes that the whole family can enjoy. The finger food section is our favourite." },
  { name: "Nour H.", detail: "Mum of two", rating: 5, text: "The texture guidance helped my son move past purées. He's chewing confidently now." },
  { name: "James T.", detail: "Dad of a toddler", rating: 5, text: "The Second Year Nutrition Pack rescued us from picky-eating battles. Highly recommend." },
  { name: "Mariam S.", detail: "Mum of a 6-month-old", rating: 5, text: "Simple, healthy recipes with ingredients I already have. Beautifully laid out and easy to follow." },
  { name: "Hannah B.", detail: "Mum of a 1-year-old", rating: 4, text: "Loved the 200 meals e-book — so much variety. My baby tries something new every week." },
  { name: "Youssef E.", detail: "Dad of a 9-month-old", rating: 5, text: "Trustworthy information from a real paediatric specialist. It gave us real confidence." },
  { name: "Chloe D.", detail: "Mum of a 8-month-old", rating: 5, text: "The blog posts answer every question I have at 2am. Practical, warm and reassuring." },
];

function Home() {
  const [open, setOpen] = useState<WpPost | null>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const subscribe = useServerFn(subscribeToChecklist);
  const { posts, loading, error, retry } = useWpPosts();
  const featured = posts.slice(0, 4);
  const { products, loading: booksLoading } = useShopProducts();
  const bestsellers = bestsellerIds
    .map((bid) => products.find((p) => p.id === bid))
    .filter((p): p is NonNullable<typeof p> => !!p);

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessMessage(null);
    setSubmitting(true);
    try {
      await subscribe({ data: { email } });
      const message = "Thank you! Your checklist is downloading.";
      setSuccessMessage(message);
      setEmail("");
      toast.success(message);
      const link = document.createElement("a");
      link.href = checklistPdf;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.download = "100-First-Foods-Checklist.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (submissionError) {
      const message = submissionError instanceof Error
        ? submissionError.message
        : "We couldn't save your email. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-8 lg:grid-cols-2 lg:py-12">
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

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/blogs">
                Browse blogs <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <a href="#first-foods-checklist">Get the free meal planner</a>
            </Button>
          </div>
        </div>

        <div>
          <img
            src={heroImg}
            alt="Colourful bowls of homemade baby food"
            width={1024}
            height={1024}
            className="w-3/4 block mx-auto md:ml-auto md:mr-0 rounded-[2rem] object-cover shadow-lift"
          />
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl">Best Seller Books</h2>
            <p className="mt-2 text-muted-foreground">Parent-friendly guides for calmer, more confident mealtimes.</p>
          </div>
          <Link to="/ebooks" className="hidden text-sm font-semibold text-primary sm:block">Browse all →</Link>
        </div>
        {booksLoading ? (
          <LoadingState label="Loading best sellers…" />
        ) : (
          <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bestsellers.map((book) => (
              <article key={book.id} className="card-soft flex h-full flex-col overflow-hidden">
                <Link
                  to="/ebooks/$id"
                  params={{ id: String(book.id) }}
                  className="block aspect-[4/5] w-full overflow-hidden"
                  aria-label={`View ${book.title}`}
                >
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <BookOpen className="h-16 w-16 text-secondary" />
                  )}
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-bold uppercase text-primary">Best seller</p>
                  <h3 className="mt-2 text-lg leading-snug">{book.title}</h3>
                  {book.blurb && (
                    <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{book.blurb}</p>
                  )}
                  <p className="mt-3 flex flex-wrap items-center gap-2">
                    <PriceTag product={book} />
                    <DiscountBadge product={book} />
                  </p>
                  <Button asChild className="mt-4 rounded-full">
                    <Link to="/ebooks/$id" params={{ id: String(book.id) }}>
                      View book
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl">Trending & Doctor's Picks</h2>
            <p className="mt-2 text-muted-foreground">The recipes parents keep coming back to.</p>
          </div>
          <Link to="/blogs" className="hidden text-sm font-semibold text-primary sm:block">
            See all →
          </Link>
        </div>
        {loading ? (
          <LoadingState label="Fetching the latest recipes…" />
        ) : error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : (
          <div className="no-scrollbar mt-8 flex snap-x items-stretch gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
            {featured.map((p) => (
              <div key={p.id} className="w-72 shrink-0 snap-start self-stretch lg:w-auto">
                <RecipeCard post={p} onOpen={setOpen} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-sage-soft">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-card text-secondary">
              <Smartphone className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-semibold text-secondary">Baby Food Essentials app</p>
              <h2 className="mt-1 text-2xl md:text-3xl">Feeding support in your pocket</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">Recipes and practical guidance, ready whenever mealtime starts.</p>
            </div>
          </div>
          <Button asChild size="lg" className="shrink-0 rounded-full">
            <a href={appUrl} target="_blank" rel="noreferrer">
              <Download className="mr-2 h-4 w-4" /> Download the app
            </a>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl">What Parents Are Saying</h2>
          <p className="mt-2 text-muted-foreground">Real feedback from families using our recipes and guides.</p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {reviews.map((r) => (
            <figure key={r.name} className="card-soft flex h-full flex-col p-5">
              <div className="flex gap-0.5 text-accent" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-current" : "opacity-30"}`} />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-sm text-muted-foreground">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold">{r.name}</span>
                <span className="block text-xs text-muted-foreground">{r.detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="first-foods-checklist" className="mx-auto max-w-4xl scroll-mt-28 px-4 py-14">
        <form
          onSubmit={handleSubscribe}
          className="rounded-[2rem] border-2 border-secondary bg-card p-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl">Download the Ultimate 100 First Foods Checklist</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            A printable, allergen-aware tracker for your baby's first hundred flavours — free from the
            clinic.
          </p>
          <div className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              maxLength={254}
              autoComplete="email"
              placeholder="Your email address"
              aria-label="Email address"
              className="rounded-full"
            />
            <Button type="submit" disabled={submitting} className="rounded-full">
              {submitting ? "Saving…" : "Send it to me"}
            </Button>
          </div>
          {successMessage && (
            <p role="status" className="mx-auto mt-4 max-w-md text-sm font-semibold text-secondary">
              <Check className="mr-1 inline h-4 w-4" /> {successMessage}{" "}
              <a href={checklistPdf} target="_blank" rel="noreferrer" className="underline">
                Open the checklist
              </a>
            </p>
          )}
        </form>
      </section>

      <RecipeDialog post={open} onOpenChange={(o) => !o && setOpen(null)} />
    </>
  );
}

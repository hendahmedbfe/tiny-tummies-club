import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, HeartHandshake, Instagram, Microscope } from "lucide-react";
import doctorImg from "@/assets/doctor.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dr. Reham Emam — Paediatric Nutrition Specialist" },
      {
        name: "description",
        content:
          "Meet Dr. Reham Emam: physician, paediatric nutrition specialist and the doctor behind Baby Food Essentials.",
      },
      { property: "og:title", content: "Meet Dr. Reham Emam" },
      {
        property: "og:description",
        content: "Physician, paediatric nutrition specialist and advocate for happy mealtimes.",
      },
    ],
  }),
  component: AboutPage,
});

const philosophy = [
  {
    icon: Microscope,
    title: "Evidence-Based Nutrition",
    text: "Every recommendation traces back to current paediatric guidance, not feeding folklore.",
  },
  {
    icon: Brain,
    title: "Oral Motor & Texture Readiness",
    text: "Textures are matched to what your baby's mouth can actually do this month.",
  },
  {
    icon: HeartHandshake,
    title: "Parent-Friendly Simplicity",
    text: "Short ingredient lists, real kitchens, and plans that survive a hard week.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-16">
        <div>
          <span className="rounded-full bg-rose-soft px-3 py-1 text-sm font-semibold text-primary">
            👋 Meet The Doctor
          </span>
          <h1 className="mt-4 text-3xl leading-tight md:text-4xl">
            Hi, I'm Dr. Reham Emam — Physician, Pediatric Nutrition Specialist & Advocate for Happy
            Mealtimes.
          </h1>
          <p className="mt-4 text-muted-foreground">
            I built Baby Food Essentials for the parents in my clinic who left with a plan and still felt
            unsure at dinner time. Everything here is what I would tell you in the consultation room.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full">
              <Link to="/recipes">Explore the recipes</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/ebooks">See the guides</Link>
            </Button>
          </div>
        </div>
        <div className="relative">
          <img
            src={doctorImg}
            alt="Dr. Reham Emam"
            width={896}
            height={1152}
            className="w-full rounded-[2rem] object-cover shadow-lift"
          />
          <span className="card-soft absolute bottom-5 left-5 px-4 py-2 text-sm font-semibold shadow-lift">
            ★ Trusted by Thousands
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="text-2xl md:text-3xl">My story & mission</h2>
        <p className="mt-4 text-muted-foreground">
          After years of paediatric clinics, I noticed the same pattern: parents weren't short on love or
          effort, they were short on clear, specific guidance. Feeding advice arrived contradictory,
          fear-based, and rarely matched to a baby's actual developmental stage.
        </p>
        <p className="mt-3 text-muted-foreground">
          So I started writing the plans down — texture ladders, iron pairings, safe shapes — and testing
          them in my own kitchen with my own family. This site is that work, organised.
        </p>
        <blockquote className="mt-6 border-l-4 border-secondary pl-5 text-lg italic">
          "Starting solids shouldn't feel like a medical test. It should feel like the beginning of a
          lifelong relationship with food."
        </blockquote>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-2xl md:text-3xl">Clinical philosophy</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {philosophy.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card-soft p-6 transition-shadow hover:shadow-lift">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sage-soft text-secondary">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 rounded-[2rem] bg-card p-8 text-center shadow-sm sm:grid-cols-3">
          {[
            ["100+", "Doctor-Approved Recipes"],
            ["10k+", "Parents in the Community"],
            ["100%", "Evidence-Based"],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="font-display text-4xl font-bold text-primary">{stat}</p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="card-soft flex flex-col items-center gap-3 p-8 text-center transition-shadow hover:shadow-lift"
        >
          <Instagram className="h-8 w-8 text-primary" />
          <h3 className="text-xl">Follow @rehamemamkidsclinic</h3>
          <p className="text-sm text-muted-foreground">
            Daily texture demos, 60-second recipes and myth-busting reels.
          </p>
        </a>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-[2rem] bg-rose-soft p-10 text-center">
          <h2 className="text-2xl md:text-3xl">Start with our free 100 First Foods Checklist</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            One printable page to track every flavour, allergen and win of the first year.
          </p>
          <Button asChild size="lg" className="mt-6 rounded-full">
            <Link to="/">Get the free checklist</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

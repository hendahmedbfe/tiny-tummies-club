import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RecipeCard } from "@/components/site/RecipeCard";
import { RecipeDialog } from "@/components/site/RecipeDialog";
import {
  ageFilters,
  dietFilters,
  mealFilters,
  prepFilters,
  recipes,
  stripEmoji,
  type Recipe,
} from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recipes")({
  head: () => ({
    meta: [
      { title: "Recipes Hub — Doctor-Backed Baby Recipes for Every Stage" },
      {
        name: "description",
        content:
          "Filter wholesome baby and toddler recipes by age, meal type, dietary need and prep time. Reviewed by Dr. Reham Emam.",
      },
      { property: "og:title", content: "Recipes Hub — Baby Food Essentials" },
      {
        property: "og:description",
        content: "Wholesome, doctor-backed recipes for every feeding stage.",
      },
    ],
  }),
  component: RecipesPage,
});

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
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

function FilterRow({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">{title}</p>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {options.map((o) => (
          <Pill key={o} label={o} active={selected.includes(o)} onClick={() => onToggle(o)} />
        ))}
      </div>
    </div>
  );
}

function RecipesPage() {
  const [query, setQuery] = useState("");
  const [age, setAge] = useState("All Stages");
  const [meals, setMeals] = useState<string[]>([]);
  const [diets, setDiets] = useState<string[]>([]);
  const [preps, setPreps] = useState<string[]>([]);
  const [open, setOpen] = useState<Recipe | null>(null);

  const toggle = (setter: typeof setMeals) => (v: string) =>
    setter((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((r) => {
      if (q && !`${r.title} ${r.summary} ${r.highlight}`.toLowerCase().includes(q)) return false;
      if (age !== "All Stages" && !r.ageGroups.includes(age)) return false;
      if (meals.length && !meals.some((m) => r.mealTypes.includes(m))) return false;
      if (diets.length && !diets.every((d) => r.dietary.includes(d))) return false;
      if (preps.length && !preps.every((p) => r.prepTags.includes(stripEmoji(p)))) return false;
      return true;
    });
  }, [query, age, meals, diets, preps]);

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
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-5 px-4 py-8">
        <FilterRow
          title="By age"
          options={ageFilters}
          selected={[age]}
          onToggle={(v) => setAge(v)}
        />
        <FilterRow title="By meal type" options={mealFilters} selected={meals} onToggle={toggle(setMeals)} />
        <FilterRow title="By dietary needs" options={dietFilters} selected={diets} onToggle={toggle(setDiets)} />
        <FilterRow title="By prep & nutrition" options={prepFilters} selected={preps} onToggle={toggle(setPreps)} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        {filtered.length === 0 ? (
          <p className="card-soft p-10 text-center text-muted-foreground">
            No recipes match these filters yet — try clearing a couple.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.slice(0, 4).map((r) => (
              <RecipeCard key={r.id} recipe={r} onOpen={setOpen} />
            ))}
            {filtered.length > 4 && (
              <div className="rounded-2xl border-l-4 border-accent bg-gold-soft p-6 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <p className="text-sm">
                  <strong>💡 Dr. Reham's Texture Tip:</strong> Cut foods into adult index finger sizes so
                  your baby can grip them with a fist and still get a bite past the top of the hand.
                </p>
              </div>
            )}
            {filtered.slice(4).map((r) => (
              <RecipeCard key={r.id} recipe={r} onOpen={setOpen} />
            ))}
          </div>
        )}
      </section>

      <RecipeDialog recipe={open} onOpenChange={(o) => !o && setOpen(null)} />
    </>
  );
}

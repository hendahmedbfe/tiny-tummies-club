import { useEffect, useState } from "react";
import { Clock, Heart, Star, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Recipe } from "@/lib/data";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export function RecipeDialog({
  recipe,
  onOpenChange,
}: {
  recipe: Recipe | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { isFavorite, toggle } = useFavorites();
  const [scale, setScale] = useState(1);
  const [checked, setChecked] = useState<number[]>([]);
  const [done, setDone] = useState<number[]>([]);

  useEffect(() => {
    setScale(1);
    setChecked([]);
    setDone([]);
  }, [recipe?.id]);

  if (!recipe) return null;
  const saved = isFavorite(recipe.id);
  const progress = Math.round((done.length / recipe.steps.length) * 100);

  return (
    <Dialog open={!!recipe} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="pr-6 text-xl leading-snug">{recipe.title}</DialogTitle>
        </DialogHeader>

        <img
          src={recipe.image}
          alt={recipe.title}
          loading="lazy"
          width={768}
          height={768}
          className="aspect-16/9 w-full rounded-2xl object-cover"
        />

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            {recipe.age}
          </span>
          <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold">
            {recipe.highlight}
          </span>
          {recipe.dietary.slice(0, 3).map((d) => (
            <span key={d} className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
              {d}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" /> {recipe.prep}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-4 w-4" /> {recipe.yield}
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" /> {recipe.rating}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">{recipe.summary}</p>

        <div className="flex items-center gap-3 rounded-2xl bg-muted p-3">
          <span className="text-sm font-semibold">Servings</span>
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setScale(s)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                scale === s ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground",
              )}
            >
              {s}x
            </button>
          ))}
        </div>

        <div>
          <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
            Ingredients
          </h4>
          <ul className="space-y-2">
            {recipe.ingredients.map((ing, i) => (
              <li key={ing} className="flex items-start gap-3 text-sm">
                <Checkbox
                  id={`ing-${i}`}
                  checked={checked.includes(i)}
                  onCheckedChange={() =>
                    setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]))
                  }
                  className="mt-0.5"
                />
                <label
                  htmlFor={`ing-${i}`}
                  className={cn("cursor-pointer", checked.includes(i) && "text-muted-foreground line-through")}
                >
                  {scale > 1 ? `${scale}x ` : ""}
                  {ing}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Method</h4>
            <span className="text-xs font-semibold text-secondary">{progress}% complete</span>
          </div>
          <ol className="space-y-2">
            {recipe.steps.map((step, i) => (
              <li key={step}>
                <button
                  type="button"
                  onClick={() => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]))}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-2xl border p-3 text-left text-sm transition-colors",
                    done.includes(i) ? "border-secondary bg-sage-soft" : "hover:bg-muted",
                  )}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl bg-gold-soft p-4 text-sm">
          <strong>💡 Dr. Reham's tip: </strong>
          {recipe.doctorNote}
        </div>

        <Button
          variant={saved ? "secondary" : "default"}
          onClick={() => toggle(recipe.id)}
          className="w-full rounded-full"
        >
          <Heart className={cn("mr-2 h-4 w-4", saved && "fill-current")} />
          {saved ? "Saved to favourites" : "Save to favourites"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

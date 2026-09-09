import { Clock, Heart, Star, Users } from "lucide-react";
import type { Recipe } from "@/lib/data";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export function RecipeCard({ recipe, onOpen }: { recipe: Recipe; onOpen: (r: Recipe) => void }) {
  const { isFavorite, toggle } = useFavorites();
  const saved = isFavorite(recipe.id);

  return (
    <article className="group card-soft overflow-hidden transition-shadow hover:shadow-lift">
      <div className="relative overflow-hidden">
        <button
          type="button"
          onClick={() => onOpen(recipe)}
          className="block w-full"
          aria-label={`Open ${recipe.title}`}
        >
          <img
            src={recipe.image}
            alt={recipe.title}
            loading="lazy"
            width={768}
            height={768}
            className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          {recipe.age}
        </span>
        <button
          type="button"
          onClick={() => toggle(recipe.id)}
          aria-label={saved ? "Remove from favourites" : "Save to favourites"}
          aria-pressed={saved}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 shadow-sm transition-transform hover:scale-110"
        >
          <Heart
            className={cn("h-4 w-4", saved ? "fill-primary text-primary" : "text-muted-foreground")}
          />
        </button>
      </div>

      <div className="space-y-3 p-4">
        <span className="inline-block rounded-full bg-gold-soft px-2.5 py-1 text-[11px] font-semibold text-foreground">
          {recipe.highlight}
        </span>
        <h3 className="text-base leading-snug">
          <button type="button" onClick={() => onOpen(recipe)} className="text-left hover:text-primary">
            {recipe.title}
          </button>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{recipe.summary}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {recipe.prep}
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" /> {recipe.yield}
          </span>
          <span className="inline-flex items-center gap-1 font-semibold text-foreground">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" /> {recipe.rating}
          </span>
        </div>
      </div>
    </article>
  );
}

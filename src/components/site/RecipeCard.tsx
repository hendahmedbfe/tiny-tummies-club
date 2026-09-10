import { Clock, Heart } from "lucide-react";
import fallbackImg from "@/assets/hero.jpg";
import type { WpPost } from "@/lib/wp";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export function RecipeCard({ post, onOpen }: { post: WpPost; onOpen: (p: WpPost) => void }) {
  const { isFavorite, toggle } = useFavorites();
  const saved = isFavorite(post.slug);

  return (
    <article className="group card-soft overflow-hidden transition-shadow hover:shadow-lift">
      <div className="relative overflow-hidden">
        <button
          type="button"
          onClick={() => onOpen(post)}
          className="block w-full"
          aria-label={`Open ${post.title}`}
        >
          <img
            src={post.image ?? fallbackImg}
            alt={post.title}
            loading="lazy"
            width={768}
            height={576}
            className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </button>
        <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          {post.category}
        </span>
        <button
          type="button"
          onClick={() => toggle(post.slug)}
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
        <h3 className="text-base leading-snug">
          <button type="button" onClick={() => onOpen(post)} className="text-left hover:text-primary">
            {post.title}
          </button>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {post.readTime}
          </span>
          <span>{post.dateLabel}</span>
        </div>
      </div>
    </article>
  );
}

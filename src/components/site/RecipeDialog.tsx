import { Clock, Heart } from "lucide-react";
import fallbackImg from "@/assets/hero.jpg";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { WpPost } from "@/lib/wp";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export const wpProse =
  "space-y-4 text-sm leading-relaxed text-muted-foreground [&_a]:text-primary [&_a]:underline [&_h2]:font-display [&_h2]:text-lg [&_h2]:text-foreground [&_h3]:font-display [&_h3]:text-base [&_h3]:text-foreground [&_img]:rounded-2xl [&_li]:mb-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5";

export function RecipeDialog({
  post,
  onOpenChange,
}: {
  post: WpPost | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { isFavorite, toggle } = useFavorites();
  if (!post) return null;
  const saved = isFavorite(post.slug);

  return (
    <Dialog open={!!post} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="pr-6 text-xl leading-snug">{post.title}</DialogTitle>
        </DialogHeader>

        <img
          src={post.image ?? fallbackImg}
          alt={post.title}
          loading="lazy"
          width={768}
          height={432}
          className="aspect-16/9 w-full rounded-2xl object-cover"
        />

        <div className="flex flex-wrap items-center gap-2">
          {post.categories.map((c) => (
            <span
              key={c}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"
            >
              {c}
            </span>
          ))}
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> {post.readTime} · {post.dateLabel}
          </span>
        </div>

        <div className={wpProse} dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant={saved ? "secondary" : "default"}
            onClick={() => toggle(post.slug)}
            className="flex-1 rounded-full"
          >
            <Heart className={cn("mr-2 h-4 w-4", saved && "fill-current")} />
            {saved ? "Saved to favourites" : "Save to favourites"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

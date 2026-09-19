import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Instagram, Menu, Search, X } from "lucide-react";
import logo from "@/assets/reham-logo.png.asset.json";
import fallbackImg from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { products } from "@/lib/data";
import { useWpPosts } from "@/lib/wp";
import { useFavorites } from "@/lib/favorites";

const nav = [
  { to: "/", label: "Home" },
  { to: "/recipes", label: "Recipes Hub" },
  { to: "/journal", label: "The Feeding Journal" },
  { to: "/ebooks", label: "E-Books & Guides" },
  { to: "/about", label: "About Dr. Reham" },
] as const;

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.1-2 .1-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.5-.2 1 .5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.1-3.8-3 0-4.9 2.2-4.9 4.7 0 .9.3 1.5.7 2 .2.2.2.3.1.6l-.2.8c-.1.3-.3.4-.5.3-1.4-.6-2-2.1-2-3.9 0-2.9 2.4-6.3 7.2-6.3 3.9 0 6.4 2.8 6.4 5.8 0 4-2.2 6.9-5.4 6.9-1.1 0-2.1-.6-2.5-1.2l-.6 2.5c-.2.8-.7 1.8-1.1 2.5A10 10 0 1 0 12 2Z" />
    </svg>
  );
}

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { favorites, toggle } = useFavorites();
  const navigate = useNavigate();
  const { posts } = useWpPosts();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const savedRecipes = posts.filter((p) => favorites.includes(p.slug));

  const go = (to: string) => {
    setSearchOpen(false);
    navigate({ to });
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:flex lg:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src={logo.url}
            alt="Reham Emam Kids Clinic"
            width={56}
            height={56}
            className="h-11 w-11 shrink-0 object-contain"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-bold leading-tight">
              Baby Food Essentials
            </span>
            <span className="block truncate text-xs text-muted-foreground">by Dr. Reham Emam</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-rose-soft text-foreground" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden items-center gap-2 rounded-full border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted sm:flex"
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">Search recipes</span>
            <kbd className="hidden rounded border bg-muted px-1.5 text-[10px] font-semibold md:inline">
              ⌘K
            </kbd>
          </button>
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted sm:hidden"
          >
            <Search className="h-5 w-5" />
          </button>

          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open favourites"
                className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-muted"
              >
                <Heart className="h-5 w-5" />
                {favorites.length > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                    {favorites.length}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Saved recipes ({savedRecipes.length})</SheetTitle>
              </SheetHeader>
              <div className="mt-4 space-y-3 overflow-y-auto px-4 pb-6">
                {savedRecipes.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Tap the heart on any recipe to keep it here — it stays saved on this device.
                  </p>
                )}
                {savedRecipes.map((r) => (
                  <div key={r.id} className="flex items-center gap-3 rounded-2xl border p-2">
                    <img
                      src={r.image ?? fallbackImg}
                      alt={r.title}
                      loading="lazy"
                      width={80}
                      height={80}
                      className="h-14 w-14 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{r.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {r.category} · {r.readTime}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggle(r.slug)}
                      aria-label={`Remove ${r.title}`}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full hover:bg-muted"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hidden h-10 w-10 place-items-center rounded-full hover:bg-muted md:grid"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Pinterest"
            className="hidden h-10 w-10 place-items-center rounded-full hover:bg-muted md:grid"
          >
            <PinterestIcon className="h-5 w-5" />
          </a>

          <Button asChild className="hidden rounded-full lg:inline-flex">
            <Link to="/ebooks">Get Free Meal Planner</Link>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-muted lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-3 py-3 text-sm font-medium hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search recipes, articles and guides..." />
        <CommandList>
          <CommandEmpty>No matches found.</CommandEmpty>
          <CommandGroup heading="Recipes">
            {posts.map((p) => (
              <CommandItem key={p.id} value={`${p.title} ${p.excerpt}`} onSelect={() => go("/recipes")}>
                {p.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Journal">
            {posts.map((p) => (
              <CommandItem
                key={`j-${p.id}`}
                value={`journal ${p.title}`}
                onSelect={() => go(`/journal/${p.slug}`)}
              >
                {p.title}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Guides">
            {products.map((p) => (
              <CommandItem key={p.id} value={p.title} onSelect={() => go("/ebooks")}>
                {p.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}

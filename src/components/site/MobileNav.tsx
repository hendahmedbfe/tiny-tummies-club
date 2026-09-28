import { Link } from "@tanstack/react-router";
import { BookOpen, Home, ShoppingBag, UserRound } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/blogs", label: "Blog", icon: BookOpen, exact: false },
  { to: "/ebooks", label: "Guides", icon: ShoppingBag, exact: false },
  { to: "/about", label: "Doctor", icon: UserRound, exact: false },
] as const;

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-card/95 backdrop-blur lg:hidden">
      <ul className="grid grid-cols-4">
        {items.map(({ to, label, icon: Icon, exact }) => (
          <li key={to}>
            <Link
              to={to}
              activeOptions={{ exact }}
              activeProps={{ className: "text-primary" }}
              className="flex min-h-14 flex-col items-center justify-center gap-1 py-2 text-[11px] font-medium text-muted-foreground"
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

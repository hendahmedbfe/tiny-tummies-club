import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

const KEY = "bfe-favorites";

type Ctx = {
  favorites: string[];
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clear: () => void;
};

const FavoritesContext = createContext<Ctx>({
  favorites: [],
  toggle: () => {},
  isFavorite: () => false,
  clear: () => {},
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next: string[]) => {
    setFavorites(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(
    (id: string) => {
      persist(favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id]);
    },
    [favorites, persist],
  );

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggle,
        isFavorite: (id) => favorites.includes(id),
        clear: () => persist([]),
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);

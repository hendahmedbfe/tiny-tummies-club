import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { mapProduct, type ShopProduct } from "./shop";

const STORE_ENDPOINT = "https://babyfoodessentials.com/wp-json/wc/store/v1/products";
const CACHE_MS = 90 * 1000;

let cache: { at: number; products: ShopProduct[] } | null = null;

async function loadFromStore(): Promise<ShopProduct[]> {
  const all: unknown[] = [];
  let page = 1;
  let totalPages = 1;
  do {
    // Cache-busting query + no-cache headers so LiteSpeed never serves stale prices.
    const res = await fetch(`${STORE_ENDPOINT}?per_page=100&page=${page}&_=${Date.now()}`, {
      headers: { Accept: "application/json", "Cache-Control": "no-cache", Pragma: "no-cache" },
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Shop request failed [${res.status}]: ${body.slice(0, 300)}`);
      throw new Error(`Shop request failed (${res.status})`);
    }
    const data = (await res.json()) as unknown[];
    if (!Array.isArray(data)) throw new Error("Unexpected response from the shop.");
    all.push(...data);
    if (page === 1) totalPages = Number(res.headers.get("X-WP-TotalPages")) || 1;
    page += 1;
  } while (page <= totalPages && page <= 20);
  return all.map((p) => mapProduct(p as Parameters<typeof mapProduct>[0]));
}

/** Server-verified WooCommerce products with live checkout prices. */
export const getShopProducts = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ fresh: z.boolean().optional() }).parse(data ?? {}))
  .handler(async ({ data }) => {
    if (!data.fresh && cache && Date.now() - cache.at < CACHE_MS) {
      return { products: cache.products, fetchedAt: cache.at };
    }
    const products = await loadFromStore();
    cache = { at: Date.now(), products };
    return { products, fetchedAt: cache.at };
  });

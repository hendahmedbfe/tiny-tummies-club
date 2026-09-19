import { useCallback, useEffect, useState } from "react";
import { decodeEntities, stripHtml } from "./wp";

export const WC_PRODUCTS_ENDPOINT = "https://babyfoodessentials.com/wp-json/wc/store/products";

export type ShopProduct = {
  id: number;
  slug: string;
  title: string;
  category: string;
  categories: string[];
  price: number;
  regularPrice: number | null;
  onSale: boolean;
  priceLabel: string;
  regularPriceLabel: string | null;
  blurb: string;
  descriptionHtml: string;
  image: string | null;
  rating: number;
  reviewCount: number;
  permalink: string;
};

type RawPrices = {
  price?: string;
  regular_price?: string;
  currency_symbol?: string;
  currency_prefix?: string;
  currency_suffix?: string;
  currency_minor_unit?: number;
  currency_decimal_separator?: string;
};

type RawProduct = {
  id: number;
  slug: string;
  name?: string;
  permalink?: string;
  on_sale?: boolean;
  short_description?: string;
  description?: string;
  average_rating?: string | number;
  review_count?: number;
  prices?: RawPrices;
  images?: { src?: string; thumbnail?: string }[];
  categories?: { name?: string }[];
};

function toAmount(raw: string | undefined, minorUnit: number) {
  if (!raw) return null;
  const value = Number(raw);
  if (!Number.isFinite(value)) return null;
  return value / 10 ** minorUnit;
}

function formatAmount(amount: number, prices: RawPrices) {
  const minorUnit = prices.currency_minor_unit ?? 2;
  const decimal = prices.currency_decimal_separator ?? ".";
  const body = amount.toFixed(minorUnit).replace(".", decimal);
  const prefix = prices.currency_prefix ?? "";
  const suffix = prices.currency_suffix ?? ` ${prices.currency_symbol ?? ""}`;
  return `${prefix}${body}${suffix}`.trim();
}

export function mapProduct(raw: RawProduct): ShopProduct {
  const prices = raw.prices ?? {};
  const minorUnit = prices.currency_minor_unit ?? 2;
  const price = toAmount(prices.price, minorUnit) ?? 0;
  const regular = toAmount(prices.regular_price, minorUnit);
  const categories = (raw.categories ?? [])
    .map((c) => (c.name ? decodeEntities(c.name) : null))
    .filter((c): c is string => !!c);
  const descriptionHtml = raw.short_description || raw.description || "";

  return {
    id: raw.id,
    slug: raw.slug,
    title: decodeEntities(raw.name ?? "Untitled"),
    categories,
    category: categories[0] ?? "Guides",
    price,
    regularPrice: regular && regular > price ? regular : null,
    onSale: !!raw.on_sale,
    priceLabel: formatAmount(price, prices),
    regularPriceLabel: regular && regular > price ? formatAmount(regular, prices) : null,
    blurb: stripHtml(descriptionHtml).slice(0, 180),
    descriptionHtml,
    image: raw.images?.[0]?.src ?? null,
    rating: Number(raw.average_rating ?? 0) || 0,
    reviewCount: raw.review_count ?? 0,
    permalink: raw.permalink ?? "https://babyfoodessentials.com/shop/",
  };
}

/** WooCommerce checkout with the product pre-added to the cart. */
export function checkoutUrl(productId: number) {
  return `https://babyfoodessentials.com/checkout/?add-to-cart=${productId}`;
}

let cached: Promise<ShopProduct[]> | null = null;

export async function fetchProducts(signal?: AbortSignal): Promise<ShopProduct[]> {
  if (cached) return cached;

  const request = (async () => {
    const all: RawProduct[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const res = await fetch(`${WC_PRODUCTS_ENDPOINT}?per_page=100&page=${page}`, {
        signal: signal ?? null,
      });
      if (!res.ok) throw new Error(`Shop request failed (${res.status})`);
      const data = (await res.json()) as RawProduct[];
      if (!Array.isArray(data)) throw new Error("Unexpected response from the shop.");
      all.push(...data);
      if (page === 1) {
        const header = res.headers.get("X-WP-TotalPages");
        totalPages = header ? Number(header) || 1 : 1;
      }
      page += 1;
    } while (page <= totalPages && page <= 20);

    return all.map(mapProduct);
  })();

  cached = request;
  request.catch(() => {
    cached = null;
  });
  return request;
}

export function useShopProducts() {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchProducts(controller.signal)
      .then((data) => setProducts(data))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Something went wrong.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [nonce]);

  const retry = useCallback(() => setNonce((n) => n + 1), []);
  return { products, loading, error, retry };
}

import { useCallback, useEffect, useState } from "react";
import { decodeEntities, stripHtml } from "./wp";
import { getShopProducts } from "./shop.functions";

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
  discountPercent: number;
  priceLabel: string;
  regularPriceLabel: string | null;
  blurb: string;
  descriptionHtml: string;
  fullDescriptionHtml: string;
  image: string | null;
  rating: number;
  reviewCount: number;
  permalink: string;
  paymentUrl: string;
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
  add_to_cart?: { url?: string };
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

const CUR = String.raw`(?:[$€£]|USD|EUR|EGP|LE|dollars?|euros?)`;
const AMOUNT = String.raw`(?:${CUR}\s*\d+(?:[.,]\d{1,2})?|\d+(?:[.,]\d{1,2})?\s*${CUR})`;
/** "28$ instead of 46$ for the bundle", "only €9.99", "Price: 20$" etc. */
const LEGACY_PRICE_SENTENCE = new RegExp(
  String.raw`[^.!?<>\n]*${AMOUNT}(?:\s*(?:instead\s+of|rather\s+than|was|vs\.?|\/|-)\s*${AMOUNT})?[^.!?<>\n]*[.!?]?`,
  "gi",
);

/** Remove hardcoded legacy prices so only the official store price is shown. */
export function stripLegacyPrices(html: string) {
  return html
    .replace(/<(p|li|h[1-6]|span|strong|em)\b[^>]*>([\s\S]*?)<\/\1>/gi, (block, _t, inner: string) => {
      const text = stripHtml(inner);
      if (!new RegExp(AMOUNT, "i").test(text)) return block;
      const remaining = text.replace(LEGACY_PRICE_SENTENCE, "").replace(/[\s\p{P}\p{S}]/gu, "");
      return remaining.length < 3 ? "" : block.replace(LEGACY_PRICE_SENTENCE, "");
    })
    .replace(LEGACY_PRICE_SENTENCE, (m) => (new RegExp(AMOUNT, "i").test(m) ? "" : m));
}

function sanitizeProductDescription(html: string) {
  const isPaymentPrompt = (value: string) =>
    /pay\s*with\s*card|apple\s*pay|card\s*\/\s*apple\s*pay/i.test(stripHtml(value));
  const isPaymentLink = (attrs: string, content: string) =>
    /lemonsqueezy\.com|\/checkout\/buy\//i.test(attrs) || isPaymentPrompt(content);

  return stripLegacyPrices(html)
    .replace(/<p\b[^>]*>\s*\[[a-z_]+[^\]]*\]\s*<\/p>/gi, "")
    .replace(/\[[a-z_]+\b[^\]]*\]/gi, "")
    .replace(/<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>/gi, (heading) =>
      isPaymentPrompt(heading) ? "" : heading,
    )
    .replace(
      /<(p|div)\b[^>]*>\s*<a\b([^>]*)>([\s\S]*?)<\/a>\s*<\/\1>/gi,
      (block, _tag: string, attrs: string, content: string) =>
        isPaymentLink(attrs, content) ? "" : block,
    )
    .replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (anchor, attrs: string, content: string) =>
      isPaymentLink(attrs, content) ? "" : anchor,
    );
}

export function mapProduct(raw: RawProduct): ShopProduct {
  const prices = raw.prices ?? {};
  const minorUnit = prices.currency_minor_unit ?? 2;
  const price = toAmount(prices.price, minorUnit) ?? 0;
  const regular = toAmount(prices.regular_price, minorUnit);
  const categories = (raw.categories ?? [])
    .map((c) => (c.name ? decodeEntities(c.name) : null))
    .filter((c): c is string => !!c);
  const descriptionHtml = sanitizeProductDescription(raw.short_description || raw.description || "");

  return {
    id: raw.id,
    slug: raw.slug,
    title: decodeEntities(raw.name ?? "Untitled"),
    categories,
    category: categories[0] ?? "Guides",
    price,
    regularPrice: regular && regular > price ? regular : null,
    onSale: !!(regular && regular > price),
    discountPercent: regular && regular > price ? Math.round((1 - price / regular) * 100) : 0,
    priceLabel: formatAmount(price, prices),
    regularPriceLabel: regular && regular > price ? formatAmount(regular, prices) : null,
    blurb: stripHtml(descriptionHtml).slice(0, 180),
    descriptionHtml,
    fullDescriptionHtml: sanitizeProductDescription(raw.description || raw.short_description || ""),
    image: raw.images?.[0]?.src ?? null,
    rating: Number(raw.average_rating ?? 0) || 0,
    reviewCount: raw.review_count ?? 0,
    permalink: raw.permalink ?? "https://babyfoodessentials.com/shop/",
    paymentUrl: checkoutUrl(raw.id),
  };
}

/** WooCommerce checkout with the product pre-added to the cart. */
export function checkoutUrl(productId: number) {
  return `https://babyfoodessentials.com/checkout/?add-to-cart=${productId}`;
}

let cached: Promise<ShopProduct[]> | null = null;
let cachedAt = 0;
const CACHE_MS = 60 * 1000;

/** Products come from the server so prices always match WooCommerce checkout. */
export async function fetchProducts(_signal?: AbortSignal, fresh = false): Promise<ShopProduct[]> {
  if (!fresh && cached && Date.now() - cachedAt < CACHE_MS) return cached;
  const request = getShopProducts({ data: { fresh } }).then((r) => r.products);
  cached = request;
  cachedAt = Date.now();
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

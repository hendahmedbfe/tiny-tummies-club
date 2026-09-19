import { useCallback, useEffect, useState } from "react";

export const WP_POSTS_ENDPOINT = "https://babyfoodessentials.com/wp-json/wp/v2/posts?_embed";

export type WpPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  image: string | null;
  categories: string[];
  category: string;
  dateLabel: string;
  readTime: string;
  link: string;
};

const entities: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  rsquo: "’",
  lsquo: "‘",
  ldquo: "“",
  rdquo: "”",
};

export function decodeEntities(input: string) {
  return input
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (match, name: string) => entities[name.toLowerCase()] ?? match);
}

export function stripHtml(input: string) {
  return decodeEntities(input.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

export function slugifyHeading(input: string) {
  return stripHtml(input)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Cleans WordPress content for in-app rendering:
 * - gives every heading a stable id so table-of-contents anchors work
 * - rewrites external table-of-contents links (e.g. perplexity.ai) to local hashes
 * - removes any remaining perplexity links entirely, keeping their text
 */
export function sanitizeContent(html: string) {
  let out = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level: string, attrs: string, inner: string) => {
      if (/\sid=/i.test(attrs)) return match;
      const id = slugifyHeading(inner);
      if (!id) return match;
      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
    },
  );

  // external links that carry a hash -> local anchor
  out = out.replace(
    /<a\s([^>]*)href=(["'])https?:\/\/[^"'#]*#([^"']+)\2([^>]*)>/gi,
    (_match, before: string, _q: string, hash: string) =>
      `<a ${before}href="#${hash}">`,
  );

  // any leftover perplexity link -> plain text
  out = out.replace(
    /<a\s[^>]*perplexity[^>]*>([\s\S]*?)<\/a>/gi,
    (_m, text: string) => text,
  );

  return out;
}

function readTimeOf(html: string) {
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

type RawPost = {
  id: number;
  slug: string;
  link: string;
  date: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  _embedded?: {
    "wp:featuredmedia"?: { source_url?: string; alt_text?: string }[];
    "wp:term"?: { taxonomy?: string; name?: string }[][];
  };
};

export function mapPost(raw: RawPost): WpPost {
  const contentHtml = sanitizeContent(raw.content?.rendered ?? "");
  const media = raw._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;
  const categories =
    raw._embedded?.["wp:term"]
      ?.flat()
      .filter((t) => t?.taxonomy === "category" && t?.name)
      .map((t) => decodeEntities(t.name as string)) ?? [];

  return {
    id: raw.id,
    slug: raw.slug,
    link: raw.link,
    title: decodeEntities(raw.title?.rendered ?? "Untitled"),
    excerpt: stripHtml(raw.excerpt?.rendered ?? ""),
    contentHtml,
    image: media,
    categories,
    category: categories[0] ?? "Feeding",
    dateLabel: new Date(raw.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    readTime: readTimeOf(contentHtml),
  };
}

const cache = new Map<number, Promise<WpPost[]>>();

export async function fetchPosts(perPage = 100, signal?: AbortSignal): Promise<WpPost[]> {
  const cached = cache.get(perPage);
  if (cached) return cached;

  const request = (async () => {
    const pageSize = Math.min(100, Math.max(1, perPage));
    const all: RawPost[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const res = await fetch(`${WP_POSTS_ENDPOINT}&per_page=${pageSize}&page=${page}`, {
        signal: signal ?? null,
      });
      if (!res.ok) throw new Error(`WordPress request failed (${res.status})`);
      const data = (await res.json()) as RawPost[];
      if (!Array.isArray(data)) throw new Error("Unexpected response from WordPress.");
      all.push(...data);
      if (page === 1) {
        const header = res.headers.get("X-WP-TotalPages");
        totalPages = header ? Number(header) || 1 : 1;
      }
      page += 1;
    } while (page <= totalPages && page <= 20);

    return all.map(mapPost);
  })();

  cache.set(perPage, request);
  request.catch(() => cache.delete(perPage));
  return request;
}

export function clearPostsCache() {
  cache.clear();
}

export async function fetchPostBySlug(slug: string, signal?: AbortSignal): Promise<WpPost | null> {
  const res = await fetch(`${WP_POSTS_ENDPOINT}&slug=${encodeURIComponent(slug)}`, { signal: signal ?? null });
  if (!res.ok) throw new Error(`WordPress request failed (${res.status})`);
  const data = (await res.json()) as RawPost[];
  return data[0] ? mapPost(data[0]) : null;
}

export function useWpPosts(perPage = 100) {
  const [posts, setPosts] = useState<WpPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchPosts(perPage, controller.signal)
      .then((data) => setPosts(data))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Something went wrong.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [perPage, nonce]);

  const retry = useCallback(() => setNonce((n) => n + 1), []);
  return { posts, loading, error, retry };
}

export function useWpPost(slug: string) {
  const [post, setPost] = useState<WpPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchPostBySlug(slug, controller.signal)
      .then((data) => {
        setPost(data);
        if (!data) setError("This article could not be found.");
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setError(err instanceof Error ? err.message : "Something went wrong.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [slug, nonce]);

  const retry = useCallback(() => setNonce((n) => n + 1), []);
  return { post, loading, error, retry };
}

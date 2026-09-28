import type { ShopProduct } from "@/lib/shop";

export function DiscountBadge({ product, className = "" }: { product: ShopProduct; className?: string }) {
  if (!product.onSale || !product.discountPercent) return null;
  return (
    <span className={`inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-accent-foreground ${className}`}>
      -{product.discountPercent}% off
    </span>
  );
}

export function PriceTag({ product, size = "md" }: { product: ShopProduct; size?: "sm" | "md" | "lg" }) {
  const main = size === "lg" ? "text-3xl" : size === "sm" ? "text-sm" : "text-xl";
  const old = size === "lg" ? "text-lg" : "text-sm";
  return (
    <span className="inline-flex flex-wrap items-baseline gap-2">
      <span className={`${main} font-bold text-primary`}>{product.priceLabel}</span>
      {product.onSale && product.regularPriceLabel && (
        <span className={`${old} font-normal text-muted-foreground line-through`}>{product.regularPriceLabel}</span>
      )}
    </span>
  );
}

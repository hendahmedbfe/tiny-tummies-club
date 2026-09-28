import { createServerFn } from "@tanstack/react-start";
import { createHmac } from "crypto";
import { z } from "zod";

const inputSchema = z.object({
  ids: z.array(z.number().int().positive()).min(1).max(50),
});

/** Sign the selected book ids so the store can trust and rebuild the cart. */
export const createSignedCheckoutUrl = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const secret = process.env["CART_SECRET_KEY"];
    const items = data.ids.join(",");

    if (!secret) {
      return { url: `https://babyfoodessentials.com/checkout/?add-to-cart=${items}` };
    }

    const expires = Math.floor(Date.now() / 1000) + 60 * 60;
    const signature = createHmac("sha256", secret).update(`${items}|${expires}`).digest("hex");
    const url = `https://babyfoodessentials.com/?sync_cart=${encodeURIComponent(items)}&expires=${expires}&sig=${signature}`;

    return { url };
  });

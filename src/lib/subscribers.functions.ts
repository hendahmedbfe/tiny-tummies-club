import { createClient } from "@supabase/supabase-js";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const subscriberInput = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address.").max(254),
});

function apiKeyFetch(apiKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(init?.headers);
    if (headers.get("Authorization") === `Bearer ${apiKey}`) headers.delete("Authorization");
    headers.set("apikey", apiKey);
    return fetch(input, { ...init, headers });
  };
}

export const subscribeToChecklist = createServerFn({ method: "POST" })
  .inputValidator((input) => subscriberInput.parse(input))
  .handler(async ({ data }) => {
    const url = process.env["SUPABASE_URL"]!;
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const client = createClient<Database>(url, key, {
      global: { fetch: apiKeyFetch(key) },
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error } = await client.from("subscribers").insert({ email: data.email });
    if (error?.code === "23505") return { status: "existing" as const };
    if (error) throw new Error("We couldn't save your email. Please try again.");
    return { status: "created" as const };
  });